import React from 'react';
import '../components/css/BestBoard.css'
import PlaceBoardItem from './PlaceBoardItem';

function BestBoard() {

  const places = [
    { name: '맛있는 식당', category: '식당', address: '서울시 중구', phone: '02-1234-5678', heart: 5 },
    { name: '근처 카페', category: '카페', address: '서울시 강남구', phone: '02-8765-4321', heart: 7 },
    { name: '좋은 호텔', category: '숙소', address: '서울시 서초구', phone: '02-9876-5432', heart: 6 },
    { name: '아름다운 공원', category: '관광지', address: '서울시 마포구', phone: '02-5678-1234', heart: 10 },
    { name: '또 다른 식당', category: '식당', address: '서울시 종로구', phone: '02-6789-1234', heart: 12 },
    { name: '근처 병원', category: '기타', address: '서울시 영등포구', phone: '02-8765-5678', heart: 1 },
  ];

  const topPlaces = places
    .sort((a, b) => b.heart - a.heart)
    .slice(0, 3);

  return (
    <div className="best-Board-container">
      <div className="BestBoard-header-box">
        <div className='BestBoard-header'>BEST TRIP</div>
        <a href="/PlaceBoard">전체보기</a>
      </div>
      <div className='BestBoardSub'>인기 많은 여행 계획이에요.</div>
      {/* <div className="best-Board-list">
        {Boards.map((board, index) => (
          <BoardItem
            key={index}
            name={board.name}
            address={board.address}
            phone={board.phone}
          />
        ))}
      </div> */}
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
