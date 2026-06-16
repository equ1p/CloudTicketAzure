import { Navbar, Nav, Container, Dropdown, Badge } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { BsTicketPerforated, BsPersonCircle} from 'react-icons/bs';
import { useUser } from '../../context/UserContext.jsx';

export default function Header() {
  const { users, currentUser, setCurrentUser } = useUser();

  return (
    <Navbar 
      expand="lg" 
      className="navbar-custom shadow-sm sticky-top"
      data-bs-theme="dark"
    >
      <Container>
        {/* ── Logo ── */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <BsTicketPerforated size={28} className="text-warning" />
          <span className="fw-bold fs-4">
            Cloud<span className="text-warning">Ticket</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        
        <Navbar.Collapse id="main-nav">
          {/* ── Navigation Links ── */}
          <Nav className="me-auto">
            <Nav.Link 
              as={NavLink} 
              to="/"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Main Page
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/events"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Events
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/my-orders"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              My Orders
            </Nav.Link>
          </Nav>

          {/* ── User choice ── */}
          <Dropdown align="end">
            <Dropdown.Toggle 
              variant="outline-light" 
              className="d-flex align-items-center gap-2"
            >
              <BsPersonCircle size={20} />
              {currentUser ? currentUser.name : 'Choose user:'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Header>Log in as:</Dropdown.Header>
              {users.map((user) => (
                <Dropdown.Item
                  key={user.id}
                  active={currentUser?.id === user.id}
                  onClick={() => setCurrentUser(user)}
                >
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">{user.name}</span>
                    <small className="text-muted">{user.email}</small>
                  </div>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}