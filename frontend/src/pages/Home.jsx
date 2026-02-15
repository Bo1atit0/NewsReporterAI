import { FaInstagram } from 'react-icons/fa6';
import { CiLinkedin } from 'react-icons/ci';
import Navbar from '../components/Navbar';
import { Link } from 'react-router';

const Home = () => {
  return (
    <main className="p-4 md:py-5 md:px-12 border border-blue-500 select-none overflow-hidden">
      {/* 4 yellow circles */}
      <div className="flex gap-5 justify-end mb-3">
        <div className="bg-bright size-3  rounded-full" />
        <div className="bg-bright size-3 rounded-full" />
        <div className="bg-bright size-3 rounded-full" />
        <div className="bg-bright size-3 rounded-full" />
      </div>

      {/* grey section */}
      <section className="md:h-[90vh] shadow-xl rounded-lg  bg-gray-200 flex flex-col gap-5  relative">
        <Navbar />

        {/* image and text */}
        <div className="h-full flex flex-col lg:flex-row gap-10 md:gap-0 items-center justify-center lg:justify-end lg:items-center">
          <img
            src="/assets/NewsReporterAi_hero.webp"
            alt="Hero Image"
            className="w-full h-full md:h-[40vh] lg:w-[60vw] lg:h-[100vh] object-contain pl-10 lg:absolute lg:-top-12 lg:-left-20"
          />

          {/* <div className="flex flex-col gap-5 border"> */}
          <div className="flex flex-col gap-10  items-center lg:justify-center w-full lg:w-[40vw] px-5">
            <h1 className="text-4xl md:text-7xl tracking-tighter font-extrabold md:pr-5 md:-mb-3 mb-0 flex">
              <span>N</span>
              <span className="relative inline-flex justify-center items-center">
                <span className="bg-bright size-3 md:size-7.5 rounded-full absolute top-5 md:top-7 md:left-2"></span>
                <span className="relative z-10">e</span>
              </span>

              <span>wsRep</span>
              <span className="relative inline-flex justify-center items-center">
                <span className="absolute top-4 md:top-7 size-4 md:size-7 bg-bright rounded-full"></span>
                <span className="z-10 relative">o</span>
              </span>
              <span>rterAI</span>
            </h1>
            <div className="h-1.5 w-xs md:w-lg lg:w-xl bg-black lg:ml-[12.2rem] lg:mt-0 -mt-7" />
            <p className="text-lg md:text-xl text-neutral-900 text-center md:text-left leading-relaxed tracking-wide px-2 md:px-3">
              Welcome to NewsReporterAI, your go-to source for the latest news
              and insights. Our AI-powered platform delivers real-time updates,
              in-depth analysis, and personalized content to keep you informed
            </p>
            <Link to="/generate">
              <button
                className="border border-black py-1 px-4 rounded-3xl text-3xl font-extrabold cursor-pointer
               hover:bg-bright hover:text-white hover:border-bright hover:shadow-md
                shadow-amber-700 transition-all duration-1000 ease-in-out"
              >
                Get Started
              </button>
            </Link>
          </div>
          {/* </div> */}
        </div>

        <footer className="flex gap-4 justify-end pb-4 pr-5">
          <Link>
            <FaInstagram className="size-8 bg-black text-white rounded-full p-1" />
          </Link>

          <Link>
            <CiLinkedin className="size-8 bg-black text-white p-1 rounded-full" />
          </Link>
        </footer>
      </section>
      <div className="flex gap-5 justify-start mt-3">
        <div className="bg-bright size-3 rounded-full" />
        <div className="bg-bright size-3 rounded-full" />
        <div className="bg-bright size-3 rounded-full" />
        <div className="bg-bright size-3 rounded-full" />
      </div>
    </main>
  );
};

export default Home;
