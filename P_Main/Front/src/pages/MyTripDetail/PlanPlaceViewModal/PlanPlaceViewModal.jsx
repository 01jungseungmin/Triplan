import React from 'react';
import '../PlanPlaceViewModal/PlanPlaceViewModal.css';

function PlanPlaceViewModal({onClose, onSave}) {
    return (
        <div className="modalOverlay">
            <div className="planPlaceViewContent">
                <div className="planPlaceViewHeader">
                    <div className='planPlaceViewHeaderTitle'>일정 이름</div>
                    <button className="planPlaceViewCloseBtn" onClick={onClose}>&times;</button>
                </div>
                <div className="planPlaceViewBody">
                    <div className='planPlaceViewPlace'>
                        <div className='addPlaceTitle'>장소</div>
                        <input type='text' placeholder='장소 이름을 입력하세요.' className='addPlaceInput' />
                    </div>
                    <div className='planPlaceViewAddress'>
                        <div className='addAddressTitle'>주소</div>
                        <input type='text' placeholder='주소를 입력하세요.' className='addAddressInput' />
                    </div>
                    <div className='planPlaceViewTime'>
                        <div className='addTimeTitle'>시간</div>
                        <input type='time' className='addTimeInput' />
                    </div>
                    <div className='planPlaceViewText'>
                        <div className='addTextTitle'>메모</div>
                        <textarea type='text' placeholder='100자 이내' className='addTextInput' maxLength='100' />
                    </div>
                </div>
                <div className="planPlaceViewFooter">
                    <div>
                        <button className="planPlaceViewBtn" onClick={onSave}>저장</button>
                    </div>
                    <div>
                        <button className="planPlaceDeleteBtn">삭제하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlanPlaceViewModal;