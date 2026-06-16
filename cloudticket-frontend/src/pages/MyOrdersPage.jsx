import { Container, Table, Card } from 'react-bootstrap';
import { BsReceipt } from 'react-icons/bs';
import { useUser } from '../context/UserContext';
import { useApi } from '../hooks/useApi';
import OrderRow from '../components/orders/OrderRow';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';
import EmptyState from '../components/common/EmptyState';

export default function MyOrdersPage() {
  const { currentUser } = useUser();

  const url = currentUser ? `/orders?userId=${currentUser.id}` : null;
  const { data: orders, loading, error, refetch } = useApi(url);

  if (!currentUser) {
    return (
      <EmptyState
        icon={BsReceipt}
        title="Select a User"
        description="Please select a user in the navigation bar to view orders"
      />
    );
  }

  if (loading) return <LoadingSpinner text="Loading orders..." />;
  if (error) return <ErrorAlert message={error} onRetry={refetch} />;

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold">My Orders</h1>
          <p className="text-muted mb-0">
            Orders for {currentUser.name} &bull; {orders?.length || 0} records
          </p>
        </div>
      </div>

      {!orders || orders.length === 0 ? (
        <EmptyState
          icon={BsReceipt}
          title="No Orders Yet"
          description="Purchase your first ticket on the Events page!"
        />
      ) : (
        <Card className="border-0 shadow-sm">
          <div className="table-responsive">
            <Table hover className="mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th>Event</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <OrderRow key={order.id} order={order} index={index} />
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      )}
    </Container>
  );
}
