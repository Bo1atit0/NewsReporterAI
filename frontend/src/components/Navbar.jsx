import { NavLink } from 'react-router';
import { cn } from '../lib/utils';
import { useState } from 'react';
import { CiMenuFries } from 'react-icons/ci';
import { IoMdClose } from 'react-icons/io';
import Logo from './Logo';

const Navbar = () => {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="pt-6 pb-3 px-4">
      <nav>
        {/* Desktop Nav */}
        <div
          className={cn(
            'hidden md:flex items-center md:justify-between md:px-5 lg:justify-end lg:px-0 w-full '
          )}
        >
          {/* <h1 className=" text-2xl font-bold mb-0 lg:pl-3 ">LOGO</h1> */}
          <Logo/>
          <div
            className={cn(
              'flex w-full md:w-2/3 md:gap-25 lg:gap-30 justify-end md:justify-center'
            )}
          >
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    ` relative after:absolute after:left-0 after:origin-left after:w-0 hover:after:w-full after:opacity-0
                    hover:after:opacity-100 hover:text-white after:transition-all after:duration-700 after:ease-in-out
                    after:bg-[linear-gradient(to_right,black_0_5px)] after:h-1 after:-bottom-2 lg:after:-bottom-2  
                    before:w-full before:h-0 before:opacity-0  before:origin-bottom  before:bg-bright
                  before:absolute before:-bottom-2 before:left-0  before:z-0 before:rounded-t-lg hover:before:h-30 hover:before:opacity-100
                  before:transition-all before:duration-700 before:ease-in-out 
                    ${
                      isActive
                        ? 'after:w-full after:opacity-100 text-white before:opacity-100 before:h-30'
                        : 'after:w-0 after:opacity-0 text-neutral-900 before:h-0 before:opacity-0'
                    }
                  `
                  )
                }
              >
                <p
                  className={`relative  whitespace-nowrap text-lg font-bold z-20 px-2 `}
                >
                  {item.name}
                </p>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="block md:hidden">
          <button
            className="absolute top-3"
            onClick={() => setIsMenuOpen(true)}
          >
            <CiMenuFries className="size-6 font-extrabold py-0.5 cursor-pointer text-black" />
          </button>

          <div
            className={cn(
              `md:hidden fixed inset-y-0 left-0 z-50 h-screen w-[280px]
         bg-white shadow-lg shadow-gray-500 p-6 flex flex-col gap-15
         transform transition-transform duration-500 ease-in-out`,
              isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            )}
          >
            <div className="flex flex-col gap-3">
              <div className="flex justify-between mb-0 p-0">
                <h1>Logo</h1>
                <button
                  className="cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <IoMdClose className="size-8 font-bold text-black" />
                </button>
              </div>

              <div className="w-full h-0.5 bg-gray-200 mt-0 pt-0" />
            </div>

            <div className="flex flex-col items-start gap-8 ">
              {navItems.map((item, index) => (
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      `font-semibold relative py-3 px-4 w-full
                before:absolute before:bg-bright before:inset-0 before:rounded-xl 
                before:origin-left before:opacity-0 before:scale-x-0
                hover:before:opacity-100 hover:before:scale-x-100 hover:text-white
                before:transition-all before:duration-1000 before:ease-in-out
                `,
                      isActive &&
                        `before:opacity-100 before:scale-x-100 text-white`
                    )
                  }
                  key={index}
                  to={item.href}
                >
                  <p className="relative z-10">{item.name}</p>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
