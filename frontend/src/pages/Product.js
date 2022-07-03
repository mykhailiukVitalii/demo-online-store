import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col, Image, Card } from "react-bootstrap";
import {useNavigate, useParams} from "react-router";
import {fetchOneProduct, fetchProductComments} from "../http/productAPI";

function Product() {
  let navigate = useNavigate();

  function prevPage() {
    navigate(-1)
  };
  const [product, setProduct] = useState({info: []});
  const [comment, setComment] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    fetchOneProduct(id).then(data => setProduct(data));
    fetchProductComments(id).then(data => setComment(data))
  }, []);

  return (
    <Container className="mt-3">
      <Row>
        <Button
          className="mt-2"
          style={
            {
              marginTop: "50px",
              marginBottom: "50px",
              marginLeft: "20px",
              width: "200px"
            }
          }
          variant={"outline-secondary"}
          onClick={prevPage}
          >
          Previous page
        </Button>
      </Row>
      <Row>
        <Col md={4} className="mt-3">
          <Image width={280} height={360} src={product.img}/>
        </Col>
        <Col md={4} className="mt-4">
          <Card
              className="d-flex flex-column align-items-center justify-content-around"
              style={{width: 600, height: 350, border: '5px solid lightgray'}}
            >
              <h1>{product.name}</h1>
              <h3 className={"text-black-50"}>Start price from: {product.price} $.</h3>
          </Card>
        </Col>
      </Row>
      <Row 
        className="d-flex flex-column">
          <h2
            style={
              {
                marginTop: "60px"
              }
            }>Comments:
          </h2>
          {comment.length > 0
            ?
            comment.map((comment, index) =>
                <Row key={comment.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 20, fontSize: "25px"}}>
                    {comment.comment}
                </Row>
            )
            :
            <Row style={{background: 'lightgray', padding: 20, fontSize: "20px"}}>
              <i>No comments created before...</i>
            </Row>
          }
        </Row>
    </Container>    
  );
}

export default Product;