import { Container, Row, Col } from 'react-bootstrap';
import { BsTicketPerforated, BsEnvelope, BsGeoAlt } from 'react-icons/bs';

export default function Footer() {
  return (
    <footer className="footer-custom mt-auto py-4">
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
              <BsTicketPerforated size={20} className="text-warning" />
              <span className="fw-bold">CloudTicket</span>
            </div>
            <small className="text-secondary">
              Your trusted ticketing platform.
            </small>
          </Col>
          <Col md={4} className="text-center mb-3 mb-md-0">
            <div className="d-flex flex-column align-items-center gap-1">
              <div className="d-flex align-items-center gap-2 text-secondary">
                <BsEnvelope size={14} />
                <small>support@cloudticket.io</small>
              </div>
              <div className="d-flex align-items-center gap-2 text-secondary">
                <BsGeoAlt size={14} />
                <small>Available worldwide</small>
              </div>
            </div>
          </Col>
          <Col md={4} className="text-center text-md-end">
            <small className="text-secondary">
              © {new Date().getFullYear()} CloudTicket. All rights reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}