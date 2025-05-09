import React from 'react';
import Header from '../Header'; // Adjust path as necessary
import Footer from '../Footer'; // Adjust path as necessary
import TopBar from '../Header/TobBar';

const PageContainer = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default PageContainer;
