import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { completePayment } from '../services/api';

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('Đang xử lý thanh toán...');

  useEffect(() => {
    const paymentId = searchParams.get('paymentId');
    const payerId = searchParams.get('PayerID');
    const bookingId = searchParams.get('bookingId');

    const handlePayment = async () => {
      try {
        const response = await completePayment(paymentId, payerId, bookingId);
        setMessage(response);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Lỗi khi hoàn tất thanh toán');
      }
    };

    if (paymentId && payerId && bookingId) {
      handlePayment();
    } else {
      setMessage('Thiếu thông tin thanh toán');
    }
  }, [searchParams]);

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>{message}</h2>
      <a href="/">Quay lại trang chủ</a>
    </div>
  );
};

export default SuccessPage;