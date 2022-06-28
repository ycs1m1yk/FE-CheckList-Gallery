import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-image: url("https://i.gifer.com/81mz.gif");
  background-size: cover;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
`;

const TitleContainer = styled.div`
  color: white;
`;

const MainTitle = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  @media screen and ${(props) => props.theme.devices.mobile} {
    font-size: 2rem; 
  }
`;

const SubTitle = styled.div`
  font-size: 1.5rem;
  text-align: center;
  @media screen and ${(props) => props.theme.devices.mobile} {
    font-size: 1rem;
  }
`;

const EnterLink = styled(Link)`
  position: fixed;
  bottom: 30%;
  left: 45%;
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  border: 1px solid white;
  padding: 0.5rem;
  border-radius: 1rem;
  :hover {
    background-color: white;
    color: black;
    transition: all 0.3s ease-in-out;
    transform: scale(1.1);
  }

  @media screen and ${(props) => props.theme.devices.mobile} {
    left: 40%;
    bottom: 35%;
  }
`;

export default function Home() {
  return (
    <Container>
      <TitleContainer>
        <MainTitle>프론트엔드 개발자 기본 소양 전시회</MainTitle>
        <SubTitle>To be a great Front-end Developer</SubTitle>
        <EnterLink to="/gallery">들어가기</EnterLink>
      </TitleContainer>
    </Container>
  );
}
