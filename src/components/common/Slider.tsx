import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay, faPause, faAngleLeft, faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { IAllPostProps } from '@types/interface';
import { postApi } from '@lib/api';
import Loader from './Loader';
import SliderItem from './SliderItem';
import Message from './Message';

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 1rem;
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
  display: ${(props) => (props.isPlay ? 'inline-block' : 'none')};
`;

const PlayButton = styled(Button)<{ isPlay: boolean }>`
  display: ${(props) => (props.isPlay ? 'none' : 'inline-block')};
`;

const NextButton = styled(Button)``;

function Carousel() {
  const [posts, setPosts] = useState<IAllPostProps[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sliderPlay, setSliderPlay] = useState<boolean>(true);
  const sliderRef = useRef<Slider>(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const categoryId = query.get('tag');
  const authorId = query.get('auth');

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  // 작품 정보 얻어오기
  const getPostsFromApi = async () => {
    try {
      if (!categoryId && !authorId) {
        const { data } = await postApi.getAllPosts();
        setPosts(data);
      } else {
        const params = {
          categoryId,
          authorId,
        };
        const { data } = await postApi.getAllPosts(params);
        setPosts(data);
      }
    } catch (e: any) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPostsFromApi();
  }, [categoryId, authorId]);

  return isLoading ? (
    <Loader />
  ) : (
    /* eslint-disable react/jsx-props-no-spreading */
    <>
      <Slider ref={sliderRef} {...settings}>
        {posts.map((post) => (
          <>
            <SliderItem post={post} />
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
      {!posts.length && !error && <Message color={(props) => props.theme.palette.triconblack} message="해당 작가의 작품이 존재하지 않습니다." />}
      {error && <Message color={(props) => props.theme.palette.africanruby} message="정보를 불러오는데 오류가 발생했습니다." />}
    </>
  );
}

export default Carousel;
