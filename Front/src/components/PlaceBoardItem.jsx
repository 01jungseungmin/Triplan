import './css/PlaceBoardItem.css';

function PlaceBoardItem({ name, address, phone, distance, rating, reviews }) {
    return(
    <div className="board-item">
      <div className="board-item-image" />
      <div className="board-item-info">
        <div className="board-item-title">{name}</div>
        <div className='board-item-address'>{address}</div>
        <div className='board-item-phone'>{phone}</div>
      </div>
    </div>
    );
}

export default PlaceBoardItem;