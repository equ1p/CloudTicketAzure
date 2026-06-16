import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  BsTicketPerforated, BsShieldCheck, BsLightningCharge,
  BsClock, BsArrowRight, BsStar
} from 'react-icons/bs';

const features = [
  {
    icon: BsShieldCheck,
    title: 'Secure Payments',
    description: 'Every transaction is protected against duplicate charges. Buy with confidence — your money is safe.',
    color: 'success',
  },
  {
    icon: BsLightningCharge,
    title: 'Real-Time Availability',
    description: 'Seats are reserved instantly. No more showing up to find out someone else grabbed your ticket.',
    color: 'warning',
  },
  {
    icon: BsClock,
    title: 'Instant Confirmation',
    description: 'Get your e-ticket delivered to your inbox within seconds of purchase. No waiting, no hassle.',
    color: 'info',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero-section text-white text-center">
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col lg={8}>
              <BsTicketPerforated size={64} className="mb-4 text-warning" />
              <h1 className="display-4 fw-bold mb-3">
                Your Next Event <span className="text-warning">Starts Here</span>
              </h1>
              <p className="lead mb-4 opacity-75">
                Discover amazing concerts, conferences, and shows.
                Book your tickets in seconds — securely and hassle-free.
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <Button
                  as={Link}
                  to="/events"
                  variant="warning"
                  size="lg"
                  className="fw-semibold px-4 d-flex align-items-center gap-2"
                >
                  Browse Events
                  <BsArrowRight />
                </Button>
                <Button
                  as={Link}
                  to="/my-orders"
                  variant="outline-light"
                  size="lg"
                  className="px-4"
                >
                  My Orders
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <h2 className="text-center fw-bold mb-2">Why CloudTicket?</h2>
          <p className="text-center text-muted mb-5">
            A seamless experience from browsing to booking
          </p>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col md={4} key={index}>
                <Card className="feature-card h-100 border-0 shadow-sm text-center p-4">
                  <Card.Body>
                    <div className={`feature-icon-wrapper bg-${feature.color} bg-opacity-10 mx-auto mb-3`}>
                      <feature.icon size={32} className={`text-${feature.color}`} />
                    </div>
                    <Card.Title className="fw-bold">{feature.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {feature.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="cta-section text-center py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <BsStar size={36} className="text-warning mb-3" />
              <h3 className="fw-bold mb-3">Don't Miss Out</h3>
              <p className="text-muted mb-4">
                Popular events sell out fast. Find your next unforgettable experience today.
              </p>
              <Button
                as={Link}
                to="/events"
                variant="primary"
                size="lg"
                className="px-5"
              >
                Explore Events
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
