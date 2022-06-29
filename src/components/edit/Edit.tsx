import React from 'react';

function Edit() {
  const authorId = window.localStorage.getItem('authorId');
  console.log(authorId);
  return <div>Edit</div>;
}

export default Edit;
