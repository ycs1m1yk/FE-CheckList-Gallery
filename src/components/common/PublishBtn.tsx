import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.palette.extrawhite};
  border-radius: 5px;
  box-sizing: border-box;
  width: 8rem;
  transition: all ease 0.3s;
  border: ${(props) => props.theme.palette.triconblack};
  cursor: pointer;
  & .btn {
    display: none;
  }
  & .active {
    display: box;
  }

  &:hover {
    background-color: ${(props) => props.theme.palette.triconblack};
    border: 1px white solid;
    color: white;
  }
`;

function PublishBtn() {
  return (
    <Link to="publish">
      <StyledBtn>Publish</StyledBtn>
    </Link>
  );
}

export default PublishBtn;
