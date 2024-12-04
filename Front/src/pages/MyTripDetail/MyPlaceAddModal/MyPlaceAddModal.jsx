import React, { useState } from 'react';
import '../MyPlaceAddModal/MyPlaceAddModal.css';

function MyPlaceAddModal({ isOpen, onClose, crewId, planDate }) {
    const [placeName, setPlaceName] = useState('');
    const [address, setAddress] = useState('');
    const [time, setTime] = useState('');
    const [memo, setMemo] = useState('');

    const formatDate = (planDate) => {
        const date = new Date(planDate); // 전달받은 planDate를 Date 객체로 변환
        const isoString = date.toISOString(); // "2024-12-03T00:00:00.000Z"
        return isoString.split('T')[0]; // "2024-12-03"
    };

    const formattedDate = formatDate(planDate);

    const handleSave = async () => {
        // 필수 입력값 확인
        if (!placeName || !address || !time) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        const token = localStorage.getItem('token');

        // 서버에 보낼 요청 데이터
        const requestData = {
            crewId: crewId, // crewId를 부모 컴포넌트에서 전달받음
            planDate: formattedDate, // planDate를 부모 컴포넌트에서 전달받음
            placeAddName: placeName,
            placeAddAddress: address,
            planTime: time,
            memo: memo,
            placeLatitude: "35.8553982001776",
            placeLongitude: "35.8553982001776"
        };

        try {
            const response = await fetch('http://localhost:8080/placeAdd/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(requestData),
            });
        
            console.log("HTTP Status:", response.status);
        
            if (response.ok) {
                const result = await response.json(); // JSON 응답 처리
                alert('저장이 완료되었습니다!');
                console.log('서버 응답:', result);
                onClose(); // 모달 닫기
            } else {
                const errorMessage = await response.text();
                alert(`저장 실패: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Network or Server Error:", error); // 네트워크 또는 서버 에러 로그
        }
        
        
    };

    if (!isOpen) return null;


    return (
        <div className="modalOverlay">
            <div className="MyPlaceAddContent">
                <div className="MyPlaceAddHeader">
                    <div className='MyPlaceAddHeaderTitle'>나만의 장소</div>
                    <button className="MyPlaceAddCloseBtn" onClick={onClose}>&times;</button>
                </div>
                <div className="MyPlaceAddBody">
                    <div className='MyPlaceAddPlace'>
                        <div className='addPlaceTitle'>장소</div>
                        <input
                            type='text'
                            placeholder='장소 이름을 입력하세요.'
                            className='addPlaceInput'
                            value={placeName}
                            onChange={(e) => setPlaceName(e.target.value)}
                        />
                    </div>
                    <div className='MyPlaceAddAddress'>
                        <div className='addAddressTitle'>주소</div>
                        <input
                            type='text'
                            placeholder='주소를 입력하세요.'
                            className='addAddressInput'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className='MyPlaceAddTime'>
                        <div className='addTimeTitle'>시간</div>
                        <input
                            type='time'
                            className='addTimeInput'
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                    <div className='MyPlaceAddText'>
                        <div className='addTextTitle'>메모</div>
                        <textarea
                            type='text'
                            placeholder='100자 이내'
                            className='addTextInput'
                            maxLength='100'
                            value={memo}
                            onChange={(e) => setMemo(e.target.value)}
                        />
                    </div>
                </div>
                <div className="MyPlaceAddFooter">
                    <div>
                        <button className="MyPlaceAddBtn" onClick={handleSave}>저장</button>
                    </div>
                    <div>
                        <button className="planPlaceDeleteBtn" onClick={onClose}>닫기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPlaceAddModal;