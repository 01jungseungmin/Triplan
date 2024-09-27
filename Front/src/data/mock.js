// mockData.js

//장소 Data
export const places = [
    { name: '맛있는 식당', category: '식당', address: '경기도 부천시 원미구 신흥로56번길 25', phone: '02-1234-5678', heart: 1234, homepage: 'https://www.naver.com/', latitude: 37.489954937846115, longitude: 126.77873035606213  },
    { name: '근처 카페', category: '카페', address: '경기도 부천시 원미구 신흥로56번길 25', phone: '02-8765-4321', heart: 5124, homepage: 'https://comsoft.tistory.com/' },
    { name: '좋은 호텔', category: '숙소', address: '경기도 부천시 원미구 신흥로56번길 25', phone: '02-9876-5432', heart: 203, homepage: 'https://comsoft.tistory.com/27' },
    { name: '아름다운 공원', category: '관광지', address: '경기도 부천시 원미구 신흥로56번길 25', phone: '02-5678-1234', heart: 2134, homepage: 'https://www.naver.com/' },
    { name: '또 다른 식당', category: '식당', address: '경기도 부천시 원미구 신흥로56번길 25', phone: '02-6789-1234', heart: 1232, homepage: 'https://www.naver.com/' },
    { name: '서울 병원', category: '기타', address: '인천광역시 남동대로 935', phone: '02-8765-5678', heart: 100, homepage: 'https://www.naver.com/' },
    { name: '인천 병원', category: '기타', address: '인천광역시 남동대로 935', phone: '02-8765-5678', heart: 1579, homepage: 'https://www.naver.com/' },
    { name: '부산 병원', category: '기타', address: '인천광역시 남동대로 935', phone: '02-8765-5678', heart: 145, homepage: 'https://www.naver.com/' },
    { name: '대전 병원', category: '기타', address: '인천광역시 남동대로 935', phone: '02-8765-5678', heart: 1658, homepage: 'https://www.naver.com/' },
    { name: '청라 병원', category: '기타', address: '인천광역시 남동대로 935', phone: '02-8765-5678', heart: 1300, homepage: 'https://www.naver.com/' },
];

//장소 카테고리 Data
export const categories = [
    { name: '전체', icon: '🏠' },
    { name: '식당', icon: '🍽️' },
    { name: '카페', icon: '☕' },
    { name: '쇼핑', icon: '🛒' },
    { name: '숙소', icon: '🏨' },
    { name: '관광지', icon: '🗽' },
    { name: '기타', icon: '🛣️' },
    { name: '지역별', icon: '🌏' }
];

export const schedules = [
    { planName: '우당탕탕 서울', plan_startDate: '2024.09.01', plan_endDate: '2024.09.02', user: '김수빈, 김민지', area: '인천광역시' },
    { planName: '어쩌라고', plan_startDate: '2025.01.01', plan_endDate: '2025.01.10', user: '' },
    { planName: '괌', plan_startDate: '2024.09.01', plan_endDate: '2024.09.02', user: '정승민' },
    { planName: '도쿄', plan_startDate: '2024.09.01', plan_endDate: '2024.09.29', user: '김수빈, 김민지, 정승민', area: '오사카' },
    { planName: '도쿄', plan_startDate: '2024.08.01', plan_endDate: '2024.09.09', user: '김민지' },
]

export const tripData = [
    {
        day: 1,
        date: '09.13 금',
        places: [
            {
                time: '11:30',
                title: '부천대학교',
                address: '경기도 부천시 원미구 신흥로56번길 25',
                note: '학교 정문 앞으로 모이기',
            },
            {
                time: '13:50',
                title: '롯데월드',
                address: '서울특별시 송파구 올림픽로 240',
                note: '자유시간 후 19시까지 바이킹 앞으로 모이기',
            },
        ],
    },
    {
        day: 2,
        date: '09.14 토',
        places: [
            {
                time: '10:00',
                title: '에버랜드',
                address: '경기도 용인시 처인구 포곡읍 에버랜드로 199',
                note: '입구에서 모이기',
            },
        ],
    },
];