import React, { useState, useEffect } from 'react';
import '../PlanPlaceAddModal/PlanPlaceAddModal.css';

function PlanPlaceAddModal({ isOpen, onClose, onSave, crewId, placeId, planDate, placeTitle, placeAddre }) {
    const [placeName, setPlaceName] = useState('');
    const [address, setAddress] = useState('');
    const [time, setTime] = useState('');
    const [memo, setMemo] = useState('');

    useEffect(() => {
        if (isOpen) {
            // 모달이 열릴 때 placeTitle과 placeAddre로 상태 초기화
            setPlaceName(placeTitle || ''); 
            setAddress(placeAddre || '');
        }
    }, [isOpen, placeTitle, placeAddre]);

    const formatDate = (planDate) => {
        if (!planDate) return null;
    
        const date = new Date(planDate); // 전달받은 planDate를 Date 객체로 변환
        if (isNaN(date.getTime())) {
            console.error("Invalid date format:", planDate);
            return null; // 유효하지 않은 날짜
        }
    
        return new Intl.DateTimeFormat('en-CA').format(date); // yyyy-MM-dd 형식 반환
    };
    
    console.log('포맷된 planDate:', formatDate(planDate)); // 가져온 planDate를 yyyy-MM-dd로 포맷    

    const handleSave = async () => {
        if (!placeName || !address || !time) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        const token = localStorage.getItem('token');

       const formattedDate = formatDate(planDate);

        const planRequest = {
            placeType: "PLACE",
            crewId: crewId,
            refId: placeId,
            placeName: placeName,
            address: address,
            planDate: formattedDate, // 변환된 날짜 사용
            planStartTime: time,     // 시간
            planMemo: memo,              // 메모
        };

        try {
            const response = await fetch('http://localhost:8080/plan/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(planRequest),
            });

            if (response.ok) {
                const data = await response.json();
                alert('일정이 성공적으로 저장되었습니다.');
                onSave(data); // 부모 컴포넌트로 데이터 전달
                onClose(); // 모달 닫기
            } else {
                const errorMessage = await response.text();
                alert(`일정 저장에 실패했습니다: ${errorMessage}`);
            }
        } catch (error) {
            console.error('저장 중 오류 발생:', error);
            alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modalOverlay">
            <div className="planPlaceAddContent">
                <div className="planPlaceAddHeader">
                    <div className="planPlaceAddHeaderTitle">일정 추가</div>
                    <button className="planPlaceAddCloseBtn" onClick={onClose}>&times;</button>
                </div>
                <div className="planPlaceAddBody">
                    <div className="planPlaceAddPlace">
                        <div className="addPlaceTitle">장소</div>
                        <input
                            type="text"
                            placeholder="장소 이름을 입력하세요."
                            className="addPlaceInput"
                            value={placeName}
                            onChange={(e) => setPlaceName(e.target.value)}
                        />
                    </div>
                    <div className="planPlaceAddAddress">
                        <div className="addAddressTitle">주소</div>
                        <input
                            type="text"
                            placeholder="주소를 입력하세요."
                            className="addAddressInput"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="planPlaceAddTime">
                        <div className="addTimeTitle">시간</div>
                        <input
                            type="time"
                            className="addTimeInput"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                    <div className="planPlaceAddText">
                        <div className="addTextTitle">메모</div>
                        <textarea
                            type="text"
                            placeholder="100자 이내"
                            className="addTextInput"
                            maxLength="100"
                            value={memo}
                            onChange={(e) => setMemo(e.target.value)}
                        />
                    </div>
                </div>
                <div className="planPlaceAddFooter">
                    <div>
                        <button className="planPlaceAddBtn" onClick={handleSave}>저장</button>
                    </div>
                    <div>
                        <button className="planPlaceDeleteBtn" onClick={onClose}>닫기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlanPlaceAddModal;
