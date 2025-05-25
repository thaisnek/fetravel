import React from 'react';
import { FaHeart, FaStar, FaRegStar, FaClock, FaUser, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';

const BACKEND_URL = "http://localhost:8080";
const IMAGE_PATH = "/ltweb/images/tour/";

const getImageUrl = (tour) => {
  if (tour.images && tour.images.length > 0 && tour.images[0].imageURL) {
    // Nếu imageURL là URL đầy đủ
    if (tour.images[0].imageURL.startsWith('http')) {
      return tour.images[0].imageURL;
    }
    // Nếu chỉ là tên file, build lại URL
    return BACKEND_URL + IMAGE_PATH + tour.images[0].imageURL;
  }
  // Ảnh mặc định nếu không có ảnh
  return '/assets/images/gallery-tours/tfd_240115101543_813851_CON_DAO_1732899101.jpg';
};

const SearchList = ({ tours }) => {
  return (
    <section className="tour-grid-page py-100 rel z-2">
      <div className="container">
        <div className="row">
          {tours.length === 0 ? (
            <h4 className="alert alert-danger">
              Không có tour nào liên quan đến tìm kiếm của bạn. Thử tìm kiếm với từ khóa khác nhé!
            </h4>
          ) : (
            tours.map((tour) => (
              <div className="col-xl-4 col-md-6" style={{ marginBottom: '30px' }} key={tour.tourID}>
                <div
                  className="destination-item tour-grid style-three bgc-lighter equal-block-fix"
                  data-aos="fade-up"
                  data-aos-duration="1500"
                  data-aos-offset="50"
                >
                  <div className="image" style={{ position: 'relative' }}>
                    <a href="#" className="heart" style={{ position: 'absolute', top: 10, right: 10 }}>
                      <FaHeart />
                    </a>
                    <img
                      src={getImageUrl(tour)}
                      alt={tour.images && tour.images.length > 0 ? tour.images[0].description || 'Tour' : 'Tour'}
                    />
                  </div>
                  <div className="content equal-content-fix">
                    <div className="destination-header">
                      <span className="location">
                        <FaMapMarkerAlt style={{ marginRight: '5px' }} />
                        {tour.destination}
                      </span>
                      <div className="ratting">
                        {[...Array(5)].map((_, i) => (
                          i < (tour.rating || 4) ? (
                            <FaStar key={i} />
                          ) : (
                            <FaRegStar key={i} />
                          )
                        ))}
                      </div>
                    </div>
                    <h5>
                      <a href={`/tour-detail/${tour.tourID}`}>{tour.title}</a>
                    </h5>
                    <ul className="blog-meta">
                      <li>
                        <FaClock style={{ marginRight: '5px' }} />
                        {tour.duration}
                      </li>
                      <li>
                        <FaUser style={{ marginLeft: '10px', marginRight: '5px' }} />
                        {tour.quantity}
                      </li>
                    </ul>
                    <div className="destination-footer">
                      <span className="price">
                        <span>{tour.priceAdult.toLocaleString('vi-VN')}</span> VND / người
                      </span>
                      <a
                        href={`/tour-detail/${tour.tourID}`}
                        className="theme-btn style-two style-three"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                      >
                        <span data-hover="Đặt ngay">Đặt ngay</span>
                        <FaArrowRight />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchList;
