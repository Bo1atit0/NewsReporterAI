import { NavLink, useNavigate } from 'react-router';
import { CiSearch } from 'react-icons/ci';
import { CiHome } from 'react-icons/ci';
import { MdOutlineArticle } from 'react-icons/md';
import PropTypes from 'prop-types';
import { navigateWithTransition } from '../lib/utils';
import { CiMenuFries } from 'react-icons/ci';

const Sidebar = ({ setSelectedArticle }) => {
  const sideBarItems = [
    { name: 'Home', href: '/', icon: <CiHome /> },
    {
      name: 'New Article',
      href: '/generate',
      icon: <MdOutlineArticle />,
    },
    { name: 'Search Articles', href: '/saved', icon: <CiSearch /> },
  ];

  const navigate = useNavigate();
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
    <div className="flex flex-col gap-10 my-3">
      <div className="flex items-center justify-between px-2">
        <h1 className="text-2xl font-bold">LOGO</h1>
        <CiMenuFries className="size-6 cursor-pointer" />
      </div>

      <div className="flex flex-col gap-8">
        {sideBarItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.href}
            onClick={() => handleClick(item)}
            className={() =>
              `flex flex-col py-3 px-4 after:rounded-xl text-lg font-medium 
              relative after:absolute after:inset-0 after:origin-left
               after:bg-bright after:scale-x-0 hover:after:scale-x-100 after:z-0 after:h-full 
              hover:after:opacity-100 hover:text-white
               after:transition-all after:duration-1500 after:ease-in-out
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
    </div>
  );
};

// Props Validation
Sidebar.prototype = {
  setSelectedArticle: PropTypes.func.isRequired,
};

export default Sidebar;
