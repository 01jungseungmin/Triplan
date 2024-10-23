import React from 'react';
import '../components/css/BestBoard.css'
import PlaceBoardItem from './PlaceBoardItem';
import { places } from '../data/mock';

function BestBoard() {

  const topPlaces = places
    .sort((a, b) => b.heart - a.heart)
    .slice(0, 3);

  return (
    <div className="best-Board-container">
      <div className="BestBoard-header-box">
        <div className='BestBoard-header'>BEST PLACE</div>
        <a href="/PlaceBoard">전체보기</a>
      </div>
      <div className='BestBoardSub'>사람들이 많이 찾는 장소에요</div>
      <div className="best-board-grid">
        {topPlaces.map((place, index) => (
          <PlaceBoardItem
            key={index}
            name={place.name}
            address={place.address}
            phone={place.phone}
            distance={place.distance}
          />
        ))}
      </div>
    </div>
  );
};

export default BestBoard;
