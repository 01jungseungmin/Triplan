import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import '../AdminPlaceList/AdminPlaceItem.css';
import React from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 임포트 추가

function AdminPlaceItem({ placeId, name, address, phone, imageUrl }) {
    return (
        <Link to={`/admin/place/details/${placeId}`} className="board-item-link">
            <div className="board-item">
                <div className="board-item-image">
                    {/* 이미지가 있으면 보여주고, 없으면 기본 이미지 */}
                    <img
                        src={imageUrl || "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA1MTNfMTAz%2FMDAxNjIwODgyMTQ1NzYx.PFIlobbvbexGiulZmt59rbm5NkH9KcEnZR3A-lGAk2Yg.W9N1TZka_suiFjasFi11tKiumUtlztw5vqn-YLpPEMAg.JPEG.xoxo_0717%2FIMG_3538.JPG&type=a340"} // 기본 이미지 (또는 실제 데이터에서 받아온 이미지 URL)
                        alt={`${name} 이미지`}
                        className="board-item-img"
                    />
                </div>
                <div className="admin-board-item-info">
                    <div className="admin-board-item-title">{name || "관리자 장소"}</div>
                    <div className="admin-board-item-address">{address || "관리자 주소"}</div>
                    <div className="admin-board-item-phone">{phone || "관리자 전화번호"}</div>
                </div>
                <div className='trashIconBox'>
                    <FontAwesomeIcon icon={faTrash} className='trashIcon'/>
                </div>
            </div>
        </Link>
    )
}

export default AdminPlaceItem;
