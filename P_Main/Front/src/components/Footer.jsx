import './css/Footer.css';

function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-top">
                <ul className="footer-menu">
                    <li><a href="#advertising">제휴/광고/부대사업문의</a></li>
                    <li><a href="#terms">이용약관</a></li>
                    <li><a href="#privacy-policy" className="highlight">개인정보처리방침</a></li>
                    <li><a href="#standards">편성기준</a></li>
                    <li><a href="#sitemap">사이트맵</a></li>
                </ul>
            </div>
            <div className="footer-bottom">
                <p>대표이사 정승민  |  사업자등록번호 123-12-12345  |  통신판매업신고번호 2024-부천대학교-24336</p>
                <p>고객센터 1234-1234</p>
            </div>
        </footer>
    );
}

export default Footer;