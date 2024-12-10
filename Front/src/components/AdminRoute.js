import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

function AdminRoute({ children }) {
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        const checkAdminRole = () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const userRole = decodedToken.auth; // JWT 토큰에서 권한 정보 확인
                    setIsAdmin(userRole === "ADMIN");
                } catch (error) {
                    console.error("JWT 디코딩 실패:", error);
                    setIsAdmin(false);
                }
            } else {
                setIsAdmin(false); // 토큰이 없는 경우
            }
        };
        checkAdminRole();
    }, []);

    if (isAdmin === null) return <div>로딩 중...</div>; // 로딩 상태
    if (!isAdmin) return <Navigate to="/unauthorized" />; // 권한 없음 시 리다이렉트

    return children; // 권한이 확인되면 자식 컴포넌트를 렌더링
}

export default AdminRoute;
