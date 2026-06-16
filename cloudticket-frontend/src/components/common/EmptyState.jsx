import { Container } from "react-bootstrap";
import { BsInboxes } from "react-icons/bs";

export default function EmptyState({
    icon: Icon = BsInboxes,
    title = 'No data',
    description = ''
}) {
    return (
        <Container className="text-center py-5">
            <Icon size={64} className="text-muted mb-3 opacity-50" />
            <h5 className="text-muted">{title}</h5>
            {description && <p className="text-secondary">{description}</p>}
        </Container>
    );
}