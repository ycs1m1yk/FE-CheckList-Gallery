import React from 'react';
import styled from 'styled-components';

const PublishBtn = styled.a`
  /* display: none; */

  .btn {
    display: none;
  }
  . active {
    display: box;
    background-color: green;
  }
`;

function Publish() {
  const token = localStorage.getItem('token');
  console.log(token);
  return (
    <PublishBtn href='/publish'>
      <button className={token ? 'active' : 'btn'}>publish</button>
    </PublishBtn>
  );
}

export default Publish;
