import { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    email: '',
    message: '',
  });
  const [showNotification, setShowNotification] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowNotification(true);
    setFormData({ name: '', phone_number: '', email: '', message: '' });
  };

  // Tự động ẩn thông báo sau 3 giây
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <section className="contact-form-area py-70 rel z-1">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <div className="comment-form bgc-lighter z-1 rel mb-30 rmb-55">
              {/* Thông báo tùy chỉnh */}
              {showNotification && (
                <div className="notification fixed top-4 right-4 bg-green-500 text-black px-4 py-2 rounded shadow-lg z-50">
                  Gửi liên hệ thành công!
                </div>
              )}
              <form
                id="contactForm"
                className="contactForm"
                name="contactForm"
                onSubmit={handleSubmit}
              >
                <div className="section-title">
                  <h2>Liên hệ</h2>
                </div>
                <p>
                  Địa chỉ email của bạn sẽ không được công bố. Các trường bắt buộc được đánh dấu{' '}
                  <span style={{ color: 'red' }}>*</span>
                </p>
                <div className="row mt-35">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">
                        Họ và tên <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Họ và tên"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="phone_number">
                        Số điện thoại <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Số điện thoại"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="email">
                        Địa chỉ Email <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Nhập email"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="message">
                        Nội dung <span style={{ color: 'red' }}>*</span>
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="form-control"
                        rows="5"
                        placeholder="Nội dung"
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mb-0">
                      <button type="submit" className="theme-btn style-two">
                        <span data-hover="Send Comments">Gửi</span>
                        <FaArrowRight />
                      </button>
                      <div id="msgSubmit" className="hidden"></div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="contact-images-part">
              <div className="row">
                <div className="col-12">
                  <img src="/assets/images/contact/contact1.jpg" alt="Contact" />
                </div>
                <div className="col-6">
                  <img src="/assets/images/contact/contact2.jpg" alt="Contact" />
                </div>
                <div className="col-6">
                  <img src="/assets/images/contact/contact3.jpg" alt="Contact" />
                </div>
              </div>
              <div className="circle-logo">
                <img src="/assets/images/contact/icon.png" alt="Logo" />
                <span className="title h2">Travela</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;