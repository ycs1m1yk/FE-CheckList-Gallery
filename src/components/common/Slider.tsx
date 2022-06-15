import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import SliderItem from "./SliderItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { IAllPostProps } from "../../types/interface";

const ButtonContainer = styled.div`
  text-align: center;
  & :not(:first-child) {
    margin-left: 1rem;
  }
`;

const Button = styled.button`
  cursor: pointer;
  text-decoration: none;
  border: none;
  color: #fff;
  font-size: 24px;
  display: inline-block;
  background-color: #585858;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  line-height: 40px;
  text-align: center;
  font-weight: bold;
  margin-right: 10px;
`;

const PrevButton = styled(Button)``;

const PauseButton = styled(Button)<{ isPlay: boolean }>`
  display: ${(props) => (props.isPlay ? "inline-block" : "none")};
`;

const PlayButton = styled(Button)<{ isPlay: boolean }>`
  display: ${(props) => (props.isPlay ? "none" : "inline-block")};
`;

const NextButton = styled(Button)``;

/*
  TODO
  [] 슬라이더 넘어가면서 잔상이 남는 문제 해결
  [] User Post만을 위한 슬라이더가 아닌 모든 데이터를 Slider로 만들 수 있게끔
    -> state, Interface, API Request를 확장성 있게 만들어야 함
*/

const Carousel = () => {
  const [userPost, setUserPost] = useState<IAllPostProps[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sliderPlay, setSliderPlay] = useState<boolean>(true);
  const sliderRef = useRef<Slider>(null);

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  // 유저의 작품 정보 얻어오기
  const getUserPostFromApi = async () => {
    try {
      const { data } = await axios.get("https://fcgserver.loca.lt/post");
      setUserPost(data);
    } catch (e: any) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserPostFromApi();
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Slider ref={sliderRef} {...settings}>
      {userPost.map((post) => (
        <>
          <SliderItem key={post._id} post={post} />
          <ButtonContainer>
            <PrevButton onClick={() => sliderRef?.current?.slickPrev()}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </PrevButton>
            <PauseButton
              isPlay={sliderPlay}
              onClick={() => {
                sliderRef?.current?.slickPause();
                setSliderPlay((cur) => !cur);
              }}
            >
              <FontAwesomeIcon icon={faPause} />
            </PauseButton>
            <PlayButton
              isPlay={sliderPlay}
              onClick={() => {
                sliderRef?.current?.slickPlay();
                setSliderPlay((cur) => !cur);
              }}
            >
              <FontAwesomeIcon icon={faPlay} />
            </PlayButton>
            <NextButton onClick={() => sliderRef?.current?.slickNext()}>
              <FontAwesomeIcon icon={faAngleRight} />
            </NextButton>
          </ButtonContainer>
        </>
      ))}
    </Slider>
  );
};

export default Carousel;
