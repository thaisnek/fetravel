import React from "react";
import { BsEnvelope } from "react-icons/bs";

export default function Header() {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
      <h4 className="mb-0">
         <span className="text-primary"></span>
      </h4>
      <div className="d-flex align-items-center">
        <div className="me-3 position-relative">
          <BsEnvelope size={22} />
          <span className="badge bg-success position-absolute top-0 start-100 translate-middle">3</span>
        </div>
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="avatar"
          className="rounded-circle"
          width={35}
        />
        <span className="ms-2">Admin</span>
      </div>
    </div>
  );
}
