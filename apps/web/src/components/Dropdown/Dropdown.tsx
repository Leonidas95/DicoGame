import { ChevronIcon } from 'assets/icons/ChevronIcon';
import { useCallback, useState } from 'react';

import { DropdownItemProps, DropdownItem } from './components/DropdownItem';

type DropdownProps = {
  label: string;
  items: DropdownItemProps[];
  icon?: JSX.Element;
};

export const Dropdown = ({ label, items, icon }: DropdownProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsDropdownVisible(!isDropdownVisible);
  }, [isDropdownVisible]);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="flex justify-center items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          onClick={toggleDropdown}
        >
          {label}
          {icon ? icon : <ChevronIcon />}
        </button>
      </div>
      {isDropdownVisible ? (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="none">
            {items.map((item, index) => (
              <DropdownItem key={index} label={item.label} link={item.link} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
