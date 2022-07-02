import Link from 'next/link';

export type DropdownItemProps = {
  label: string;
  link: string;
};

export const DropdownItem = ({ label, link }: DropdownItemProps) => {
  return (
    <Link href={link}>
      <a className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
        {label}
      </a>
    </Link>
  );
};
