import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../CommunityWrite/CommunityWrite.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import MyTripPlanPlaceItem from "../../MyTripDetail/MyTripPlanPlaceItem/MyTripPlanPlaceItem";


function CommunityWrite() {
    const { crewId } = useParams(); // URL에서 crewId 가져오기
    const navigate = useNavigate(); // navigate 사용
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [thumbnail, setThumbnail] = useState(null); // 파일 객체 저장
    const [thumbnailPreview, setThumbnailPreview] = useState(null); // 미리보기 URL 저장
    const [plans, setPlans] = useState([]); // 전체 일정 데이터
    const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜
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
        // 여행 기간 및 일정 데이터 가져오기
        const fetchData = async () => {
            try {
                // 여행 기간 가져오기
                const periodResponse = await fetch(`http://13.209.211.218:8080/crew/list/${crewId}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!periodResponse.ok) throw new Error("여행 기간 데이터를 가져오지 못했습니다.");
                const periodData = await periodResponse.json();
                setStartDate(periodData.planStartDate);
                setEndDate(periodData.planEndDate);

                // 일정 데이터 가져오기
                const planResponse = await fetch(`http://13.209.211.218:8080/plan/${crewId}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!planResponse.ok) throw new Error("일정 데이터를 가져오지 못했습니다.");
                const planData = await planResponse.json();
                setPlans(planData);

                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
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

    const handlePlanSelect = (planDate) => {
        // "전체" 클릭 시 전체 일정을 선택
        if (planDate === "ALL") {
            setSelectedDate(selectedDate === "ALL" ? null : "ALL");
        } else {
            // 개별 날짜 선택 또는 해제
            setSelectedDate(selectedDate === planDate ? null : planDate);
        }
    };

    const handleSubmit = async () => {
        if (!title || !content) {
            alert("필수 항목을 입력해주세요.");
            return;
        }
    
        const token = localStorage.getItem("token");
        const formData = new FormData();
    
        // 선택된 일정 ID만 추출
        const selectedPlanIds =
            selectedDate === "ALL"
                ? plans.map((plan) => plan.planId) // "전체" 선택 시 모든 planId
                : plans.filter((plan) => plan.planDate === selectedDate).map((plan) => plan.planId);
    
        console.log("Plans:", plans); // 전체 일정 확인
        console.log("Selected Plan IDs:", selectedPlanIds); // 선택된 ID 확인
    
        // 폼 데이터에 추가
        formData.append(
            "setBoardRequest",
            new Blob(
                [
                    JSON.stringify({
                        title,
                        content,
                        crewId,
                        selectedPlanIds, // 선택된 일정 ID
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
                `http://13.209.211.218:8080/api/boards/write/${crewId}`,
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
                        <div className="tripWritePlanGroup">
                            <div className="planButtonGroup">
                                <button
                                    onClick={() => handlePlanSelect("ALL")}
                                    className={`planButton ${selectedDate === "ALL" ? "active" : ""}`}
                                >
                                    전체
                                </button>
                                {plans.map((plan, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePlanSelect(plan.planDate)}
                                        className={`planButton ${selectedDate === plan.planDate ? "active" : ""}`}
                                    >
                                        {`DAY ${index + 1}`}
                                    </button>
                                ))}
                            </div>
                            <div className="selectedPlans">
                                {selectedDate === "ALL" ? (
                                    (() => {
                                        // 그룹화된 일정 생성
                                        const groupedPlans = plans.reduce((acc, plan) => {
                                            const date = plan.planDate;
                                            if (!acc[date]) {
                                                acc[date] = [];
                                            }
                                            acc[date].push(plan);
                                            return acc;
                                        }, {});

                                        return (
                                            <>
                                                {Object.entries(groupedPlans).map(([date, plansForDate]) => (
                                                    <div key={date} className="dayGroup">
                                                        <h3 className="dayTitle">{`DAY ${Object.keys(groupedPlans).indexOf(date) + 1} (${date})`}</h3>
                                                        {plansForDate.map((plan, index) => (
                                                            <MyTripPlanPlaceItem
                                                                key={index}
                                                                crewId={crewId}
                                                                date={plan.planDate}
                                                            />
                                                        ))}
                                                    </div>
                                                ))}
                                            </>
                                        );
                                    })()
                                ) : (
                                    // 특정 날짜를 선택한 경우
                                    plans
                                        .filter((plan) => plan.planDate === selectedDate)
                                        .map((plan, index) => (
                                            <MyTripPlanPlaceItem key={index} crewId={crewId} date={plan.planDate} />
                                        ))
                                )}
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
