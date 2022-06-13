import React, { useEffect, useState } from "react";
import styled from "styled-components";

const GalleryContainer = styled.div``;

const SliderContainer = styled.div``;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10rem 10rem;
  background-color: #eeeeee;
  width: 80%;
  padding: 2rem;
  border-radius: 50px;
`;

const Image = styled.img`
  width: 60%;
  height: 60%;
`;

/*
  TODO
  1. User Post 데이터 얻어와서 화면 그리기 - 지금은 Mock 데이터 이용
  2. 화면 구성할 때 슬라이더로 구성
    2-1) Infinite Slider, 제어 버튼으로 조절 가능 하게끔
  3. Header와 Footer, Sidebar 완성되면 추가하고 디버깅 다시
  4. Loader Component 만들기
*/
const Gallery = () => {
  const [userPost, setUserPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 유저의 작품 정보 얻어오기
  const getUserPostFromApi = async () => {
    try {
      await fetch("http://localhost:3000/userData.json")
        .then((res) => res.json())
        .then((result) => setUserPost(result));
    } catch (e: any) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserPostFromApi();
  }, []);

  console.log(userPost);
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          Gallery Page
          <GalleryContainer>
            {/* <Header /> */}
            {/* <Sidebar /> */}
            <SliderContainer></SliderContainer>
            {/* <Footer /> */}
          </GalleryContainer>
        </>
      )}
    </>
  );
};

export default Gallery;
