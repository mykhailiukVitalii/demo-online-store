import React, { useContext } from 'react';
import { Context } from '../index';
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { SHOP_ROUTE } from '../utils/contstans';
import { observer } from 'mobx-react-lite';
// import PropTypes from 'prop-types';

const NavBar = observer(() => {
    const { user } = useContext(Context);

    return (
            <Navbar style={{ width: "100%", backgroundColor: "#eee"}} variant="light">      
                <Container>                
                    <Nav.Link style={{ color: "black" }} to={SHOP_ROUTE}>DEMO Store</Nav.Link>
                    {user.isAuth
                        ?
                        <Nav className="md-auto" style={{ color: "white" }}>
                            <Navbar.Text>
                                {/* TODO: set using user.name */}
                                Signed in as: <a>Demo User</a> 
                            </Navbar.Text>
                            <Button variant={"outline-dark"} style={{ marginLeft: 20 }}>Admin Panel</Button>
                            <Button variant={"outline-dark"} style={{ marginLeft: 20 }}>Logout</Button>
                        </Nav>
                        :
                        <Nav className="ml-auto" style={{ color: "white" }}>
                            <Button variant={"outline-dark"} onClick={() => user.setIsAuth(true)}>Login</Button>
                        </Nav>
                    }                
                </Container>
            </Navbar>   
    );
});

// Navbar.propTypes = {

// };

export default NavBar;