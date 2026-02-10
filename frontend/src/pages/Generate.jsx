import React, { useState } from 'react';
import { generateArticle } from '../api/generateArticle';
// import Markdown from 'react-markdown';
import { useNavigate } from 'react-router';

const Generate = () => {
  const [topic, setTopic] = useState('');
  // const [article, setArticle] = useState('');
  const navigate = useNavigate();

  const handleClick = async () => {
    console.log('Generating article for topic:', topic);
    const generatedArticle = await generateArticle({ topic });
    // console.log(generatedArticle);

    navigate('/article', {
      state: {
        article: generatedArticle.result,
        topic,
      },
    });
  };

  return (
    <section className="flex flex-col items-center gap-4 px-6 select-none">
      <img
        src="assets/generate_image.webp"
        alt="generate Image"
        className="w-full h-[100vh] object-contain"
      />
      {/* <h1>Generate Article</h1>

      <div className="w-full  flex flex-col items-center justify-center gap-5">
        <input
          className="border border-gray-300 w-full  rounded px-4 py-2 
        focus:outline-none focus:ring-2 focus:ring-blue-500
        shadow-md mt-2 max-w-md"
          type="text"
          value={topic}
          placeholder="Enter a topic..."
          onChange={(e) => {
            setTopic(e.target.value);
          }}
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md 
        hover:bg-blue-700 active:scale-95 transition duration-300 cursor-pointer"
          onClick={handleClick}
        >
          Generate
        </button>
      </div> */}
    </section>
  );
};

export default Generate;
