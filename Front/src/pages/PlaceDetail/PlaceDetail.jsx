import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './PlaceDetail.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PlanPlaceAddModal from '../MyTripDetail/PlanPlaceAddModal/PlanPlaceAddModal';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function PlaceDetail() {
    const { placeId } = useParams();
    const [place, setPlace] = useState(null);
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false); //일정 추가 모달
    const crewId = location.state?.crewId;
    const planDate = location.state?.planDate;
    const defaultImageUrl = "https://png.pngtree.com/thumb_back/fw800/background/20231004/pngtree-landscape-photographer-image_13347284.jpg";

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const handleSave = () => {
        // 저장 로직 추가
        console.log('저장 버튼 클릭');
        closeModal();
    };

    useEffect(() => {
        console.log('Location state in PlaceDetail:', location.state); // 디버깅용
    }, [placeId]);

    useEffect(() => {
        // placeId에 해당하는 장소 데이터를 백엔드에서 불러옵니다.
        fetch(`http://localhost:8080/place/details/${placeId}`)
            .then(response => response.json())
            .then(data => setPlace(data))
            .catch(error => console.error('Error fetching place data:', error));
    }, [placeId]);

    const isFromMyTripPlanDay = location.state?.from === 'MyTripPlanDay';

    return (
        <div>
            <div className="placeDetailContainer">
                <Header />
                <div>
                    {place ? (
                        <>
                            <div className="placeDetailHeader">
                                <div className="placeImagePlaceholder">
                                    <img src={place.imgUrl || defaultImageUrl} alt={place.placeName || "이미지"} />
                                </div>                                
                                <div className="placeInfo">
                                    <div className='placeName-Count'>
                                        <div className='placeName'>{place.placeName}</div>
                                        <div className='placeCount'>일정에 {place.count}번 추가된 장소입니다.</div>
                                    </div>
                                    <div className='placeAddress'>{place.placeAddress}</div>
                                    <div className='placePhone'>{place.placeNumber}</div>
                                    <div className='CalendarPlusBtnBox'>
                                        {isFromMyTripPlanDay && <button className='CalendarPlusBtn' onClick={openModal}>
                                            <FontAwesomeIcon icon={faPlus} className='plusIcon' />
                                            일정 추가
                                        </button>}
                                        <PlanPlaceAddModal
                                            isOpen={isModalOpen}
                                            onClose={closeModal}
                                            onSave={handleSave}
                                            crewId={location.state?.crewId} // crewId 전달
                                            placeId={placeId} // placeId 전달
                                            planDate={planDate}
                                            placeTitle={place.placeName}
                                            placeAddre={place.placeAddress}
                                        />
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="placeDetailSection">
                                <div className='TitleContent'>
                                    <div className='placeDetailTitle'>매장 정보</div>
                                    <hr />
                                </div>
                                <div className="placeDetailContent">
                                    <div className='placeHours'>영업시간</div>
                                    <div className='placeHoursText'>{place.placeBusinessHours}</div>
                                </div>
                                <hr />
                                <div className='basicInfoContent'>
                                    <div className='basicInfo'>기본정보</div>
                                    <div className="basicInfoGroup">
                                        <div className='basicInfoPhone'>
                                            <div className='basicInfoPhoneTitle'>전화</div>
                                            <div>{place.placeNumber}</div>
                                        </div>
                                        <div className='basicInfoSite'>
                                            <div className='basicInfoSiteTitle'>홈페이지</div>
                                            <div><a href={place.homepage}>{place.homepage}</a></div>
                                        </div>
                                        <div className='basicInfoAddress'>
                                            <div className='basicInfoAddressTitle'>주소</div>
                                            <div>{place.placeAddress}</div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className='mapContent'>
                                    <div className='mapTxt'>찾아가는 길</div>
                                    <div className="kakaoMap">
                                        <Map
                                            center={{ lat: place.latitude, lng: place.longitude }} // 장소의 좌표를 사용
                                            style={{ width: "100%", height: "100%" }} // 지도 크기
                                            level={3} // 확대 레벨
                                        >
                                            {/* MapMarker는 Map 안에 있어야만 합니다 */}
                                            <MapMarker position={{ lat: place.latitude, lng: place.longitude }}>
                                            </MapMarker>
                                        </Map>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>장소를 찾을 수 없습니다.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PlaceDetail;
