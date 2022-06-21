import React, { useEffect, useState } from 'react';
import { userApi } from '../../lib/api';
import { IAuthorProps } from '../../types/interface';

function getUser() {
  const [error, setError] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<IAuthorProps[]>([]);
  // const [userId, setUserId] = useState;

  const getUsersFromApi = async () => {
    try {
      const { data } = await userApi.getAllUser();
      console.log(data);
      setUsers(data);
    } catch (e: any) {
      setError(e);
    }
  };
  // const getUserByIdFromApi = async () => {
  //   try {
  //     const {data} = await userApi.getUserById();

  //   }
  // }
  useEffect(() => {
    getUsersFromApi();
  }, []);

  const usersList = users.map((user) => (
    <li key={user._id}>
      <a href={`gallery?auth=${user._id}`}>
        <img src={user.avatar}></img>
        {user.username}
      </a>
    </li>
  ));

  return usersList;
}

export default getUser;
