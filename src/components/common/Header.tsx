import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import GitHubOauth from '@components/auth/GitHubOauth';
import GetUser from './UserList';

const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.palette.triconblack};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  margin-bottom: 1rem;
  height: 8rem;
  @media ${(props) => props.theme.devices.mobile} {
    height: 5rem;
  }
`;

const Info = styled.div`
  display: flex;
  width: 100%;
  height: 90px;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;

  & .logo {
    font-size: 40px;
  }
  & a {
    color: ${(props) => props.theme.palette.extrawhite};

    text-decoration: none;
    margin: 10px;
  }
  & button {
    background-color: none;
    border: none;
  }
  .hamburger-bar {
    color: ${(props) => props.theme.palette.extrawhite};
    margin: 20px;
  }
  .login-info {
    display: flex;
  }

  button {
    height: 100%;
    font-size: 1.5rem;
    font-weight: bold;
    color: #727272;
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
      cursor: pointer;
    }
    .hamburger-member {
      display: none;
    }

    .hamburger-bar:hover {
      .hamburger-member {
        display: flex;
        background-color: ${(props) => props.theme.palette.lobelia};
        flex-direction: column;
        display: flex;
        align-items: flex-start;
        position: absolute;
        right: 0;
        z-index: 100;
        border-radius: 30px;
        padding: 0.2rem;
        & li {
          color: ${(props) => props.theme.palette.extrawhite};
          display: flex;
          flex-direction: flex-start;
          justify-content: center;
          align-items: center;
          & a {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        & img {
          border-radius: 100%;
          width: 38px;
          border: 3px solid ${(props) => props.theme.palette.extrawhite};
          margin-right: 10px;
        }
      }
    }
  }
`;

const Members = styled.div`
  height: 90px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  & a {
    text-decoration: none;
    color: ${(props) => props.theme.palette.extrawhite};
  }

  & ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  & li a {
    color: ${(props) => props.theme.palette.extrawhite};
    display: flex;
    justify-content: center;
    align-items: center;
    padding:0;
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
  const loginUri = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_AUTH_CALLBACK}`;
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  function handleAuth() {
    if (token) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('authorId');

      navigate('/');
    } else {
      window.location.href = loginUri;
    }
  }
  return (
    <Container>
      <Info>
        <Link className="logo" to="/">
          🎨 CHECKLIST GALLERY
        </Link>
        <div className="login-info">
          <GitHubOauth token={token} handleAuth={handleAuth} />
        </div>
        <ul href="#" className="hamburger-bar">
          <FontAwesomeIcon icon={faBars} />
          <div className="hamburger-member">
            <GitHubOauth token={token} handleAuth={handleAuth} />
            <GetUser />
          </div>
        </ul>
      </Info>
      <Members>
        <ul>
          <li>
            <Link to="/gallery">전체보기</Link>
          </li>
          <GetUser />
        </ul>
      </Members>
    </Container>
  );
}
