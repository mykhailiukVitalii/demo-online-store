import React, { useContext, useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Card, Container, Form, Row, Button } from "react-bootstrap";
import { Context } from "../index";
import { REGISTRATION_ROUTE, LOGIN_ROUTE } from "../utils/contstans";
import { useNavigate } from "react-router";
import { login, registration } from '../http/userAPI';
import { SHOP_ROUTE } from '../utils/contstans';

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  //HOOK state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null)

  const click = async () => {
    try {
      let data;

      if (isLogin) {      
        data = await login(email, password); //TODO: refactoring ? :        
        setError(null);
      } else {      
        data = await registration(email, password);
        setError(null);
      }
      user.setUser(user);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);

    }
    catch(err) {
      console.log("ERROR", err.response.data.message)
      setError(err.response.data.message);
    }
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 55 }}>

      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Login' : "Sign In"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Enter your email..."
            value={email}
            onChange={e => setEmail(e.target.value)}
            id="data-qa_auth_email-input"
          />
          <Form.Control
            className="mt-3"
            placeholder="Enter your password..."
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            id="data-qa_auth_pwd-input"
          />
          <div id="data-qa_auth_login-error" style={{color: "red"}}>
            {
              error ? "Ooops: " + error : ""
            }
          </div>
          <Row className="d-flex justify-content-between align-items-center mt-3 pl-3 pr-3">
            {isLogin ?
              <div id="data-qa_auth-msg">
                Don't have an account? <NavLink to={REGISTRATION_ROUTE}>Sign In!</NavLink>
              </div>
              :
              <div>
                Have an account? <NavLink to={LOGIN_ROUTE}>Login!</NavLink>
              </div>
            }
            <Button
              variant={"outline-success"}
              style={
                { marginTop: "20px" }
              }
              onClick={click}
              id="data-qa_auth_success-btn"
            >
          
              {isLogin ? 'Login' : 'Sign In'}
            </Button>
          </Row>
        </Form>
      </Card>

    </Container>
  );
});

export default Auth;