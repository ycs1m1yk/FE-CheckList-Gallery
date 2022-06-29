import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import Loader from '@components/common/Loader';
import { IAllPostProps } from '@types/interface';
import { postApi } from '@lib/api';
import { DetailViewer } from '@lib/DetailViewer';
import { MarkdownViewer } from '../../lib/Markdown';

const TagLink = styled(Link)`
  text-decoration: none;
`;

const BodyBox = styled.div`
  margin-bottom: 40px;
`;

const TagBox = styled.div`
  display: flex;
  margin-bottom: 40px;
  margin-top: 20px;
  & a {
    margin-right: 10px;
    background-color: ${(props) => props.theme.palette.triconblack};
    color: white;
    border-radius: 10px;
    padding: 6px 12px;
    line-height: 20px;
    text-align: center;
  }
`;

const Container = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
`;

const DetailContainer = styled.div`
  width: 60%;
  @media screen and ${(props) => props.theme.devices.desktop}{

  }
   @media screen and ${(props) => props.theme.devices.mobile}{
    width: 90%;
  }

  & h2{
    margin: 20px 0;
  }
  & h4{
    margin: 5px;
    line-height: 20px;
  }
`;

function Title({ title }: any) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}

function Tags({ categories }: any) {
  return (
    <TagBox>
      {categories.map((ct: any) => (
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
      <MarkdownViewer text={description}></MarkdownViewer>
    </BodyBox>
  );
}

export default function Detail() {
  const [post, setPost] = useState<IAllPostProps | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { postId } = useParams();

  const getPostFromApi = async () => {
    try {
      const { data } = await postApi.getPostById(postId);
      console.log(data);
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

  return isLoading ? (
    <Loader />
  ) : (
    <Container>
      <DetailContainer>
        <Title title={post?.title} />
        <Tags categories={post?.categories} />
        <Body description={post?.description} />
        <DetailViewer files={post?.code} />
      </DetailContainer>
    </Container>
  );
}
