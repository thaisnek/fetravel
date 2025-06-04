import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar2 from '../components/common/Navbar2';
import Banner from '../components/Booking/Banner';
import BookingForm from '../components/Booking/BookingForm';
import Footer from '../components/common/Footer';
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");
let userId = null;
if (token) {
  try {
    const decoded = jwtDecode(token);
    userId = decoded.userId;
  } catch {
    userId = null;
  }
}


const BookingPage = () => {
  const { tourId } = useParams(); 
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

