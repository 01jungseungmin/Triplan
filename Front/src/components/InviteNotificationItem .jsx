import React from 'react';
import '../components/css/InviteNotificationItem.css';

function InviteNotificationItem({ scheduleName, inviterName, date, status, onAccept, onDecline }) {
    return (
        <div className="inviteNotificationItem">
            <div className="inviteDetails">
                <div className="scheduleName">{scheduleName}</div>
                <div className="inviterName">
                    “{inviterName}”님께서 초대하셨습니다.
                </div>
                <div className="inviteDate">{date}</div>
            </div>
            <div className="inviteActions">
                {status === 'pending' ? (
                    <>
                        <button className="acceptButton" onClick={onAccept}>수락</button>
                        <button className="declineButton" onClick={onDecline}>거절</button>
                    </>
                ) : (
                    <div className="inviteStatus">{status === 'accepted' ? '초대를 수락하셨습니다.' : '초대를 거절하셨습니다.'}</div>
                )}
            </div>
        </div>
    );
};

export default InviteNotificationItem;
