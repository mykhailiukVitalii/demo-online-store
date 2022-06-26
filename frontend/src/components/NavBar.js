import React, { useContext } from 'react';
import { Context } from '../index';
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/contstans';
import { observer } from 'mobx-react-lite';
import { useNavigate } from "react-router";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.clear();
        
        return navigate(SHOP_ROUTE);
    };
    const goToAdmin = () => {
        return navigate(ADMIN_ROUTE);
    };
    const goToLogin = () => {
        return navigate(LOGIN_ROUTE);
    };
    const goToHome = () => {
        return navigate(SHOP_ROUTE);
    };

    return (
            <Navbar style={{ width: "100%", backgroundColor: "#eee"}} variant="light">      
                <Container>                
                    <Nav.Link 
                        style={
                            { 
                                color: "black",
                                fontWeight: 900
                            }
                        }
                        onClick={goToHome}
                        >DEMO Store</Nav.Link>
                        {user.isAuth
                            ?
                            <Nav className="md-auto" style={{ color: "white" }}>
                                <Navbar.Text>
                                    Signed in as: <a>{user.name}</a> 
                                </Navbar.Text>
                                <Button 
                                    variant={"outline-dark"}
                                    style={{ marginLeft: "20px" }}
                                    onClick={goToAdmin}
                                >Admin Panel</Button>
                                <Button 
                                    variant={"outline-dark"}
                                    style={{ marginLeft: 20 }}
                                    onClick={logOut}
                                >Logout</Button>
                            </Nav>
                            :
                            <Nav className="ml-auto" style={{ color: "white" }}>
                                <Button variant={"outline-dark"} onClick={goToLogin}>Login</Button>
                            </Nav>
                        }                
                </Container>
            </Navbar>   
    );
});

// Navbar.propTypes = {

// };

export default NavBar;