import { FcSearch } from 'react-icons/fc';

const Logo = () => {
  return (
    <>
      <div className="border flex items-center justify-center relative">
        <h1 className="text-xl font-bold text-bright absolute z-20 top-0 bottom-0">
          AI
        </h1>
        <FcSearch className="size-15 text-black relative z-0" />
      </div>
    </>
  );
};

export default Logo;
