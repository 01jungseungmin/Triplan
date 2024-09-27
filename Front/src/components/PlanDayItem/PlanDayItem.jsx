import React from 'react';
import PlanPlaceItem from '../PlanPlaceItem';
import './PlanDayItem.css';

function PlanDayItem({ day, date, places }) {
    return (
        <div className="plan-day-item">
            <div className="plan-day-info">
                <span className="icon">✈️</span>
                <span className="day">{`DAY ${day}`}</span>
                <span className="date">{date}</span>
            </div>
            <div className="place-list">
                {places.map((place, index) => (
                    <PlanPlaceItem
                        key={index}
                        time={place.time}
                        title={place.title}
                        address={place.address}
                        note={place.note}
                    />
                ))}
            </div>
        </div>
    );
}

export default PlanDayItem;
