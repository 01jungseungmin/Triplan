import React, { useEffect, useState } from 'react';
import '../InviteAlarm/InviteAlarm.css';

function InviteAlarm() {
    const [alarms, setAlarms] = useState([]); // 알림 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 오류 상태

    // 알림 데이터 가져오기
    const fetchAlarms = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('로그인이 필요합니다.');
            }

            const response = await fetch('http://13.209.211.218:8080/alarm', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAlarms(data); // 알림 데이터 저장
            } else {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('알림 데이터를 가져오는 중 오류 발생:', error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // 알림 상태 업데이트 (수락/거절)
    const handleUpdateAlarm = async (alarmId, crewId, inviteType) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/alarm`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    alarmId,
                    crewId,
                    inviteType, // ACCEPT or DECLINE
                }),
            });

            if (response.ok) {
                // 상태 업데이트
                setAlarms((prevAlarms) =>
                    prevAlarms.map((alarm) =>
                        alarm.alarmId === alarmId ? { ...alarm, inviteType } : alarm
                    )
                );
            } else {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('알림 상태 업데이트 중 오류 발생:', error.message);
            alert('알림 상태 업데이트에 실패했습니다. 다시 시도해주세요.');
        }
    };

    useEffect(() => {
        fetchAlarms();
    }, []);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>오류 발생: {error}</div>;
    }

    return (
        <div className="InviteAlarmListContainer">
            {alarms.length > 0 ? (
                alarms.map((alarm) => (
                    <div key={alarm.alarmId} className="InviteAlarmContainer">
                        <div className="InviteAlarmTitle">{alarm.crewName}</div>
                        <div className="InviteAlarmContent">
                            "{alarm.invitePerson}"님께서 초대하셨습니다.
                        </div>
                        <div className="InviteAlarmFooter">
                            <div className="alarmDate">
                                {alarm.localDateTime}
                            </div>
                            {alarm.inviteType === 'ACCEPT' ? (
                                <div className="inviteStatus">수락하셨습니다.</div>
                            ) : alarm.inviteType === 'DECLINE' ? (
                                <div className="inviteStatus">거절하셨습니다.</div>
                            ) : (
                                <>
                                    <button
                                        className="acceptBtn"
                                        onClick={() => handleUpdateAlarm(alarm.alarmId, alarm.crewId, 'ACCEPT')}
                                    >
                                        수락
                                    </button>
                                    <button
                                        className="refuseBtn"
                                        onClick={() => handleUpdateAlarm(alarm.alarmId, alarm.crewId, 'DECLINE')}
                                    >
                                        거절
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <div>초대 알림이 없습니다.</div>
            )}
        </div>
    );
}

export default InviteAlarm;
