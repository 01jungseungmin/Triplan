import './css/MyTripItem.css';
import { Link } from 'react-router-dom';

function MyTripItem({ crewId, planName, plan_startDate, plan_endDate, user, area, image }) {

    return (
        // Link를 사용하여 crewId를 경로에 포함
        <Link to={`/crew/list/${crewId}`} className="board-item-link">
            <div className="MyTripItemContainer">
                <div className="MyTripItemImage">
                    <img
                        src={image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoQoOS9Fb2tIZQI8knvJbitYcvaXZaKY-3iYpR6GZA9qwic0cS9LfJz4Y&s"}
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
