
import axios from 'axios';

const API_URL = 'http://localhost:8080/ltweb/api'; 

export const getTours = async () => {
  try {
    const response = await axios.get(`${API_URL}/tours`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tours:', error);
    throw error;
  }
};

export const getAvailableTours = async (params = {}) => {
  try {
    const response = await axios.get(`${API_URL}/tours/all-tours`, { params });
    return response.data; 
  } catch (error) {
    console.error('Error fetching available tours:', error);
    throw error;
  }
};


export const getTourDetail = async (tourID) => {
  try {
    const response = await axios.get(`${API_URL}/tours/tour-details/${tourID}`);
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
  try {
    const res = await axios.post(`${API_URL}/admin/tours/create`, tourData);
    return res.data;
  } catch (error) {
    // Xử lý mọi loại lỗi (mạng, server, validation)
    return {
      code: error.response?.status || 500,
      message: 
        error.response?.data?.message || // Lỗi từ server
        error.message ||                 // Lỗi từ axios
        "Không thể kết nối đến server",
      result: null
    };
  }
};

export const updateTour = async (id, tourData) => {
  try {
    const res = await axios.put(`${API_URL}/admin/tours/update/${id}`, tourData);
    return res.data;
  } catch (error) {
    return {
      code: error.response?.status || 500,
      message: 
        error.response?.data?.message || 
        error.message || 
        "Không thể cập nhật tour",
      result: null
    };
  }
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


export const getUserProfile = (userId) =>
  axios.get(`${API_URL}/users/${userId}/profile`);

export const updateUser = (userId, data) =>
  axios.put(`${API_URL}/users/update/${userId}`, data);

export const changePassword = (userId, data) =>
  axios.put(`${API_URL}/users/change-password/${userId}`, data);

export const changeAvatar = (userId, file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  return axios.put(`${API_URL}/users/change-avatar/${userId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};


export const getUserHistory = (userId, page = 0, size = 9, actionType) => {
  let url = `${API_URL}/history/user/${userId}?page=${page}&size=${size}`;
  if (actionType) {
    url += `&actionType=${actionType}`;
  }
  return axios.get(url);
};


export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/admin/users/delete/${userId}`);
    // Optionally return something or just let it resolve
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      error.message ||
      "Error deleting user"
    );
  }
};