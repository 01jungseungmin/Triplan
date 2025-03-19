import React, { useState, useEffect } from 'react';
import '../components/css/BestBoard.css';
import PlaceBoardItem from './PlaceBoardItem';

function BestBoard() {
  const [topPlaces, setTopPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        // count 기준으로 내림차순 정렬 후 상위 5개만 저장
        const bestPlaces = data
          .filter(place => place.count !== undefined) // count 값이 있는 데이터만 필터링
          .sort((a, b) => b.count - a.count) // count 기준 내림차순 정렬
          .slice(0, 5); // 상위 5개만 선택

        setTopPlaces(bestPlaces);
        setLoading(false);
      } catch (error) {
        console.error('에러 발생:', error);
        setError('장소 데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchTopPlaces();
  }, []);

  if (loading) return null;
  if (error) console.error('에러 상태:', error);

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
            name={place.placeName}
            address={place.placeAddress}
            phone={place.placeNumber}
            count={place.count}
          />
        ))}
      </div>
    </div>
  );
}

export default BestBoard;
