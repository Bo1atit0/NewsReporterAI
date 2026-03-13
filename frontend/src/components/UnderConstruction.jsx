import Navbar from '../components/Navbar';

const UnderConstruction = ({ pageName }) => {
  return (
    <section className="relative min-h-screen  overflow-hidden">
      <div className="absolute z-50 top-5 left-0 w-full">
        <Navbar />
      </div>

      <div className=" flex justify-center items-center min-h-screen">
        {/* Background Image */}
        <img
          src="/assets/illustration-construction-site.webp"
          alt="Construction illustration"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-4 px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-200">
            {pageName}
          </h1>

          <p className="text-lg md:text-xl text-gray-200/90 max-w-md">
            This page is currently under construction.
          </p>

          <p className="text-gray-200/70">
            We're working on something awesome. Please check back soon.
          </p>

          <div className="mt-4 h-1 w-24 bg-bright rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default UnderConstruction;
