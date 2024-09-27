import React from 'react';
import '../components/css/PlanPlaceItem.css';

function PlanPlaceItem({ time, title, address, note }) {
    return (
        <div className="place-item">
            <div className="place-time">{time}</div>
            <div className="place-content">
                <div className="place-title">{title}</div>
                <div className="place-address">{address}</div>
                <div className="place-note">{note}</div>
            </div>
        </div>
    );
}

export default PlanPlaceItem;
