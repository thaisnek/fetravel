import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const emptyTimeline = { day: "", description: "" };
const emptyImage = { imageURL: "", description: "" };

export default function TourFormModal({ show, onHide, onSubmit, initialData, isEdit }) {
  const [step, setStep] = useState(1);

  // Step 1: Thông tin cơ bản
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    quantity: 1,
    priceAdult: 0,
    priceChild: 0,
    destination: "",
    domain: "",
    availability: true,
    startDate: "",
    endDate: "",
  });

  // Step 2: Timeline & Image
  const [timelines, setTimelines] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        duration: initialData.duration || "",
        quantity: initialData.quantity || 1,
        priceAdult: initialData.priceAdult || 0,
        priceChild: initialData.priceChild || 0,
        destination: initialData.destination || "",
        domain: initialData.domain || "",
        availability: initialData.availability ?? true,
        startDate: initialData.startDate || "",
        endDate: initialData.endDate || "",
      });
      setTimelines(initialData.timelines || []);
      setImages(initialData.images || []);
    } else {
      setForm({
        title: "",
        description: "",
        duration: "",
        quantity: 1,
        priceAdult: 0,
        priceChild: 0,
        destination: "",
        domain: "",
        availability: true,
        startDate: "",
        endDate: "",
      });
      setTimelines([]);
      setImages([]);
    }
    setStep(1);
  }, [initialData, show]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Timeline handlers
  const handleTimelineChange = (idx, field, value) => {
    const newTimelines = [...timelines];
    newTimelines[idx][field] = value;
    setTimelines(newTimelines);
  };
  const addTimeline = () => setTimelines((prev) => [...prev, { ...emptyTimeline }]);
  const removeTimeline = (idx) => setTimelines((prev) => prev.filter((_, i) => i !== idx));

  // Image handlers
  const handleImageChange = (idx, field, value) => {
    const newImages = [...images];
    newImages[idx][field] = value;
    setImages(newImages);
  };
  const addImage = () => setImages((prev) => [...prev, { ...emptyImage }]);
  const removeImage = (idx) => setImages((prev) => prev.filter((_, i) => i !== idx));

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, timelines, images });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" backdrop="static">
      <Form onSubmit={step === 1 ? handleNext : handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Cập nhật Tour" : "Thêm mới Tour"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {step === 1 && (
            <>
              <h5>Thông tin cơ bản</h5>
              <Form.Group className="mb-2">
                <Form.Label>Tên tour</Form.Label>
                <Form.Control className="border border-primary" name="title" value={form.title} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control className="border border-primary" name="description" value={form.description} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Thời gian</Form.Label>
                <Form.Control className="border border-primary" name="duration" value={form.duration} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Số lượng</Form.Label>
                <Form.Control className="border border-primary" name="quantity" type="number" value={form.quantity} onChange={handleChange} required min={1} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Giá người lớn</Form.Label>
                <Form.Control className="border border-primary" name="priceAdult" type="number" value={form.priceAdult} onChange={handleChange} required min={0} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Giá trẻ em</Form.Label>
                <Form.Control className="border border-primary" name="priceChild" type="number" value={form.priceChild} onChange={handleChange} required min={0} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Điểm đến</Form.Label>
                <Form.Control className="border border-primary" name="destination" value={form.destination} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Domain</Form.Label>
                <Form.Control className="border border-primary" name="domain" value={form.domain} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Check
                  type="checkbox"
                  label="Còn chỗ"
                  name="availability"
                  checked={form.availability}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Ngày bắt đầu</Form.Label>
                <Form.Control className="border border-primary" name="startDate" type="date" value={form.startDate} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Ngày kết thúc</Form.Label>
                <Form.Control className="border border-primary" name="endDate" type="date" value={form.endDate} onChange={handleChange} required />
              </Form.Group>
            </>
          )}

          {step === 2 && (
            <>
              <h5>Lịch trình (Timeline)</h5>
              {timelines.map((tl, idx) => (
                <Row key={idx} className="mb-2">
                  <Col xs={3}>
                    <Form.Control
                      className="border border-primary"
                      type="number"
                      placeholder="Ngày"
                      value={tl.day}
                      onChange={e => handleTimelineChange(idx, "day", e.target.value)}
                      min={1}
                      required
                    />
                  </Col>
                  <Col xs={7}>
                    <Form.Control
                      className="border border-primary"
                      placeholder="Mô tả"
                      value={tl.description}
                      onChange={e => handleTimelineChange(idx, "description", e.target.value)}
                      required
                    />
                  </Col>
                  <Col xs={2}>
                    <Button variant="danger" size="sm" onClick={() => removeTimeline(idx)}>-</Button>
                  </Col>
                </Row>
              ))}
              <Button variant="secondary" size="sm" onClick={addTimeline}>+ Thêm ngày</Button>
              <hr />
              <h5>Hình ảnh</h5>
              {images.map((img, idx) => (
                <Row key={idx} className="mb-2">
                  <Col xs={6}>
                    <Form.Control
                      className="border border-primary"
                      placeholder="URL"
                      value={img.imageURL}
                      onChange={e => handleImageChange(idx, "imageURL", e.target.value)}
                      required
                    />
                  </Col>
                  <Col xs={4}>
                    <Form.Control
                      className="border border-primary"
                      placeholder="Mô tả"
                      value={img.description}
                      onChange={e => handleImageChange(idx, "description", e.target.value)}
                      required
                    />
                  </Col>
                  <Col xs={2}>
                    <Button variant="danger" size="sm" onClick={() => removeImage(idx)}>-</Button>
                  </Col>
                </Row>
              ))}
              <Button variant="secondary" size="sm" onClick={addImage}>+ Thêm ảnh</Button>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {step === 2 && (
            <Button variant="secondary" onClick={handleBack}>
              Quay lại
            </Button>
          )}
          <Button variant="secondary" onClick={onHide}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            {step === 1 ? "Tiếp theo" : isEdit ? "Cập nhật" : "Thêm mới"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
