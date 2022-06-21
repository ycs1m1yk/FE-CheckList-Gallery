import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Icon from '../../images/GithubIcon.png';
import IconW from '../../images/GithubIconWhite.png';


const GithubButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.palette.extrawhite};
  padding: 6px;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  width: 120px;
  transition: all ease 0.3s;
  border: ${props => props.theme.palette.triconblack};
  &:hover {
    background-color: ${props => props.theme.palette.triconblack};
    border: 1px white solid;
    & p {
      color: white;
    }

    & img {
      background-image: url('../../images/GithubIconWhite.png')
    }
  }
`;

const LoginP = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: black;
`

const LoginImg = styled.img`
    width: 26px;
    height: 26px;
    margin-right: 16px;
`



export default function GitHubOauth() {
  const loginUri = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_AUTH_CALLBACK}`;
  console.log(loginUri);
  return (
    <GithubButton href={loginUri}>
      <LoginImg src={IconW} />
      <LoginP>로그인</LoginP>
    </GithubButton>
  );
}
