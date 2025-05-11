import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar2 from '../components/common/Navbar2';
import Banner from '../components/Booking/Banner';
import BookingForm from '../components/Booking/BookingForm';
import Footer from '../components/common/Footer';

const BookingPage = () => {
  const { tourId } = useParams(); // Lấy tourId từ URL
  const userId = 1;
  return (
    <div className="page-wrapper">
      <Navbar2 />
      <Banner
        title="Tours"
        backgroundImage="/assets/images/banner/banner.jpg"
      />
      <BookingForm tourId={parseInt(tourId, 10)} userId={userId}/>
      <Footer />
    </div>
  );
};

export default BookingPage;

