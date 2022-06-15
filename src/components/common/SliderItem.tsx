import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ICategoryListProps } from "../../types/interface";
import noImage from "../../images/noImage.jpeg";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderItemContainer = styled.div`
  width: 50rem;
  height: 33rem;
  margin: 2rem 0;
  border-radius: 5%;
  background-color: ${(props) => props.theme.palette.extrawhite};

  @media screen and (max-width: 767px) {
    width: 30rem;
    height: 25rem;
  }
`;

const SliderItemCreated = styled.span`
  font-size: 1.3rem;
  position: relative;
  top: 5%;
  left: 5%;
`;

const SliderItemImage = styled.img`
  cursor: pointer;
  width: 30rem;
  height: 15rem;
  padding: 4rem;
  margin: 0 auto;
  @media screen and (max-width: 767px) {
    width: 15rem;
    height: 10rem;
  }
`;

const SliderItemTitle = styled.div`
  font-size: 2rem;
  text-align: center;
`;

const SliderItemDescription = styled.div`
  font-size: 1.2rem;
  text-align: center;
  margin-top: 1rem;
`;

const SliderItemTagContainer = styled.div`
  text-align: end;
  margin-top: 1rem;
  & :last-child {
    margin-right: 1rem;
  }
  @media screen and (max-width: 767px) {
    text-align: center;
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

const SliderItem = ({ post }: any) => {
  const handleNavigate = () => {
    window.location.href = `${post._id}`;
  };

  console.log(post);
  return (
    <Container>
      <SliderItemContainer>
        {post.createdAt && (
          <SliderItemCreated>{post.createdAt.slice(0, 10)}</SliderItemCreated>
        )}
        <SliderItemImage
          onClick={handleNavigate}
          src={post.thumbnail ? post.thumbnail : noImage}
        ></SliderItemImage>
        <SliderItemTitle>{post.title}</SliderItemTitle>
        <SliderItemDescription>{post.description}</SliderItemDescription>
        <SliderItemTagContainer>
          {post.categories.map(({ category }: ICategoryListProps) => (
            <SliderItemTag to={"#"}>{category.name}</SliderItemTag>
          ))}
        </SliderItemTagContainer>
      </SliderItemContainer>
    </Container>
  );
};

export default SliderItem;
