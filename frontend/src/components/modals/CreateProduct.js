import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
// import {createProduct, fetchBrands, fetchDevices, fetchTypes} from "../../http/deviceAPI";
import { observer } from 'mobx-react-lite';

const CreateDevice = observer(({show, onHide}) => {
    const {product} = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState(''); 
    const [comment, setComment] = useState([]);

    const addComment = () => {
        setComment([...comment, {comment: '', number: Date.now()}]);
    };
    const removeComment = (number) => {
        setComment(comment.filter(i => i.number !== number));
    };
    const changeComment = (key, value, number) => {
        setComment(comment.map(i => i.number === number ? {...i, [key]: value} : i))
    };

    // const addProduct = () => {
    //     const formData = new FormData();
    //     formData.append('name', name)
    //     formData.append('price', `${price}`)
    //     formData.append('img', file)
    //     formData.append('comment', JSON.stringify(comment))
    //     createProduct(formData).then(data => onHide())
    // };
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    New Product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Enter product name..."
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Enter product price..."
                        type="number"
                    />
                    <Form.Control
                        value={img}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Enter product image link..."
                    />
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addComment}
                    >
                        Add new comment
                    </Button>
                    {comment.map(i =>
                        <Row className="mt-4" key={i.number}>
                            <Col md={9}>
                                <Form.Control
                                    value={i.comment}
                                    onChange={(e) => changeComment('comment', e.target.value, i.number)}
                                    placeholder="Enter comment..."
                                />
                            </Col>
                            <Col md={2}>
                                <Button
                                    onClick={() => removeComment(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Remove
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" 
                    // onClick={addDevice}
                >
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    )
});

export default CreateDevice;