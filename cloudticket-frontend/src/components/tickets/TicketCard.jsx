import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsCalendarEvent, BsCashCoin, BsArrowRight } from 'react-icons/bs';

export default function TicketCard({ ticket }) {
  const { id, eventName, price, isSold } = ticket;

  return (
    <Card className="ticket-card h-100 border-0 shadow-sm">
      <div className={`card-accent ${isSold ? 'sold' : 'available'}`} />

      <Card.Body className="d-flex flex-column p-4">
        <div className="mb-3">
          <Badge bg={isSold ? 'secondary' : 'success'} className="px-3 py-2">
            {isSold ? 'Sold Out' : 'Available'}
          </Badge>
        </div>

        <Card.Title className="fw-bold fs-5 mb-3">{eventName}</Card.Title>

        <div className="mb-3 text-muted">
          <div className="d-flex align-items-center gap-2 mb-2">
            <BsCalendarEvent />
            <small>Available for purchase</small>
          </div>
          <div className="d-flex align-items-center gap-2">
            <BsCashCoin />
            <small>Paperless ticket (PDF)</small>
          </div>
        </div>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-end">
            <div>
              <small className="text-muted d-block">Price</small>
              <span className="fs-4 fw-bold text-primary">
                ${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <Button
              as={Link}
              to={`/events/${id}`}
              variant={isSold ? 'outline-secondary' : 'primary'}
              disabled={isSold}
              className="d-flex align-items-center gap-2"
            >
              {isSold ? 'Unavailable' : 'Details'}
              {!isSold && <BsArrowRight />}
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}