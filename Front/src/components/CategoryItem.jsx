import './css/CategoryItem.css';

function CategoryItem({ icon, name, isSelected, onClick}) {
    return(
    <div
      className={`category-item ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <span className="category-icon">{icon}</span>
      <span className="category-name">{name}</span>
      {isSelected && <div className="underline" />}
    </div>
    );
}

export default CategoryItem;