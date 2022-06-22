import React, { useEffect, useState } from 'react';
import { userApi } from '../../lib/api';
import { IAuthorProps } from '../../types/interface';

function getUser() {
  const [error, setError] = useState(null);
  const [users, setUsers] = useState<IAuthorProps[]>([]);

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
    <li key={user._id}>
      <a href={`gallery?auth=${user._id}`}>
        <img src={user.avatar} />
        {user.username}
      </a>
    </li>
  ));

  return usersList;
}

export default getUser;
