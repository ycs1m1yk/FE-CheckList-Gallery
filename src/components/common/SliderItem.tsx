import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ICategoryListProps } from '@types/interface';
import noImage from '@images/noImage.jpeg';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderItemContainer = styled.div`
  width: 50rem;
  height: 33rem;
  margin: 0 0;
  border-radius: 5%;
  background-color: ${(props) => props.theme.palette.extrawhite};

  @media screen and (max-width: 767px) {
    width: 30rem;
    height: 28rem;
  }
`;

const ItemHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.3rem;
`;

const SliderItemCreated = styled.span`
  font-size: 1.3rem;
  margin-left: 1rem;
`;

const SliderItemAuthor = styled.span`
  font-size: 1.3rem;
  margin-right: 1rem;
`;

const SliderItemImage = styled.img`
  cursor: pointer;
  box-sizing: border-box;
  width: 30rem;
  height: 20rem;
  padding: 2rem;
  margin: 1rem auto;
  @media screen and (max-width: 767px) {
    width: 20rem;
    height: 15rem;
  }
`;

const SliderItemTitle = styled.div`
  font-size: 2rem;
  text-align: center;
`;

const SliderItemDescription = styled.div`
  font-size: 1.2rem;
  text-align: center;
  margin: 1rem;
`;

const SliderItemTagContainer = styled.div`
  text-align: end;
  margin-top: 1rem;
  & :last-child {
    margin-right: 1rem;
  }
  @media screen and (max-width: 767px) {
    text-align: center;
    margin-top: 2rem;
  }
`;

const SliderItemTag = styled(Link)`
  background-color: ${(props) => props.theme.palette.triconblack};
  margin-left: 0.5rem;
  padding: 0.5rem;
  color: white;
  border-radius: 10%;
  text-decoration: none;
`;

function SliderItem({ post }: any) {
  const handleNavigate = () => {
    location.href = `/gallery/${post._id}`;
  };

  return (
    <Container>
      <SliderItemContainer>
        <ItemHeaderContainer>
          {post.createdAt && <SliderItemCreated>{post.createdAt.slice(0, 10)}</SliderItemCreated>}
          {post.author && (
            <SliderItemAuthor>
              Made By
              {' '}
              {post.author.username}
            </SliderItemAuthor>
          )}
        </ItemHeaderContainer>
        <SliderItemImage
          onClick={handleNavigate}
          src={post.thumbnail ? post.thumbnail.fileUrl : noImage}
        />
        <SliderItemTitle>{post.title}</SliderItemTitle>
        <SliderItemDescription>
          {post.description.length > 50 ? `${post.description.slice(0, 50)}...` : post.description}
        </SliderItemDescription>
        <SliderItemTagContainer>
          {post.categories.map(({ category }: ICategoryListProps) => (
            <SliderItemTag to={`/gallery?tag=${category._id}`}>{category.name}</SliderItemTag>
          ))}
        </SliderItemTagContainer>
      </SliderItemContainer>
    </Container>
  );
}

export default SliderItem;
