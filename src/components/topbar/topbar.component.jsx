import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Topbar = ({ isLoggedIn }) => {
    return (
        <>
            {
                !isLoggedIn ? null 
                : (
                    <div className="topbar-component-container">
                        <Navbar bg="light" expand="lg">
                            <Container>
                                <Navbar.Brand href="#home">T-SIMCard</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link><Link to="/entry">Entry</Link></Nav.Link>
                                    <Nav.Link><Link to="/record">Record</Link></Nav.Link>
                                </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </div>
                ) 
            }

        </>
    )
}

export default Topbar