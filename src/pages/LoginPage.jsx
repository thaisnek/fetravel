import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import LoginForm from "../components/Auth/LoginForm";
import Navbar2 from "../components/common/Navbar2"

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (form, setError) => {
    const res = await login(form);
    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("userId", res.userId);
      localStorage.setItem("role", res.role);
      if (res.role === "ADMIN") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
    } else {
      setError("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar2 />
      <Container style={{ maxWidth: 400, marginTop: 40 }}>
        <h3 className="mb-3">Đăng nhập</h3>
        <LoginForm onLogin={handleLogin} />
      </Container>
    </div>
  );
}

export default LoginPage;
