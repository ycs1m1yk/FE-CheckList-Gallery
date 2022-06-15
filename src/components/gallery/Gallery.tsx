import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SliderItem from "./SliderItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GalleryContainer = styled.div``;

interface IUserPost {
  id: string;
  imgUrl?: string;
  tags?: [];
  title?: string;
}

/*
  TODO
  1. User Post 데이터 얻어와서 화면 그리기 - 지금은 Mock 데이터 이용
  2. 화면 구성할 때 슬라이더로 구성
    2-1) Infinite Slider, 제어 버튼으로 조절 가능 하게끔
  3. Header와 Footer, Sidebar 완성되면 추가하고 디버깅 다시
  4. Loader Component 만들기
*/

const Gallery = () => {
  const [userPost, setUserPost] = useState<IUserPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
            <Slider {...settings}>
              {userPost.map((post: IUserPost) => (
                <SliderItem key={post.id} post={post} />
              ))}
            </Slider>
            {/* <Footer /> */}
          </GalleryContainer>
        </>
      )}
    </>
  );
};

export default Gallery;
