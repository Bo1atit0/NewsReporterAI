import { generateArticle } from '../api/generateArticle';
import Markdown from 'react-markdown';
import { FaArrowUp } from 'react-icons/fa';
import { createDummyArticle } from '../api/dummyArticle';
import { useEffect, useState } from 'react';
import { RiLoaderFill } from 'react-icons/ri';
import { cn, navigateWithTransition } from '../lib/utils';
import Sidebar from '../components/Sidebar';
import { useNavigate, useSearchParams } from 'react-router';
import { PiDotsThree } from 'react-icons/pi';
import { CiMenuFries } from 'react-icons/ci';

const Generate = () => {
  const [topic, setTopic] = useState('');
  const [articleHistory, setArticleHistory] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stored, setStored] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // get article history from local storage on component mount
  useEffect(() => {
    console.log('Fetching article history from localStorage...');
    const storedHistory = localStorage.getItem('articleHistory');
    console.log('Raw Article History from localStorage:', storedHistory);
    if (storedHistory) {
      const parsed = JSON.parse(storedHistory);
      console.log('Parsed Article History:', parsed);
      setArticleHistory(parsed);
      setStored(true);
      const articleId = searchParams.get('articleId');
      if (articleId) {
        const foundArticle = parsed.find(
          (article) => String(article.id) === articleId
        );

        console.log('Found Article:', foundArticle);
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
  const handleClick = () => {
    if (!topic.trim()) {
      return;
    }
    setLoading(true);

    const userMessages = { role: 'user', content: topic };
    const aiResponse = {
      role: 'assistant',
      content: createDummyArticle(topic),
    };
    // simulate delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);

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
  };

  // const handleClick = async () => {
  //   try {
  //     const generatedArticle = await generateArticle(topic);
  //     console.log(generatedArticle);
  //     if (generatedArticle.error) {
  //       console.log('Daily limit reached. Try again tomorrow.');
  //     }
  //     setArticle(generatedArticle?.result);
  //   } catch (e) {
  //     console.error('Error:', e);
  //   }
  // };

  return (
    <section className="grid grid-cols-1 md:grid-cols-[280px_3fr] overflow-hidden h-screen w-full">
      <aside className="hidden md:block shadow-lg shadow-gray-500 overflow-auto ">
        <div className="flex flex-col gap-2 py-3 px-2">
          <Sidebar setSelectedArticle={setSelectedArticle} />
          <p className=" text-lg text-gray-500 pl-1">Your Articles</p>

          <div className="flex flex-col gap-2 w-full ">
            {articleHistory.map((article) => (
              <div
                key={article.id}
                className={cn(
                  `group flex gap-2 items-center justify-between 
                cursor-pointer w-full px-3 py-2 rounded-xl transition-all duration-500 ease-in-out`,
                  selectedArticle?.id === article.id
                    ? 'bg-gray-200/80'
                    : 'hover:bg-gray-200/80 '
                )}
              >
                <button
                  onClick={() => {
                    navigate(`/generate?articleId=${article.id}`);

                    setSelectedArticle(article);
                  }}
                  className="truncate text-left tracking-tight flex-1 cursor-pointer"
                >
                  {article.title}
                </button>
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transiion-opacity duration-500">
                  <PiDotsThree className="size-10   text-black" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <div className=" relative h-screen flex flex-col w-full">
        <div className="absolute top-0 left-0 right-0  flex items-center justify-between px-4 py-4 shadow-lg ">
          {/* header */}
          <div className="flex gap-3 items-center md:px-5">
            <CiMenuFries className="block md:hidden size-6" />
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

        <section className=" absolute h-full flex flex-col items-center justify-center py-10 w-full ">
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
            className=" w-full md:pb-2 flex justify-center px-5"
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
                <RiLoaderFill className="absolute size-6 md:right-1/2 -translate-x-1/2 right-1.5 text-white animate-spin transition-all duration-700 ease-in-out" />
              ) : (
                <FaArrowUp className="absolute size-7 -translate-x-1/2 right-1/2" />
              )}
            </button>
          </form>
        </section>
        {/* 4 yellow circles */}
        <div className=" absolute bottom-0 left-11 flex gap-2 md:gap-5 justify-end z-15 mb-5">
          <div className="bg-bright size-3  rounded-full" />
          <div className="bg-bright size-3 rounded-full" />
          <div className="bg-bright size-3 rounded-full" />
          <div className="bg-bright size-3 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Generate;
