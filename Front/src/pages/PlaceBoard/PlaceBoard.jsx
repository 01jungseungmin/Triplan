import React, { useState } from 'react';
import './PlaceBoard.css';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import CategoryItem from '../../components/CategoryItem';
import PlaceBoardItem from '../../components/PlaceBoardItem';
import Footer from '../../components/Footer';

const categories = [
    { name: '전체', icon: '🏠' },
    { name: '식당', icon: '🍽️' },
    { name: '카페', icon: '☕' },
    { name: '쇼핑', icon: '🛒' },
    { name: '숙소', icon: '🏨' },
    { name: '관광지', icon: '🗽' },
    { name: '기타', icon: '🛣️' },
    { name: '지역별', icon: '🌏' }
];

// 장소 데이터
const places = [
    { name: '맛있는 식당', category: '식당', address: '서울시 중구', phone: '02-1234-5678' },
    { name: '근처 카페', category: '카페', address: '서울시 강남구', phone: '02-8765-4321' },
    { name: '좋은 호텔', category: '숙소', address: '서울시 서초구', phone: '02-9876-5432' },
    { name: '아름다운 공원', category: '관광지', address: '서울시 마포구', phone: '02-5678-1234' },
    { name: '또 다른 식당', category: '식당', address: '서울시 종로구', phone: '02-6789-1234' },
    { name: '근처 병원', category: '기타', address: '서울시 영등포구', phone: '02-8765-5678' },
];

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