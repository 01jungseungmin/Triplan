import Header from '../../components/Header';
import '../MyTrip/MyTrip.css';
import MyTripTabs from '../../components/MyTripTabs';
import MyTripItem from '../../components/MyTripItem';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function MyTrip() {
    const [activeTab, setActiveTab] = useState('전체'); // 탭 상태 관리
    const [myTripCurrentPage, setMyTripCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal 상태 관리
    const [tripName, setTripName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [schedules, setSchedules] = useState([]); // 서버에서 불러온 일정 데이터 관리
    const [filteredSchedules, setFilteredSchedules] = useState([]); // 필터링된 일정들 저장
    const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetch('http://localhost:8080/crew/list', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('여행 목록을 가져오지 못했습니다.');
                }
            })
            .then(data => {
                setSchedules(data);
                filterSchedules(data, activeTab);
            })
            .catch(error => {
                console.error('에러 발생:', error);
                alert('여행 목록을 불러오는 중 오류가 발생했습니다.');
            });
        }
    }, [navigate, activeTab]); // activeTab을 의존성 배열에 추가하여 탭 변경 시 필터링

    const filterSchedules = (data, tab) => {
        const today = new Date();
        let filtered = [];

        if (tab === '예정 일정') {
            filtered = data.filter(schedule => new Date(schedule.planStartDate) > today);
        } else if (tab === '지난 일정') {
            filtered = data.filter(schedule => new Date(schedule.planEndDate) < today);
        } else {
            filtered = data; // 전체 일정
        }

        setFilteredSchedules(filtered);
        setMyTripCurrentPage(1); // 탭 변경 시 현재 페이지를 1로 리셋
    };

    const placesPerPage = 4; // 한 페이지에 4개의 일정 표시
    const totalPages = Math.ceil(filteredSchedules.length / placesPerPage);
    const startIndex = (myTripCurrentPage - 1) * placesPerPage;
    const currentSchedules = filteredSchedules.slice(startIndex, startIndex + placesPerPage);

    const handlePageChange = (pageNumber) => {
        setMyTripCurrentPage(pageNumber);
    };

    const handleNextPage = () => {
        if (myTripCurrentPage < totalPages) {
            setMyTripCurrentPage(myTripCurrentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (myTripCurrentPage > 1) {
            setMyTripCurrentPage(myTripCurrentPage - 1);
        }
    };

    const handleCreateSchedule = () => {
        setIsModalOpen(true); // 일정 생성 버튼 클릭 시 모달 열기
    };

    const closeModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    const handleCreate = (e) => {
        e.preventDefault();
        if (!tripName || !startDate || !endDate) {
            alert('모든 필드를 입력해 주세요.');
            return;
        }

        const crewRequest = {
            crewName: tripName,
            planStartDate: startDate,
            planEndDate: endDate,
        };

        fetch('http://localhost:8080/crew/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(crewRequest)
        })
        .then(response => {
            if (response.ok) {
                alert('일정이 성공적으로 생성되었습니다.');
                closeModal(); // 모달 닫기
                return fetch('http://localhost:8080/crew/list', { // 새로 생성한 일정 목록을 업데이트
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
            } else {
                alert('일정 생성에 실패했습니다.');
            }
        })
        .then(response => response && response.json())
        .then(data => {
            setSchedules(data);
            filterSchedules(data, activeTab); // 필터링된 일정 업데이트
        })
        .catch(error => {
            console.error('일정 생성 중 오류 발생:', error);
            alert('오류가 발생했습니다. 다시 시도해 주세요.');
        });
    };
    
    return (
        <div className='MyTripContainer'>
            <Header />
            <div className='MyTripContent'>
                <div className='TripTabContent'>
                    <MyTripTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div className='TripCreateBtnContent'>
                        <button className="TripCreateBtn" onClick={handleCreateSchedule}>
                            일정 생성
                        </button>
                    </div>
                </div>

                <div className="MyTripListContainer">
                    {currentSchedules.map((schedule, index) => (
                        <MyTripItem
                            key={index}
                            crewId={schedule.crewId}
                            planName={schedule.crewName}
                            plan_startDate={schedule.planStartDate}
                            plan_endDate={schedule.planEndDate}
                            user={schedule.user}
                            area={schedule.area}
                            image={schedule.image} // 이미지 URL
                        />
                    ))}
                </div>
            </div>
            {filteredSchedules.length > 0 && (
                <div className="pagination">
                    <button onClick={handlePrevPage} disabled={myTripCurrentPage === 1} className="arrow-btn">
                        <FontAwesomeIcon icon={faAnglesLeft} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={i + 1 === myTripCurrentPage ? 'active' : ''}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button onClick={handleNextPage} disabled={myTripCurrentPage === totalPages} className="arrow-btn">
                        <FontAwesomeIcon icon={faAnglesRight} />
                    </button>
                </div>
            )}

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>일정 생성</h2>
                        <form onSubmit={handleCreate}>
                            <div>
                                <label htmlFor="tripName">여행 이름:</label>
                                <input
                                    type="text"
                                    id="tripName"
                                    value={tripName}
                                    onChange={(e) => setTripName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="startDate">시작 날짜:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="endDate">종료 날짜:</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                            <button type="submit">생성</button>
                            <button type="button" onClick={closeModal}>취소</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyTrip;