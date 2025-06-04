import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const RegisterForm = ({ onRegister }) => {
  const [form, setForm] = useState({ username: "", password: "", fullName: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError(""); setSuccess("");
    await onRegister(form, setError, setSuccess);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form.Group>
        <Form.Label>Tên đăng nhập</Form.Label>
        <Form.Control name="username" value={form.username} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Họ và tên</Form.Label>
        <Form.Control name="fullName" value={form.fullName} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Mật khẩu</Form.Label>
        <Form.Control type="password" name="password" value={form.password} onChange={handleChange} required />
      </Form.Group>
      <Button type="submit" className="w-100 mt-3">Đăng ký</Button>
    </Form>
  );
};


export default RegisterForm;
