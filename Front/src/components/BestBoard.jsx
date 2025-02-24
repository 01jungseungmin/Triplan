import React, { useState, useEffect } from 'react';
import '../components/css/BestBoard.css';
import PlaceBoardItem from './PlaceBoardItem';

function BestBoard() {
  const [topPlaces, setTopPlaces] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchTopPlaces = async () => {
      try {
        const response = await fetch('http://13.209.211.218:8080/place/findAll', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        if (!response.ok) {
          throw new Error(`장소 데이터를 불러오지 못했습니다. 상태 코드: ${response.status}`);
        }
        const data = await response.json();
        console.log('API에서 받아온 데이터:', data);
        setTopPlaces(data); // 받아온 데이터를 상태에 저장
        setLoading(false); // 로딩 상태 해제
      } catch (error) {
        console.error('에러 발생:', error);
        setError('장소 데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false); // 로딩 상태 해제
      }
    };
  
    fetchTopPlaces();
  }, []);

  // 로딩 상태가 끝난 후 렌더링
  if (loading) return null; // 로딩 중 상태 제거
  if (error) console.error('에러 상태:', error); // 에러가 있더라도 화면에는 표시하지 않음

  return (
    <div className="best-Board-container">
      <div className="BestBoard-header-box">
        <div className="BestBoard-header">BEST PLACE</div>
        <a href="/PlaceBoard">전체보기</a>
     </div>
      <div className="BestBoardSub">사람들이 많이 찾는 장소에요</div>
      <div className="best-board-grid">
        {topPlaces.map((place, index) => (
          <PlaceBoardItem
            key={index}
            placeId={place.placeId}
            name={place.placeName} // API 데이터에 맞게 수정
            address={place.placeAddress} // API 데이터에 맞게 수정
            phone={place.placeNumber} // API 데이터에 맞게 수정
            count={place.count} // API 데이터에 맞게 수정
          />
        ))}
      </div>
    </div>
  );
}

export default BestBoard;
