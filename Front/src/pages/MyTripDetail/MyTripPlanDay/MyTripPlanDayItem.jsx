import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../MyTripPlanDay/MyTripPlanDayItem.css';
import MyTripPlanPlaceItem from '../MyTripPlanPlaceItem/MyTripPlanPlaceItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneUp, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import PlanPlaceViewModal from '../PlanPlaceViewModal/PlanPlaceViewModal';


function MyTripPlanDayItem() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

    const handleButtonClick = () => {
        navigate('/placeBoard', {state : {from: 'MyTripPlanDay'}}); // PlaceBoard.jsx 경로로 이동
    };

    const openModal = () => {
        setIsModalOpen(true); // 모달 열기
    };

    const closeModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    return (
        <div className='myTripPlanDayBox'>
            <div className='myTripPlanDayHeader'>
                <FontAwesomeIcon icon={faPlaneUp} className='planUpIcon' />
                <div className='myTripPlanDayTitle'>DAY 1</div>
                <div className='myTripPlanDayDate'>09.13 (금)</div>
                <button className='myTripPlanDayAddBtn' onClick={handleButtonClick}>
                    <FontAwesomeIcon icon={faSquarePlus} />
                </button>
            </div>
            <div className='MyTripPlanPlaceItemContainer'>
                <MyTripPlanPlaceItem onClick={openModal} /> {/* 클릭 이벤트 추가 */}
            </div>
            {isModalOpen && <PlanPlaceViewModal onClose={closeModal} />}
        </div>
    )
}

export default MyTripPlanDayItem;