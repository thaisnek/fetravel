import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaYoutube, FaPinterest, FaTwitter, FaMapMarkedAlt, FaEnvelope, FaClock, FaPhoneVolume, FaArrowRight } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer
      className="main-footer bgs-cover overlay rel z-1 pb-25"
      style={{ backgroundImage: 'url(/assets/images/backgrounds/footer.jpg)' }}
    >
      <div className="container">
        <div className="footer-top pt-100 pb-30">
          <div className="row justify-content-between">
            <div className="col-xl-5 col-lg-6">
              <div className="footer-widget footer-text">
                <div className="footer-logo mb-25">
                  <Link to="/">
                    <img src="/assets/images/logos/logo.png" alt="Logo" />
                  </Link>
                </div>
                <p>
                  Chúng tôi biên soạn các hành trình riêng biệt phù hợp với sở thích của bạn, đảm bảo mọi chuyến đi đều liền mạch và làm phong phú thêm những viên ngọc ẩn giấu
                </p>
                <div className="social-style-one mt-15">
                  <a href="https://www.facebook.com/dienne.dev">
                    <FaFacebookF />
                  </a>
                  <a href="/contact">
                    <FaYoutube />
                  </a>
                  <a href="/contact">
                    <FaPinterest />
                  </a>
                  <a href="/contact">
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-6">
              <div className="section-title counter-text-wrap mb-35">
                <h2>Đăng ký nhận bản tin</h2>
                <p>
                  Website <span className="count-text plus">34500</span> trải nghiệm phổ biến nhất mà bạn sẽ nhớ
                </p>
              </div>
              <form className="newsletter-form mb-50" onSubmit={(e) => e.preventDefault()}>
                <input
                  id="news-email"
                  type="email"
                  placeholder="Email Address"
                  required
                />
                <button type="submit" className="theme-btn bgc-secondary style-two">
                  <span>Đăng ký</span>
                  <FaArrowRight />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="widget-area pt-95 pb-45">
        <div className="container">
          <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2">
            <div className="col col-small">
              <div className="footer-widget footer-links">
                <div className="footer-title">
                  <h5>Dịch vụ</h5>
                </div>
                <ul className="list-style-three">
                  <li>
                    <Link to="/travel-guides">Hướng dẫn viên du lịch tốt nhất</Link>
                  </li>
                  <li>
                    <Link to="/tours">Đặt tour</Link>
                  </li>
                  <li>
                    <Link to="/tours">Đặt vé</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col col-small">
              <div className="footer-widget footer-links">
                <div className="footer-title">
                  <h5>Công ty</h5>
                </div>
                <ul className="list-style-three">
                  <li>
                    <Link to="/about">Giới thiệu về công ty</Link>
                  </li>
                  <li>
                    <Link to="/contact">Việc làm và nghề nghiệp</Link>
                  </li>
                  <li>
                    <Link to="/contact">Liên hệ với chúng tôi</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col col-small">
              <div className="footer-widget footer-links">
                <div className="footer-title">
                  <h5>Điểm đến</h5>
                </div>
                <ul className="list-style-three">
                  <li>
                    <Link to="#">Miền Bắc</Link>
                  </li>
                  <li>
                    <Link to="#">Miền Trung</Link>
                  </li>
                  <li>
                    <Link to="#">Miền Nam</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col col-small">
              <div className="footer-widget footer-links">
                <div className="footer-title">
                  <h5>Thể loại</h5>
                </div>
                <ul className="list-style-three">
                  <li>
                    <Link to="/contact">Phiêu lưu</Link>
                  </li>
                  <li>
                    <Link to="/contact">Tour gia đình</Link>
                  </li>
                  <li>
                    <Link to="/contact">Tour động vật hoang dã</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col col-md-6 col-10 col-small">
              <div className="footer-widget footer-contact">
                <div className="footer-title">
                  <h5>Liên hệ</h5>
                </div>
                <ul className="list-style-one">
                  <li>
                    <FaMapMarkedAlt /> Ha Noi
                  </li>
                  <li>
                    <FaEnvelope />{' '}
                    <a href="mailto:minhdien.dev@gmail.com">t@gmail.com</a>
                  </li>
                  <li>
                    <FaClock /> Thứ 2 - Thứ 6, 08am - 05pm
                  </li>
                  <li>
                    <FaPhoneVolume />{' '}
                    <a href="tel:+88012334588">+880 (123) 345 88</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom pt-20 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="copyright-text text-center text-lg-start">
                <p>
                  @Copy 2024 <Link to="/">Travela</Link>, All rights reserved
                </p>
              </div>
            </div>
            <div className="col-lg-7 text-center text-lg-end">
              <ul className="footer-bottom-nav">
                <li>
                  <Link to="/about">Điều khoản</Link>
                </li>
                <li>
                  <Link to="/about">Chính sách bảo mật</Link>
                </li>
                <li>
                  <Link to="/about">Thông báo pháp lý</Link>
                </li>
                <li>
                  <Link to="/about">Khả năng truy cập</Link>
                </li>
              </ul>
            </div>
          </div>
          <button className="scroll-top scroll-to-target" onClick={() => window.scrollTo(0, 0)}>
            <img src="/assets/images/icons/scroll-up.png" alt="Scroll Up" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;