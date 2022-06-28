import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 200px;
`;

const Text = styled.span`
  color: ${(props) => props.color};
  font-size: 1.3rem;
`;

function Message({ color, message }: {color: string, message: string}) {
  return <Container><Text color={color}>{message}</Text></Container>;
}

export default Message;
