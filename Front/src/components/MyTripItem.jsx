import './css/MyTripItem.css';
import { Link } from 'react-router-dom';

function MyTripItem({ planName, plan_startDate, plan_endDate, user, area, image }) {
    return (
        <Link to={`/place/${planName}`} className="board-item-link">
            <div className="MyTripItemContainer">
                <div className="MyTripItemImage">
                    {/* 이미지가 있으면 보여주고, 없으면 기본 이미지 */}
                    <img
                        src={image || "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA1MTNfMTAz%2FMDAxNjIwODgyMTQ1NzYx.PFIlobbvbexGiulZmt59rbm5NkH9KcEnZR3A-lGAk2Yg.W9N1TZka_suiFjasFi11tKiumUtlztw5vqn-YLpPEMAg.JPEG.xoxo_0717%2FIMG_3538.JPG&type=a340"} // 기본 이미지 URL
                        alt={`${planName} 이미지`}
                        className="MyTripItemImg"
                    />
                </div>
                <div className="MytripItemInfo">
                    <div className="MytripItemTitle">{planName}</div>
                    <div className="MytripItemDate">{plan_startDate} - {plan_endDate}</div>
                    <div className="MytripItemParticipants">{user}</div>
                    <div className="MytripItemCity">{area}</div>
                </div>
            </div>
        </Link>
    );
}

export default MyTripItem;
