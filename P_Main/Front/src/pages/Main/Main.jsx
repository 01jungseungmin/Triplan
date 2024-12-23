import { useState, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header';
import BestBoard from "../../components/BestBoard";
import TopButton from "../../components/TopButton";
import Footer from "../../components/Footer";
import './Main.css';

function Main() {

  const bestBoardRef = useRef(null);

  const scrollToBestBoard = () => {
    if (bestBoardRef.current) {
      bestBoardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div>
      <div className="MainContainer">
        <Header />
        <div className='content'>
          <div className='content-title'>
            TRIPLAN
          </div>
          <div className='content-sub-container'>
            <div className='content-sub'>
              <div className='content-sub-text'>여행을 계획하고 공유하는 공간</div>
              <div className='content-sub-title'>TRIPLAN</div>
            </div>
            <ul className='features'>
              <li>
                <span className="icon">📆</span>
                맛집부터 관광 명소까지 모두 모여있어요
              </li>
              <li>
                <span className="icon">💬</span>
                자신의 계획을 다른 사용자들에게 공유해요
              </li>
            </ul>
          </div>
        </div>
        <div className="scroll-indicator">
          <button className="scroll-button" onClick={scrollToBestBoard}>
            <span className="arrow"><FontAwesomeIcon icon={faArrowDown} /></span>
            <span className="text">Scroll down</span>
          </button>
        </div>
        <div ref={bestBoardRef}>
          <BestBoard />
        </div>
        <TopButton />
      </div>
      <Footer />
    </div>
  );
}

export default Main;
