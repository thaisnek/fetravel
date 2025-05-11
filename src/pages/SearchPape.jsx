import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar2 from '../components/common/Navbar2';
import Footer from '../components/common/Footer';
import Banner from '../components/Booking/Banner';
import SearchList from '../components/SearchPage/SearchList';

const SearchPage = () => {
  const location = useLocation();
  const tours = location.state?.tours || [];

  return (
    <div className="page-wrapper">
      <Navbar2 />
      <Banner
        title="Tours"
        backgroundImage="/assets/images/banner/banner.jpg"
      />
      <div className="form-back-drop"></div>
      <SearchList tours={tours} />
      <Footer />
    </div>
  );
};

export default SearchPage;