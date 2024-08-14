import styled from "styled-components";
import { Container, Modal } from "react-bootstrap";
import ModalComponent from "../Modal/Modal";

const HeroComponent = styled.header`
  height: 60vh;
  padding: 5rem 0;
  background-image: url("https://images.unsplash.com/photo-1471782517485-c81d26d8572c?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: cover;
  background-position: center;
  color: white;
`;

const HeaderContainer = styled.div`
  background-color: #282c34;
  padding: 3rem;
  color: white;
  width: 32.5rem;
`;

const Heading = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const SubHeading = styled.h3`
  margin: 1 rem 0;
  font-weight: 400;
`;

const Hero = () => {
  return (
    <HeroComponent>
      <Container>
        <HeaderContainer>
          <Heading>Hello World</Heading>
          <SubHeading>Subheading</SubHeading>
          <ModalComponent />
        </HeaderContainer>
      </Container>
    </HeroComponent>
  );
};

export default Hero;
