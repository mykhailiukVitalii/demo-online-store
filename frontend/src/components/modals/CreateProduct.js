import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form } from "react-bootstrap";
// import {Context} from "../../index";
import {createProduct} from "../../http/productAPI";
import { observer } from 'mobx-react-lite';

const CreateDevice = observer(({show, onHide}) => {
    // const { product } = useContext(Context);
    // const {comment} = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState('');
    const [error, setError] = useState(null)

    //TODO: WIP if you have free time
    // const addComment = () => {
    //     try {           
    //         await createComment({name, price, img});
    //     }
    //     catch(err) {
    //         console.log("ERROR", err.response.data.message)
    //         setError(err.response.data.message);
    //     }
    // };

    const addProduct = async () => {
        try {           
            const data = await createProduct({name, price, img});

            return (data) ? onHide() : show();
        }
        catch(err) {
            console.log("ERROR", err.response.data.message)
            setError(err.response.data.message);
        }
    };

    const clearError = async () => {
        setError("");

        return onHide();
    };

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
                        placeholder="Enter price..."
                        type="number"
                    />
                    <Form.Control
                        value={img}
                        onChange={e => setImg(e.target.value)}
                        className="mt-3"
                        placeholder="Enter image link..."
                    />
                    <hr/>
                    {/* TODO: WIP if you have free time */}
                    {/* <Button
                        variant={"outline-dark"}
                        // onClick={addComment}
                    >
                        Add new comment
                    </Button>                     */}
                    {/* {comment.map(i =>
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
                    )} */}
                </Form>
            </Modal.Body>
            <div data-qa="create-product-error" style={{color: "red", textAlign: "center", marginBottom: "15px"}}>
                {
                    error ? "Ooops: " + error : ""
                }
            </div>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={clearError}>Close</Button>
                <Button variant="outline-success" 
                    onClick={addProduct}
                >
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    )
});

export default CreateDevice;