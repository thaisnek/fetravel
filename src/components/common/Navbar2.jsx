import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser, FaArrowRight } from 'react-icons/fa';

const Navbar2 = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = e.target.keyword.value;
    navigate(`/search?keyword=${keyword}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) { // Cố định header sau khi cuộn 100px
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); // Dọn dẹp sự kiện
    };
  }, []);

  return (
    <header className={`main-header header-one white-menu ${isFixed ? 'fixed-header' : ''}`}>
      <div className="header-upper py-30 rpy-0" style={{ backgroundColor: '#fff' }}>
        <div className="container-fluid clearfix">
          <div className="header-inner rel d-flex align-items-center">
            <div className="mobile-logo">
              <Link to="/">
                <img src="/assets/images/logos/logo-two.png" alt="Logo" title="Logo" />
              </Link>
            </div>
            <div className="nav-outer mx-lg-auto ps-xxl-5 clearfix">
              <nav className="main-menu navbar-expand-lg">
                <div className="navbar-collapse collapse clearfix">
                  <ul className="navigation clearfix">
                    <li>
                      <Link to="/">Trang chủ</Link>
                    </li>
                    <li>
                      <Link to="/about">Giới thiệu</Link>
                    </li>
                    <li className="active">
                        <Link to="/all-tours">Tours</Link>
                        </li>
                    <li>
                      <Link to="/destinations">Điểm đến</Link>
                    </li>
                    <li>
                      <Link to="/contact">Liên Hệ</Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>

            <div className="nav-search">
              <button onClick={toggleSearch}>
                <FaSearch />
              </button>
              <form
                onSubmit={handleSearch}
                className={isSearchOpen ? '' : 'hide'}
                method="GET"
              >
                <input
                  type="text"
                  name="keyword"
                  placeholder="Search"
                  className="searchbox"
                  required
                />
                <button type="submit" className="searchbutton">
                  <FaSearch />
                </button>
              </form>
            </div>

            <div className="menu-btns py-10">
              <Link to="/tour" className="theme-btn style-two bgc-secondary">
                <span data-hover="Đặt Ngay">Book Now</span>
                <FaArrowRight />
              </Link>
              <div className="menu-sidebar">
                <li className="drop-down">
                  <button
                    className="dropdown-toggle bg-transparent"
                    id="userDropdown"
                    style={{ color: 'black' }}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <FaUser style={{ fontSize: '36px', color: 'black' }} />
                  </button>
                  {isDropdownOpen && (
                    <ul className="dropdown-menu" id="dropdownMenu">
                      <li>
                        <Link to="/user-profile">Thông tin cá nhân</Link>
                      </li>
                      <li>
                        <Link to="/my-tours">Tour đã đặt</Link>
                      </li>
                      <li>
                        <Link to="/login">Đăng nhập</Link>
                      </li>
                      <li>
                        <Link to="/signup">Đăng ký</Link>
                      </li>
                      <li>
                        <Link to="/logout">Đăng xuất</Link>
                      </li>
                    </ul>
                  )}
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar2;