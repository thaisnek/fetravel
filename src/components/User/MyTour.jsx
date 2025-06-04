import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaStar,
  FaRegStar,
  FaArrowRight,
  FaClock
} from "react-icons/fa";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "http://localhost:8080";
const IMAGE_PATH = "/ltweb/images/tour/";

const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.userId || null; // Đảm bảo backend đã thêm userId vào token
  } catch {
    return null;
  }
};

const MyTour = () => {
  const navigate = useNavigate();
  const userId = getUserIdFromToken();
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      alert("Bạn chưa đăng nhập!");
      navigate("/login");
      return;
    }
    setLoading(true);
    axios
      .get(`http://localhost:8080/ltweb/api/history/user/${userId}?page=${currentPage - 1}&size=9`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      })
      .then((response) => {
        setHistories(response.data.content);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [currentPage, userId, navigate]);

  // Hàm kiểm tra điều kiện hiển thị
  const shouldShowHistory = (history) => {
    if (history.actionType === "REVIEW") return true;
    if (history.actionType === "BOOK" && history.bookingResponse.bookingStatus === "PENDING") return true;
    if (history.actionType === "PAY" && history.bookingResponse.bookingStatus === "CONFIRMED") return true;
    if (history.actionType === "CANCEL" && history.bookingResponse.bookingStatus === "CANCELLED") return true;
    return false;
  };

  // Lọc danh sách theo điều kiện
  const filteredHistories = histories.filter(shouldShowHistory);

  const renderBookingBadge = (actionType) => {
    switch (actionType) {
      case "BOOK":
        return <span className="badge bgc-primary">Đã đặt tour</span>;
      case "CANCEL":
        return <span className="badge" style={{ backgroundColor: "red" }}>Đã hủy</span>;
      case "PAY":
        return <span className="badge bgc-green">Đã thanh toán</span>;
      case "REVIEW":
        return <span className="badge bgc-purple">Đã đánh giá</span>;
      default:
        return null;
    }
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) =>
      i < (rating || 0)
        ? <FaStar key={i} style={{ color: "#ffc107" }} />
        : <FaRegStar key={i} style={{ color: "#ccc" }} />
    );

  // Phân trang trực tiếp trong component
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="pagination" style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 30 }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          style={{ padding: "6px 12px", borderRadius: 4, border: "1px solid #ddd", background: "#fff" }}
        >
          &laquo;
        </button>
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={currentPage === num ? "active" : ""}
            style={{
              padding: "6px 12px",
              borderRadius: 4,
              border: "1px solid #ddd",
              background: currentPage === num ? "#007bff" : "#fff",
              color: currentPage === num ? "#fff" : "#333",
              fontWeight: currentPage === num ? "bold" : "normal"
            }}
          >
            {num}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          style={{ padding: "6px 12px", borderRadius: 4, border: "1px solid #ddd", background: "#fff" }}
        >
          &raquo;
        </button>
      </div>
    );
  };

  if (loading) return <div className="text-center py-4">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-center text-danger">Lỗi: {error}</div>;

  return (
    <section className="tour-list-page py-100 rel z-1">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            {filteredHistories.length === 0 ? (
              <div className="text-center">Không có lịch sử tour nào</div>
            ) : (
              filteredHistories.map((history) => (
                <div className="destination-item style-three bgc-lighter" key={history.historyID}>
                  <div className="image">
                    {renderBookingBadge(history.actionType)}
                    <img
                      src={BACKEND_URL + IMAGE_PATH + history.tourResponse.images[0]?.imageURL}
                      alt="Tour"
                    />
                  </div>
                  <div className="content">
                    <div className="destination-header">
                      <span className="location">
                        <FaMapMarkerAlt /> {history.tourResponse.destination}
                      </span>
                    </div>
                    <h5>
                      <a href={`/tour-details/${history.tourResponse.tourID}`}>
                        {history.tourResponse.title}
                      </a>
                    </h5>
                    <div className="truncate-3-lines">
                      {history.tourResponse.description}
                    </div>
                    <ul className="blog-meta">
                      <li><FaClock /> {history.tourResponse.duration}</li>
                    </ul>
                    <div className="destination-footer">
                      <span className="price">
                        <span>{history.tourResponse.priceAdult?.toLocaleString()}</span>/vnđ
                      </span>
                      {history.actionType === "REVIEW" && (
                        <a
                          href={`/tour-details/${history.tourResponse.tourID}`}
                          className="theme-btn style-two style-three"
                        >
                          {history.tourResponse.rating
                            ? <span data-hover="Đã đánh giá">Đã đánh giá</span>
                            : <span data-hover="Đánh giá">Đánh giá</span>}
                          <FaArrowRight />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
            {/* Phân trang */}
            {renderPagination()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyTour;
