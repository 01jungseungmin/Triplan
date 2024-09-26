import Header from '../../components/Header';
import '../MyTrip/MyTrip.css';
import MyTripTabs from '../../components/MyTripTabs';
import MyTripItem from '../../components/MyTripItem';
import { useState } from 'react';
import { schedules } from '../../data/mock';

function MyTrip() {
    const [activeTab, setActiveTab] = useState('전체'); // 탭 상태 관리

    // 현재 날짜 구하기
    const currentDate = new Date();

    const sortedSchedules = schedules.sort((a, b) => new Date(b.plan_startDate) - new Date(a.plan_startDate));

    // 지난 일정 필터링 (endDate가 현재 날짜보다 과거인 경우)
    const pastSchedules = sortedSchedules.filter(schedule => new Date(schedule.plan_endDate) < currentDate);

    // 현재 및 미래 일정 필터링
    const allSchedules = sortedSchedules;

    // 현재 선택된 탭에 따라 보여줄 일정을 결정
    const displayedSchedules = activeTab === '전체' ? allSchedules : pastSchedules;

    return (
        <div className='MyTripContainer'>
            <Header />
            <div className='MyTripContent'>
                {/* 탭 컴포넌트에 activeTab과 setActiveTab 전달 */}
                <MyTripTabs activeTab={activeTab} setActiveTab={setActiveTab} className='tabs'/>
                <div className="MyTripListContainer">
                    {displayedSchedules.map((schedule, index) => (
                        <MyTripItem
                            key={index}
                            planName={schedule.planName}
                            plan_startDate={schedule.plan_startDate}
                            plan_endDate={schedule.plan_endDate}
                            user = {schedule.user}
                            area = {schedule.area}
                            image={schedule.image} // 이미지 URL
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyTrip;
