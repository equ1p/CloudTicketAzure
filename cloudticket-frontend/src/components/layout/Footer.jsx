import { Container, Row, Col } from 'react-bootstrap';
import { BsTicketPerforated, BsGithub, BsCloud } from 'react-icons/bs';

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
              Reliable ticketing platform.
            </small>
          </Col>
          <Col md={4} className="text-center mb-3 mb-md-0">
            <div className="d-flex justify-content-center gap-3">
              <span className="badge bg-secondary bg-opacity-25 text-light">
                <BsCloud className="me-1" /> Azure
              </span>
              <span className="badge bg-secondary bg-opacity-25 text-light">
                .NET 10
              </span>
              <span className="badge bg-secondary bg-opacity-25 text-light">
                React
              </span>
            </div>
          </Col>
          <Col md={4} className="text-center text-md-end">
            <small className="text-secondary">
              © {new Date().getFullYear()} CloudTicket. Educational project.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}