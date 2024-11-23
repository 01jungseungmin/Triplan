import './css/PlaceBoardItem.css';
import React from 'react';
import { Link } from 'react-router-dom';

function PlaceBoardItem({ placeId, name, address, phone, distance, rating, reviews }) {
    console.log("받아온 데이터:", { placeId, name, address, phone, distance, rating, reviews });

    return (
        <Link to={`/place/details/${placeId}`} className="board-item-link">
            <div className="board-item">
                <div className="board-item-image">
                    {/* 이미지가 있으면 보여주고, 없으면 기본 이미지 */}
                    <img
                        src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA1MTNfMTAz%2FMDAxNjIwODgyMTQ1NzYx.PFIlobbvbexGiulZmt59rbm5NkH9KcEnZR3A-lGAk2Yg.W9N1TZka_suiFjasFi11tKiumUtlztw5vqn-YLpPEMAg.JPEG.xoxo_0717%2FIMG_3538.JPG&type=a340" // 기본 이미지 (또는 실제 데이터에서 받아온 이미지 URL)
                        alt={`${name} 이미지`}
                        className="board-item-img"
                    />
                </div>
                <div className="board-item-info">
                    <div className="board-item-title">{name}</div>
                    <div className="board-item-address">{address}</div>
                    <div className="board-item-phone">{phone}</div>
                    {distance && <div className="board-item-distance">거리: {distance}</div>}
                    {rating && (
                        <div className="board-item-rating">
                            평점: {rating} ({reviews} 리뷰)
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default PlaceBoardItem;
