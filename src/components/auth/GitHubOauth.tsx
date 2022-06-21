import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const GithubButton = styled.a`
`;

export default function GitHubOauth() {
  const loginUri = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_AUTH_CALLBACK}`;
  console.log(loginUri);
  return (
    <GithubButton href={loginUri}>
      <button>로그인</button>
    </GithubButton>
  );
}
