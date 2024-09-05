import React, { useEffect, useState } from 'react';
import '../MyTripPlanPlaceItem/MyTripPlanPlaceItem.css';

function MyTripPlanPlaceItem({ onClick, crewId, date }) {
    const [places, setPlaces] = useState([]); // 데이터를 저장할 상태
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 데이터를 가져오는 useEffect
    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('로그인이 필요합니다.');
                }

                console.log(`Fetching data for crewId: ${crewId}, date: ${date}`); // 요청 전 로그

                const response = await fetch(
                    `http://localhost:8080/plan/${crewId}?date=${date}`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched data:', data); // 성공적으로 데이터를 가져온 경우
                    setPlaces(data); // 응답 데이터를 상태에 저장
                    const filteredPlaces = data.filter(
                        (place) => new Date(place.planDate).toDateString() === new Date(date).toDateString()
                      ); // 날짜별 필터링
                      setPlaces(filteredPlaces);            
                } else {
                    console.error('Failed to fetch places:', response.status, response.statusText);
                    throw new Error('장소 데이터를 불러오는 데 실패했습니다.');
                }
            } catch (error) {
                console.error('데이터 로드 오류:', error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaces();
    }, [crewId, date]);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>오류 발생: {error}</div>;
    }

    return (
        <>
            {places && places.length > 0 && ( // places가 존재하고 길이가 0보다 클 경우에만 렌더링
                places.map((place, index) => (
                    <div
                        key={index}
                        className="planPlaceItemContainer"
                        onClick={onClick}
                    >
                        <div className="planPlaceItemHeader">
                            <div className="planPlaceItemName">{place.placeName}</div>
                            <div className="planPlaceItemAddress">{place.placeAddress || '주소 없음'}</div>
                        </div>
                        <div className="planPlaceItemComment">{place.planMemo}</div>
                    </div>
                ))
            )}
        </>
    );
}

export default MyTripPlanPlaceItem;
