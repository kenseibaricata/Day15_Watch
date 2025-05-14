import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer>
      <p>© {currentYear} React Clock Suite</p>
    </footer>
  );
};

export default Footer; 