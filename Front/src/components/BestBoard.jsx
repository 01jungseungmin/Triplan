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
        console.log('API에서 받아온 원본 데이터:', data);

        // count 필드가 있는 데이터만 필터링하고 내림차순 정렬 후 상위 5개 선택
        const bestPlaces = [...data]
          .filter(place => place.count && typeof place.count === 'number') // count가 존재하고 숫자인 경우만 필터링
          .sort((a, b) => b.count - a.count) // count 기준 내림차순 정렬
          .slice(0, 5); // 상위 5개만 선택

        console.log('정렬된 Best Places:', bestPlaces);

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

  useEffect(() => {
    console.log('최종 topPlaces 상태:', topPlaces);
  }, [topPlaces]); // topPlaces가 변경될 때마다 로그 출력

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="best-Board-container">
      <div className="BestBoard-header-box">
        <div className="BestBoard-header">BEST PLACE</div>
        <a href="/PlaceBoard">전체보기</a>
      </div>
      <div className="BestBoardSub">사람들이 많이 찾는 장소에요</div>
      <div className="best-board-grid">
        {topPlaces.length === 0 ? (
          <p>데이터가 없습니다.</p>
        ) : (
          topPlaces.map((place, index) => (
            <PlaceBoardItem
              key={place.placeId} // placeId를 key로 사용 (index 대신)
              placeId={place.placeId}
              name={place.placeName}
              address={place.placeAddress}
              phone={place.placeNumber}
              count={place.count}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default BestBoard;
