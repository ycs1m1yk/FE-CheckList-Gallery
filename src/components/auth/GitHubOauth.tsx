import styled from 'styled-components';
import IconW from '../../images/GithubIconWhite.png';
import PublishBtn from '../common/PublishBtn';

const GithubButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.palette.extrawhite};
  padding: 6px;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  width: 120px;
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
      background-image: url('../../images/GithubIconWhite.png');
    }
  }
`;

const LoginP = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #727272;
`;

const LoginImg = styled.img`
  width: 26px;
  height: 26px;
  margin-right: 16px;
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
