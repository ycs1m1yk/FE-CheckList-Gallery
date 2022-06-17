import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledTags = styled.div`
  display: none;
  overflow-x: auto;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-bottom: -1.75rem;

  & :not(:first-child) {
    margin-left: 0.5rem;
  };

  @media (max-width: 1200px) {
    display: flex;
  };
`;

const Tag = styled(Link)`
  flex-shrink: 0;
  height: 1.5rem;
  font-size: 0.75rem;
  border-radius: 0.75rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  background: ${(props) => props.theme.palette.daydream};
  color: ${(props) => props.theme.palette.triconblack};
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  line-height: 1.5;
  text-decoration: none;

  &.selected {
    background: ${(props) => props.theme.palette.lobelia};
    color: ${(props) => props.theme.palette.extrawhite};
  }
 `;

function Tags() {
  const [selectedTag, setSelectedTag] = useState('전체보기');
  const [tags, setTags] = useState([
    { name: '전체보기', count: 8, isSelected: true },
    { name: '태그1', count: 3, isSelected: false },
    { name: '태그2', count: 5, isSelected: false },
    { name: '태그3', count: 1, isSelected: false },
    { name: '태그4', count: 6, isSelected: false },
    { name: '태그5', count: 2, isSelected: false },
  ]);

  const handleClick = (e: any) => {
    e.preventDefault();

    const target = e.target.closest('a');
    document.querySelector('.selected')?.classList.remove('selected');
    target.classList.add('selected');
    setSelectedTag(target.key);
  };

  return (
    <StyledTags className="Tags" onClick={handleClick}>
      {tags.map(({ name, count }) => (
        <Tag key={name} to="#;" className={`Tag ${name === selectedTag ? 'selected' : null}`}>
          {name}
          <span>
            (
            {count}
            )
          </span>
        </Tag>
      ))}
    </StyledTags>
  );
}

export default Tags;
