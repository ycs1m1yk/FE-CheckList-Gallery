import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { postApi } from '../../lib/api';
import { IAllPostProps } from '../../types/interface';
import Loader from '../common/Loader';

const TagLink = styled(Link)`
  text-decoration: none;
`;

const BodyBox = styled.div`
  margin-bottom: 40px;
  font-size: 24px;
`;

const TagBox = styled.div`
  display: flex;
  margin-bottom: 40px;
  & a {
    margin-right: 10px;
    font-size: 16px;
    background-color: ${(props) => props.theme.palette.triconblack};
    color: white;
    border-radius: 10px;
    padding: 6px 12px;
    line-height: 20px;
    text-align: center;
  }
`;

const Line = styled.hr`
  margin: 24px 0;
`;

const DetailTitleBox = styled.div`
  font-size: 40px;
  font-weight: bold;
`;

const DetailContainer = styled.div`
  padding: 30px 30px;
  width: 100%;
  box-sizing: border-box;
`;

function Title({ title }: any) {
  return (
    <DetailTitleBox>
      <h2>{title}</h2>
      <Line />
    </DetailTitleBox>
  );
}

function Tags({ category }: any) {
  return (
    <TagBox>
      {category.map((ct: any) => (
        <TagLink key={ct._id} to={`/gallery?tag=${ct.category._id}`}>
          {ct.category.name}
        </TagLink>
      ))}
    </TagBox>
  );
}

function Body({ description }: any) {
  return (
    <BodyBox>
      <p>{description}</p>
    </BodyBox>
  );
}

export default function Detail() {
  const [post, setPost] = useState<IAllPostProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { postId } = useParams();

  const getPostFromApi = async () => {
    try {
      const { data } = await postApi.getPostById(postId);
      setPost(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPostFromApi();
  }, []);
  console.log(post);

  return isLoading ? (
    <Loader />
  ) : (
    <DetailContainer>
      <Title title={post?.title} />
      <Tags category={post?.categories} />
      <Body description={post?.description} />
    </DetailContainer>
  );
}
