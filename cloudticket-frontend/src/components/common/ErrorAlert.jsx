import { Alert, Button } from 'react-bootstrap';
import { BsExclamationTriangle } from 'react-icons/bs';

export default function ErrorAlert({ message, onRetry }) {
  return (
    <Alert variant="danger" className="d-flex align-items-center gap-3 mx-3 mt-4">
      <BsExclamationTriangle size={24} />
      <div className="flex-grow-1">
        <Alert.Heading className="h6 mb-1">Something went wrong</Alert.Heading>
        <p className="mb-0 small">{message}</p>
      </div>
      {onRetry && (
        <Button variant="outline-danger" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </Alert>
  );
}