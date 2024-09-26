import React, { useState } from 'react';
import './PlaceBoard.css';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import CategoryItem from '../../components/CategoryItem';
import PlaceBoardItem from '../../components/PlaceBoardItem';
import Footer from '../../components/Footer';
import { places, categories } from '../../data/mock.js';
import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function PlaceBoard() {
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const placesPerPage = 9; // 한 페이지에 9개의 장소 표시
    const startIndex = (currentPage - 1) * placesPerPage;
    const endIndex = startIndex + placesPerPage;

    // 카테고리 및 검색어에 따른 필터링
    const filteredPlaces = places.filter(place => {
        const matchesCategory = selectedCategory === '전체' || place.category === selectedCategory;
        const matchesSearch = place.name.includes(searchKeyword);
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
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // 선택된 카테고리와 일치하는 데이터 필터링
    // const filteredPlaces = selectedCategory === '전체'
    //     ? places
    //     : places.filter(place => place.category === selectedCategory);

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
                                setSelectedCategory(category.name);
                                setCurrentPage(1); // 카테고리 변경 시 페이지를 1로 초기화
                            }}
                        />
                    ))}
                </div>
                <div className='placeBoardGridContent'>
                    <div className="placeBoardGrid">
                        {filteredPlaces.slice(startIndex, endIndex).map((place, index) => (
                            <PlaceBoardItem
                                key={index}
                                name={place.name}
                                address={place.address}
                                phone={place.phone}
                                distance={place.distance}
                            />
                        ))}
                    </div>
                </div>
                {filteredPlaces.length > 0 && (
                    <div className="pagination">
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
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default PlaceBoard;