import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Modal } from 'react-bootstrap';
import {
  BsTicketPerforated, BsCashCoin, BsShieldCheck,
  BsCartPlus, BsArrowLeft, BsCheckCircle
} from 'react-icons/bs';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useApi } from '../hooks/useApi';
import { useUser } from '../context/UserContext';
import apiClient from '../api/apiClient';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';

export default function TicketDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const { data: ticket, loading, error, refetch } = useApi(`/tickets/${id}`);

  const [showModal, setShowModal] = useState(false);
  const [buying, setBuying] = useState(false);

  const handleBuy = async () => {
    if (!currentUser) {
      toast.warning('Please select a user in the navigation bar.');
      return;
    }

    setBuying(true);

    try {
      const idempotencyKey = uuidv4();

      const response = await apiClient.post(
        '/tickets/buy',
        {
          ticketId: id,
          userId: currentUser.id,
        },
        {
          headers: {
            'Idempotency-Key': idempotencyKey,
          },
        }
      );

      toast.success('Ticket purchased successfully! 🎉');
      setShowModal(false);

      navigate('/purchase-success', {
        state: { order: response.data },
        replace: true,
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || 'Failed to purchase ticket.';
      toast.error(errorMessage);
      setShowModal(false);
      refetch();
    } finally {
      setBuying(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading ticket details..." />;
  if (error) return <ErrorAlert message={error} onRetry={refetch} />;
  if (!ticket) return <ErrorAlert message="Ticket not found." />;

  return (
    <Container className="py-4">
      <Button
        variant="link"
        onClick={() => navigate('/events')}
        className="mb-3 text-decoration-none d-flex align-items-center gap-2 ps-0"
      >
        <BsArrowLeft /> Back to Events
      </Button>

      <Row className="g-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <Badge
                  bg={ticket.isSold ? 'secondary' : 'success'}
                  className="px-3 py-2"
                >
                  {ticket.isSold ? 'Sold Out' : 'Available for Purchase'}
                </Badge>
              </div>

              <h1 className="fw-bold mb-3">{ticket.eventName}</h1>

              <div className="d-flex flex-column gap-3 mb-4 text-muted">
                <div className="d-flex align-items-center gap-2">
                  <BsTicketPerforated size={20} />
                  <span>Electronic ticket (PDF will be sent to your email)</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <BsShieldCheck size={20} />
                  <span>Safe checkout — protected against duplicate charges</span>
                </div>
              </div>

              {ticket.isSold && ticket.buyerName && (
                <div className="alert alert-secondary">
                  <strong>Purchased by:</strong> {ticket.buyerName}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm sticky-top" style={{ top: '80px' }}>
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <small className="text-muted d-block mb-1">Ticket Price</small>
                <span className="display-5 fw-bold text-primary">
                  ${ticket.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <Button
                variant={ticket.isSold ? 'secondary' : 'primary'}
                size="lg"
                className="w-100 fw-semibold d-flex align-items-center justify-content-center gap-2 py-3"
                disabled={ticket.isSold || !currentUser}
                onClick={() => setShowModal(true)}
              >
                {ticket.isSold ? (
                  'Sold Out'
                ) : (
                  <>
                    <BsCartPlus size={20} />
                    Buy Ticket
                  </>
                )}
              </Button>

              {!currentUser && (
                <small className="text-danger d-block text-center mt-2">
                  Please select a user in the navigation bar
                </small>
              )}

              <hr />
              <div className="small text-muted">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <BsCheckCircle className="text-success" />
                  <span>Instant confirmation</span>
                </div>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <BsCheckCircle className="text-success" />
                  <span>PDF ticket via email</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <BsCheckCircle className="text-success" />
                  <span>Secure transaction</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Purchase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You are about to purchase:</p>
          <div className="bg-light rounded p-3 mb-3">
            <strong>{ticket.eventName}</strong>
            <div className="text-primary fw-bold fs-5 mt-1">
              ${ticket.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <p className="text-muted small mb-0">
            Buyer: <strong>{currentUser?.name}</strong> ({currentUser?.email})
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleBuy}
            disabled={buying}
            className="d-flex align-items-center gap-2"
          >
            {buying ? (
              <>
                <span className="spinner-border spinner-border-sm" />
                Processing...
              </>
            ) : (
              <>
                <BsCartPlus />
                Confirm Purchase
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
