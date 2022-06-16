import classNames from 'classnames';
import Link from 'next/link';

export type NavBarItemProps = {
  name: string;
  link: string;
  isActive?: boolean;
};

export const NavBarItem = ({ name, link, isActive = false }: NavBarItemProps) => {
  return (
    <li>
      <Link href={link}>
        <a
          className={classNames(
            'block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700',
            { 'text-green-700 underline underline-offset-8 decoration-2 decoration-green-700': isActive },
          )}
        >
          {name}
        </a>
      </Link>
    </li>
  );
};
