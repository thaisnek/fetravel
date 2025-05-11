import React, { useEffect, useState } from "react";
import { Button, Table, Spinner } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { getAllTours, createTour, updateTour, deleteTour } from "../../../services/api";
import TourFormModal from "./TourFormModal"; // import component modal vừa tạo

export default function TourTable() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editTour, setEditTour] = useState(null);

  useEffect(() => {
    fetchTours();
    // eslint-disable-next-line
  }, [page]);

  const fetchTours = async () => {
    setLoading(true);
    try {
      const data = await getAllTours(page, 9);
      setTours(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      alert("Lỗi khi tải danh sách tour!");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa tour này?")) {
      try {
        await deleteTour(id);
        fetchTours();
      } catch (err) {
        alert("Xóa thất bại!");
      }
    }
  };

  const handleEdit = (tourID) => {
    const tour = tours.find(t => t.tourID === tourID);
    setEditTour(tour);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditTour(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditTour(null);
  };

  const handleModalSubmit = async (formData) => {
    try {
      if (editTour) {
        await updateTour(editTour.tourID, formData);
      } else {
        await createTour(formData);
      }
      handleModalClose();
      fetchTours();
    } catch (err) {
      alert("Lưu tour thất bại!");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-sm mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Tours</h5>
        <Button variant="success" size="sm" onClick={handleAdd}>
          <FaPlus className="me-1" /> Thêm mới
        </Button>
      </div>
      <div className="mb-2 text-muted">
        Chào mừng bạn đến với trang quản lý tour. Tại đây, bạn có thể thêm mới, chỉnh sửa, và quản lý tất cả các tour hiện có.
      </div>
      {loading ? (
        <div className="text-center my-5"><Spinner animation="border" /></div>
      ) : (
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Thời gian</th>
              <th>Mô tả</th>
              <th>Số lượng</th>
              <th>Giá người lớn</th>
              <th>Giá trẻ em</th>
              <th>Điểm đến</th>
              <th>Domain</th>
              <th>Trạng thái</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Sửa</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {tours.length === 0 ? (
              <tr>
                <td colSpan={13} className="text-center">Không có dữ liệu</td>
              </tr>
            ) : (
              tours.map((tour) => (
                <tr key={tour.tourID}>
                  <td>{tour.title}</td>
                  <td>{tour.duration}</td>
                  <td>{tour.description}</td>
                  <td>{tour.quantity}</td>
                  <td>{tour.priceAdult.toLocaleString()}</td>
                  <td>{tour.priceChild.toLocaleString()}</td>
                  <td>{tour.destination}</td>
                  <td>{tour.domain}</td>
                  <td>{tour.availability ? "Còn chỗ" : "Hết chỗ"}</td>
                  <td>{tour.startDate}</td>
                  <td>{tour.endDate}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" onClick={() => handleEdit(tour.tourID)}><FaEdit /></Button>
                  </td>
                  <td>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(tour.tourID)}><FaTrash /></Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
      <div className="d-flex justify-content-between align-items-center">
        <span>Trang {page + 1} / {totalPages}</span>
        <div>
          <Button size="sm" variant="outline-secondary" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</Button>
          <Button size="sm" variant="outline-secondary" className="ms-2" disabled={page + 1 === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
        </div>
      </div>
      <TourFormModal
        show={showModal}
        onHide={handleModalClose}
        onSubmit={handleModalSubmit}
        initialData={editTour}
        isEdit={!!editTour}
      />
    </div>
  );
}
