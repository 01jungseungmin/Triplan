import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../MyTripPlanDay/MyTripPlanDayItem.css';
import MyTripPlanPlaceItem from '../MyTripPlanPlaceItem/MyTripPlanPlaceItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneUp, faSquarePlus } from '@fortawesome/free-solid-svg-icons'


function MyTripPlanDayItem() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/placeBoard', {state : {from: 'MyTripPlanDay'}}); // PlaceBoard.jsx 경로로 이동
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
                <MyTripPlanPlaceItem />
            </div>
        </div>
    )
}

export default MyTripPlanDayItem;