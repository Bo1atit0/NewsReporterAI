import { generateArticle } from '../api/generateArticle';
import Markdown from 'react-markdown';
import { FaArrowUp } from 'react-icons/fa';
import { createDummyArticle } from '../api/dummyArticle';
import { useEffect, useState } from 'react';
import { RiLoaderFill } from 'react-icons/ri';
import { cn } from '../lib/utils';
import Sidebar from '../components/Sidebar';
import { useSearchParams } from 'react-router';
import { CiMenuFries } from 'react-icons/ci';

const Generate = () => {
  const [topic, setTopic] = useState('');
  const [articleHistory, setArticleHistory] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stored, setStored] = useState(false);
  const [searchParams] = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [deleteAticleId, setDeleteArticleId] = useState(null);

  // get article history from local storage on component mount
  useEffect(() => {
    const storedHistory = localStorage.getItem('articleHistory');
    if (storedHistory) {
      const parsed = JSON.parse(storedHistory);
      setArticleHistory(parsed);
      setStored(true);
      const articleId = searchParams.get('articleId');
      if (articleId) {
        const foundArticle = parsed.find(
          (article) => String(article.id) === articleId
        );
        setSelectedArticle(foundArticle);
      }
    }
  }, []);

  // store article history in local storage whenever it changes
  useEffect(() => {
    if (stored) {
      localStorage.setItem('articleHistory', JSON.stringify(articleHistory));
    }
  }, [articleHistory]);

  // handle click to generate article
  const handleClick = async () => {
    if (!topic.trim()) {
      return;
    }
    setLoading(true);

    try {
      const response = await generateArticle(topic);
      const userMessages = { role: 'user', content: topic };
      console.log('user content', userMessages.content);
      const aiResponse = {
        role: 'assistant',
        content: response.result,
      };

      if (selectedArticle) {
        const updatedMessages = [
          ...(selectedArticle.content || []),
          userMessages,
          aiResponse,
        ];
        const updatedArticle = { ...selectedArticle, content: updatedMessages };
        setSelectedArticle(updatedArticle);
        setArticleHistory((prev) =>
          prev.map((article) =>
            article.id === updatedArticle.id ? updatedArticle : article
          )
        );
      } else {
        const newArticle = {
          id: Date.now(),
          title: topic,
          content: [userMessages, aiResponse],
          date: new Date().toLocaleString(),
        };
        setSelectedArticle(newArticle);
        setArticleHistory((prev) => [newArticle, ...prev]);
      }
      setTopic('');
    } catch (error) {
      console.error('Error generating article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = (articleId) => {
    setDeleteArticleId(articleId);
    console.log('Delete article with ID:', articleId);
  };

  const handleConfirmDelete = () => {
    setArticleHistory((prev) =>
      prev.filter((article) => article.id !== deleteAticleId)
    );
    if (selectedArticle?.id === deleteAticleId) {
      setSelectedArticle(null);
    }
    setDeleteArticleId(null);
  };

  const cancelDelete = () => {
    setDeleteArticleId(null);
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-[280px_3fr] overflow-hidden h-screen w-full">
      {/* ---------------------------------Sidebar---------------------------- */}
      <div className="flex flex-col gap-2 py-3 px-2">
        <Sidebar
          selectedArticle={selectedArticle}
          setSelectedArticle={setSelectedArticle}
          articleHistory={articleHistory}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          handleDeleteArticle={handleDeleteArticle}
        />
      </div>

      <div className=" relative h-screen flex flex-col gap-0 w-full">
        {/* -----------------------------header--------------------------------------- */}
        <div className="  flex items-center justify-between px-4 pb-4 md:py-4 shadow-lg">
          <div className=" flex gap-3 items-center md:px-5">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden"
            >
              <CiMenuFries className="size-6 cursor-pointer" />
            </button>
            <h1 className="text-xl  tracking-tight text-neutral-900">
              Ai Reporter
            </h1>
          </div>

          {/* 4 yellow circles */}
          <div className=" flex gap-2 md:gap-5 ">
            <div className="bg-bright size-3  rounded-full" />
            <div className="bg-bright size-3 rounded-full" />
            <div className="bg-bright size-3 rounded-full" />
            <div className="bg-bright size-3 rounded-full" />
          </div>
        </div>

        {/* --------------------------------article section------------------------------------ */}
        <section className="flex-1 flex flex-col items-center justify-center  w-full overflow-auto">
          {/* article */}
          {selectedArticle ? (
            <article className="flex-1 overflow-y-auto my-6 py-8 w-full">
              <header className="text-center ">
                {/* <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
                  {articleData.title.toUpperCase()}
                </h1> */}
                <p className=" text-gray-500">
                  Generated insight · {selectedArticle.date}
                </p>
              </header>

              <div className="md:w-full">
                {selectedArticle.content?.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      ' rounded-xl  w-full max-w-4xl',
                      msg.role === 'user' &&
                        'bg-gray-400/40 text-lg font-medium text-right w-fit my-8 ml-auto mr-5 py-4 px-6',
                      msg.role === 'assistant' &&
                        `py-2 px-6 text-left mx-auto
                        prose prose-lg md:prose-xl
                        prose-red-700 prose-strong:text-gray-900 prose-a:text-blue-600 prose-a:no-underline
                        hover:prose-a:no-underline
                         prose-headings:font-medium prose-headings:tracking-tight
                      prose-headings:text-lg md:prose-headings:text-xl prose-p:text-lg
                      prose-hr:border-gray-200 prose-hr:my-5
                      prose-pre:overflow-x-auto prose-pre:max-w-full prose-pre:bg-gray-900
                      prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-6
                      `
                    )}
                  >
                    <Markdown>{msg.content}</Markdown>
                  </div>
                ))}
              </div>
            </article>
          ) : (
            ''
          )}

          {/* input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleClick();
            }}
            className=" w-full md:pb-5 pb-10 flex justify-center px-5"
          >
            {/* <div className="absolute -top-4 h-5 w-full bg-gradient-to-t from-gray-200/40 to-transparent pointer-events-none"></div> */}
            <input
              type="text"
              value={topic}
              placeholder="What's your Topic?"
              onChange={(e) => {
                setTopic(e.target.value);
              }}
              className="border border-gray-300 focus:outline-0 focus:border-gray-600 focus:border-2 bg-gray-300 p-4 w-full md:w-[60vw] rounded-2xl text-lg font-medium relative"
            />

            <button
              type="submit"
              // onClick={handleClick}
              className="relative flex items-center justify-center
                cursor-pointer hover:bg-bright hover:text-white hover:border-bright hover:shadow-lg 
                 shadow-amber-700 transition-all duration-1000 ease-in-out"
            >
              <div className="absolute bottom-0 right-0 md:-right-3 md:-bottom-2  md:size-20 bg-bright md:bg-gray-200 size-16 rounded-2xl md:rounded-full ">
                <div className=" z-0 hidden md:block size-16 rounded-full bg-bright absolute bottom-1/2 top-1/2 -translate-y-1/2 ml-2"></div>
              </div>

              {loading ? (
                <RiLoaderFill className="absolute size-7 font-bold md:right-1/2 -translate-x-1/2 right-1.5  animate-spin transition-all duration-800 ease-in-out" />
              ) : (
                <FaArrowUp className="absolute size-7 -translate-x-1/2 right-1/2" />
              )}
            </button>
          </form>
        </section>
        {/* 4 yellow circles */}
        {/* <div className=" absolute bottom-0 left-11 flex gap-2 md:gap-5 justify-end z-15 mb-5">
          <div className="bg-bright size-3  rounded-full" />
          <div className="bg-bright size-3 rounded-full" />
          <div className="bg-bright size-3 rounded-full" />
          <div className="bg-bright size-3 rounded-full" />
        </div> */}
      </div>
      {/* overlay */}

      {deleteAticleId && (
        <div
          onClick={() => cancelDelete()}
          className="absolute inset-0 z-50 cursor-pointer"
        >
          <div className="absolute inset-0 bg-black/40  backdrop-blur-xs" />
          <div
            className="bg-white rounded-xl shadow-lg h-[30vh] md:h-[25vh] w-4/5 md:w-[40vw] absolute left-1/2 right-1/2 -translate-x-1/2 
        top-1/2 bottom-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-5 md:gap-10 px-10 mx-auto"
          >
            <p className="text-black text-lg md:text-xl font-medium">
              Are you sure you want to Delete this article?
            </p>
            <div className="flex  gap-5 items-center">
              <button
                className="border text-whhite px-4 py-2 rounded-lg hover:bg-gray-200 hover:border-gray-200 
                transition-all duration-500 ease-in-out cursor-pointer"
                onClick={() => cancelDelete()}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-900 hover:text-white text-lg font-semibold py-2 px-4 rounded-lg transition-all duration-500 ease-in-out cursor-pointer"
                onClick={() => handleConfirmDelete()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Generate;
