import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import Loader from '@components/common/Loader';
import { IAllPostProps } from '@types/interface';
import { postApi } from '@lib/api';
import { DetailViewer } from '@lib/DetailViewer';
import axios from 'axios';
import { MarkdownViewer } from '../../lib/Markdown';

import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

const TagLink = styled(Link)`
  text-decoration: none;
`;

const CodeToggle = styled.button`
  border: none;
  cursor: pointer;
  font-size: 14px;
  background-color: ${(props) => (props.openState ? props.theme.palette.lobelia : props.theme.palette.africanviolet)};
  transition: 0.3s ease all;
  border-radius: 6px;
  margin-bottom: 10px;
  width: 100%;
  height: 24px;
  color: white;
`;

const BodyBox = styled.div`
  margin-bottom: 40px;
`;

const TagBox = styled.div`
  display: flex;
  margin-bottom: 40px;
  margin-top: 20px;
  & a {
    margin-right: 10px;
    background-color: ${(props) => props.theme.palette.triconblack};
    color: white;
    border-radius: 10px;
    padding: 6px 12px;
    line-height: 20px;
    text-align: center;
  }
`;

const Container = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
`;

const DetailContainer = styled.div`
  width: 60%;
  @media screen and ${(props) => props.theme.devices.desktop}{

  }
  @media screen and ${(props) => props.theme.devices.mobile}{
    width: 90%;
  }

  & h2{
    margin: 20px 0;
  }
  & h4{
    margin: 5px;
    line-height: 20px;
  }
`;

const CodeViewerContainer = styled.div`
`;

function Title({ title }: any) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}

function Tags({ categories }: any) {
  return (
    <TagBox>
      {categories.map((ct: any) => (
        <TagLink key={ct._id} to={`/gallery?tag=${ct.category._id}`}>
          {ct.category.name}
        </TagLink>
      ))}
    </TagBox>
  );
}

function Body({ description }: any) {
  return (
    <BodyBox>
      <MarkdownViewer text={description} />
    </BodyBox>
  );
}

function CodeViewer({code}:{fileName:string, fileData:string}) {
  const [openState, setOpenState] = useState<boolean>(false);

  function handleToggle() {
    setOpenState((cur) => !cur);
  }

  return (
    <>
      <CodeToggle openState={openState} onClick={handleToggle}>{openState ? code.fileName + ' ▲' : code.fileName + ' ▼'}</CodeToggle>
      {openState && <CodeViewerContainer openState={openState}>
        <Viewer
          initialValue={'```js '+code.fileData+'```'}
          plugins={[[codeSyntaxHighlight, {highlighter: Prism}]]} />
      </CodeViewerContainer>}
    </>
  )
}

export default function Detail() {
  const [post, setPost] = useState<IAllPostProps | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [code, setCode] = useState<{fileName: string, fileData: string}[]>([]);

  const { postId } = useParams();

  const getPostFromApi = async () => {
    try {
      const { data } = await postApi.getPostById(postId);
      const codes = await Promise.all(data.code.map(async ({ fileName, fileUrl }) => {
        const temp = await axios(fileUrl);
        return { fileName, fileData: temp.data };
      }));
      setCode(codes);
      setPost(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPostFromApi();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Container>
      <DetailContainer>
        <Title title={post?.title} />
        <Tags categories={post?.categories} />
        <Body description={post?.description} />
        {code.map(data => <CodeViewer code={data} />)}
        <DetailViewer files={post?.code} />
      </DetailContainer>
    </Container>
  );
}
