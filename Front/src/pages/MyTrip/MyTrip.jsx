import Header from '../../components/Header';
import '../MyTrip/MyTrip.css';
import MyTripTabs from '../../components/MyTripTabs';
import MyTripItem from '../../components/MyTripItem';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAnglesLeft, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function MyTrip() {
    const [activeTab, setActiveTab] = useState('전체'); // 탭 상태 관리
    const [myTripcurrentPage, setMyTripCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal 상태 관리
    const [tripName, setTripName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [schedules, setSchedules] = useState([]); // 서버에서 불러온 일정 데이터 관리
    const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트

    useEffect(() => {
        // 로그인 여부 확인
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            // 로그인이 되어 있으면 사용자 여행 목록을 백엔드에서 가져옴
            fetch('http://localhost:8080/crew/list', { // 경로 수정
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
                setSchedules(data); // 서버에서 받아온 일정 목록을 상태에 저장
            })
            .catch(error => {
                console.error('에러 발생:', error);
                alert('여행 목록을 불러오는 중 오류가 발생했습니다.');
            });
        }
    }, [navigate]);

    // 현재 날짜 구하기
    const currentDate = new Date();

    const sortedSchedules = schedules.sort((a, b) => new Date(b.planStartDate) - new Date(a.planStartDate));

    // 지난 일정 필터링 (endDate가 현재 날짜보다 과거인 경우)
    const pastSchedules = sortedSchedules.filter(schedule => new Date(schedule.planEndDate) < currentDate);

    // 현재 및 미래 일정 필터링
    const allSchedules = sortedSchedules;

    // 현재 선택된 탭에 따라 보여줄 일정을 결정
    const displayedSchedules = activeTab === '전체' ? allSchedules : pastSchedules;

    const placesPerPage = 4; // 한 페이지에 4개의 일정 표시
    const startIndex = (myTripcurrentPage - 1) * placesPerPage;
    const endIndex = startIndex + placesPerPage;

    // 현재 페이지에 맞게 일정 잘라서 표시
    const currentSchedules = displayedSchedules.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setMyTripCurrentPage(pageNumber);
    };

    const handleNextPage = () => {
        if (myTripcurrentPage < Math.ceil(displayedSchedules.length / placesPerPage)) {
            setMyTripCurrentPage(myTripcurrentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (myTripcurrentPage > 1) {
            setMyTripCurrentPage(myTripcurrentPage - 1);
        }
    };

    const handleCreateSchedule = () => {
        setIsModalOpen(true); // 일정 생성 버튼 클릭 시 모달 열기
    };

    const closeModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    const totalPages = Math.ceil(displayedSchedules.length / placesPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // 생성하기 버튼 클릭 핸들러
    const handleCreate = (e) => {
        e.preventDefault();

        // 유효성 검사
        if (!tripName || !startDate || !endDate) {
            alert('모든 필드를 입력해 주세요.');
            return;
        }

        // 입력값이 모두 유효하면 백엔드에 API 요청 보내기
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
            } else {
                alert('일정 생성에 실패했습니다.');
            }
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
                {/* 탭 컴포넌트에 activeTab과 setActiveTab 전달 */}
                <div className='TripTabContent'>
                    <MyTripTabs activeTab={activeTab} setActiveTab={setActiveTab} className='tabs' />
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
                            planName={schedule.crewName}
                            plan_startDate={schedule.planStartDate} // 데이터 필드명에 맞게 수정
                            plan_endDate={schedule.planEndDate}
                            user={schedule.user}
                            area={schedule.area}
                            image={schedule.image} // 이미지 URL
                        />
                    ))}
                </div>
            </div>
            {displayedSchedules.length > 0 && (
                <div className="pagination">
                    <button onClick={handlePrevPage} disabled={myTripcurrentPage === 1} className="arrow-btn">
                        <FontAwesomeIcon icon={faAnglesLeft} />
                    </button>
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            onClick={() => handlePageChange(number)}
                            className={myTripcurrentPage === number ? 'active' : ''}
                        >
                            {number}
                        </button>
                    ))}
                    <button onClick={handleNextPage} disabled={myTripcurrentPage === totalPages} className="arrow-btn">
                        <FontAwesomeIcon icon={faAnglesRight} />
                    </button>
                </div>
            )}

            {isModalOpen && (
                <>
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
                            <div className="form-title">일정 생성</div>
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
                                        className='MytripDateStart'
                                        placeholder='2024-10-10'
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                    <FontAwesomeIcon icon={faMinus} className='minusIcon' />
                                    <input
                                        className='MytripDateEnd'
                                        placeholder='2024-10-12'
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='MytripCreateContent'>
                                <button className='MytripCreateBtn' onClick={handleCreate}>
                                    생성하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            )}
        </div>
    );
}

export default MyTrip;
