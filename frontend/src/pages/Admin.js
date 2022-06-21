import React, {useState} from 'react';
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import CreateProduct from "../components/modals/CreateProduct";

const Admin = () => {
  const [productVisible, setProductVisible] = useState(false);

  return (
    <Container className="d-flex flex-column">
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setProductVisible(true)}
      >
        Create Product
      </Button>
      <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>
    </Container>
  );
}

export default Admin;