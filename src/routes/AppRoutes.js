import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TourPage from '../pages/TourPage';
import HomePage from '../pages/HomePage';
import TourDetailPage from '../pages/TourDetailPage';
import BookingPage from '../pages/BookingPage';
import SuccessPage from '../pages/SuccessPage';
import CancelPage from '../pages/CancelPage';
import SearchPage from '../pages/SearchPape';
import ContactPage from '../pages/ContactPage';
import AdminTour from '../pages/AdminTour';
import AdminBooking from '../pages/AdminBooking';
import AdminReview from '../pages/AdminReview';
import AdminPromotion from '../pages/AdminPromotion';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<div>404 - Not Found</div>} />
      <Route path="/all-tours" element={<TourPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/tour-details/:tourId" element={<TourDetailPage />} />
      <Route path="/booking/:tourId" element={<BookingPage />} />
      <Route path="/payment/success" element={<SuccessPage />} />
      <Route path="/payment/cancel" element={<CancelPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/admin/tour" element={<AdminTour />} />
      <Route path="/admin/booking" element={<AdminBooking />} />
      <Route path="/admin/review" element={<AdminReview />} />
      <Route path="/admin/promotion" element={<AdminPromotion />} />
    </Routes>
  );
};

export default AppRoutes;