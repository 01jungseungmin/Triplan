import Header from '../../components/Header';
import '../MyTrip/MyTrip.css';
import MyTripTabs from '../../components/MyTripTabs';
import MyTripItem from '../../components/MyTripItem';
import { useState } from 'react';
import { schedules } from '../../data/mock';
import { faAnglesRight, faAnglesLeft, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function MyTrip() {
    const [activeTab, setActiveTab] = useState('전체'); // 탭 상태 관리
    const [myTripcurrentPage, setMyTripCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false); //modal

    // 현재 날짜 구하기
    const currentDate = new Date();

    const sortedSchedules = schedules.sort((a, b) => new Date(b.plan_startDate) - new Date(a.plan_startDate));

    // 지난 일정 필터링 (endDate가 현재 날짜보다 과거인 경우)
    const pastSchedules = sortedSchedules.filter(schedule => new Date(schedule.plan_endDate) < currentDate);

    // 현재 및 미래 일정 필터링
    const allSchedules = sortedSchedules;

    // 현재 선택된 탭에 따라 보여줄 일정을 결정
    const displayedSchedules = activeTab === '전체' ? allSchedules : pastSchedules;

    const placesPerPage = 4; // 한 페이지에 9개의 일정 표시
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
                            planName={schedule.planName}
                            plan_startDate={schedule.plan_startDate}
                            plan_endDate={schedule.plan_endDate}
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
                                    <input placeholder='일정 이름 작성' className='MytripNameInput' />
                                </div>
                                <div className='MytripDateInputContent'>
                                    <div className='MytripDateInputTitle'>일정 기간</div>
                                    <div className='MytripDateInputBox'>
                                        <input className='MytripDateStart' placeholder='2024-10-10' />
                                        <FontAwesomeIcon icon={faMinus} className='minusIcon' />
                                        <input className='MytripDateEnd' placeholder='2024-10-12' />
                                    </div>
                                </div>
                                <div className='MytripCreateContent'>
                                    <button className='MytripCreateBtn'>
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
