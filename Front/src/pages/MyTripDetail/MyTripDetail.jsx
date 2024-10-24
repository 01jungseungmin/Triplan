import React, { useState, useRef, useEffect } from 'react';
import '../MyTripDetail/MyTripDetail.css';
import Header from '../../components/Header';
import PlanDayItem from '../../components/PlanDayItem/PlanDayItem';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import InviteDialog from './InviteDialog';

function MyTripDetail() {
    const { crewId } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog open state
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }

        fetch(`http://localhost:8080/crew/list/${crewId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setPlan(data);
                setLoading(false);
            })
            .catch(error => {
                setError('일정 데이터를 불러오는 중 오류가 발생했습니다.');
                setLoading(false);
            });
    }, [crewId, navigate]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDeleteCrew = () => {
        if (window.confirm('정말로 이 그룹을 삭제하시겠습니까?')) {
            const token = localStorage.getItem('token');
            fetch(`http://localhost:8080/crew/delete/${crewId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    if (response.ok) {
                        alert('그룹이 삭제되었습니다.');
                        navigate('/mytrip');
                    }
                })
                .catch(error => {
                    alert('그룹 삭제 중 오류가 발생했습니다.');
                });
        }
    };

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='MyTripDetailContainer'>
            <Header />
            <div>
                {plan ? (
                    <>
                        <div className='planContent'>
                            <div className='planDetailContent'>
                                <div className='planDetailNameContainer'>
                                    <div className='planDetailName'>{plan.crewName}</div>
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
                                                    <li onClick={handleDeleteCrew}>삭제하기</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='planDetailDate'>
                                    <FontAwesomeIcon icon={faCalendar} className='myTripDetailIcon' />
                                    <div className='planDetailDateTxt'>{plan.planStartDate} - {plan.planEndDate}</div>
                                </div>
                                <div className='planDetailUser'>
                                    <FontAwesomeIcon icon={faUser} className='myTripDetailIcon' />
                                    {plan.user ? (
                                        <div className='planDetailUserTxt'>{plan.user}</div>
                                    ) : (
                                        <button className='inviteButtonMyTrip' onClick={() => setIsDialogOpen(true)}>
                                            초대하기
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="my-trip-detail">
                            {plan.days && plan.days.map((dayData, index) => (
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
            <InviteDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} crewId={crewId}/>
        </div>
    );
}

export default MyTripDetail;
