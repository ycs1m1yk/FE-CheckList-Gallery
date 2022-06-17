import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.palette.triconblack};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;

const Info = styled.div`
  display: flex;
  width: 100%;
  height: 90px;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;

  & .logo {
    font-size: 40px;
  }
  & a {
    color: ${(props) => props.theme.palette.extrawhite};

    text-decoration: none;
    margin: 10px;
  }

  & .hamburger-bar {
    /* display:none; */
    color: ${(props) => props.theme.palette.extrawhite};
    margin: 20px;
    /* display: none; */
  }

  /* & li {
    display: none;
  } */

  & .hamburger-bar:hover {
    display: box;
  }

  @media ${(props) => props.theme.devices.mobile} {
    .hamburger-bar {
      display: none;
    }
  }

  @media ${(props) => props.theme.devices.desktop} {
    .login-info {
      display: none;
    }
    .hamburger-bar {
      display: box;
    }
    .hamburger-bar li {
      display: none;
    }
  }
`;

const Members = styled.div`
  height: 90px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  & div {
    width: 11.5rem;
  }

  & a {
    text-decoration: none;
    color: ${(props) => props.theme.palette.extrawhite};
  }
  @media ${(props) => props.theme.devices.desktop} {
    display: none;
  }
`;

export default function Header() {
  return (
    <Container>
      <Info>
        <a className="logo" href="/">
          🎨 CHECKLIST GALLERY
        </a>
        <div className="login-info">
          <a href="/">로그인</a>
          <a href="/">전시 소개</a>
        </div>
        <ul className="hamburger-bar">
          햄버거
          <li>김주현</li>
          <li>박민수</li>
          <li>설재혁</li>
          <li>이혜성</li>
          <li>장덕준</li>
          <li>김소리</li>
        </ul>
      </Info>
      <Members>
        <div />
        <a href="/">김주현</a>
        <a href="/">박민수</a>
        <a href="/">설재혁</a>
        <a href="/">이혜성</a>
        <a href="/">장덕준</a>
        <a href="/">김소리</a>
      </Members>
    </Container>
  );
}
