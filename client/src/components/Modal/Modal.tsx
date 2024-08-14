import { Modal, Button, InputGroup, FormControl, Form } from "react-bootstrap";
import { useState } from "react";

const ModalComponent = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow}>Sign Up</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* input group for email */}
          <InputGroup className="mb-3">
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl type="email" />
          </InputGroup>
          {/* input group for password */}
          <InputGroup className="mb-3">
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl type="password" />
          </InputGroup>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalComponent;
