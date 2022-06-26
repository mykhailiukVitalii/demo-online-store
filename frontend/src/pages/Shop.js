import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Context } from "../index";
import {observer} from "mobx-react-lite";
import ProductList from "../components/ProductList";
import {fetchProducts} from "../http/productAPI";

const Shop = observer(() => {
  const { product } = useContext(Context);

  useEffect(() => {
    // fetchProduct(null, 1, 4).then(data => {
    //     device.setDevices(data.rows)
    //     device.setTotalCount(data.count)
    // })
    fetchProducts().then(data => {
      console.log("data", data)
      product.setProducts(data)
    })
  }, []);

  // useEffect(() => {
  //   fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 2).then(data => {
  //       device.setDevices(data.rows)
  //       device.setTotalCount(data.count)
  //   })
  // }, [device.page, device.selectedType, device.selectedBrand,]);
// TODO: USE component which can filtered by comments/no comments
  return (
    <Container>
      <Row className="mt-2">
        <Col md={9}>
          <ProductList />
          {/* <Pages /> */}
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;