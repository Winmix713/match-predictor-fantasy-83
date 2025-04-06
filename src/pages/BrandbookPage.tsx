
import React from 'react';
import '../components/brandbook.css';
import Brandbook from '../components/Brandbook';
import Header from '@/components/Header';

const BrandbookPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-gray-900/95 via-gray-900/98 to-black">
      <Header />
      <Brandbook />
    </div>
  );
};

export default BrandbookPage;
