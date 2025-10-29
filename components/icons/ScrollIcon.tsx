import React from 'react';

interface ScrollIconProps {
  enabled: boolean;
}

const ScrollIcon: React.FC<ScrollIconProps> = ({ enabled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    {enabled ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
    ) : (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l16 16" />
      </>
    )}
  </svg>
);

export default ScrollIcon;
