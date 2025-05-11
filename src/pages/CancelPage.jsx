import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { cancelPayment } from '../services/api';

const CancelPage = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('Đang xử lý hủy...');

  useEffect(() => {
    const bookingId = searchParams.get('bookingId');

    const handleCancel = async () => {
      try {
        const response = await cancelPayment(bookingId);
        setMessage(response);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Lỗi khi hủy thanh toán');
      }
    };

    if (bookingId) {
      handleCancel();
    } else {
      setMessage('Thiếu thông tin hủy');
    }
  }, [searchParams]);

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>{message}</h2>
      <a href="/">Quay lại trang chủ</a>
    </div>
  );
};

export default CancelPage;