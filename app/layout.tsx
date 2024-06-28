import React, { ReactNode } from 'react';
import './globals.css';
import Header from './header';
import Footer from './footer';
export const metadata = {
  title: "VERSURA",
  description: "General by create app",
}

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <footer />
      </body>
    </html>
  );
};

export default RootLayout;
