import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ category }) => {
    return (
        <Link to={category.path} className="category-card animate-float">
            <div className="category-image-container">
                <img src={category.image} alt={category.name} className="category-image" />
            </div>
            <h3 className="category-title">{category.name}</h3>
        </Link>
    );
};

export default CategoryCard;
