import '../CommunityWrite/CommunityWrite.css';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

function CommunityWrite() {
    return (
        <div>
            <div className='CommunityWriteContainer'>
                <Header />
                <div className='CoummunityWriteBox'>
                    <div className='CoummunityWriteContent'>
                        <div className='CommunityWriteHeader'>
                            <p>
                                이번 여행은 어떤 여행이었나요?<br />
                                자신의 여행을 공유해보세요
                            </p>
                        </div>
                        <div className='tripWriteTitleGroup'>
                            <div className='tripWriteTitleContent'>
                                <div className='tripWriteTitle'>여행기 제목(필수)</div>
                                <input placeholder='20자 이내' className='tripWriteTitleInput' />
                            </div>
                        </div>
                        <div className='tripWriteContentGroup'>
                            <div className='tripWriteContent'>
                                <div className='tripWriteContentTitle'>여행기 내용</div>
                                <textarea placeholder='여행에 대한 한 줄 요약 또는 여행 꿀팁을 남겨보세요. 200자 이내' className='tripWriteContentInput' />
                            </div>
                        </div>
                        <div className='tripWriteDateGroup'>
                            <div className='tripWriteDateContent'>
                                <div className='tripWriteDateTitle'>여행 기간</div>
                                <div className='tripWriteDateInputGroup'>
                                    <input className='tripWriteDateInputStart' placeholder='가는날' />
                                    <FontAwesomeIcon icon={faMinus} className='icon' />
                                    <input className='tripWriteDateInputEnd' placeholder='오는날' />
                                </div>
                            </div>
                        </div>
                        <div className='thumbnailImageGroup'>
                            <div className='thumbnailImageContent'>
                                <div className='thumbnailImageTitle'>대표 이미지 추가</div>
                                <div className='thumbnailImageBox'>
                                    <div className="imageUploadBox">
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                    <div className='imageBox'></div>
                                </div>
                            </div>
                        </div>
                        <div className="tripWriteUploadImageGroup">
                            <div className="tripWriteUploadImageContent">
                                <div className="tripWriteUploadImageTitle">
                                    이미지 추가 (최대 5장까지)
                                </div>
                                <div className="tripWriteUploadImageBox">
                                    <div className="imageUploadBox">
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                    <div className="imageBox"></div>
                                    <div className="imageBox"></div>
                                    <div className="imageBox"></div>
                                    <div className="imageBox"></div>
                                    <div className="imageBox"></div>
                                </div>
                            </div>
                        </div>
                        <div className='ScheduleSelectionGroup'>
                            <div className='ScheduleSelectionContent'>
                                <div className='ScheduleSelectionTitle'>공유하고 싶은 일정을 선택해주세요</div>
                                <div className="travelDayBtnGroup">
                                    <button className="travelDayBtn">전체</button>
                                </div>
                            </div>
                        </div>
                        <div className='CommunityCreateBtnGroup'>
                            <button className='CommunityCreateBtn'>
                                등록하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CommunityWrite;