import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import "../MyPlaceAddModal/MyPlaceAddModal.css";

function MyPlaceAddModal({ isOpen, onClose, crewId, planDate }) {
    const [placeName, setPlaceName] = useState("");
    const [address, setAddress] = useState("");
    const [time, setTime] = useState("");
    const [memo, setMemo] = useState("");
    const navigate = useNavigate(); // useNavigate 훅 사용

    const formatDate = (planDate) => {
        if (!planDate) {
            console.error("planDate가 제공되지 않았습니다:", planDate);
            return "Invalid Date"; // 기본값 반환
        }

        const date = new Date(planDate);
        if (isNaN(date.getTime())) {
            console.error("유효하지 않은 날짜 형식입니다:", planDate);
            return "Invalid Date";
        }

        const isoString = date.toISOString();
        return isoString.split("T")[0]; // yyyy-mm-dd 형식으로 반환
    };

    const handleSave = async () => {
        console.log("저장 시작");
    
        // 필수 입력값 확인
        if (!placeName || !address || !time) {
            alert("모든 필드를 입력해주세요.");
            console.log("필수 입력값 누락");
            return;
        }
    
        const token = localStorage.getItem("token");
        const formattedDate = formatDate(planDate);
    
        if (formattedDate === "Invalid Date") {
            alert("날짜 형식이 유효하지 않습니다.");
            console.log("날짜 형식 유효하지 않음");
            return;
        }
    
        // 서버에 보낼 요청 데이터
        const requestData = {
            crewId: crewId,
            planDate: formattedDate,
            placeAddName: placeName,
            placeAddAddress: address,
            planTime: time,
            memo: memo,
            placeLatitude: "35.8553982001776",
            placeLongitude: "35.8553982001776",
        };
    
        console.log("서버 요청 데이터:", requestData);
    
        try {
            const response = await fetch("http://13.209.211.218:8080/placeAdd/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestData),
            });
            const rawResponse = await response.text(); // 서버 응답을 원시 텍스트로 가져오기
    
            console.log("Raw Response:", rawResponse);

            if (response.ok) {
                alert(rawResponse); // 서버에서 반환한 메시지 표시
        
                // 모달 닫기
                console.log("모달 닫기 호출");
                onClose();
    
                // 일정 상세 페이지로 이동
                console.log("페이지 이동");
                navigate(`/crew/list/${crewId}`, { state: { planDate: formattedDate } });
            } else {
                console.error("Error Response Body:", rawResponse);
                alert(`수정 실패: ${rawResponse}`);
            }
        
        } catch (error) {
            console.error("Network or Server Error:", error);
            alert("서버와의 연결 중 오류가 발생했습니다.");
            onClose();
        }
        
    };
    

    if (!isOpen) return null;

    return (
        <div className="modalOverlay">
            <div className="MyPlaceAddContent">
                <div className="MyPlaceAddHeader">
                    <div className="MyPlaceAddHeaderTitle">나만의 장소</div>
                    <button className="MyPlaceAddCloseBtn" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="MyPlaceAddBody">
                    <div className="MyPlaceAddPlace">
                        <div className="addPlaceTitle">장소</div>
                        <input
                            type="text"
                            placeholder="장소 이름을 입력하세요."
                            className="addPlaceInput"
                            value={placeName}
                            onChange={(e) => setPlaceName(e.target.value)}
                        />
                    </div>
                    <div className="MyPlaceAddAddress">
                        <div className="addAddressTitle">주소</div>
                        <input
                            type="text"
                            placeholder="주소를 입력하세요."
                            className="addAddressInput"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="MyPlaceAddTime">
                        <div className="addTimeTitle">시간</div>
                        <input
                            type="time"
                            className="addTimeInput"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                    <div className="MyPlaceAddText">
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
                <div className="MyPlaceAddFooter">
                    <div>
                        <button className="MyPlaceAddBtn" onClick={handleSave}>
                            저장
                        </button>
                    </div>
                    <div>
                        <button className="planPlaceDeleteBtn" onClick={onClose}>
                            닫기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPlaceAddModal;
