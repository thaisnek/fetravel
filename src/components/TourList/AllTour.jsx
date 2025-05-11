import React, { useState, useEffect } from 'react';
import { getAvailableTours, filterTours } from '../../services/api'; // Import các hàm API
import { FaStar, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import Slider from 'rc-slider'; // Import Slider để lọc giá
import 'rc-slider/assets/index.css'; // Import CSS cho Slider

const AllTour = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minPrice: null,
    maxPrice: null,
    domain: null,
    star: null,
    time: null,
    sorting: null,
  });

  // Giá trị mặc định cho Slider giá
  const [priceRange, setPriceRange] = useState([0, 10000000]); // Giả sử giá từ 0 đến 10 triệu

  // Hàm gọi API để lấy danh sách tour
  const fetchTours = async () => {
    try {
      setLoading(true);
      // Chuẩn bị tham số lọc
      const filterParams = {};
      if (filters.minPrice !== null) filterParams.minPrice = filters.minPrice;
      if (filters.maxPrice !== null) filterParams.maxPrice = filters.maxPrice;
      if (filters.domain) filterParams.domain = filters.domain;
      if (filters.star !== null) filterParams.star = filters.star;
      if (filters.time) filterParams.time = filters.time;
      if (filters.sorting) filterParams.sorting = filters.sorting;

      // Gọi API lọc tour
      const tourData = await filterTours(filterParams);

      // Ánh xạ dữ liệu tour
      const mappedTours = tourData.map(tour => ({
        id: tour.tourID,
        image: tour.images && tour.images.length > 0
          ? tour.images[0].imageURL
          : '/assets/images/gallery-tours/mien-trung-4n3d-da-nang-hoi-an-ba-na-hue-4.png',
        location: tour.destination,
        title: tour.title,
        duration: tour.duration,
        capacity: tour.quantity,
        price: tour.priceAdult.toLocaleString(),
        rating: 5, // Rating sẽ được cập nhật sau nếu backend trả về trung bình sao
      }));
      setTours(mappedTours);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tours:', error);
      setLoading(false);
    }
  };

  // Gọi API lần đầu khi component mount
  useEffect(() => {
    fetchTours();
  }, []);

  // Gọi lại API khi bộ lọc thay đổi
  useEffect(() => {
    fetchTours();
  }, [filters]);

  // Xử lý thay đổi giá từ Slider
  const handlePriceChange = (value) => {
    setPriceRange(value);
    setFilters(prev => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1],
    }));
  };

  // Xử lý thay đổi domain
  const handleDomainChange = (e) => {
    const domain = e.target.value;
    const mappedDomain = {
      b: 'Miền Bắc',
      t: 'Miền Trung',
      n: 'Miền Nam',
    }[domain] || null;
    setFilters(prev => ({
      ...prev,
      domain: mappedDomain,
    }));
  };

  // Xử lý thay đổi đánh giá
  const handleStarChange = (e) => {
    const star = parseInt(e.target.value);
    setFilters(prev => ({
      ...prev,
      star: star,
    }));
  };

  // Xử lý thay đổi thời gian
  const handleDurationChange = (e) => {
    const time = e.target.value;
    setFilters(prev => ({
      ...prev,
      time: time,
    }));
  };

  // Xử lý thay đổi sắp xếp
  const handleSortingChange = (e) => {
    const sorting = e.target.value !== 'default' ? e.target.value : null;
    setFilters(prev => ({
      ...prev,
      sorting: sorting,
    }));
  };

  // Xử lý clear bộ lọc
  const handleClearFilters = () => {
    setFilters({
      minPrice: null,
      maxPrice: null,
      domain: null,
      star: null,
      time: null,
      sorting: null,
    });
    setPriceRange([0, 10000000]); // Reset Slider giá
  };

  if (loading) {
    return (
      <section className="tour-grid-page py-100 rel z-1">
        <div className="container">
          <p>Loading available tours...</p>
        </div>
      </section>
    );
  }

  const starLevels = [
    [1, 1, 1, 1, 1], // 5 vàng
    [1, 1, 1, 1, 0], // 4 vàng, 1 đen
    [1, 1, 1, 0, 0], // 3 vàng, 2 đen
    [1, 1, 0, 0, 0], // 2 vàng, 3 đen
    [1, 0, 0, 0, 0], // 1 vàng, 4 đen
  ];

  return (
    <section className="tour-grid-page py-100 rel z-1">
      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3 col-md-6 col-sm-10 rmb-75">
            <div className="shop-sidebar">
              <div className="div_filter_clear">
                <button className="clear_filter" onClick={handleClearFilters}>
                  <a href="/all-tours">Clear</a>
                </button>
              </div>

              {/* Price Filter */}
              <div className="widget widget-filter">
                <h6 className="widget-title">Lọc theo giá</h6>
                <div className="price-filter-wrap">
                  <Slider
                    range
                    min={0}
                    max={10000000}
                    value={priceRange}
                    onChange={handlePriceChange}
                    step={100000}
                  />
                  <div className="price">
                    <span>Giá </span>
                    <input
                      type="text"
                      id="price"
                      value={`${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()} VND`}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Domain Filter */}
              <div className="widget widget-activity">
                <h6 className="widget-title">Điểm đến</h6>
                <ul className="radio-filter">
                  <li>
                    <input
                      type="radio"
                      name="domain"
                      id="id_mien_bac"
                      value="b"
                      onChange={handleDomainChange}
                      checked={filters.domain === 'Miền Bắc'}
                    />
                    <label htmlFor="id_mien_bac">Miền Bắc <span>10</span></label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="domain"
                      id="id_mien_trung"
                      value="t"
                      onChange={handleDomainChange}
                      checked={filters.domain === 'Miền Trung'}
                    />
                    <label htmlFor="id_mien_trung">Miền Trung <span>15</span></label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="domain"
                      id="id_mien_nam"
                      value="n"
                      onChange={handleDomainChange}
                      checked={filters.domain === 'Miền Nam'}
                    />
                    <label htmlFor="id_mien_nam">Miền Nam <span>20</span></label>
                  </li>
                </ul>
              </div>

              {/* Review Filter */}
              <div className="widget widget-reviews">
                <h6 className="widget-title">Đánh giá</h6>
                <ul className="radio-filter">
                  {starLevels.map((level, index) => (
                    <li key={index}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="filter_star"
                        id={`${5 - index}star`}
                        value={5 - index}
                        onChange={handleStarChange}
                        checked={filters.star === 5 - index}
                      />
                      <label htmlFor={`${5 - index}star`}>
                        <span className="ratting">
                          {level.map((v, i) => (
                            <FaStar key={i} className={v ? "star filled" : "star empty"} />
                          ))}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Duration Filter */}
              <div className="widget widget-duration">
                <h6 className="widget-title">Thời gian</h6>
                <ul className="radio-filter">
                  <li>
                    <input
                      type="radio"
                      name="duration"
                      id="3ngay2dem"
                      value="3n2d"
                      onChange={handleDurationChange}
                      checked={filters.time === '3n2d'}
                    />
                    <label htmlFor="3ngay2dem">3 ngày 2 đêm</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="duration"
                      id="4ngay3dem"
                      value="4n3d"
                      onChange={handleDurationChange}
                      checked={filters.time === '4n3d'}
                    />
                    <label htmlFor="4ngay3dem">4 ngày 3 đêm</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="duration"
                      id="5ngay4dem"
                      value="5n4d"
                      onChange={handleDurationChange}
                      checked={filters.time === '5n4d'}
                    />
                    <label htmlFor="5ngay4dem">5 ngày 4 đêm</label>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <div className="widget widget-cta mt-30">
                <div className="content text-white">
                  <span className="h6">Khám Phá Việt Nam</span>
                  <h3>Địa điểm du lịch tốt nhất</h3>
                  <a href="tour-detail.html" className="theme-btn style-two bgc-secondary">
                    <span data-hover="Khám phá ngay">Khám phá ngay</span>
                    <i className="fal fa-arrow-right"></i>
                  </a>
                </div>
                <div className="image">
                  <img src="/assets/images/widgets/cta-widget.png" alt="CTA" />
                </div>
                <div className="cta-shape">
                  <img src="/assets/images/widgets/cta-shape2.png" alt="Shape" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-9">
            <div className="shop-shorter rel z-3 mb-20" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="sort-text mb-15 me-4 me-xl-auto" style={{ marginBottom: '0' }}>
                Tours tìm thấy: {tours.length}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="sort-text mb-15 me-4" style={{ marginBottom: '0', whiteSpace: 'nowrap' }}>
                  Sắp xếp theo
                </div>
                <select
                  id="sorting_tours"
                  style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc', whiteSpace: 'nowrap' }}
                  onChange={handleSortingChange}
                  value={filters.sorting || 'default'}
                >
                  <option value="default">Sắp xếp theo</option>
                  <option value="new">Mới nhất</option>
                  <option value="old">Cũ nhất</option>
                  <option value="hight-to-low">Cao đến thấp</option>
                  <option value="low-to-high">Thấp đến cao</option>
                </select>
              </div>
            </div>

            {/* Tour Grid */}
            <div className="tour-grid-wrap">
              <div className="row" id="tours-container">
                {tours.map((tour) => (
                  <div key={tour.id} className="col-xl-4 col-md-6" style={{ marginBottom: '30px' }}>
                    <div className="destination-item tour-grid style-three bgc-lighter block_tours equal-block-fix">
                      <div className="image">
                        <span className="badge bgc-pink">Featured</span>
                        <img src={tour.image} alt="Tour List" />
                      </div>
                      <div className="content equal-content-fix">
                        <div className="destination-header">
                          <span className="location">
                            <FaMapMarkerAlt /> {tour.location}
                            <div className="ratting filled">
                              {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < tour.rating ? "star filled" : "star empty"} />
                              ))}
                            </div>
                          </span>
                        </div>
                        <h6><a href={`/tour-details/${tour.id}`}>{tour.title}</a></h6>
                        <ul className="blog-meta">
                          <li><i className="far fa-clock"></i>{tour.duration}</li>
                          <li><i className="far fa-user"></i>{tour.capacity}</li>
                        </ul>
                        <div className="destination-footer">
                          <span className="price">
                            <span>{tour.price}</span> VND / người
                          </span>
                          <a href={`/tour-details/${tour.id}`} className="theme-btn style-two style-three">
                            <FaArrowRight />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllTour;