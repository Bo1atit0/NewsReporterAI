import { useNavigate, useLocation } from 'react-router';
import Markdown from 'react-markdown';

const Article = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const topic = location.state?.topic;
  const article = location.state?.article;
  const progress = location.state?.progress || 50;

  if (!article) {
    return (
      <section>
        <h1>No article found</h1>
        <button onClick={() => navigate('/')}>Go Back To Home</button>
      </section>
    );
  }
  return (
    // <section className=" w-full p-8 flex items-center ">
    //   <article className="prose mx-auto max-w-5xl prose-lg prose-headings:text-gray-400 prose-headings:text-3xl prose-headings:text-center p-4">
    //     <Markdown>{article}</Markdown>
    //   </article>
    // </section>
    <>
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight">{topic}</h1>
        <p className="mt-3 text-gray-500">
          Generated insight · {new Date().toLocaleDateString()}
        </p>
      </header>

      <section className="min-h-screen bg-gray-50 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-10">
          <aside className="text-sm text-gray-500">
            <p className="font-medium">Article Info</p>
            <p>{topic}</p>
          </aside>

          <article
            className="
    bg-white
    rounded-2xl
    shadow-sm
    p-8
    max-w-3xl
    mx-auto
    prose prose-lg
     prose-hr:my-12
  prose-hr:border-gray-200
  prose-headings:tracking-tight
prose-p:text-gray-700
prose-strong:text-gray-900
prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline

  "
          >
            <Markdown>{article}</Markdown>
          </article>
        </div>

        <div
          className="fixed top-0 left-0 h-1 bg-blue-500 z-50"
          style={{ width: `${progress}%` }}
        />
      </section>

      <footer className="mt-16 flex justify-between text-sm text-gray-500">
        <button onClick={() => navigate('/')} className="hover:text-black">
          ← Back
        </button>
        <button className="hover:text-black">Regenerate Article</button>
      </footer>
    </>
  );
};

export default Article;
