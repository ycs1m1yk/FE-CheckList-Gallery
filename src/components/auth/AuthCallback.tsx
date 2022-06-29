import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Loader from '@components/common/Loader';
import { authApi } from '@lib/api';

export default function AuthCallback() {
  const navigate = useNavigate();

  const [query] = useSearchParams();
  const code = query.get('code');
  useEffect(() => {
    if (code) {
      authApi
        .getAuthToken(code)
        .then((data) => {
          const response = data.data;
          console.log(response);
          window.localStorage.setItem('token', response.token);
          window.localStorage.setItem('user', response.username);
          window.localStorage.setItem('authorId', response.userId);
          navigate('/gallery');
        })
        .catch((e) => {
          alert(e);
          navigate('/gallery');
        });
    }
  }, []);
  return <Loader />;
}
