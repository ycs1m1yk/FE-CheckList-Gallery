import React from "react";
import styled from "styled-components";

// interface IUserPost {
//   id: string;
//   imgUrl?: string;
//   tags?: [];
//   title?: string;
// }

/*
  1. span tag - Unique Key 설정 필요
  2. post type이 IUserPost가 왜 아닐까
*/

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderItemContainer = styled.div`
  width: 50rem;
  height: 30rem;
  margin: 3rem 0;
  border-radius: 5%;
  background-color: grey;
`;

const SliderItemImage = styled.img`
  width: 30rem;
  height: 15rem;
  padding: 5rem;
  margin: 0 auto;
`;

const SliderItemTitle = styled.div`
  font-size: 1.5rem;
  text-align: center;
`;

const SliderItemTagContainer = styled.div`
  text-align: end;
  margin-top: 1rem;
  & :last-child {
    margin-right: 1rem;
  }
`;

const SliderItemTag = styled.span`
  background-color: ${(props) => props.theme.palette.triconblack};
  margin-left: 0.5rem;
  padding: 0.5rem;
  color: white;
  border-radius: 10%;
`;

const SliderItem = ({ post }: any) => {
  return (
    <Container>
      <SliderItemContainer>
        <SliderItemImage src={post.imgUrl}></SliderItemImage>
        <SliderItemTitle>{post.title}</SliderItemTitle>
        <SliderItemTagContainer>
          {post.tags.map((tag: string) => (
            <SliderItemTag key={Math.random()}>{tag}</SliderItemTag>
          ))}
        </SliderItemTagContainer>
      </SliderItemContainer>
    </Container>
  );
};

export default SliderItem;
