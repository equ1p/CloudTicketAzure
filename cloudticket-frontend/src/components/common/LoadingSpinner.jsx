import { Spinner, Container } from "react-bootstrap";

export default function LoadingSpinner({ text = 'Завантаження...' }) {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center py-5">
      <Spinner animation="border" variant="primary" role="status" className="mb-3">
        <span className="visually-hidden">{text}</span>
      </Spinner>
      <p className="text-muted">{text}</p>
    </Container>
  );
}