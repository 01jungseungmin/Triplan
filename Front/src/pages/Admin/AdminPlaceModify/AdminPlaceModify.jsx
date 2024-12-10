import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './AdminPlaceModify.css';
import Header from '../../../components/Header'
import Footer from '../../../components/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AdminPlaceModify() {
    const { placeId } = useParams();
    const navigate = useNavigate();
    const [place, setPlace] = useState(null); // place 상태 추가
    const [placeName, setPlaceName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [operationTime, setOperationTime] = useState("");
    const [dayOff, setDayOff] = useState("");
    const [placeCategory, setPlaceCategory] = useState("CAFE");
    const [image, setImage] = useState(null); // 이미지 상태
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch(`http://13.209.211.218:8080/place/details/${placeId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("데이터를 불러오지 못했습니다.");
                }
                return response.json();
            })
            .then((data) => {
                console.log("받은 데이터:", data); // 디버깅용 로그 추가
                setPlace(data);
                setPlaceName(data.placeName);
                setAddress(data.placeAddress);
                setPhoneNumber(data.placeNumber);
                setOperationTime(data.placeBusinessHours);
                setDayOff(data.placeHoliday);
                setPlaceCategory(data.placeCategory);
                if (data.imgUrl) {
                    setImage(data.imgUrl); // 초기 이미지를 설정
                }
                setLoading(false);
            })
            .catch((error) => {
                setError("데이터를 불러오는 중 오류가 발생했습니다.");
                setLoading(false);
            });
    }, [placeId]);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(URL.createObjectURL(e.target.files[0])); // 이미지 미리보기
        }
    };

    const handleUpdatePlace = async () => {
        if (!placeName || !address || !phoneNumber || !operationTime || !dayOff) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        const token = localStorage.getItem("token");

        const requestData = {
            placeId,
            placeAddName: placeName,
            placeAddAddress: address,
            placeNumber: phoneNumber,
            placeBusinessHours: operationTime,
            placeHoliday: dayOff,
            placeCategory,
        };

        const formData = new FormData();
        formData.append(
            "adminPlaceAddUpdateRequest",
            new Blob([JSON.stringify(requestData)], { type: "application/json" })
        );

        if (image && image.startsWith("blob:")) {
            formData.append("images", image); // 새 이미지 추가
        }

        try {
            const response = await fetch("http://13.209.211.218:8080/admin/update", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                alert("장소가 성공적으로 수정되었습니다.");
                navigate(`/placeboard`);
            } else {
                const errorMessage = await response.text();
                alert(`수정 실패: ${errorMessage}`);
            }
        } catch (error) {
            console.error("수정 중 오류 발생:", error);
            alert("수정 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

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
                        <div className='AdminImageTitle'>이미지(수정 불가)</div>
                        <div className="thumbnailImageBox">
                            <input
                                type="file"
                                style={{ display: "none" }}
                                id="thumbnailInput"
                                onChange={handleImageChange}
                            />
                            <div
                                className="imageBox"
                                style={{
                                    backgroundImage: `url(${image ? image : place?.imgUrl || ''})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            ></div>
                        </div>
                    </div>
                    <div className='AdminPlaceModifyBtnContainer'>
                        <button className='adminPlaceModifyBtn' onClick={handleUpdatePlace}>
                            수정하기
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AdminPlaceModify;
