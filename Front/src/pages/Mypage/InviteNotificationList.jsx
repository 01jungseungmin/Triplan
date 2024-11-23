import React, { useState } from 'react';
import InviteNotificationItem from './InviteNotificationItem';
import '../Mypage/InviteNotificationList.css';

function InviteNotificationList () {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            scheduleName: '일정이름',
            inviterName: '초대한사람',
            date: '24.9.25(수)',
            status: 'pending', // 상태: 'pending', 'accepted', 'declined'
        },
        {
            id: 2,
            scheduleName: '일정이름',
            inviterName: '초대한사람',
            date: '24.8.16(수)',
            status: 'pending',
        },
        {
            id: 3,
            scheduleName: '일정이름',
            inviterName: '초대한사람',
            date: '24.8.16(수)',
            status: 'accepted',
        },
    ]);

    const handleAccept = (id) => {
        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) =>
                notification.id === id
                    ? { ...notification, status: 'accepted' }
                    : notification
            )
        );
    };

    const handleDecline = (id) => {
        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) =>
                notification.id === id
                    ? { ...notification, status: 'declined' }
                    : notification
            )
        );
    };

    return (
        <div className="inviteNotificationList">
            {notifications.map((notification) => (
                <InviteNotificationItem
                    key={notification.id}
                    scheduleName={notification.scheduleName}
                    inviterName={notification.inviterName}
                    date={notification.date}
                    status={notification.status}
                    onAccept={() => handleAccept(notification.id)}
                    onDecline={() => handleDecline(notification.id)}
                />
            ))}
        </div>
    );
};

export default InviteNotificationList;
