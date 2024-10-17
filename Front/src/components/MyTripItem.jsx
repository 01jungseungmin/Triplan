import './css/MyTripItem.css';
import { Link } from 'react-router-dom';

function MyTripItem({ crewId, planName, plan_startDate, plan_endDate, user, area, image }) {

    return (
        // Link를 사용하여 crewId를 경로에 포함
        <Link to={`/crew/list/${crewId}`} className="board-item-link">
            <div className="MyTripItemContainer">
                <div className="MyTripItemImage">
                    <img
                        src={image || "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA1MTNfMTAz%2FMDAxNjIwODgyMTQ1NzYx.PFIlobbvbexGiulZmt59rbm5NkH9KcEnZR3A-lGAk2Yg.W9N1TZka_suiFjasFi11tKiumUtlztw5vqn-YLpPEMAg.JPEG.xoxo_0717%2FIMG_3538.JPG&type=a340"}
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
