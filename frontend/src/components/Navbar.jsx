import { NavLink, useLocation } from 'react-router';
import { cn } from '../lib/utils';

const Navbar = () => {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/services' },
  ];
  const location = useLocation();
  const HomePage = location.pathname === '/';
  const generatePage = location.pathname === '/generate';

  return (
    <header className="pt-6 pb-3 px-4">
      <nav
        className={cn(
          'hidden md:flex ',
          generatePage && 'flex-col items-start gap-5 py-2',
          HomePage &&
            'justify-center md:justify-around lg:justify-end items-center'
        )}
      >
        <h1 className="text-2xl font-bold mb-0 pl-3 ">LOGO</h1>
        <div className="h-0.5 w-full mx-auto bg-gray-200" />
        <div
          className={cn(
            'flex',
            generatePage && 'flex-col items-start gap-3 w-full',
            HomePage &&
              'w-full md:w-2/3 md:gap-30 justify-end md:justify-center'
          )}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  ` relative after:absolute after:left-0 after:origin-left after:w-0 hover:after:w-full after:opacity-0
                    hover:after:opacity-100 hover:text-white after:transition-all after:duration-700 after:ease-in-out
                    ${
                      isActive
                        ? 'after:w-full after:opacity-100'
                        : 'after:w-0 after:opacity-0 '
                    }
                  `,
                  HomePage &&
                    `after:bg-[linear-gradient(to_right,black_0_5px)] after:h-1 after:-bottom-2 lg:after:-bottom-2  
                    before:w-full before:h-0 before:opacity-0  before:origin-bottom  before:bg-bright
                  before:absolute before:-bottom-2  before:z-0 before:rounded-t-lg hover:before:h-30 hover:before:opacity-100
                  before:transition-all before:duration-700 before:ease-in-out
                  ${isActive ? ' text-white before:opacity-100 before:h-30' : 'text-neutral-900 before:h-0 before:opacity-0'}
                  `,
                  generatePage &&
                    `after:bg-bright hover:after:h-full py-4 after:bottom-0 w-full after:rounded-2xl pl-3`
                )
              }
            >
              <p
                className={`relative  whitespace-nowrap text-lg font-bold z-20 px-2 
              ${generatePage && 'tracking-wider'}`}
              >
                {item.name}
              </p>
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
