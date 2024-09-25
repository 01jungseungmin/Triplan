import React, { useState } from 'react';
import './PlaceBoard.css';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import CategoryItem from '../../components/CategoryItem';
import PlaceBoardItem from '../../components/PlaceBoardItem';
import Footer from '../../components/Footer';
import {places, categories} from '../../data/mock.js';

function PlaceBoard() {
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [searchKeyword, setSearchKeyword] = useState('');

    // 카테고리 및 검색어에 따른 필터링
    const filteredPlaces = places.filter(place => {
        const matchesCategory = selectedCategory === '전체' || place.category === selectedCategory;
        const matchesSearch = place.name.includes(searchKeyword);
        return matchesCategory && matchesSearch;
    });

    // 선택된 카테고리와 일치하는 데이터 필터링
    // const filteredPlaces = selectedCategory === '전체'
    //     ? places
    //     : places.filter(place => place.category === selectedCategory);

    return (
        <div>
            <div className='placeBoard-container'>
                <Header />
                <SearchBar searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />
                <div className="category-container">
                    {categories.map((category) => (
                        <CategoryItem
                            key={category.name}
                            icon={category.icon}
                            name={category.name}
                            isSelected={selectedCategory === category.name}
                            onClick={() => setSelectedCategory(category.name)}
                        />
                    ))}
                </div>
                <div className="place-board-grid">
                    {filteredPlaces.map((place, index) => (
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
            <Footer />
        </div>
    );
}

export default PlaceBoard;