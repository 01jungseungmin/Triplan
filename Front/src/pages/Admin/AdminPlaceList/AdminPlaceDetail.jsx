import '../AdminPlaceList/AdminPlaceDetail.css';
import React, { useState, useRef, useEffect } from 'react';
import Header from '../../../components/Header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

function AdminPlaceDetail() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div className='AdminPlaceDetailContainer'>
                <Header />
                <div>
                    <div className="adminplaceDetailHeader">
                        <div className="adminplaceImagePlaceholder"></div>
                        <div className="adminplaceInfo">
                            <div className='adminplaceName-Count'>
                                <div className='adminplaceName'>관리자 이름</div>
                                <div className='adminplaceCount'>일정에 123번 추가된 장소입니다.</div>
                            </div>
                            <div className='adminplaceAddress'>관리자 장소 주소</div>
                            <div className='adminplacePhone'>관리자 장소 전화번호</div>
                        </div>
                        {/* 점 세 개 버튼 추가 */}
                        <div className="adminplaceMoreOptions" ref={dropdownRef}>
                            <FontAwesomeIcon 
                                icon={faEllipsisVertical} 
                                size="lg" 
                                onClick={handleDropdownToggle} 
                                className="more-options-icon" 
                            />
                            {isDropdownOpen && (
                                <div className="dropdown-menu">
                                    <ul>
                                        <li className="dropdown-item">수정하기</li>
                                        <li className="dropdown-item">삭제하기</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <hr />
                    <div className="adminplaceDetailSection">
                        <div className='adminTitleContent'>
                            <div className='adminplaceDetailTitle'>매장 정보</div>
                            <hr />
                        </div>
                        <div className="adminplaceDetailContent">
                            <div className='adminplaceHours'>영업시간</div>
                            <div className='adminplaceHoursText'>관리자 장소 영업시간</div>
                        </div>
                        <hr />
                        <div className='adminbasicInfoContent'>
                            <div className='adminbasicInfo'>기본정보</div>
                            <div className="adminbasicInfoGroup">
                                <div className='adminbasicInfoPhone'>
                                    <div className='adminbasicInfoPhoneTitle'>전화</div>
                                    <div>관리자 전화</div>
                                </div>
                                <div className='adminbasicInfoSite'>
                                    <div className='adminbasicInfoSiteTitle'>홈페이지</div>
                                    <div><a href="#">없음</a></div>
                                </div>
                                <div className='adminbasicInfoAddress'>
                                    <div className='adminbasicInfoAddressTitle'>주소</div>
                                    <div>관리자 주소</div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default AdminPlaceDetail;
