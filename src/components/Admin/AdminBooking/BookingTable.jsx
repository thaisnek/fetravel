import React, { useEffect, useState } from "react";
import { Table, Button, Form, Spinner } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { getAllBookings, updateBookingStatus, deleteBooking } from "../../../services/api";

const statusOptions = ["PENDING", "CONFIRMED", "CANCELLED"];

export default function BookingTable() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line
  }, [page]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await getAllBookings(page, 9);
      setBookings(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      alert("Lỗi khi tải danh sách booking!");
    }
    setLoading(false);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateBookingStatus(id, newStatus);
      fetchBookings();
    } catch (err) {
      alert("Cập nhật trạng thái thất bại!");
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Bạn có chắc chắn muốn xóa booking này?")) {
      try {
        await deleteBooking(id);
        fetchBookings();
      } catch (err) {
        alert("Xóa booking thất bại!");
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-sm mt-4">
      <h5 className="mb-3">Bookings</h5>
      {loading ? (
        <div className="text-center my-5"><Spinner animation="border" /></div>
      ) : (
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>bookingID</th>
              <th>userId</th>
              <th>tourId</th>
              <th>bookingDate</th>
              <th>numAdults</th>
              <th>numChildren</th>
              <th>totalPrice</th>
              <th>fullName</th>
              <th>email</th>
              <th>phoneNumber</th>
              <th>address</th>
              <th>bookingStatus</th>
              <th>paymentMethod</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={14} className="text-center">Không có dữ liệu</td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.bookingID}>
                  <td>{booking.bookingID}</td>
                  <td>{booking.userId}</td>
                  <td>{booking.tourId}</td>
                  <td>{booking.bookingDate}</td>
                  <td>{booking.numAdults}</td>
                  <td>{booking.numChildren}</td>
                  <td>{booking.totalPrice?.toLocaleString()}</td>
                  <td>{booking.fullName}</td>
                  <td>{booking.email}</td>
                  <td>{booking.phoneNumber}</td>
                  <td>{booking.address}</td>
                  <td>
                    <Form.Select
                      size="sm"
                      value={booking.bookingStatus}
                      onChange={e => handleStatusChange(booking.bookingID, e.target.value)}
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </Form.Select>
                  </td>
                  <td>{booking.paymentMethod}</td>
                  <td>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(booking.bookingID)}><FaTrash /></Button>
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
    </div>
  );
}
