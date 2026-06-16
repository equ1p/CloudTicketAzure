import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { BsSearch, BsFilter } from 'react-icons/bs';
import { useState, useMemo } from 'react';
import { useApi } from '../hooks/useApi';
import TicketCard from '../components/tickets/TicketCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';
import EmptyState from '../components/common/EmptyState';

export default function EventsPage() {
  const { data: tickets, loading, error, refetch } = useApi('/tickets');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredTickets = useMemo(() => {
    if (!tickets) return [];

    return tickets.filter((ticket) => {
      const matchesSearch = ticket.eventName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === 'all' ||
        (filter === 'available' && !ticket.isSold) ||
        (filter === 'sold' && ticket.isSold);

      return matchesSearch && matchesFilter;
    });
  }, [tickets, search, filter]);

  if (loading) return <LoadingSpinner text="Loading events..." />;
  if (error) return <ErrorAlert message={error} onRetry={refetch} />;

  return (
    <Container className="py-4">
      <div className="mb-4">
        <h1 className="fw-bold">Events</h1>
        <p className="text-muted">
          Showing {filteredTickets.length} of {tickets?.length || 0} events
        </p>
      </div>

      <Row className="mb-4 g-3">
        <Col md={8}>
          <InputGroup>
            <InputGroup.Text className="bg-white">
              <BsSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search by event name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <InputGroup>
            <InputGroup.Text className="bg-white">
              <BsFilter />
            </InputGroup.Text>
            <Form.Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Tickets</option>
              <option value="available">Available Only</option>
              <option value="sold">Sold Only</option>
            </Form.Select>
          </InputGroup>
        </Col>
      </Row>

      {filteredTickets.length === 0 ? (
        <EmptyState
          title="No events found"
          description="Try adjusting your search or filter"
        />
      ) : (
        <Row className="g-4">
          {filteredTickets.map((ticket) => (
            <Col key={ticket.id} sm={6} lg={4}>
              <TicketCard ticket={ticket} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
