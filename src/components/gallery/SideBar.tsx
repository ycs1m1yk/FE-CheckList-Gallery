import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ICategoryProps } from '../../types/interface';
import { postApi, categoryApi } from '../../lib/api';
import TagList from './TagList';
import Tags from './Tags';

interface TagProps extends ICategoryProps {
  selected: boolean;
}

export default function SideBar() {
  const [isLoading, setIsLoading] = useState(true);
  const [postCount, setPostCount] = useState(0);
  const [tags, setTags] = useState<TagProps[]>([]);
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
        selected: false,
        __v: 0,
      };
      const newData = data.map((el) => ({ ...el, selected: false }));
      setTags([allTag, ...newData]);
    } catch (err: any) {
      setError(err);
      console.log(err);
    }
    setIsLoading(false);
  };

  const handleSelected = () => {
    const searchTag = searchParams.get('tag');
    const id = searchTag || 'all';

    setTags((curr) => curr.map((el) => {
      const { _id, selected } = el;
      if (selected || _id === id) {
        if (selected && _id === id) {
          return el;
        }
        return { ...el, selected: !selected };
      }
      return el;
    }));
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (postCount) {
      getCategories();
    }
  }, [postCount]);

  useEffect(() => {
    handleSelected();
  }, [isLoading, searchParams]);

  return (
    <div className="SideBar" style={{ position: 'relative' }}>
      <TagList tags={tags} />
      <Tags tags={tags} />
    </div>
  );
}
