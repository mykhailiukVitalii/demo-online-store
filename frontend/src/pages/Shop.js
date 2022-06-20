import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Context } from "../index";
import {observer} from "mobx-react-lite";
import ProductList from "../components/ProductList";
// import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceAPI";

const Shop = observer(() => {
  const { product } = useContext(Context);

  // useEffect(() => {
  //   fetchDevices(null, null, 1, 2).then(data => {
  //       device.setDevices(data.rows)
  //       device.setTotalCount(data.count)
  //   })
  // }, []);

  // useEffect(() => {
  //   fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 2).then(data => {
  //       device.setDevices(data.rows)
  //       device.setTotalCount(data.count)
  //   })
  // }, [device.page, device.selectedType, device.selectedBrand,]);

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