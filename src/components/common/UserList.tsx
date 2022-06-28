import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSearchParams, Link } from 'react-router-dom';
import { userApi } from '@lib/api';
import { IAuthorProps } from '@types/interface';

const AuthorList = styled.li`
  
`;

const AuthorLink = styled(Link)<{isMatch: boolean}>`
  width: 100%;
  border-bottom: ${(props) => (props.isMatch ? `3px solid ${props.theme.palette.africanruby}` : null)};
`;

const AuthorImg = styled.img``;

function getUser() {
  const [error, setError] = useState(null);
  const [users, setUsers] = useState<IAuthorProps[]>([]);
  const [params] = useSearchParams();
  const authorId = params.get('auth');

  const getUsersFromApi = async () => {
    try {
      const { data } = await userApi.getAllUser();
      setUsers(data);
    } catch (e: any) {
      setError(e);
    }
  };

  useEffect(() => {
    getUsersFromApi();
  }, []);

  const usersList = users.map((user) => (
    <AuthorList key={user._id}>
      <AuthorLink isMatch={authorId === user._id} to={`gallery?auth=${user._id}`}>
        <AuthorImg src={user.avatar} />
        {user.username}
      </AuthorLink>
    </AuthorList>
  ));

  return usersList;
}

export default getUser;
