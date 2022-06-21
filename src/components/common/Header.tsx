import React from 'react';
import styled from 'styled-components';
// import { theme } from '../../styles/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
// import getUser from './UserList';
import GetUser from './UserList';

const LOGIN_URL = 'http://ec2-3-128-87-34.us-east-2.compute.amazonaws.com/auth/github';
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
    color: ${(props) => props.theme.palette.extrawhite};
    margin: 20px;
  }

  /* & li {
    display: none;
  } */

  & .hamburger-bar:hover {
    display: box;
  }

  @media ${(props) => props.theme.devices.desktop} {
    .hamburger-bar {
      display: none;
    }
  }

  @media ${(props) => props.theme.devices.mobile} {
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

  & li {
    color: ${(props) => props.theme.palette.extrawhite};
    display: flex;
    /* flex-direction: center; */
    justify-content: center;
    align-items: center;
  }

  & img {
    border-radius: 100%;
    width: 38px;
    border: 3px solid ${(props) => props.theme.palette.extrawhite};
    margin: 10px;
  }
  @media ${(props) => props.theme.devices.mobile} {
    display: none;
  }
`;

export default function Header() {
  // const { user, setUser } = useState(getUser);
  // console.log(user);
  return (
    <Container>
      <Info>
        <a className='logo' href='/'>
          🎨 CHECKLIST GALLERY
        </a>
        <div className='login-info'>
          <a href={LOGIN_URL}>로그인</a>
          <a href='/'>전시 소개</a>
        </div>
        <ul className='hamburger-bar'>
          <FontAwesomeIcon icon={faBars} />
        </ul>
      </Info>
      <Members>
        <div></div>
        <GetUser />
      </Members>
    </Container>
  );
}
