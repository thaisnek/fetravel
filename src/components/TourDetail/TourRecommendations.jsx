import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt } from 'react-icons/fa';

const TourRecommendations = ({ tourId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BACKEND_URL = "http://localhost:8080";
  const IMAGE_PATH = "/ltweb/images/tour/";

  // Hàm build URL ảnh từ backend
  const getImageUrl = (image) => {
    if (image && image.imageURL) {
      if (image.imageURL.startsWith('http')) {
        return image.imageURL;
      }
      return BACKEND_URL + IMAGE_PATH + image.imageURL;
    }
    return '/assets/images/default-tour.jpg'; // Ảnh mặc định nếu không có imageURL
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ltweb/api/tours/${tourId}/recommendations`);
        console.log('API response:', response.data); // Debug: kiểm tra dữ liệu trả về
        // Ánh xạ tourID thành tourId và lấy ảnh thứ hai
        const tours = (response.data || []).map(tour => {
          console.log('Tour images:', tour.images); // Debug: kiểm tra images
          // Lấy ảnh thứ hai (index 1)
          const secondImage = tour.images && tour.images.length >= 2 ? tour.images[1] : (tour.images && tour.images.length > 0 ? tour.images[0] : null);
          const imageUrl = secondImage ? getImageUrl(secondImage) : '/assets/images/default-tour.jpg'; // Ảnh mặc định
          const tourData = {
            tourId: tour.tourID,
            title: tour.title,
            destination: tour.destination,
            duration: tour.duration,
            imageUrl,
          };
          console.log('Tour image URL:', tourData.imageUrl); // Debug: kiểm tra URL ảnh
          return tourData;
        });
        console.log('Mapped tours:', tours); // Debug: kiểm tra danh sách tours
        setRecommendations(tours);
      } catch (err) {
        console.error('Error fetching recommendations:', err); // Debug: lỗi chi tiết
        setError('Không thể tải danh sách tour gợi ý');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [tourId]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="widget widget-tour">
      <h6>Tours tương tự</h6>
      {recommendations.length ? (
        recommendations.map(tour => (
          <div key={tour.tourId} className="destination-item tour-grid style-three bgc-lighter">
            {tour.imageUrl && (
              <div className="image">
                <img
                  src={tour.imageUrl}
                  alt={tour.title}
                  style={{ maxHeight: '137px', width: '100%', objectFit: 'cover' }}
                  onError={() => console.log(`Failed to load image: ${tour.imageUrl}`)} 
                />
              </div>
            )}
            <div className="content">
              <div className="destination-header">
                <span className="location">
                  <FaMapMarkerAlt className="icon" /> {tour.destination}
                </span>
                <span>{tour.duration}</span>
              </div>
              <h6>
                <a href={`/tour-details/${tour.tourId}`}>{tour.title}</a>
              </h6>
            </div>
          </div>
        ))
      ) : (
        <p>Không có tour gợi ý nào.</p>
      )}
    </div>
  );
};

export default TourRecommendations;
