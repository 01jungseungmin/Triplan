import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PlaceBoard.css';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import CategoryItem from '../../components/CategoryItem';
import PlaceBoardItem from '../../components/PlaceBoardItem';
import Footer from '../../components/Footer';
import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PlaceBoard() {
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [places, setPlaces] = useState([]); // API에서 불러온 장소 리스트
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [currentPage, setCurrentPage] = useState(1);

    const location = useLocation(); // 전달받은 state 확인
    const navigate = useNavigate();

    const placesPerPage = 9; // 한 페이지에 9개의 장소 표시
    const startIndex = (currentPage - 1) * placesPerPage;
    const endIndex = startIndex + placesPerPage;

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
        { name: '관광지', icon: '🗽', value: 'TOUR'},
        { name: '기타', icon: '🛣️', value: 'ETC' },
        { name: '지역별', icon: '🌏' ,value: 'REGION' }
    ];

    // 장소 데이터를 API에서 불러오는 useEffect
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('로그인이 필요합니다.');
            return;
        }

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

    const filteredPlaces = places.filter(place => {
        const matchesCategory = selectedCategory === '전체' || place.placeCategory === categories.find(cat => cat.name === selectedCategory)?.value;
        const matchesSearch = place.placeName.includes(searchKeyword);
        return matchesCategory && matchesSearch;
    });

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredPlaces.length / placesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // 페이지 버튼 렌더링
    const totalPages = Math.ceil(filteredPlaces.length / placesPerPage);
    const pageNumbers = Array.from({ length: Math.min(totalPages, 9) }, (_, i) => i + 1);

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
                </div>
                <div className='placeBoardGridContent'>
                    <div className="placeBoardGrid">
                        {filteredPlaces.map((place, index) => (
                            <PlaceBoardItem
                                key={index}
                                placeId={place.placeId}
                                name={place.placeName} // API 데이터에 맞게 수정
                                address={place.placeAddress} // API 데이터에 맞게 수정
                                phone={place.placeNumber} // API 데이터에 맞게 수정
                                distance={place.distance} // 필요한 경우 API 데이터에 맞게 수정
                                state={location.state?.from}
                            />
                        ))}
                    </div>
                </div>
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