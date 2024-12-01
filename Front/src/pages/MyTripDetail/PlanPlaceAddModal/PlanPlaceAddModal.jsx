import React from 'react';
import '../PlanPlaceAddModal/PlanPlaceAddModal.css';

function PlanPlaceAddModal({ isOpen, onClose, onSave }) {
    if (!isOpen) return null;

    return (
        <div className="modalOverlay">
            <div className="planPlaceAddContent">
                <div className="planPlaceAddHeader">
                    <div className='planPlaceAddHeaderTitle'>일정 이름</div>
                    <button className="planPlaceAddCloseBtn" onClick={onClose}>&times;</button>
                </div>
                <div className="planPlaceAddBody">
                    <div className='planPlaceAddPlace'>
                        <div className='addPlaceTitle'>장소</div>
                        <input type='text' placeholder='장소 이름을 입력하세요.' className='addPlaceInput' />
                    </div>
                    <div className='planPlaceAddAddress'>
                        <div className='addAddressTitle'>주소</div>
                        <input type='text' placeholder='주소를 입력하세요.' className='addAddressInput' />
                    </div>
                    <div className='planPlaceAddTime'>
                        <div className='addTimeTitle'>시간</div>
                        <input type='time' className='addTimeInput' />
                    </div>
                    <div className='planPlaceAddText'>
                        <div className='addTextTitle'>메모</div>
                        <textarea type='text' placeholder='100자 이내' className='addTextInput'  maxLength='100'/>
                    </div>
                </div>
                <div className="planPlaceAddFooter">
                    <div>
                        <button className="planPlaceAddBtn" onClick={onSave}>저장</button>
                    </div>
                    <div>
                        <button className="planPlaceDeleteBtn">삭제하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlanPlaceAddModal;