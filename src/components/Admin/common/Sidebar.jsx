import React from "react";
import { Nav } from "react-bootstrap";
import { BsSpeedometer2, BsPeople, BsPerson, BsCardChecklist, BsBook, BsEnvelope,BsStar, BsTag } from "react-icons/bs";

export default function Sidebar() {
  return (
    <div className="bg-dark text-white vh-100 d-flex flex-column p-3" style={{ width: 250 }}>
      <div className="mb-4">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="avatar"
          className="rounded-circle mb-2"
          width={60}
        />
        <div>Xin chào, <b>Admin</b></div>
      </div>
      <Nav className="flex-column">
        <Nav.Link href="#" className="text-white"><BsSpeedometer2 className="me-2" />Dashboard</Nav.Link>
        <Nav.Link href="/admin/admin-profile" className="text-white"><BsPerson className="me-2" />Quản lý Admin</Nav.Link>
        <Nav.Link href="/admin/user" className="text-white"><BsPeople className="me-2" />Quản lý người dùng</Nav.Link>
        <Nav.Link href="/admin/tour" className="text-white"><BsCardChecklist className="me-2" />Quản lý Tours</Nav.Link>
        <Nav.Link href="/admin/booking" className="text-white"><BsBook className="me-2" />Quản lý Booking</Nav.Link>
        <Nav.Link href="/admin/review" className="text-white"><BsStar className="me-2" />Quản lý Review</Nav.Link>
        <Nav.Link href="/admin/promotion" className="text-white"><BsTag className="me-2" />Quản lý Promotion</Nav.Link>
        <Nav.Link href="#" className="text-white"><BsEnvelope className="me-2" />Liên hệ</Nav.Link>
      </Nav>
      <div className="mt-auto pt-4 border-top border-secondary">
        <small className="text-secondary">Admin Panel</small>
      </div>
    </div>
  );
}
