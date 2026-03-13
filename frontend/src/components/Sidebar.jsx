import { NavLink, useNavigate } from 'react-router';
import { CiSearch } from 'react-icons/ci';
import { CiHome } from 'react-icons/ci';
import { MdOutlineArticle } from 'react-icons/md';
import PropTypes from 'prop-types';
import { cn, navigateWithTransition } from '../lib/utils';
import { IoMdClose } from 'react-icons/io';
import { PiDotsThree } from 'react-icons/pi';
import { MdDelete } from 'react-icons/md';

const Sidebar = ({
  selectedArticle,
  setSelectedArticle,
  articleHistory,
  isSidebarOpen,
  setIsSidebarOpen,
  handleDeleteArticle,
}) => {
  const navigate = useNavigate();

  const sideBarItems = [
    { name: 'Home', href: '/', icon: <CiHome /> },
    {
      name: 'New Article',
      href: '/generate',
      icon: <MdOutlineArticle />,
    },
    { name: 'Search Articles', href: '/saved', icon: <CiSearch /> },
  ];

  const handleClick = (item) => {
    if (item.name === 'Home') {
      navigateWithTransition(navigate, '/', 'generate-to-home');
    }
    if (item.name === 'New Article') {
      navigate('/generate');
      setSelectedArticle(null);
    }
  };

  return (
    <aside
      className={cn(
        `w-[280px] fixed left-0 inset-y-0 z-50 md:relative md:-left-2
          shadow-lg shadow-gray-500 h-screen overflow-auto bg-white
        md:translate-x-0 transform transition-transform duration-300 ease-in-out
         `,
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full '
      )}
    >
      <div className="flex flex-col gap-4 my-3">
        <div className="flex items-center justify-between px-2">
          <h1 className="text-2xl font-bold">LOGO</h1>
          <IoMdClose
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="size-6 cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-5 mb-3">
          {sideBarItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.href}
              onClick={() => handleClick(item)}
              className={() =>
                `flex flex-col py-3 px-4 text-lg font-medium relative
                 after:absolute after:inset-0 after:origin-left after:bg-bright 
                 after:scale-x-0 after:opacity-0 after:z-0 after:h-full 
              hover:after:opacity-100 hover:text-white hover:after:scale-x-100
               after:transition-all after:duration-500 after:ease-in-out 
              `
              }
            >
              <div className="relative z-10 flex items-center gap-1">
                {item.icon}
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>

        {/* Article History */}
        <p className=" text-lg text-gray-500 pl-5 mb-0">Your Articles</p>
        <div className="flex flex-col gap-2 w-full px-3 ">
          {articleHistory.map((article) => (
            <div
              key={article.id}
              className={cn(
                `group flex  items-center justify-between 
                cursor-pointer w-full p-3  rounded-xl transition-all duration-500 ease-in-out`,
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
              {/* ----------------------!!!!!!!!!!!!!!!!!!!!!!!!------------------------- */}
              <button
                onClick={() => handleDeleteArticle(article.id)}
                className="flex-shrink-0 opacity-0 group-hover:opacity-100 transiion-opacity duration-500 cursor-pointer"
              >
                <MdDelete className="size-6 text-red-600" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

// Props Validation
Sidebar.propTypes = {
  setSelectedArticle: PropTypes.func.isRequired,
  articleHistory: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.arrayOf(
        PropTypes.shape({
          role: PropTypes.string.isRequired,
          content: PropTypes.string.isRequired,
        })
      ),
    })
  ),
};

export default Sidebar;
