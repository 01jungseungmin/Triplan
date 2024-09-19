import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../Join/Join.css';

function Join() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlesSubmit = (e) => {
        e.preventDefault();
    
        if (!email || !name || !password || !confirmPassword) {
            alert("모든 정보를 입력해주세요.");
            return;
        } else if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
    
        // 유효성 검사를 통과하면 여기서 서버로 요청을 보냅니다.
        fetch('http://localhost:8080/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                name: name,
                password: password,
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // JSON 응답으로 변환
            })
            .then(data => {
                if (data.success) { // 백엔드의 success 값 확인
                    alert('회원가입 성공!');
                    navigate('/');
                } else {
                    alert('회원가입 실패: ' + data.message); // 오류 메시지 출력
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('서버 오류가 발생했습니다.');
            });
    };    

    const logoOnClick = () => {
        navigate('/');
    }

    return (
        <div className='Join'>
            <div className='Join-container'>
                <div className='Join-box'>
                    <div className="JoinPage_logo" onClick={logoOnClick} style={{ cursor: 'pointer' }}>
                        <span className="JoinPage-maintitle">TRIPLAN</span>
                        <span className="JoinPage-subtitle">TRIPLAN</span>
                    </div>
                    <div className='joinPage-logoTxt'>새로운 여행을 시작하세요</div>
                    <form onSubmit={handlesSubmit}>
                        <div className='joinPage-email'>
                            <div className='joinPage-email-title'>이메일</div>
                            <input type="email" className='joinPage-email-input' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='joinPage-pass'>
                            <div className='joinPage-pass-title'>비밀번호</div>
                            <input type="password" className='joinPage-pass-input' placeholder="PassWord" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='joinPage-ck'>
                            <div className='joinPage-ck-title'>비밀번호 확인</div>
                            <input type="password" className='joinPage-ck-input' placeholder="PassWord" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <div className='joinPage-name'>
                            <div className='joinPage-name-title'>닉네임</div>
                            <input type="text" className='joinPage-name-input' placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <button type="submit" className='joinPage-button'>회원가입</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Join;