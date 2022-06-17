import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledTagList = styled.div`
    position: absolute;
    width: 11.5rem;
    left: -13.5rem;
    margin-top: 2rem;

    & .title {
        font-size: 1rem;
        line-height: 1.5;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid ${(props) => props.theme.palette.triconblack};
        margin-bottom: 1rem;
        color: ${(props) => props.theme.palette.triconblack};
        font-weight: bold;
    };

    & ul :not(:first-child) {
      margin-top: 0.25rem;
    };

    @media (max-width: 1200px) {
      display: none;
    };
`;

const Tag = styled.li`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${(props) => props.theme.palette.triconblack};
  font-weight: bold;

  & span {
      margin-left: 0.5rem;
      color: ${(props) => props.theme.palette.daydream};
      font-weight: normal;
  };
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  :hover {
    text-decoration: underline;
  };
  
  &.selected {
    color: ${(props) => props.theme.palette.lobelia};
    font-weight: bold;
  }
`;

function TagList() {
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

    if (e.target.nodeName === 'A') {
      document.querySelector('.selected')?.classList.remove('selected');
      e.target.classList.add('selected');
      setSelectedTag(e.target.key);
    }
  };

  return (
    <StyledTagList className="TagList" onClick={handleClick}>
      <div>
        <div className="title">태그 목록</div>
        <ul>
          {tags.map(({ name, count }) => (
            <Tag key={name} className="Tag">
              <StyledLink to="#;" className={name === selectedTag ? 'selected' : ''}>{name}</StyledLink>
              <span>
                (
                {count}
                )
              </span>
            </Tag>
          ))}
        </ul>
      </div>
    </StyledTagList>
  );
}

export default TagList;
