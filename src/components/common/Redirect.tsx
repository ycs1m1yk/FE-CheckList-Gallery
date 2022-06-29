import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function Redirect() {
  useEffect(() => {
    alert('등록된 작가만 이용이 가능합니다.');
  }, []);
  return <Navigate to="/" />;
}

export default Redirect;
