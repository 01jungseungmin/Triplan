import React, { useState } from "react";
import '../AdminPlaceAdd/AdminPlaceAdd.css';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AdminPlaceAdd() {
    // 각 입력 필드의 상태 관리
    const [placeName, setPlaceName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [operationTime, setOperationTime] = useState("");
    const [dayOff, setDayOff] = useState("");
    const [image, setImage] = useState(null);
    const [placeCategory, setPlaceCategory] = useState("CAFE"); // 기본 카테고리 설정

    // 이미지 변경 핸들러
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };
    // 이미지 변경 핸들러
    const handleAddPlace = async () => {
        if (!placeName || !address || !phoneNumber || !operationTime || !dayOff) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        const token = localStorage.getItem('token');

        // 서버에 보낼 요청 데이터
        const requestData = {
            placeAddName: placeName,
            placeAddAddress: address,
            placeNumber: phoneNumber,
            placeBusinessHours: operationTime,
            placeHoliday: dayOff,
            placeCategory, // 선택된 카테고리 추가
        };

        const formData = new FormData();
        formData.append("adminPlaceAddRequest", new Blob([JSON.stringify(requestData)], { type: "application/json" }));

        if (image) {
            formData.append("images", image);
        }

        try {
            const response = await fetch('http://localhost:8080/admin/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                alert("장소가 성공적으로 등록되었습니다.");
                // 상태 초기화
                setPlaceName("");
                setAddress("");
                setPhoneNumber("");
                setOperationTime("");
                setDayOff("");
                setPlaceCategory("CAFE");
                setImage(null);
            } else {
                const errorMessage = await response.text();
                alert(`등록 실패: ${errorMessage}`);
            }
        } catch (error) {
            console.error("등록 중 오류 발생:", error);
            alert("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div>
            <div className='AdminPlaceAddContainer'>
                <Header />
                <div className='AdminPlaceAddContent'>
                    <div className='AdminPlaceContainer'>
                        <div className='AdminPlaceTitle'>장소 이름</div>
                        <input
                            placeholder='장소 이름'
                            value={placeName}
                            onChange={(e) => setPlaceName(e.target.value)}
                        />
                    </div>
                    <div className='AdminAddressContainer'>
                        <div className='AdminAddressTitle'>장소 주소</div>
                        <input
                            placeholder='장소 주소'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className='AdminCategoryContainer'>
                        <div className='AdminCategoryTitle'>카테고리</div>
                        <select
                            value={placeCategory}
                            onChange={(e) => setPlaceCategory(e.target.value)}
                            className="AdminCategorySelect"
                        >
                            <option value="CAFE">카페</option>
                            <option value="RESTAURANT">레스토랑</option>
                            <option value="SHOPPING">쇼핑</option>
                            <option value="TOUR">관광지</option>
                            <option value="ACCOMMODATION">숙박</option>
                            <option value="ETC">기타</option>
                            <option value="REGION">지역</option>
                        </select>
                    </div>
                    <div className='AdminPhoneContainer'>
                        <div className='AdminPhoneTitle'>전화번호</div>
                        <input
                            placeholder='전화번호'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className='AdminTimeContainer'>
                        <div className='AdminTimeTitle'>영업/운영시간</div>
                        <input
                            placeholder='예: 09:00~18:00'
                            value={operationTime}
                            onChange={(e) => setOperationTime(e.target.value)}
                        />
                    </div>
                    <div className='AdminDayContainer'>
                        <div className='AdminDayTitle'>휴무일</div>
                        <input
                            placeholder='휴무일을 입력하세요'
                            value={dayOff}
                            onChange={(e) => setDayOff(e.target.value)}
                        />
                    </div>
                    <div className='AdminImageContainer'>
                        <div className='AdminImageTitle'>이미지 추가하기</div>
                        <div className="thumbnailImageBox">
                            <input
                                type="file"
                                style={{ display: "none" }}
                                id="thumbnailInput"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="thumbnailInput" className="imageUploadBox">
                                <FontAwesomeIcon icon={faPlus} />
                            </label>
                            {image && (
                                <div className="imageBox" style={{
                                    backgroundImage: `url(${URL.createObjectURL(image)})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}></div>
                            )}
                        </div>
                    </div>
                    <div className='AdminPlaceAddBtnContainer'>
                        <button className='admingPlaceAddBtn' onClick={handleAddPlace}>등록하기</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AdminPlaceAdd;