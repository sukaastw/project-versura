import React, { ReactNode } from 'react';
import './globals.css';
import Header from './header';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <footer>© 2024 MyApp</footer>
      </body>
    </html>
  );
};

export default RootLayout;
