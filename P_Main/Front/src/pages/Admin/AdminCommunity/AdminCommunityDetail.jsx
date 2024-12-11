import React, { useState } from "react";
import '../AdminCommunity/AdminCommunityDetail.css';
import Header from '../../../components/Header';

function AdminCommunityDetail() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 모달 열기/닫기
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // 삭제 확인 버튼 클릭 시
    const handleDeleteConfirm = () => {
        // 실제 삭제 로직 추가 (예: 서버 요청)
        alert('게시글이 삭제되었습니다.');
        handleCloseModal(); // 모달 닫기
    };

    return (
        <div>
            <div className="AdminCommunityDetailContainer">
                <Header />
                <div>
                    <div className="travelPostContainer">
                        <div className="travelPostHeader">
                            <div className="postDeleteBtnContainer">
                                <button className="postDeleteBtn" onClick={handleOpenModal}>
                                    삭제하기
                                </button>
                            </div>

                            <div className="travelPostHeaderContent">
                                <div className="travelPostHeaderGroup">
                                    <div className="travelPostTitle">관리자 게시글</div>
                                    <div className="travelPostAuthor">작성자: 김수빈</div>
                                </div>
                                <div className="travelDateGroup">
                                    여행기간 : 2024.12.04 ~ 2024.12.06
                                </div>
                            </div>
                        </div>
                        <div className="travelPostContentGroup">
                            <div className="travelPostContent">어쩌라고</div>
                            <div className="travelPostImage">이미지 들어가는 공간</div>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div>
                    <div className="backdrop" onClick={handleCloseModal}></div>
                    <div className="delete-modal">
                        <div className="delete-modal-content">
                            <p className="deleteModalTitle">정말 삭제하시겠습니까?</p>
                            <div className="modal-button-group">
                                <button className="confirm-delete-button" onClick={handleDeleteConfirm}>
                                    예, 삭제합니다
                                </button>
                                <button className="cancel-delete-button" onClick={handleCloseModal}>
                                    아니요, 취소합니다
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminCommunityDetail;