import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Alert, Row, Col, Card } from "react-bootstrap";

function AdminContactReply() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [notification, setNotification] = useState("");

  const fetchContacts = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/ltweb/api/admin/contacts/all-contacts", {
      headers: { Authorization: "Bearer " + token },
    });
    const data = await res.json();
    setContacts(data.content || []);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleViewDetail = (contact) => {
    setSelectedContact(contact);
  };

  const handleReplyClick = () => {
    setReplyMessage("");
    setShowReplyModal(true);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const adminId = 1;
    const body = {
      chatID: selectedContact.chatID,
      replyMessage,
      adminId,
    };
    const res = await fetch("http://localhost:8080/ltweb/api/admin/contacts/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setNotification("Phản hồi thành công!");
      setShowReplyModal(false);
      setSelectedContact(null);
      fetchContacts();
    } else {
      setNotification("Phản hồi thất bại!");
    }
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div className="py-4">
      <h3 className="mb-4">Quản lý phản hồi liên hệ</h3>
      {notification && <Alert variant="info">{notification}</Alert>}
      <Row>
        <Col md={5}>
          <Card>
            <Card.Header className="bg-success text-white py-2">
              Danh sách liên hệ chưa phản hồi
            </Card.Header>
            <Table striped bordered hover responsive className="mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th>Điện thoại</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center">
                      Không có liên hệ nào.
                    </td>
                  </tr>
                )}
                {contacts.map((contact, idx) => (
                  <tr key={contact.chatID}>
                    <td>{idx + 1}</td>
                    <td>{contact.fullName}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phoneNumber}</td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleViewDetail(contact)}
                      >
                        Xem chi tiết
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
        <Col md={7}>
          {selectedContact ? (
            <Card>
              <Card.Header className="bg-info text-white py-2">
                Chi tiết liên hệ
              </Card.Header>
              <Card.Body>
                <h5>{selectedContact.fullName}</h5>
                <div>
                  <b>Email:</b> {selectedContact.email}
                  <br />
                  <b>Điện thoại:</b> {selectedContact.phoneNumber}
                </div>
                <div className="mt-3">
                  <b>Nội dung liên hệ:</b>
                  <div className="border rounded p-2 bg-light mt-2">
                    {selectedContact.message}
                  </div>
                </div>
                <div className="mt-4 text-end">
                  <Button variant="primary" onClick={handleReplyClick}>
                    Phản hồi
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <div className="text-muted">Chọn liên hệ để xem chi tiết.</div>
          )}
        </Col>
      </Row>

      {/* Modal phản hồi */}
      <Modal show={showReplyModal} onHide={() => setShowReplyModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Phản hồi liên hệ</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleReplySubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>
                Gửi phản hồi cho: <b>{selectedContact?.fullName}</b> ({selectedContact?.email})
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                required
                placeholder="Nhập nội dung phản hồi..."
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowReplyModal(false)}>
              Hủy
            </Button>
            <Button type="submit" variant="success">
              Gửi phản hồi
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminContactReply;
