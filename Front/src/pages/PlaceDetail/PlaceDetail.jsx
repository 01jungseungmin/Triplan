import React from 'react';
import { useParams } from 'react-router-dom';
import './PlaceDetail.css';
import { places } from '../../data/mock';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Map, MapMarker } from "react-kakao-maps-sdk";

function PlaceDetail() {
    const { name } = useParams();

    // 선택된 장소를 찾습니다.
    const place = places.find(p => p.name === name);

    return (
        <div>
            <div className="placeDetailContainer">
                <Header />
                <div>
                    {place ? (
                        <>
                            <div className="placeDetailHeader">
                                <div className="placeImagePlaceholder"></div>
                                <div className="placeInfo">
                                    <div className='placeName-Count'>
                                        <div className='placeName'>{place.name}</div>
                                        <div className='placeCount'>일정에 {place.heart}번 추가된 장소입니다.</div>
                                    </div>
                                    <div className='placeAddress'>{place.address}</div>
                                    <div className='placePhone'>{place.phone}</div>
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
                                    <div className='placeHoursText'>영업시간 정보가 여기에 표시됩니다.</div>
                                </div>
                                <hr />
                                <div className='basicInfoContent'>
                                    <div className='basicInfo'>기본정보</div>
                                    <div className="basicInfoGroup">
                                        <div className='basicInfoPhone'>
                                            <div className='basicInfoPhoneTitle'>전화</div>
                                            <div>{place.phone}</div>
                                        </div>
                                        <div className='basicInfoSite'>
                                            <div className='basicInfoSiteTitle'>홈페이지</div>
                                            <div><a href={place.homepage}>{place.homepage}</a></div>
                                        </div>
                                        <div className='basicInfoAddress'>
                                            <div className='basicInfoAddressTitle'>주소</div>
                                            <div>{place.address}</div>
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
