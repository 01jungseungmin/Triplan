import React, { useState, useRef, useEffect } from 'react';
import '../MyTripDetail/MyTripDetail.css';
import Header from '../../components/Header';
import PlanDayItem from '../../components/PlanDayItem/PlanDayItem';
import { useParams } from 'react-router-dom';
import { schedules, tripData } from '../../data/mock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

function MyTripDetail() {
    const { planName } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const plan = schedules.find(p => p.planName === planName);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='MyTripDetailContainer'>
            <Header />
            <div>
                {plan ? (
                    <>
                        <div className='planContent'>
                            <div className='planDetailContent'>
                                <div className='planDetailNameContent'>
                                    <div className='planDetailName'>{plan.planName}</div>
                                    <div className="dropdown-container" ref={dropdownRef}>
                                        <button className="dropdown-toggle" onClick={toggleDropdown}>
                                            <FontAwesomeIcon icon={faEllipsisVertical} className='planDetailSetting' />
                                        </button>
                                        {isOpen && (
                                            <div className="dropdown-menu">
                                                <ul>
                                                    <li>여행기 작성하기</li>
                                                    <hr />
                                                    <li>수정하기</li>
                                                    <hr />
                                                    <li>삭제하기</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='planDetailDate'>
                                    <FontAwesomeIcon icon={faCalendar} className='myTripDetailIcon' />
                                    <div className='planDetailDateTxt'>{plan.plan_startDate} - {plan.plan_endDate}</div>
                                </div>
                                <div className='planDetailUser'>
                                    <FontAwesomeIcon icon={faUser} className='myTripDetailIcon' />
                                    {plan.user ? (
                                        <div className='planDetailUserTxt'>{plan.user}</div>
                                    ) : (
                                        <button className='inviteButton'>초대하기</button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="my-trip-detail">
                            {tripData.map((dayData, index) => (
                                <PlanDayItem
                                    key={index}
                                    day={dayData.day}
                                    date={dayData.date}
                                    places={dayData.places}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <p>일정을 찾을 수 없습니다.</p>
                )}
            </div>
        </div>
    );
}

export default MyTripDetail;
