import React from 'react';

const LOGO_URL = 'https://i.postimg.cc/qRB2Gnw2/Gemini-Generated-Image-vfkohrvfkohrvfko-1.png';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-8 w-auto' }) => (
  <img src={LOGO_URL} alt="Zia.ai Logo" className={className} />
);

export default Logo;
