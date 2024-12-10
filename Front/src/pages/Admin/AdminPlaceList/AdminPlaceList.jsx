import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../AdminPlaceList/AdminPlaceList.css';
import Header from '../../../components/Header';
import AdminPlaceItem from './AdminPlaceItem'; // Ensure the correct import here
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../../components/Footer';

function AdminPlaceList() {
    const [places, setPlaces] = useState([]);  // 상태에 장소 데이터 저장
    const [loading, setLoading] = useState(true);  // 로딩 상태 관리
    const [error, setError] = useState(null);  // 에러 상태 관리
    const [currentPage, setCurrentPage] = useState(1);
    const placesPerPage = 9;
    const startIndex = (currentPage - 1) * placesPerPage;
    const endIndex = startIndex + placesPerPage;

    const navigate = useNavigate();

    // 페이지 범위 계산
    const getPageRange = () => {
        const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
        const endPage = Math.min(startPage + 9, totalPages);
        return { startPage, endPage };
    };

    // 페이지 버튼 렌더링
    const totalPages = Math.ceil(places.length / placesPerPage);
    const { startPage, endPage } = getPageRange();
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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

    // 실제 데이터 가져오는 함수
    useEffect(() => {
        const token = localStorage.getItem('token');  // 인증 토큰

        fetch('http://13.209.211.218:8080/place/findAll', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`장소 데이터를 불러오지 못했습니다. 상태 코드: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setPlaces(data);  // 받아온 데이터로 상태 업데이트
                setLoading(false);  // 로딩 종료
            })
            .catch(error => {
                console.error('에러 발생:', error);
                setError('장소 데이터를 불러오는 중 오류가 발생했습니다.');
                setLoading(false);  // 로딩 종료
            });
    }, []); // 컴포넌트가 처음 마운트될 때만 실행

    // 현재 페이지에 해당하는 장소만 추출
    const currentPlaces = places.slice(startIndex, endIndex);

    return (
        <div>
            <div className='AdminPlaceListContainer'>
                <Header />
                <div className='adminPlaceAddContainer'>
                    <button className='adminPlaceAdd' onClick={() => navigate('/admin/place/add')}>
                        장소 추가
                    </button>
                </div>
                {loading ? (
                    <div>Loading...</div>  // 로딩 중 표시
                ) : error ? (
                    <div>{error}</div>  // 에러 발생 시 표시
                ) : (
                    <>
                        <div className='adminPlaceGridContent'>
                            <div className="adminPlaceBoardGrid">
                                {currentPlaces.map((place, index) => (
                                    <AdminPlaceItem
                                        key={index}
                                        placeId={place.placeId}
                                        name={place.placeName}
                                        address={place.placeAddress}
                                        phone={place.placeNumber}
                                        distance={place.distance}
                                    />
                                ))}
                            </div>
                        </div>
                        {places.length > 0 && (
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
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default AdminPlaceList;
