import React from 'react';
import '../components/css/PlanPlaceItem.css';

function PlanPlaceItem() {
    return (
        <div className="planItemContainer">
            <div className="planItemHeader">
                <div className="planItemName">김수빈</div>
                <div className="planItemAddress">10일 전</div>
            </div>
            <div className="planItemComment">부산 여행 너무 재밌을 거 같아요!</div>
        </div>
    );
}

export default PlanPlaceItem;
