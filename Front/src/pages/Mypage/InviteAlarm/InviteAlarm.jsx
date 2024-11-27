import React from 'react';
import '../InviteAlarm/InviteAlarm.css';

function InviteAlarm() {
    return (
        <div className='InviteAlarmContainer'>
            <div className='InviteAlarmTitle'>일정 이름</div>
            <div className='InviteAlarmContent'>"초대한 사람"님께서 초대하셨습니다.</div>
            <div className='InviteAlarmFooter'>
                <div className='alarmDate'>24.11.25(월)</div>
                <button className='acceptBtn'>수락</button>
                <button className='refuseBtn'>거절</button>
            </div>
        </div>
    )
}

export default InviteAlarm;