import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const adminInitial = {
  username: "admin",
  password: "",
  email: "",
  address: "",
  avatarUrl: "https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg", // Replace with your admin avatar path
};

const AdminProfile = () => {
  const [admin, setAdmin] = useState(adminInitial);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call API to update admin info here
    alert("Admin info updated!");
  };

  return (
    <Container fluid className="py-4">
      <h3 className="mb-4">Thông tin admin</h3>
      <Card className="p-4">
        <Row className="align-items-center">
          <Col md={5} className="text-center">
            <img
              src={admin.avatarUrl}
              alt="Admin Avatar"
              style={{
                width: 250,
                height: 250,
                borderRadius: "8px",
                objectFit: "cover",
                border: "1px solid #ddd",
              }}
            />
          </Col>
          <Col md={7}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="adminUsername">
                <Form.Label>Tên admin</Form.Label>
                <Form.Control
                  className="border border-primary"
                  type="text"
                  name="username"
                  value={admin.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="adminPassword">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  className="border border-primary"
                  type="password"
                  name="password"
                  value={admin.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="adminEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="border border-primary"
                  type="email"
                  name="email"
                  value={admin.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="adminAddress">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  className="border border-primary"
                  type="text"
                  name="address"
                  value={admin.address}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button type="submit" variant="teal" style={{ background: "#20bfa9", border: "none" }}>
                Cập nhật
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default AdminProfile;
