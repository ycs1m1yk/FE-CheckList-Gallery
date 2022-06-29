import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { postApi } from '../../lib/api';
import { IAllPostProps } from '../../types/interface';

const PostList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const PostItem = styled.div`
  font-size: 1.3rem;
  margin: 1rem 0rem;
  width: 30%;
  border: 1px solid ${(props) => props.theme.palette.triconblack};
  border-radius: 1rem;
  padding: 1rem;
  text-align: center;
  justify-self: self-end;
`;

const DeleteButton = styled.button`
`;

function Edit() {
  const [posts, setPosts] = useState<IAllPostProps[]>([]);
  const [flag, setFlag] = useState(false);

  const authorId = window.localStorage.getItem('authorId');
  const token = window.localStorage.getItem('token');

  const getAuthorPostFromApi = async () => {
    const { data } = await postApi.getAllPosts({ authorId });
    setPosts(data);
  };

  const handleDelete = async (postId: string) => {
    try {
      const response = await postApi.deletePost(postId, token);
      if (response.status === 200) {
        alert('삭제 완료');
        setFlag((prev) => !prev);
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    getAuthorPostFromApi();
  }, [flag]);

  return (
    <PostList>
      {posts.map((post) => (
        <PostItem key={post._id}>
          {post.title}
          <DeleteButton onClick={(e) => handleDelete(post._id)}>삭제</DeleteButton>
        </PostItem>
      ))}
    </PostList>
  );
}

export default Edit;
