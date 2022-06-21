import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useNavigate} from "react-router"
import {PRODUCT_ROUTE} from "../utils/contstans";

const ProductItem = ({product}) => {
    const navigate = useNavigate();
    
    const openProduct = () => {
        return navigate(PRODUCT_ROUTE + '/' + product.id)
    }

    return (
        <Col md={3} className={"mt-3"} onClick={openProduct}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                {/* <Image width={150} height={150} src={process.env.REACT_APP_API_URL + product.img}/> */}
                <Image width={200} height={250} src={product.img}/>
                <div style={{textAlign: "center", marginTop: "20px", marginLeft: "auto"}}>
                    <div>{product.name}</div>
                    <div className={"text-black-50 mt-1"}>
                        <div>Price: {product.price} $</div>
                    </div>
                </div>                
            </Card>
        </Col>
    );
};
export default ProductItem;