import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  text: string;
  variant: "primary" | "secondary" | "danger";
  isSignupFlow: boolean;
}

const ErrorMessage = styled.p`
  color: red;
`;

const ModalComponent = ({ text, variant, isSignupFlow }: ModalProps) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = async () => {
    try {
      let response;
      if (isSignupFlow) {
        const { data: signUpData } = await axios.post(
          "http://localhost:8080/auth/signup",
          {
            email,
            password,
          }
        );
        response = signUpData;
      } else {
        const { data: loginData } = await axios.post(
          "http://localhost:8080/auth/login",
          {
            email,
            password,
          }
        );
        response = loginData;
      }

      if (response.errors?.length) {
        return setErrorMsg(response.errors[0].msg);
      }

      localStorage.setItem("token", response.data.token);

      // Navigate to a different page on successful login/signup
      navigate("/dashboard");
      handleClose(); // Close the modal
    } catch (error) {
      setErrorMsg("An error occurred. Please try again.");
    }
  };

  return (
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
        <Modal.Header closeButton>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl
              type="email"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* emails are case sensative? weird */}
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl
              type="password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            {text}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
