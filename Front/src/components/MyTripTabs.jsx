import { useState } from 'react';
import './css/MyTripTabs.css';
import { schedules } from '../data/mock';
import MyTripItem from './MyTripItem';

function MyPageTabs({ activeTab, setActiveTab }) {
    return (
        <div className="tabs">
            <button
                className={activeTab === '전체' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('전체')}
            >
                전체
            </button>
            <button
                className={activeTab === '예정 일정' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('예정 일정')}
            >
                예정 일정
            </button>
            <button
                className={activeTab === '지난 일정' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('지난 일정')}
            >
                지난 일정
            </button>
        </div>
    );
}

export default MyPageTabs;