import { generateArticle } from '../api/generateArticle';
import Markdown from 'react-markdown';
import { FaArrowUp } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { createDummyArticle } from '../api/dummyArticle';
import { useState } from 'react';
import { RiLoaderFill } from 'react-icons/ri';

const Generate = () => {
  const [topic, setTopic] = useState('');
  const [articleData, setArticledata] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (!topic.trim()) {
      return;
    }
    const fakeArticle = createDummyArticle(topic);
    const headerTopic = topic;
    setArticledata({
      title: headerTopic,
      content: fakeArticle,
    });
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
    <section className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-10">
      <aside className="shadow-lg shadow-gray-500 max-w-70 w-full">
        <Navbar />
        <p>Your Articles</p>
      </aside>

      <div className=" relative h-screen flex flex-col items-center justify-center gap-4 w-full">
        {/* 4 yellow circles */}
        <div className=" absolute top-0 right-11 flex gap-5 justify-end z-15 mt-5 ">
          <div className="bg-bright size-3  rounded-full" />
          <div className="bg-bright size-3 rounded-full" />
          <div className="bg-bright size-3 rounded-full" />
          <div className="bg-bright size-3 rounded-full" />
        </div>

        {/* <img
        src="assets/generate_image.webp"
        alt="generate Image"
        className="absolute inset-0 w-full h-full object-contain"
      /> */}
        <section className=" absolute h-full flex flex-col items-center justify-center py-10 w-full">
          {/* article */}
          {articleData ? (
            <article className="flex-1 overflow-y-auto my-6 py-8 w-[90vw] md:w-full mx-auto ">
              <header className="text-center ">
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
                  {articleData.title.toUpperCase()}
                </h1>
                <p className="mt-3 text-gray-500">
                  Generated insight · {new Date().toLocaleDateString()}
                </p>
              </header>

              <div className="">
                <div
                  className="
                  max-w-full
                  shadow-md
                  rounded-2xl
                  py-4 px-12
                  
                  mx-5
                  prose prose-lg
                   prose-hr:my-5
                prose-hr:border-gray-200
                prose-headings:tracking-tight
              prose-p:text-gray-700
              prose-strong:text-gray-900
              prose-a:text-blue-600 
              prose-a:no-underline 
              hover:prose-a:underline
              prose-headings:mb-2
                "
                >
                  <Markdown>{articleData.content}</Markdown>
                </div>
              </div>
            </article>
          ) : (
            ''
          )}

          {/* input */}
          <div className=" w-full md:pb-2 flex justify-center px-5">
            {/* <div className="absolute -top-4 h-5 w-full bg-gradient-to-t from-gray-200/40 to-transparent pointer-events-none"></div> */}
            <input
              type="text"
              value={topic}
              placeholder="What's your Topic?"
              onChange={(e) => {
                setTopic(e.target.value);
              }}
              className="border-none outline-none bg-gray-300 p-4 w-full md:w-[60vw] rounded-2xl text-lg font-medium relative"
            />
            {loading ? (
              <RiLoaderFill />
            ) : (
              <button
                onClick={handleClick}
                className="relative flex items-center justify-center 
          cursor-pointer hover:bg-bright hover:text-white hover:border-bright hover:shadow-lg 
            shadow-amber-700 transition-all duration-1000 ease-in-out"
              >
                <div className="absolute bottom-0 right-0 md:-right-2 md:-bottom-1  md:size-17 bg-bright md:bg-gray-200 size-15 rounded-2xl md:rounded-full ">
                  <div className=" z-0 hidden md:block size-14 rounded-full bg-bright absolute bottom-1/2 top-1/2 -translate-y-1/2 ml-2"></div>
                </div>
                <FaArrowUp className="absolute size-6 md:right-1/2 -translate-x-1/2 right-1.5" />
              </button>
            )}
          </div>
        </section>
        {/* 4 yellow circles */}
        <div className=" absolute bottom-0 left-11 flex gap-5 justify-end z-15 mb-5">
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
