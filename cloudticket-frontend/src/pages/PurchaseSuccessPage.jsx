import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { BsCheckCircleFill, BsEnvelope, BsReceipt, BsArrowRight } from 'react-icons/bs';

export default function PurchaseSuccessPage() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/events" replace />;
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="border-0 shadow text-center p-4">
            <Card.Body>
              <div className="success-icon-wrapper mx-auto mb-4">
                <BsCheckCircleFill size={64} className="text-success" />
              </div>

              <h2 className="fw-bold mb-2">Purchase Successful!</h2>
              <p className="text-muted mb-4">{order.message}</p>

              <div className="bg-light rounded p-4 mb-4 text-start">
                <h6 className="fw-bold mb-3">Order Details</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Event:</span>
                  <span className="fw-semibold">{order.eventName}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Amount:</span>
                  <span className="fw-semibold text-primary">
                    ${order.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Order ID:</span>
                  <code>{order.orderId.substring(0, 8)}</code>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Date:</span>
                  <span>
                    {new Date(order.purchaseDate).toLocaleDateString('en-US')}
                  </span>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-center gap-2 text-muted mb-4">
                <BsEnvelope />
                <small>
                  A PDF ticket will be sent to your email shortly
                </small>
              </div>

              <div className="d-flex gap-3 justify-content-center">
                <Button
                  as={Link}
                  to="/my-orders"
                  variant="primary"
                  className="d-flex align-items-center gap-2"
                >
                  <BsReceipt />
                  My Orders
                </Button>
                <Button
                  as={Link}
                  to="/events"
                  variant="outline-primary"
                  className="d-flex align-items-center gap-2"
                >
                  Browse Events
                  <BsArrowRight />
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
