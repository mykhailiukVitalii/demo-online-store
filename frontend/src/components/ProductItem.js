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
        <Col md={4} className={"mt-3"} onClick={openProduct}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={280} height={350} src={product.img}/>
                <div style={{textAlign: "center", marginTop: "20px", marginLeft: "auto"}}>
                    <div>{product.name}</div>
                    <div className={"text-black-50 mt-2"}>
                        <div>Price: {product.price} $</div>
                    </div>
                </div>                
            </Card>
        </Col>
    );
};
export default ProductItem;