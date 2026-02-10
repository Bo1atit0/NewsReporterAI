import { NavLink } from 'react-router';
const Navbar = () => {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/services' },
  ];
  return (
    <header className="py-6 px-6">
      <nav className="hidden md:flex justify-center md:justify-around lg:justify-end items-center">
        <h1 className="text-2xl font-bold">LOGO</h1>
        <div className="flex w-full md:w-2/3 gap-5 md:gap-30 justify-end md:justify-center">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `cursor:pointer relative after:absolute after:bg-[linear-gradient(to_right,black_0_5px)]
               after:h-1 after:left-0 after:origin-left after:-bottom-2 lg:after:-bottom-2 after:w-0 hover:after:w-full after:opacity-0
                hover:after:opacity-100 after:transition-all after:duration-700 after:ease-in-out
                before:w-full before:h-0 before:opacity-0  before:origin-bottom  before:bg-bright
                 before:absolute before:-bottom-2  before:z-0 hover:text-white
                hover:before:h-30 hover:before:opacity-100 before:transition-all before:duration-700 before:ease-in-out 
              ${
                isActive
                  ? 'after:w-full after:opacity-100 text-white before:h-30 before:opacity-100'
                  : 'after:w-0 after:opacity-0 text-neutral-900 before:h-0 before:opacity-0'
              }`
              }
            >
              <p className="relative  whitespace-nowrap text-lg font-bold z-20 px-2">
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
