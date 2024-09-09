import React from 'react';
import './css/BoardItem.css';

function BoardItem({ name, address, phone }) {
  return (
    <div className="Board-card">
        <div className="image-Boardholder"></div>
        <div className='BoardItem-Name'>{name}</div>
        <div className='BoardItem-address'>{address}</div>
        <div className='BoardItem-phone'>{phone}</div>
    </div>
  );
};

export default BoardItem;
