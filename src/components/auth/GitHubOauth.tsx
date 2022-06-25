import styled from 'styled-components';
import IconW from '@images/GithubIconWhite.png';
import PublishBtn from '@components/common/PublishBtn';

const GithubButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.palette.extrawhite};
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  width: 8rem;
  height: 2rem;
  transition: all ease 0.3s;
  border: ${(props) => props.theme.palette.triconblack};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.palette.triconblack};
    border: 1px white solid;
    & p {
      color: white;
    }

    & img {
      background-image: url('@images/GithubIconWhite.png');
    }
  }
`;

const LoginP = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  color: #727272;
`;

const LoginImg = styled.img`
  width: 1.3rem;
  height: 1.3rem;
  margin-right: 0.5rem;
`;

export default function GitHubOauth({ token, handleAuth }) {
  return (
    <>
      {token ? <PublishBtn /> : null}
      <GithubButton onClick={handleAuth}>
        <LoginImg src={IconW} />
        <LoginP>{token ? 'Logout' : 'Login'}</LoginP>
      </GithubButton>
    </>
  );
}
