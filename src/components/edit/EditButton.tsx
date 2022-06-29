import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const EditBtn = styled.button`
  color: white;
  border-radius: 5px;
  background-color: ${(props) => props.theme.palette.extrawhite};
  border: ${(props) => props.theme.palette.triconblack};
  border-radius: 5px;
  box-sizing: border-box;
  width: 5rem;
  padding: 0.1rem 0rem;
  transition: all ease 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.palette.triconblack};
    border: 1px white solid;
    color: white;
  }
`;

function EditButton() {
  return (
    <Link to="/edit">
      <EditBtn>Edit</EditBtn>
    </Link>
  );
}

export default EditButton;
