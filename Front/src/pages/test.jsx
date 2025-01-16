import React, { useState, useEffect } from 'react';

function TestPage() {
    const [data, setData] = useState("");

    useEffect(() => {
        fetch("http://13.209.211.218:8080/redis/test")
            .then((response) => response.text())
            .then((data) => {
                console.log(data); // 데이터 확인
                setData(data); // 화면에 표시될 상태 업데이트
            })
            .catch((error) => console.error(error));
    }, []);

    return <div>{data}</div>; // 데이터를 화면에 출력
}

export default TestPage;