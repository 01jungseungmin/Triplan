import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../AdminPlaceList/AdminPlaceList.css';
import Header from '../../../components/Header';
import AdminPlaceItem from './AdminPlaceItem';

function AdminPlaceList() {
    const navigate = useNavigate(); // 페이지 전환을 위해 useNavigate 사용

    // 장소 추가 버튼 클릭 핸들러
    const handlePlaceAddClick = () => {
        navigate('/admin/place/add'); // '/admin/place/add' 경로로 이동
    };

    return (
        <div>
            <div className='AdminPlaceListContainer'>
                <Header />
                <div className='adminPlaceAddContainer'>
                    {/* 장소 추가 버튼 클릭 시 AdminPlaceAdd 페이지로 이동 */}
                    <button className='adminPlaceAdd' onClick={handlePlaceAddClick}>
                        장소 추가
                    </button>
                </div>
                <div className='adminPlaceGridContent'>
                    <div className='adminPlaceBoardGrid'>
                        <AdminPlaceItem />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPlaceList;
