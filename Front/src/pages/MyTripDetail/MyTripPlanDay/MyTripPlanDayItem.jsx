import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../MyTripPlanDay/MyTripPlanDayItem.css';
import MyTripPlanPlaceItem from '../MyTripPlanPlaceItem/MyTripPlanPlaceItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneUp, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import PlanPlaceViewModal from '../PlanPlaceViewModal/PlanPlaceViewModal';

function MyTripPlanDayItem({ dayNumber, date, crewId }) {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const iconWrapperRef = useRef(null);
    const placeContainerRef = useRef(null);

    const handleButtonClick = () => {
        navigate('/placeBoard', {
            state: {
                from: 'MyTripPlanDay',
                crewId: crewId, // crewId 값 전달
                planDate: date,
            },
        });
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const formatDate = (date) => {
        const options = { month: '2-digit', day: '2-digit', weekday: 'short' };
        return date.toLocaleDateString('ko-KR', options);
    };

    useEffect(() => {
        const updateLineHeight = () => {
            if (iconWrapperRef.current && placeContainerRef.current) {
                const containerHeight = placeContainerRef.current.offsetHeight;
                iconWrapperRef.current.style.setProperty('--line-height', `${containerHeight}px`);
            }
        };

        updateLineHeight();

        // Window resize 이벤트에 대응
        window.addEventListener('resize', updateLineHeight);
        return () => window.removeEventListener('resize', updateLineHeight);
    }, []);

    return (
        <div className="myTripPlanDayBox">
            <div className="myTripPlanDayHeader">
                <div className="iconWrapper" ref={iconWrapperRef}>
                    <FontAwesomeIcon icon={faPlaneUp} className="planUpIcon" />
                </div>
                <div className="myTripPlanDayTitle">DAY {dayNumber}</div>
                <div className="myTripPlanDayDate">{formatDate(new Date(date))}</div>
                <button className="myTripPlanDayAddBtn" onClick={handleButtonClick}>
                    <FontAwesomeIcon icon={faSquarePlus} />
                </button>
            </div>
            <div className="MyTripPlanPlaceItemContainer" ref={placeContainerRef}>
                <MyTripPlanPlaceItem onClick={openModal}  crewId={crewId} date={date} />
            </div>
            {isModalOpen && <PlanPlaceViewModal onClose={closeModal} />}
        </div>
    );
}

export default MyTripPlanDayItem;