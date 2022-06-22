import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  /* color: ${(props) => props.theme.palette.triconblack}; */
  background-color: ${(props) => props.theme.palette.extrawhite};
  padding: 6px;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  width: 120px;
  transition: all ease 0.3s;
  border: ${(props) => props.theme.palette.triconblack};

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
      <StyledBtn>publish</StyledBtn>
    </Link>
  );
}

export default PublishBtn;
