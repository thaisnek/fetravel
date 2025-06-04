import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';


const BACKEND_URL = "http://localhost:8080";
const IMAGE_PATH = "/ltweb/images/tour/";

const TourCard = ({ tour }) => {
  return (
    <div className="col-xxl-3 col-xl-4 col-md-6" style={{ marginBottom: '30px' }}>
      <div className="destination-item block_tours">
        <div className="image">
          <div className="ratting">
            <FaStar /> {tour.averageRating || 0}
          </div>
          <img
            src={BACKEND_URL + IMAGE_PATH + tour.images[0].imageURL}
            alt="Destination"
          />
        </div>
        <div className="content">
          <span className="location">
            <FaMapMarkerAlt /> {tour.destination || 'Hà Nội'}
          </span>
          <h5>
            <Link to={`/tour-details/${tour.tourID}`}>
              {tour.title || 'Tour Hà Nội 3N2Đ'}
            </Link>
          </h5>
          <span className="time">{tour.duration || '3 ngày 2 đêm'}</span>
        </div>
        <div className="destination-footer">
          <span className="price">
            <span>{tour.priceAdult?.toLocaleString() || '2.500.000'}</span> VND / người
          </span>
          <Link to={`/tour-details/${tour.tourID}`} className="read-more">
            Đặt ngay <FaChevronRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
