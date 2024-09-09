import React, {useState, useEffect} from 'react';
import './css/TopButton.css';
import { faL } from '@fortawesome/free-solid-svg-icons';

function TopButton() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if(window.pageYOffset > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return() => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
          {showButton && (
            <button className="top-button" onClick={scrollToTop}>
              Top
            </button>
          )}
        </>
    );
}

export default TopButton;