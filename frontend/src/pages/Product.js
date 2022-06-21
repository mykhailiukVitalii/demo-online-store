import React from "react";
import { Container, Button, Row, Col, Image, Card } from "react-bootstrap";
import {useNavigate} from "react-router";

function Product() {
  let navigate = useNavigate();

  function prevPage() {
    navigate(-1)
  };

  const product =             {
    id: 1,
    name: "Iphone 13",
    price: 959,
    img: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-3.jpg",
    comment: [
      {
        id: 1,
        comment: "Iphone 13: Contrary to popular belief, Lorem Ipsum is not simply random text."        
      },
      {
        id: 2,
        comment: "NEW Iphone 13: Contrary to popular belief, Lorem Ipsum is not simply random text."        
      }
    ]
  };

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
          <Image width={350} height={260} src={product.img}/>
        </Col>
        <Col md={4} className="mt-4">
          <Card
              className="d-flex flex-column align-items-center justify-content-around"
              style={{width: 600, height: 250, fontSize: 32, border: '1px solid lightgray'}}
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
          {product.comment.map((comment, index) =>
              <Row key={comment.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                  {comment.comment}
              </Row>
          )}
        </Row>
    </Container>
    
  );
}

export default Product;