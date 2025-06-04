import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import RegisterForm from "../components/Auth/RegisterForm";
import Navbar2 from "../components/common/Navbar2"

function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = async (form, setError, setSuccess) => {
    const res = await registerUser(form);
    if (res.ok) {
      setSuccess(res.message || "Đăng ký thành công! Đang chuyển sang trang đăng nhập...");
      setError("");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setError(res.message || "Lỗi đăng ký!");
      setSuccess("");
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar2 />
    <Container style={{ maxWidth: 400, marginTop: 40 }}>
      <h3 className="mb-3">Đăng ký</h3>
      <RegisterForm onRegister={handleRegister} />
    </Container>
    </div>
  );
}

export default RegisterPage;
