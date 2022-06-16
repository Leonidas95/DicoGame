import Link from 'next/link';

import { NavBarItem, NavBarItemProps } from './components/NavBarItem';
import { Dropdown } from 'components/Dropdown/Dropdown';
import { DropdownItemProps } from 'components/Dropdown/components/DropDownItem';

export const NavBar = () => {
  const navBarItems: NavBarItemProps[] = [
    {
      name: 'Lobbies',
      link: '/lobbies',
      isActive: true,
    },
    {
      name: 'How to play',
      link: '/how-to-play',
    },
  ];

  const dropdownItems: DropdownItemProps[] = [
    { label: 'Settings', link: '/user/settings' },
    { label: 'Contributions', link: '/user/contributions' },
  ];

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href="/">
          <a className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">DicoGame</span>
          </a>
        </Link>
        <Dropdown label="My account" items={dropdownItems} />
        <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            {navBarItems.map((item, index) => (
              <NavBarItem key={index} name={item.name} link={item.link} isActive={item.isActive} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
