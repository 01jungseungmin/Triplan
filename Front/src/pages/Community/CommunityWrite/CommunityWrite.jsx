import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../CommunityWrite/CommunityWrite.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function CommunityWrite() {
    const { crewId } = useParams(); // URL에서 crewId 가져오기
    const navigate = useNavigate(); // navigate 사용
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [thumbnail, setThumbnail] = useState(null); // 파일 객체 저장
    const [thumbnailPreview, setThumbnailPreview] = useState(null); // 미리보기 URL 저장
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        // crewId 기반 여행 기간 데이터 가져오기
        fetch(`http://localhost:8080/crew/list/${crewId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `여행 데이터를 불러오지 못했습니다. 상태 코드: ${response.status}`
                    );
                }
                return response.json();
            })
            .then((data) => {
                setStartDate(data.planStartDate); // 여행 시작일 설정
                setEndDate(data.planEndDate); // 여행 종료일 설정
                setLoading(false);
            })
            .catch((error) => {
                setError(
                    `여행 데이터를 불러오는 중 오류가 발생했습니다: ${error.message}`
                );
                setLoading(false);
            });
    }, [crewId]);

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
    
        const newImages = files.map((file) => ({
            file, // 실제 파일 객체
            preview: URL.createObjectURL(file), // 미리보기 URL
        }));
    
        setImages((prevImages) => [...prevImages, ...newImages].slice(0, 5)); // 최대 5장까지
    };



    const handleThumbnailChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setThumbnail(file); // 파일 객체 저장
            setThumbnailPreview(URL.createObjectURL(file)); // 미리보기 URL 생성
        }
    };

    const handleSubmit = async () => {
        if (!title || !content) {
            alert("필수 항목을 입력해주세요.");
            return;
        }
    
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append(
            "setBoardRequest",
            new Blob(
                [
                    JSON.stringify({
                        title,
                        content,
                        crewId,
                    }),
                ],
                { type: "application/json" }
            )
        );
    
        if (thumbnail) {
            formData.append("images", thumbnail); // 대표 이미지 추가
        }
    
        images.forEach((image) => formData.append("images", image.file)); // 추가 이미지의 파일 객체 추가
    
        try {
            const response = await fetch(
                `http://localhost:8080/api/boards/write/${crewId}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );
    
            if (response.ok) {
                const responseData = await response.json(); // 응답 데이터 파싱
                const boardId = responseData.boardId; // 응답에서 boardId 가져오기
                console.log("응답 데이터:", responseData); // 디버깅용 로그
                alert("게시글이 성공적으로 작성되었습니다!");
                navigate(`/api/boards/${boardId}`); // 작성한 글의 상세 페이지로 리다이렉트
            } else {
                const errorText = await response.text();
                alert(`게시글 작성 실패: ${errorText}`);
            }
        } catch (error) {
            console.error("게시글 작성 중 오류 발생:", error);
            alert("게시글 작성 중 오류가 발생했습니다.");
        }
    };
    

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className="CommunityWriteContainer">
                <Header />
                <div className="CoummunityWriteBox">
                    <div className="CoummunityWriteContent">
                        <div className="CommunityWriteHeader">
                            <p>
                                이번 여행은 어떤 여행이었나요?<br />
                                자신의 여행을 공유해보세요
                            </p>
                        </div>
                        <div className="tripWriteTitleGroup">
                            <div className="tripWriteTitleContent">
                                <div className="tripWriteTitle">여행기 제목(필수)</div>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="20자 이내"
                                    className="tripWriteTitleInput"
                                />
                            </div>
                        </div>
                        <div className="tripWriteContentGroup">
                            <div className="tripWriteContent">
                                <div className="tripWriteContentTitle">여행기 내용</div>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="여행에 대한 한 줄 요약 또는 여행 꿀팁을 남겨보세요. 200자 이내"
                                    className="tripWriteContentInput"
                                />
                            </div>
                        </div>
                        <div className="tripWriteDateGroup">
                            <div className="tripWriteDateContent">
                                <div className="tripWriteDateTitle">여행 기간</div>
                                <div className="tripWriteDateInputGroup">
                                    <input
                                        type="date"
                                        value={startDate}
                                        readOnly
                                        className="tripWriteDateInputStart"
                                    />
                                    <FontAwesomeIcon icon={faMinus} className="icon" />
                                    <input
                                        type="date"
                                        value={endDate}
                                        readOnly
                                        className="tripWriteDateInputEnd"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="thumbnailImageGroup">
                            <div className="thumbnailImageContent">
                                <div className="thumbnailImageTitle">대표 이미지 추가</div>
                                <div className="thumbnailImageBox">
                                    <input
                                        type="file"
                                        onChange={handleThumbnailChange}
                                        style={{ display: "none" }} // input 요소 숨김
                                        id="thumbnailInput"
                                    />
                                    <label htmlFor="thumbnailInput" className="imageUploadBox">
                                        <FontAwesomeIcon icon={faPlus} />
                                    </label>
                                    <div
                                        className="imageBox"
                                        style={{
                                            backgroundImage: thumbnailPreview ? `url(${thumbnailPreview})` : "none",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="tripWriteUploadImageGroup">
                            <div className="tripWriteUploadImageContent">
                                <div className="tripWriteUploadImageTitle">
                                    이미지 추가 (최대 5장까지)
                                </div>
                                <div className="tripWriteUploadImageBox">
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleImageChange}
                                        style={{ display: "none" }} // input 요소 숨김
                                        id="uploadInput"
                                    />
                                    <label htmlFor="uploadInput" className="imageUploadBox">
                                        <FontAwesomeIcon icon={faPlus} />
                                    </label>
                                    {Array(5)
                                        .fill(null)
                                        .map((_, index) => (
                                            <div
                                                key={index}
                                                className="imageBox"
                                                style={{
                                                    backgroundImage:
                                                        images[index]?.preview
                                                            ? `url(${images[index].preview})`
                                                            : "none",
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                }}
                                            ></div>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div className="CommunityCreateBtnGroup">
                            <button className="CommunityCreateBtn" onClick={handleSubmit}>
                                등록하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CommunityWrite;
