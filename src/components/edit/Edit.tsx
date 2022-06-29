import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { postApi } from '../../lib/api';
import { IAllPostProps } from '../../types/interface';

const PostList = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 360px;
  margin: 0 auto;
`;

const PostItem = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.3rem;
  margin: 1rem 0rem;
  width: 360px;
  border: 1px solid ${(props) => props.theme.palette.triconblack};
  border-radius: 1rem;
  padding: 1rem;
`;

const PostTitle = styled.span`
  cursor: pointer;
  margin-top: 0.5rem;
`;

const DeleteButton = styled.button`
  position: relative;
  margin-left: 50%;
  width:3rem;
  height: 2rem;
  border: none;
  border-radius: 5px;
  padding: 10px;
  background-color: ${(props) => props.theme.palette.lobelia} ;
  color:  ${(props) => props.theme.palette.extrawhite};
  &:hover{
    cursor:pointer;
  }
`;

function Edit() {
  const [posts, setPosts] = useState<IAllPostProps[]>([]);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

  const authorId = window.localStorage.getItem('authorId');
  const token = window.localStorage.getItem('token');

  const getAuthorPostFromApi = async () => {
    const { data } = await postApi.getAllPosts({ authorId });
    setPosts(data);
  };

  const handleRouteDetail = (postId) => {
    navigate(`/gallery/${postId}`);
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
          <PostTitle onClick={(e) => handleRouteDetail(post._id)}>{post.title}</PostTitle>
          {/* <DeleteButton onClick={(e) => handleDelete(post._id)}>삭제</DeleteButton> */}
          <DeleteButton onClick={(e) => handleDelete(post._id)}>삭제</DeleteButton>
        </PostItem>
      ))}
    </PostList>
  );
}

export default Edit;
