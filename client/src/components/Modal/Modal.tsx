import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react";

interface ModalProps {
  text: string;
  variant: "primary" | "danger";
}

const ModalComponent = ({ text, variant }: ModalProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  <>
    <Button
      onClick={handleShow}
      variant={variant}
      size="lg"
      style={{ marginRight: "1rem", padding: "0.5rem 3rem" }}
    >
      {text}
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{text}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* input group for email */}
        <InputGroup className="mb-3">
          <InputGroup.Text>Email</InputGroup.Text>
          <FormControl type="email" id="email" />
        </InputGroup>
        {/* input group for password */}
        <InputGroup className="mb-3">
          <InputGroup.Text>Password</InputGroup.Text>
          <FormControl type="password" id="password" />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">{text}</Button>
      </Modal.Footer>
    </Modal>
  </>;
};

export default ModalComponent;
