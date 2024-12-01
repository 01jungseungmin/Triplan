import React, { useState, useRef, useEffect } from 'react';
import '../MyTripDetail/MyTripDetail.css';
import Header from '../../components/Header';
import MyTripPlanDayItem from './MyTripPlanDay/MyTripPlanDayItem';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser, faEllipsisVertical, faMinus } from '@fortawesome/free-solid-svg-icons';
import InviteDialog from './InviteDialog';

function MyTripDetail() {
    const { crewId } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
    const [tripName, setTripName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const dropdownRef = useRef(null);
    const modalRef = useRef(null);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const handleModalClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setIsModalOpen(false); // 모달 닫기
        }
    };

    const closeModal = () => {
        setIsModalOpen(false); // 모달 닫기
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

    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener('mousedown', handleModalClickOutside);
        } else {
            document.removeEventListener('mousedown', handleModalClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleModalClickOutside);
        };
    }, [isModalOpen]);

    const handleDeleteCrew = () => {
        if (window.confirm('정말로 이 그룹을 삭제하시겠습니까?')) {
            const token = localStorage.getItem('token');
            fetch(`http://localhost:8080/crew/delete/${crewId}`, {
                method: 'DELETE',
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

    const handleCommunityCreate = () => {
        navigate('/write');
    };

    const handleMyTripEdit = () => {
        setIsModalOpen(true); // 모달 열기
    };

    const handleCreate = () => {
        console.log('수정된 일정 정보:', { tripName, startDate, endDate });
        setIsModalOpen(false); // 모달 닫기
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
                                                    <li onClick={handleCommunityCreate}>여행기 작성하기</li>
                                                    <hr />
                                                    <li onClick={handleMyTripEdit}>수정하기</li>
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
                        <div className="myTripPlanDayContent">
                            <MyTripPlanDayItem />
                        </div>

                    </>
                ) : (
                    <p>일정을 찾을 수 없습니다.</p>
                )}
            </div>
            <InviteDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} crewId={crewId} />
            {isModalOpen && (
                <div>
                    <div className="backdrop" onClick={closeModal}></div>
                    <div className="modal">
                        <div className="form-container">
                            <div className="image-section">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoQoOS9Fb2tIZQI8knvJbitYcvaXZaKY-3iYpR6GZA9qwic0cS9LfJz4Y&s"
                                    alt="background"
                                    className="background-image"
                                />
                            </div>
                            <div className="form-section">
                                <div className="form-title">일정 수정</div>
                                <div className="form-subtitle">멋진 일정을 계획해 보세요.</div>
                                <div className='MytripNameInputContent'>
                                    <div className='MytripNameInputTitle'>일정 이름</div>
                                    <input
                                        placeholder='일정 이름 작성'
                                        className='MytripNameInput'
                                        value={tripName}
                                        onChange={(e) => setTripName(e.target.value)}
                                    />
                                </div>
                                <div className='MytripDateInputContent'>
                                    <div className='MytripDateInputTitle'>일정 기간</div>
                                    <div className='MytripDateInputBox'>
                                        <input
                                            type="date"
                                            className='MytripDateStart'
                                            placeholder='2024-10-10'
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                        <FontAwesomeIcon icon={faMinus} className='minusIcon' />
                                        <input
                                            type="date"
                                            className='MytripDateEnd'
                                            placeholder='2024-11-10'
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='testBtnGroup'>
                                    <button className="tripCreateButton" onClick={handleCreate}>
                                        일정 수정하기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyTripDetail;
