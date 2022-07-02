import classNames from 'classnames';
import React from 'react';

type Props = {
  className?: string;
};

export const ChevronIcon = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classNames('h-10 w-10', className)}
      fillRule="nonzero"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
};
