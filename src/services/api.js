// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/ltweb/api'; // Thêm context path /ltweb

export const getTours = async () => {
  try {
    const response = await axios.get(`${API_URL}/tours`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tours:', error);
    throw error;
  }
};

export const getAvailableTours = async () => {
  try {
    const response = await axios.get(`${API_URL}/all-tours`, {
      params: { availability: true } // Chỉ lấy tour có availability = true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching available tours:', error);
    throw error;
  }
};

// Gọi API lọc tour
export const filterTours = async (filters) => {
  const response = await axios.get(`${API_URL}/filter`, {
    params: filters,
  });
  return response.data;
};

export const getTourDetail = async (tourID) => {
  try {
    const response = await axios.get(`${API_URL}/tour-details/${tourID}`);
    console.log("API Response:", response.data); // Debug dữ liệu từ BE
    return response.data;
  } catch (error) {
    console.error("Error fetching tour detail:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_URL}/bookings/create`, bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: `${API_URL}/bookings/create`,
    });
    throw error;
  }
};

export const initiatePayment = async (bookingId) => {
  try {
    const response = await axios.post(`${API_URL}/payment/create?bookingId=${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('Error initiating payment:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: `${API_URL}/payment/create?bookingId=${bookingId}`,
    });
    throw error;
  }
};

export const completePayment = async (paymentId, payerId, bookingId) => {
  try {
    const response = await axios.get(
      `${API_URL}/payment/success?paymentId=${paymentId}&PayerID=${payerId}&bookingId=${bookingId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error completing payment:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: `${API_URL}/payment/success`,
    });
    throw error;
  }
};

export const cancelPayment = async (bookingId) => {
  try {
    const response = await axios.get(`${API_URL}/payment/cancel?bookingId=${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('Error canceling payment:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: `${API_URL}/payment/cancel?bookingId=${bookingId}`,
    });
    throw error;
  }
};

// Kiểm tra xem người dùng có thể đánh giá không
export const canReview = async (userId, tourId) => {
  try {
    const response = await axios.get(`${API_URL}/reviews/can-review`, {
      params: { userId, tourId }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Lỗi khi kiểm tra quyền đánh giá');
  }
};

// Tạo đánh giá mới
export const createReview = async (reviewData) => {
  try {
    const response = await axios.post(`${API_URL}/reviews`, reviewData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Lỗi khi gửi đánh giá');
  }
};

// Lấy danh sách đánh giá của tour
export const getReviewsByTourId = async (tourId) => {
  try {
    const response = await axios.get(`${API_URL}/reviews/tour/${tourId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Lỗi khi lấy danh sách đánh giá');
  }
};

export const getAllTours = async (page = 0, size = 9) => {
  const res = await axios.get(`${API_URL}/admin/tours`, { params: { page, size } });
  return res.data;
};

export const createTour = async (tourData) => {
  const res = await axios.post(`${API_URL}/admin/tours/create`, tourData);
  return res.data;
};

export const updateTour = async (id, tourData) => {
  const res = await axios.put(`${API_URL}/admin/tours/update/${id}`, tourData);
  return res.data;
};

export const deleteTour = async (id) => {
  await axios.delete(`${API_URL}/admin/tours/${id}`);
};

export const getAllBookings = async (page = 0, size = 9) => {
  const res = await axios.get(`${API_URL}/admin/bookings`, { params: { page, size } });
  return res.data;
};

export const deleteBooking = async (id) => {
  await axios.delete(`${API_URL}/admin/bookings/${id}`);
};

export const updateBookingStatus = async (id, status) => {
  const res = await axios.put(`${API_URL}/admin/bookings/${id}/status`, null, {
    params: { status }
  });
  return res.data;
};

export const getAllReviews = async (page = 0, size = 10) => {
  const res = await axios.get(`${API_URL}/admin/reviews`, { params: { page, size } });
  return res.data;
};

export const deleteReview = async (id) => {
  await axios.delete(`${API_URL}/admin/reviews/${id}`);
};


export const getAllPromotions = async (page = 0, size = 9) => {
  const res = await axios.get(`${API_URL}/admin/promotions`, { params: { page, size } });
  return res.data;
};

export const createPromotion = async (promotion) => {
  const res = await axios.post(`${API_URL}/admin/promotions/create`, promotion);
  return res.data;
};

export const updatePromotion = async (id, promotion) => {
  const res = await axios.put(`${API_URL}/admin/promotions/update/${id}`, promotion);
  return res.data;
};

export const deletePromotion = async (id) => {
  await axios.delete(`${API_URL}/admin/promotions/${id}`);
};