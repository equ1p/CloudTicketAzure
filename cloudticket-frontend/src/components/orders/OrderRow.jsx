import { Badge } from 'react-bootstrap';
import { BsCheckCircleFill } from 'react-icons/bs';

export default function OrderRow({ order, index }) {
  const { id, eventName, totalAmount, purchaseDate } = order;

  const formattedDate = new Date(purchaseDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const shortId = id.substring(0, 8);

  return (
    <tr>
      <td className="text-muted">{index + 1}</td>
      <td>
        <code className="text-primary">#{shortId}</code>
      </td>
      <td className="fw-semibold">{eventName}</td>
      <td>${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
      <td className="text-muted">{formattedDate}</td>
      <td>
        <Badge bg="success" className="d-inline-flex align-items-center gap-1">
          <BsCheckCircleFill size={12} />
          Paid
        </Badge>
      </td>
    </tr>
  );
}