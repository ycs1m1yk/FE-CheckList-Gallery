import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';
import { authApi } from '../../lib/api';

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
          window.localStorage.setItem('token', response.token);
          window.localStorage.setItem('user', response.username);
          // setToken((token) => !token);
          navigate('/');
        })
        .catch((e) => {
          alert(e);
          navigate('/');
        });
    }
  }, []);
  return <Loader />;
}
