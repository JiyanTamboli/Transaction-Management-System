import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

function Mynavbar() {
  const location = useLocation();
  const navigate = useNavigate(); 

  // If on the login page, hide the navbar
  if (location.pathname === '/') {
    return null;
  }

  const handleLogout = () => {
    localStorage.clear();
    alert("You have been logged out.");
    navigate('/'); // Redirect using navigate
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand href="#home"><i>Personal Transaction System</i></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/Home" className="nav-link">Home</NavLink>
              <NavLink to="/All_transaction" className="nav-link">All Transactions</NavLink>
              <NavLink to="/To_do_list" className="nav-link">To Do List</NavLink>
            </Nav>
            <Button
              className="btn-logut"
              style={{ backgroundColor: 'red', border: '2px solid black' }}
              onClick={handleLogout}
            >
              LOGOUT
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default Mynavbar;
