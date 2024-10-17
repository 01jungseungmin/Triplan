import React, { useState, useRef, useEffect } from 'react';
import '../MyTripDetail/MyTripDetail.css';
import Header from '../../components/Header';
import PlanDayItem from '../../components/PlanDayItem/PlanDayItem';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

function MyTripDetail() {
    const { crewId } = useParams(); // crewId를 URL 파라미터에서 가져옴

    const [isOpen, setIsOpen] = useState(false);
    const [plan, setPlan] = useState(null); // 여행 일정 상태 관리
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 상태 관리
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Dropdown toggle
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Dropdown 외부 클릭 감지
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    // API 호출을 통해 일정 데이터 가져오기
    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }
    
        // 백엔드 경로에 맞게 경로 수정
        fetch(`http://localhost:8080/crew/list/${crewId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // 인증 토큰 포함
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // 응답을 JSON으로 파싱
            } else {
                throw new Error(`일정 데이터를 불러오지 못했습니다. 상태 코드: ${response.status}`);
            }
        })
        .then(data => {
            setPlan(data); // 서버에서 받아온 데이터 상태에 저장
            setLoading(false); // 로딩 상태 해제
        })
        .catch(error => {
            console.error('에러 발생:', error);
            setError('일정 데이터를 불러오는 중 오류가 발생했습니다.');
            setLoading(false); // 로딩 상태 해제
        });
    }, [crewId, navigate]);

    // Dropdown 외부 클릭 감지 설정
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // 그룹 삭제 함수
    const handleDeleteCrew = () => {
        if (window.confirm('정말로 이 그룹을 삭제하시겠습니까?')) {
            const token = localStorage.getItem('token');

            fetch(`http://localhost:8080/crew/delete/${crewId}`, { // 수정된 URL
                method: 'POST', // 삭제 메서드는 POST로 변경
                headers: {
                    'Authorization': `Bearer ${token}`, // 인증 토큰 포함
                    'Content-Type': 'application/json', // JSON 형식 명시
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('그룹이 삭제되었습니다.');
                    navigate('/mytrip'); // 삭제 후 이동할 페이지
                } else {
                    throw new Error(`그룹을 삭제하지 못했습니다. 상태 코드: ${response.status}`);
                }
            })
            .catch(error => {
                console.error('삭제 중 에러 발생:', error);
                alert('그룹 삭제 중 오류가 발생했습니다.');
            });
        }
    };

    if (loading) {
        return <div>로딩 중...</div>; // 로딩 중 상태
    }

    if (error) {
        return <div>{error}</div>; // 에러 상태
    }

    return (
        <div className='MyTripDetailContainer'>
            <Header />
            <div>
                {plan ? (
                    <>
                        <div className='planContent'>
                            <div className='planDetailContent'>
                                <div className='planDetailNameContent'>
                                    <div className='planDetailName'>{plan.crew}</div>
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
                                                    <li onClick={handleDeleteCrew}>삭제하기</li> {/* 삭제 함수 연결 */}
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
                                        <button className='inviteButton'>초대하기</button>
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
        </div>
    );
}

export default MyTripDetail;
