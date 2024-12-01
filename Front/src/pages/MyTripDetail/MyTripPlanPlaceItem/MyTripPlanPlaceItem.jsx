import React from 'react';
import '../MyTripPlanPlaceItem/MyTripPlanPlaceItem.css';

function MyTripPlanPlaceItem({onClick}) {
    return (
        <div className="planPlaceItemContainer"  onClick={onClick}>
            <div className="planPlaceItemHeader">
                <div className="planPlaceItemName">리더스타워</div>
                <div className="planPlaceItemAddress">인천광역시 남동구 간석동 273-1</div>
            </div>
            <div className="planPlaceItemComment">우리집으로 모여!</div>
        </div>
    )
}

export default MyTripPlanPlaceItem;