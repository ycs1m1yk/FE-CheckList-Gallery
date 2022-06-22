import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ICategoryProps } from '../../types/interface';
import { postApi, categoryApi } from '../../lib/api';
import TagList from './TagList';
import Tags from './Tags';

export default function SideBar() {
  const selectedTagRef = useRef('');
  const [postCount, setPostCount] = useState(0);
  const [tags, setTags] = useState<ICategoryProps[]>([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const getPosts = async () => {
    try {
      const { data } = await postApi.getAllPosts();
      setPostCount(data.length);
    } catch (err: any) {
      setError(err);
      console.log(err);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await categoryApi.getAllCategory();
      const allTag = {
        _id: 'all',
        name: '전체보기',
        lowerName: '전체보기',
        post: postCount,
        __v: 0,
      };
      setTags([allTag, ...data]);
    } catch (err: any) {
      setError(err);
      console.log(err);
    }
  };

  const handleSelected = () => {
    const searchTag = searchParams.get('tag');
    const id = searchTag || 'all';
    selectedTagRef.current = `tags-${id}`;

    [...document.querySelectorAll('.selected')]?.forEach((el) => el.classList.remove('selected'));
    document.querySelector(`[data-id=${selectedTagRef.current}]`)?.classList.add('selected');

    selectedTagRef.current = `taglist-${id}`;
    document.querySelector(`[data-id=${selectedTagRef.current}]`)?.classList.add('selected');
  };

  useEffect(() => {
    handleSelected();
  }, [searchParams]);

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    getCategories();
  }, [postCount]);

  return (
    <div className="SideBar" style={{ position: 'relative' }}>
      <TagList tags={tags} />
      <Tags tags={tags} />
    </div>
  );
}
