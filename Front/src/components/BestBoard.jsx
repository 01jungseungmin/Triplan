import React from 'react';
import '../components/css/BestBoard.css'
import BoardItem from './BoardItem';

function BestBoard() {
  const Boards = [
    {
      name: '장소 이름',
      address: '서울특별시 강남구 신천동',
      phone: '02-1234-6789',
    },
    {
      name: '장소 이름',
      address: '서울특별시 강남구 신천동',
      phone: '02-1234-6789',
    },
    {
      name: '장소 이름',
      address: '서울특별시 강남구 신천동',
      phone: '02-1234-6789',
    },
  ];

  return (
    <div className="best-Board-container">
      <div className="BestBoard-header-box">
        <div className='BestBoard-header'>BEST TRIP</div>
        <a href="#">전체보기</a>
      </div>
      <div className='BeatBoardSub'>인기 많은 여행 계획이에요.</div>
      <div className="best-Board-list">
        {Boards.map((board, index) => (
          <BoardItem
            key={index}
            name={board.name}
            address={board.address}
            phone={board.phone}
          />
        ))}
      </div>
    </div>
  );
};

export default BestBoard;
