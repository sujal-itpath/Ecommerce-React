import React from 'react';
import logosImg from '../../../assets/Images/logos.png';

const Logos = () => {
  return (
    <div className="flex justify-center items-center py-8 px-4">
      <img
        src={logosImg}
        alt="Logos"
        style={{
          width: '904px',
          height: '100px',
        }}
        className="mx-auto"
      />
    </div>
  );
};

export default Logos;
