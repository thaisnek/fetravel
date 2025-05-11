import React, { useState, useEffect, useCallback } from 'react';
import { getTourDetail, createBooking, initiatePayment } from '../../services/api';

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
  });
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const applyCoupon = () => {
    if (coupon === 'DISCOUNT10') {
      setDiscount(100000);
      setError(null);
    } else {
      setDiscount(0);
      setError('Mã giảm giá không hợp lệ');
    }
  };

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
        totalPrice: formData.totalPrice,
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.tel,
        address: formData.address,
        paymentMethod: 'paypal',
      };

      const bookingResponse = await createBooking(bookingRequest);
      const bookingId = bookingResponse.bookingID;

      const approvalUrl = await initiatePayment(bookingId);
      window.location.href = approvalUrl;
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể xử lý đặt chỗ');
      setSubmitting(false);
    }
  };

  const isFormValid = formData.fullName && formData.email && formData.tel && formData.address && formData.payment;

  if (loading && !tour) return <div>Đang tải chi tiết tour...</div>;
  if (error) return (
    <div>
      <p style={{ color: 'red' }}>{error}</p>
      <button onClick={fetchTour}>Thử lại</button>
    </div>
  );
  if (!tour) return <div>Không tìm thấy dữ liệu tour.</div>;

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
                <p>Mã tour: TOUR00{tour.tourID}</p>
                <h5 className="widget-title">{tour.title}</h5>
                <p>Ngày khởi hành: {new Date(tour.startDate).toLocaleDateString('vi-VN')}</p>
                <p>Ngày kết thúc: {new Date(tour.endDate).toLocaleDateString('vi-VN')}</p>
                <p className="quantityAvailable">Số chỗ còn nhận: {tour.quantity}</p>
              </div>

              <div className="order-summary">
                <div className="summary-item">
                  <span>Người lớn:</span>
                  <div>
                    <span className="quantity__adults">{formData.numAdults}</span>
                    <span>X</span>
                    <span className="total-price">
                      {(formData.numAdults * tour.priceAdult).toLocaleString('vi-VN', {
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
                      {(formData.numChildren * tour.priceChild).toLocaleString('vi-VN', {
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
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  style={{ width: '65%' }}
                />
                <button
                  type="button"
                  style={{ width: '30%' }}
                  className="booking-btn btn-coupon"
                  onClick={applyCoupon}
                >
                  Áp dụng
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