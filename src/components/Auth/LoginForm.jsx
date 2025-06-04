import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const LoginForm = ({ onLogin }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    await onLogin(form, setError);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group>
        <Form.Label>Tên đăng nhập</Form.Label>
        <Form.Control name="username" value={form.username} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Mật khẩu</Form.Label>
        <Form.Control type="password" name="password" value={form.password} onChange={handleChange} required />
      </Form.Group>
      <Button type="submit" className="w-100 mt-3">Đăng nhập</Button>
    </Form>
  );
};


export default LoginForm;
