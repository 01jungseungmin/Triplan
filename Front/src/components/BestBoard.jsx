import React, { useState, useEffect } from 'react';
import '../components/css/BestBoard.css';
import PlaceBoardItem from './PlaceBoardItem';
// import { places } from '../data/mock';

function BestBoard() {
  const [topPlaces, setTopPlaces] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchTopPlaces = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('로그인이 필요합니다.');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/place/findAll', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // 인증 토큰 포함
          },
        });

        if (!response.ok) {
          throw new Error(`장소 데이터를 불러오지 못했습니다. 상태 코드: ${response.status}`);
        }

        const data = await response.json();
        console.log('API에서 받아온 데이터:', data);

        // count를 기준으로 정렬하고 상위 3개를 선택
        const sortedPlaces = data
          .sort((a, b) => Number(b.count) - Number(a.count)) // 숫자로 변환하여 정렬
          .slice(0, 3);
        setTopPlaces(sortedPlaces);
      } catch (error) {
        console.error('에러 발생:', error);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchTopPlaces();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

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
            placeId={place.placeId}
            name={place.placeName} // API 데이터에 맞게 수정
            address={place.placeAddress} // API 데이터에 맞게 수정
            phone={place.placeNumber} // API 데이터에 맞게 수정
            distance={place.distance} // 필요한 경우 API 데이터에 맞게 수정
            count={place.count}
          />
        ))}
      </div>
    </div>
  );
}

export default BestBoard;


