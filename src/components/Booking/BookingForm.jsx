import React, { useState, useEffect, useCallback } from 'react';
import { getTourDetail, createBooking, initiatePayment } from '../../services/api';
import axios from 'axios';

const API_URL = 'http://localhost:8080/ltweb/api'; // URL cơ sở của backend
const token = localStorage.getItem("token");

const BookingForm = ({ tourId, userId }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    tel: '',
    address: '',
    numAdults: 1,
    numChildren: 0,
    payment: '',
    totalPrice: 0,
    tourId,
    userId,
    promotionCode: '', // Thay thế coupon bằng promotionCode
  });
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [promotionError, setPromotionError] = useState(null);
  const [promotionApplied, setPromotionApplied] = useState(false);

  // Lấy thông tin tour từ backend
  const fetchTour = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTourDetail(tourId);
      setTour(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể tải chi tiết tour');
    } finally {
      setLoading(false);
    }
  }, [tourId]);

  useEffect(() => {
    fetchTour();
  }, [fetchTour]);

  // Tính tổng giá cơ bản (chưa áp dụng giảm giá)
  const calculateTotalPrice = useCallback(() => {
    if (!tour) return 0;
    const adultPrice = formData.numAdults * (tour.priceAdult || 0);
    const childPrice = formData.numChildren * (tour.priceChild || 0);
    return adultPrice + childPrice - discount;
  }, [tour, formData.numAdults, formData.numChildren, discount]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      totalPrice: calculateTotalPrice(),
    }));
  }, [calculateTotalPrice]);

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý thay đổi số lượng hành khách
  const handleQuantityChange = (type, operation) => {
    setFormData((prev) => {
      let newValue = prev[type];
      if (operation === '+') {
        newValue = prev[type] + 1;
        if (tour?.quantity && newValue + prev[type === 'numAdults' ? 'numChildren' : 'numAdults'] > tour.quantity) {
          setError('Số lượng hành khách vượt quá số chỗ còn lại!');
          return prev;
        }
      } else if (operation === '-') {
        newValue = type === 'numAdults' ? Math.max(1, prev[type] - 1) : Math.max(0, prev[type] - 1);
      }
      return {
        ...prev,
        [type]: newValue,
      };
    });
  };

  // Xử lý áp dụng mã khuyến mãi
  const applyPromotionCode = async () => {
    if (!formData.promotionCode) {
      setPromotionError('Vui lòng nhập mã khuyến mãi.');
      setError('Vui lòng nhập mã khuyến mãi.');
      return;
    }
    setLoading(true);
    setPromotionError(null);
    setError(null);
    try {
      const response = await axios.post(
        `${API_URL}/promotions/validate`,
        { code: formData.promotionCode },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );
      const result = response.data;
      if (result.valid && result.discount > 0) {
        const basePrice = formData.numAdults * (tour?.priceAdult || 0) + formData.numChildren * (tour?.priceChild || 0);
        const discountAmount = Math.floor(basePrice * (result.discount / 100));
        setDiscount(discountAmount);
        setPromotionApplied(true);
        setPromotionError(null);
      } else {
        setDiscount(0);
        setPromotionApplied(false);
        setPromotionError(result.message || 'Mã khuyến mãi không hợp lệ hoặc đã hết hạn.');
        setError(result.message || 'Mã khuyến mãi không hợp lệ hoặc đã hết hạn.');
      }
    } catch (err) {
      setDiscount(0);
      setPromotionApplied(false);
      setPromotionError(err.response?.data?.message || 'Không thể kiểm tra mã khuyến mãi.');
      setError(err.response?.data?.message || 'Không thể kiểm tra mã khuyến mãi.');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý gửi form đặt chỗ
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.payment !== 'paypal-payment') {
      setError('Vui lòng chọn phương thức thanh toán PayPal.');
      return;
    }
    if (!tour) {
      setError('Dữ liệu tour không khả dụng');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const bookingRequest = {
        userId: formData.userId,
        tourId: formData.tourId,
        numAdults: formData.numAdults,
        numChildren: formData.numChildren,
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.tel,
        address: formData.address,
        paymentMethod: 'paypal',
        promotionCode: formData.promotionCode || '', // Gửi promotionCode đến backend
      };

      const bookingResponse = await createBooking(bookingRequest);
      const bookingId = bookingResponse.bookingID || bookingResponse.id; // Lấy bookingID từ phản hồi

      // Cập nhật tổng giá từ phản hồi backend (đã áp dụng giảm giá nếu có)
      if (bookingResponse.totalPrice !== undefined) {
        setFormData((prev) => ({
          ...prev,
          totalPrice: bookingResponse.totalPrice,
        }));
        // Tính toán giảm giá dựa trên giá cơ bản và giá cuối cùng từ backend
        const basePrice = calculateTotalPrice() + discount; // Giá cơ bản trước khi cập nhật
        const discountAmount = basePrice - bookingResponse.totalPrice;
        if (discountAmount > 0) {
          setDiscount(discountAmount);
        } else {
          setDiscount(0);
        }
      }

      // Chuyển hướng đến trang thanh toán PayPal
      const approvalUrl = await initiatePayment(bookingId);
      window.location.href = approvalUrl;
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể xử lý đặt chỗ. Vui lòng thử lại.');
      setSubmitting(false);
    }
  };

  const isFormValid = formData.fullName && formData.email && formData.tel && formData.address && formData.payment;

  return (
    <div className="page-wrapper">
      <section className="container" style={{ marginTop: '50px', marginBottom: '100px' }}>
        <form onSubmit={handleSubmit} className="booking-container">
          <div className="booking-info">
            <h2 className="booking-header">Thông Tin Liên Lạc</h2>
            <div className="booking__infor">
              <div className="form-group">
                <label htmlFor="username">Họ và tên*</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Nhập Họ và tên"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  placeholder="sample@gmail.com"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="tel">Số điện thoại*</label>
                <input
                  type="tel"
                  id="tel"
                  placeholder="Nhập số điện thoại liên hệ"
                  name="tel"
                  value={formData.tel}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Địa chỉ*</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Nhập địa chỉ liên hệ"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <h2 className="booking-header">Hành Khách</h2>
            <div className="booking__quantity">
              <div className="form-group quantity-selector">
                <label>Người lớn</label>
                <div className="input__quanlity">
                  <button
                    type="button"
                    className="quantity-btn"
                    onClick={() => handleQuantityChange('numAdults', '-')}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="quantity-input"
                    value={formData.numAdults}
                    min="1"
                    readOnly
                  />
                  <button
                    type="button"
                    className="quantity-btn"
                    onClick={() => handleQuantityChange('numAdults', '+')}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="form-group quantity-selector">
                <label>Trẻ em</label>
                <div className="input__quanlity">
                  <button
                    type="button"
                    className="quantity-btn"
                    onClick={() => handleQuantityChange('numChildren', '-')}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="quantity-input"
                    value={formData.numChildren}
                    min="0"
                    readOnly
                  />
                  <button
                    type="button"
                    className="quantity-btn"
                    onClick={() => handleQuantityChange('numChildren', '+')}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <h2 className="booking-header">Phương Thức Thanh Toán</h2>
            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="paypal-payment"
                onChange={handleInputChange}
                required
              />
              <img src="/assets/images/booking/cong-thanh-toan-paypal.jpg" alt="PayPal" />
              Thanh toán bằng PayPal
            </label>
          </div>

          <div className="booking-summary">
            <div className="summary-section">
              <div>
                <p>Mã tour: TOUR00{tour?.tourID}</p>
                <h5 className="widget-title">{tour?.title}</h5>
                <p>Ngày khởi hành: {tour?.startDate ? new Date(tour.startDate).toLocaleDateString('vi-VN') : 'N/A'}</p>
                <p>Ngày kết thúc: {tour?.endDate ? new Date(tour.endDate).toLocaleDateString('vi-VN') : 'N/A'}</p>
                <p className="quantityAvailable">Số chỗ còn nhận: {tour?.quantity}</p>
              </div>

              <div className="order-summary">
                <div className="summary-item">
                  <span>Người lớn:</span>
                  <div>
                    <span className="quantity__adults">{formData.numAdults}</span>
                    <span>X</span>
                    <span className="total-price">
                      {(formData.numAdults * (tour?.priceAdult || 0)).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </span>
                  </div>
                </div>
                <div className="summary-item">
                  <span>Trẻ em:</span>
                  <div>
                    <span className="quantity__children">{formData.numChildren}</span>
                    <span>X</span>
                    <span className="total-price">
                      {(formData.numChildren * (tour?.priceChild || 0)).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </span>
                  </div>
                </div>
                <div className="summary-item">
                  <span>Giảm giá:</span>
                  <div>
                    <span className="total-price">
                      {discount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </span>
                  </div>
                </div>
                <div className="summary-item total-price">
                  <span>Tổng cộng:</span>
                  <span>
                    {formData.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                  </span>
                </div>
              </div>

              <div className="order-coupon">
                <input
                  type="text"
                  placeholder="Mã giảm giá"
                  value={formData.promotionCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, promotionCode: e.target.value }))}
                  style={{ width: '65%' }}
                />
                <button
                  type="button"
                  style={{ width: '30%' }}
                  className="booking-btn btn-coupon"
                  onClick={applyPromotionCode}
                  disabled={loading || promotionApplied}
                >
                  {loading ? 'Đang kiểm tra...' : 'Áp dụng'}
                </button>
              </div>

              {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
              <button
                type="submit"
                className="booking-btn btn-submit-booking"
                disabled={submitting || loading || !isFormValid}
              >
                {submitting ? 'Đang xử lý...' : 'Xác Nhận'}
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default BookingForm;