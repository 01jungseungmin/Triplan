import React, { useState, useRef, useEffect } from 'react';
import '../MyTripDetail/MyTripDetail.css';
import Header from '../../components/Header';
import MyTripPlanDayItem from './MyTripPlanDay/MyTripPlanDayItem';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser, faEllipsisVertical, faMinus } from '@fortawesome/free-solid-svg-icons';
import InviteDialog from './InviteDialog';
import Footer from '../../components/Footer';

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

        fetch(`http://13.209.211.218:8080/crew/list/${crewId}`, {
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

    useEffect(() => {
        if (isModalOpen && plan) {
            setTripName(plan.crewName);
            setStartDate(plan.planStartDate);
            setEndDate(plan.planEndDate);
        }
    }, [isModalOpen, plan]);


    const handleEditTrip = async () => {
        // 필수 입력값 확인
        if (!tripName || !startDate || !endDate) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        const token = localStorage.getItem('token');

        // 서버에 보낼 데이터
        const requestData = {
            crewName: tripName,
            planStartDate: startDate,
            planEndDate: endDate,
        };

        console.log("Request Data:", JSON.stringify(requestData));

        try {
            const response = await fetch(`http://13.209.211.218:8080/crew/update/${crewId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // 인증 토큰 포함
                },
                body: JSON.stringify(requestData),
            });

            console.log("Response Status Code:", response.status); // 상태 코드 로깅

            if (response.ok) {
                alert('일정이 수정되었습니다!');
                const updatedData = await response.json(); // 필요 시 서버에서 수정된 데이터 가져오기
                setPlan(updatedData); // 상태 업데이트
                setIsModalOpen(false); // 모달 닫기
            } else {
                const errorMessage = await response.text();
                console.error("Error Response Body:", errorMessage); // 에러 메시지 확인
                alert(`수정 실패: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Network or Server Error:", error); // 네트워크 또는 서버 에러 로그
            setIsModalOpen(false); // 모달 닫기
        }

    };


    const handleDeleteCrew = () => {
        if (window.confirm('정말로 이 그룹을 삭제하시겠습니까?')) {
            const token = localStorage.getItem('token');
            fetch(`http://13.209.211.218:8080/crew/delete/${crewId}`, {
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
        navigate(`/write/${crewId}`);
    }

    // 수정하기 버튼 클릭 시 모달을 여는 함수
    const handleMyTripEdit = () => {
        setIsModalOpen(true); // 수정 모달 열기
    };

    const getDateRange = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const dateArray = [];
        let currentDate = startDate;

        while (currentDate <= endDate) {
            dateArray.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dateArray;
    };

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
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
                                {getDateRange(plan.planStartDate, plan.planEndDate).map((date, index) => (
                                    <MyTripPlanDayItem
                                        key={index}
                                        dayNumber={index + 1}
                                        date={date}
                                        crewId={crewId} // crewId 전달
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>일정을 찾을 수 없습니다.</p>
                    )}
                </div>
                <InviteDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} crewId={crewId} />
                {isModalOpen && (
                    // 모달 내부
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
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                            <FontAwesomeIcon icon={faMinus} className='minusIcon' />
                                            <input
                                                type="date"
                                                className='MytripDateEnd'
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                min={startDate}
                                            />
                                        </div>
                                    </div>
                                    <div className='testBtnGroup'>
                                        <button className="tripCreateButton" onClick={handleEditTrip}>
                                            일정 수정하기
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer className="footerStyle" />
        </div>
    );
}

export default MyTripDetail;