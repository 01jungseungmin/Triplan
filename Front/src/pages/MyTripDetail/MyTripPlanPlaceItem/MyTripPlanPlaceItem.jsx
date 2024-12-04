import React from 'react';
import '../MyTripPlanPlaceItem/MyTripPlanPlaceItem.css';

function MyTripPlanPlaceItem({ name, address, comment, onClick }) {
    return (
        <div className="planPlaceItemContainer" onClick={onClick}>
            <div className="planPlaceItemHeader">
                {/* 전달받은 name과 address로 동적 렌더링 */}
                <div className="planPlaceItemName">{name}</div>
                <div className="planPlaceItemAddress">{address}</div>
            </div>
            {/* 전달받은 comment로 동적 렌더링 */}
            <div className="planPlaceItemComment">{comment}</div>
        </div>
    );
}

export default MyTripPlanPlaceItem;
