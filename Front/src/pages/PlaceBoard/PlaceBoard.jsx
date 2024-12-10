import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PlaceBoard.css';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import CategoryItem from '../../components/CategoryItem';
import PlaceBoardItem from '../../components/PlaceBoardItem';
import Footer from '../../components/Footer';
import MyPlaceAddModal from '../MyTripDetail/MyPlaceAddModal/MyPlaceAddModal';
import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { jwtDecode } from 'jwt-decode';

function PlaceBoard() {
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [places, setPlaces] = useState([]); // API에서 불러온 장소 리스트
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
    const [isAdmin, setIsAdmin] = useState(false);

    const location = useLocation(); // 전달받은 state 확인
    const navigate = useNavigate();

    const placesPerPage = 9; // 한 페이지에 9개의 장소 표시
    const startIndex = (currentPage - 1) * placesPerPage;
    const endIndex = startIndex + placesPerPage;

    const crewId = location.state?.crewId || null; // crewId가 없으면 null
    const planDate = location.state?.planDate || null; // 기본값: 현재 날짜   

    useEffect(() => {
        console.log('Location state in PlaceBoard:', location.state); // 디버깅용
    }, []);

    // 카테고리 정의
    const categories = [
        { name: '전체', icon: '🌍' },
        { name: '카페', icon: '☕', value: 'CAFE' },
        { name: '레스토랑', icon: '🍽️', value: 'RESTAURANT' },
        { name: '쇼핑', icon: '🛍️', value: 'SHOPPING' },
        { name: '숙소', icon: '🏨', value: 'ACCOMMODATION' },
        { name: '관광지', icon: '🗽', value: 'TOUR' },
        { name: '기타', icon: '🛣️', value: 'ETC' },
    ];

    // 장소 데이터를 API에서 불러오는 useEffect
    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch('http://localhost:8080/place/findAll', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // 인증 토큰 포함
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`장소 데이터를 불러오지 못했습니다. 상태 코드: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('API에서 받아온 데이터:', data);
                setPlaces(data); // 받아온 데이터를 상태에 저장
                setLoading(false); // 로딩 상태 해제
            })
            .catch(error => {
                console.error('에러 발생:', error);
                setError('장소 데이터를 불러오는 중 오류가 발생했습니다.');
                setLoading(false); // 로딩 상태 해제
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const userAuth = decodedToken.auth; // JWT의 'auth' 필드를 통해 권한 확인
                if (userAuth === 'ADMIN') {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error('JWT 디코딩 중 오류 발생:', error);
            }
        }
    }, []);

    const filteredPlaces = places.filter(place => {
        const matchesCategory = selectedCategory === '전체' || place.placeCategory === categories.find(cat => cat.name === selectedCategory)?.value;
        const matchesSearch = place.placeName.includes(searchKeyword);
        return matchesCategory && matchesSearch;
    });

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 페이지 범위 계산
    const getPageRange = () => {
        const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
        const endPage = Math.min(startPage + 9, totalPages);
        return { startPage, endPage };
    };

    // 다음 페이지
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // 이전 페이지
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    // 나만의 장소 추가 버튼 클릭 핸들러
    const handleAddMyPlace = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('로그인 후 이용해주세요.');
        } else if (planDate == null) {
            alert('내 여행 일정에서 나만의 장소를 추가해보세요.');
        }
        else {
            setIsModalOpen(true); // 모달창 열기
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // 페이지 버튼 렌더링
    const totalPages = Math.ceil(filteredPlaces.length / placesPerPage);
    const { startPage, endPage } = getPageRange();
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    if (loading) {
        return <div>로딩 중...</div>; // 로딩 중 상태
    }

    if (error) {
        return <div>{error}</div>; // 에러 상태
    }

    return (
        <div>
            <div className='placeBoardContainer'>
                <Header />
                <SearchBar searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />
                <div className="categoryContainer">
                    {categories.map((category) => (
                        <CategoryItem
                            key={category.name}
                            icon={category.icon}
                            name={category.name}
                            isSelected={selectedCategory === category.name}
                            onClick={() => {
                                console.log(`선택된 카테고리: ${category.name}`); // 선택된 카테고리 출력
                                setSelectedCategory(category.name);
                                setCurrentPage(1); // 카테고리 변경 시 페이지를 1로 초기화
                            }}
                        />
                    ))}
                    <div class="category-item ">                    {isAdmin && (
                        <button className='adminPlaceAdd' onClick={() => navigate('/admin/place/add')}>
                            장소 추가</button>
                    )}</div>
                </div>
                {filteredPlaces.length > 0 ? (
                    <div className='placeBoardGridContent'>
                        <div className="placeBoardGrid">
                            {filteredPlaces.slice(startIndex, endIndex).map((place, index) => (
                                <PlaceBoardItem
                                    key={index}
                                    imgUrl={place.imgUrl}
                                    placeId={place.placeId}
                                    name={place.placeName} // API 데이터에 맞게 수정
                                    address={place.placeAddress} // API 데이터에 맞게 수정
                                    phone={place.placeNumber} // API 데이터에 맞게 수정
                                    distance={place.distance} // 필요한 경우 API 데이터에 맞게 수정
                                    crewId={crewId} // crewId 전달
                                    planDate={planDate}
                                    state={location.state?.from}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    // 장소가 없을 경우 표시
                    <div className="noPlaceFound">
                        <div className="noPlaceMessage">검색된 장소가 없다면?</div>
                        <div className='noPlaceContent'>나만의 장소를 추가해보세요!</div>
                        <button className="addMyPlaceButton" onClick={handleAddMyPlace}>
                            나만의 장소 추가하기
                        </button>
                        {isModalOpen && (
                            <MyPlaceAddModal
                                isOpen={isModalOpen}
                                onClose={closeModal}
                                crewId={crewId} // crewId 전달
                                planDate={planDate}
                            />
                        )}
                    </div>
                )}
                {filteredPlaces.length > 0 && (
                    <div className="pagination">
                        <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="arrow-btn">
                            첫 페이지
                        </button>
                        <button onClick={handlePrevPage} disabled={currentPage === 1} className="arrow-btn">
                            <FontAwesomeIcon icon={faAnglesLeft} />
                        </button>
                        {pageNumbers.map(number => (
                            <button
                                key={number}
                                onClick={() => handlePageChange(number)}
                                className={currentPage === number ? 'active' : ''}
                            >
                                {number}
                            </button>
                        ))}
                        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="arrow-btn">
                            <FontAwesomeIcon icon={faAnglesRight} />
                        </button>
                        <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} className="arrow-btn">
                            마지막 페이지
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default PlaceBoard;
