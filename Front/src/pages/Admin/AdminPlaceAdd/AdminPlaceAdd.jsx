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

    // 이미지 변경 핸들러
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    const handleAddPlace = async () => {
        // 필수 입력값 확인
        if (!placeName || !address || !phoneNumber || !operationTime || !dayOff) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        const token = localStorage.getItem('token');

        // 서버에 보낼 요청 데이터
        const requestData = {
            placeName: placeName,
            address: address,
            phoneNumber: phoneNumber,
            operationTime: operationTime,
            dayOff: dayOff
        };

        // FormData 생성 후 데이터 추가
        const formData = new FormData();
        formData.append("adminPlaceAddRequest", new Blob([JSON.stringify(requestData)], { type: "application/json" }));

        if (image) {
            formData.append("images", image);
        }

        try {
            const response = await fetch('http://localhost:8080/admin/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });

            if (response.ok) {
                alert("장소가 성공적으로 등록되었습니다.");
                setPlaceName("");
                setAddress("");
                setPhoneNumber("");
                setOperationTime("");
                setDayOff("");
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
                            placeholder='영업, 운영 시간을 입력하세요'
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
