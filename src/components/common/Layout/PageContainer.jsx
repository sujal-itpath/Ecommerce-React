import React from 'react';
import Header from '../Header'; // Adjust path as necessary
import Footer from '../Footer'; // Adjust path as necessary
import TopBar from '../Header/TobBar';
import Breadcrumb from './Breadcrumb';

const PageContainer = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />
      <Breadcrumb />
      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default PageContainer;
