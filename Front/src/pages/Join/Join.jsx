import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../Join/Join.css';

function Join() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // 모든 입력 필드가 채워졌는지 확인하는 변수
    const isFormValid = email && name && password && confirmPassword;

    const handlesSubmit = (e) => {
        e.preventDefault();

        if (!isFormValid) {
            alert("모든 정보를 입력해주세요.");
            return;
        } else if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // 유효성 검사를 통과하면 서버로 요청을 보냅니다.
        fetch('http://localhost:8080/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                nickName: name, // 필드 이름 일치시키기
                password: password,
            })
        })
            .then(response => {
                if (!response.ok) {
                    // 서버에서 오류 메시지를 JSON으로 읽어오고, 예외를 던짐
                    return response.json().then((errorData) => {
                        throw new Error(errorData.message); // 서버에서 오는 오류 메시지를 그대로 던짐
                    });
                }
                return response.text(); // 성공 시 응답을 텍스트로 받음
            })
            .then(data => {
                alert(data); // 성공 메시지를 보여줍니다.
                navigate('/'); // 회원가입 완료 후 메인 페이지로 이동
            })
            .catch(error => {
                console.error('Error:', error.message);
                alert(error.message); // 서버에서 받은 오류 메시지를 출력
            });
    };

    const logoOnClick = () => {
        navigate('/');
    };

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
                        {/* 조건부로 버튼 색상과 활성화 여부 결정 */}
                        <button
                            type="submit"
                            className={`joinPage-button ${isFormValid ? 'active' : ''}`}
                            disabled={!isFormValid} // 모든 입력이 없으면 버튼 비활성화
                        >
                            회원가입
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Join;
