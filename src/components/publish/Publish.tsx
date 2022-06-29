import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { MarkdownEditor } from '@lib/Markdown';
import FileUpload from '@lib/FileUpload';
import { FileProps } from '@types/interface';
import { postApi } from '@lib/api';

const Container = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
`;

const Form = styled.form`
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
  & input{
    border:none;
    border-radius: 5px;
    width: calc(100% - 20px);
    height: 20px;
    background-color: ${(props) => props.theme.palette.extrawhite} ;
    padding: 10px;

    &:focus{
      outline: 1px solid ${(props) => props.theme.palette.triconblack};
    }
  }
`;

const TagContainer = styled.div`
  display :flex;
  & h2 {
    flex:1;
  }
  & div {
    display: flex;
    align-items: center;
    flex:5;
    overflow-x: auto;
    &::-webkit-scrollbar {
        height: 8px;
        background-color: ${(props) => props.theme.palette.extrawhite};
        border-radius:2px;
    }
    &::-webkit-scrollbar-thumb {
        height:8px;
        background-color: ${(props) => props.theme.palette.triconblack};
        border-radius: 2px;
    }
    & .tag{
      background-color: ${(props) => props.theme.palette.daydream} ;
      margin:0 5px;
      display:flex;
      justify-content: center;
      align-items: center;
      text-align: center ;
      min-width: 80px;
      max-width: 80px;
      font-size:15px;
      font-weight: 600;
      color:  ${(props) => props.theme.palette.triconblack} ;
      height: 15px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      cursor: pointer;
      &:focus{
        outline: none;
      }
    }
  }
`;

const TagSearchContainer = styled.div`
  position:relative;
  display: flex;
  & input{
    padding-left: 50px ;
  }
`;
const Addicon = styled(FontAwesomeIcon)`
  cursor: pointer;
  position: absolute;
  left:10px;
  height: 30px;
  top:50%;
  transform: translateY(-50%);
`;

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width:50%;
  min-width: 300px;
  height:250px;
  margin: auto;
   @media screen and ${(props) => props.theme.devices.mobile}{
    width: 100% ;
    min-height: 100px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 50px 0;
  
  & button{
    width:120px;
    height: 40px;
    border: none;
    border-radius: 5px;
    padding: 10px;
    background-color: ${(props) => props.theme.palette.lobelia} ;
    color:  ${(props) => props.theme.palette.extrawhite};
    &:hover{
      cursor:pointer;
    };
  };

  @media screen and ${(props) => props.theme.devices.mobile}{
    justify-content: center;
    & button{
      width:100%;
    }
  }
`;
export default function Publish() {
  const navigate = useNavigate();
  const [codeList, setCodeList] = useState<FileProps[]>([]);
  const [thumbnail, setThumbnail] = useState<FileProps[]>([]);

  const [tags, setTags] = useState<{id:number, tag:string}[]>([]);
  const [tagInput, setTagInput] = useState('');

  const descRef = useRef();
  const tagId = useRef<number>(0);

  const formSubmitHandler = async (e:React.FormEventHandler<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      // 마크다운 데이터 get
      const description = descRef.current.getInstance().getMarkdown();
      formData.append('description', description);
      codeList.forEach(({ file }) => {
        if (file)formData.append('code', file);
      });
      if (thumbnail[0].file)formData.append('thumbnail', thumbnail[0].file);
      // eslint-disable-next-line no-restricted-syntax
      for (const data of formData.entries()) { // string field 입력검증
        if (!data[1]) {
          throw new Error(`${data[0]}필드를 채워주세요.`);
        }
      }

      // publishing 후 리다이렉트
      const newPost = await postApi.publishPost(formData, window.localStorage.getItem('token'));
      navigate('/gallery');
    } catch (error) {
      alert(error);
    }
  };

  const tagInputChange = (e:React.ChangeEventHandler<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const tagSubmitHandler = (e:React.MouseEventHandler<SVGSVGElement>) => {
    if (tagInput) {
      setTags([...tags, { id: tagId.current++, tag: tagInput }]);
    }
    setTagInput('');
  };

  const tagDeleteHandler = (e:React.MouseEventHandler<HTMLInputElement>, id:number) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  return (
    <Container>
      <Form onSubmit={formSubmitHandler}>
        <h1>글 쓰기</h1>
        <h2>Title</h2>
        <input name="title" />
        <TagContainer>
          <h2>Tag</h2>
          <div>
            {tags.map(({ id, tag }) => <input className="tag" name="categories" value={tag} key={id} onClick={(e) => { tagDeleteHandler(e, id); }} readOnly />)}
          </div>
        </TagContainer>
        <TagSearchContainer>
          <input value={tagInput} onChange={tagInputChange} type="text" />
          <Addicon icon={faSquarePlus} onClick={tagSubmitHandler} />
        </TagSearchContainer>
        <h2>Description</h2>
        <MarkdownEditor ref={descRef} />
        <h2>Thumbnail</h2>
        <FileUploadContainer>
          <FileUpload name="thumbnail" multiple={false} fileState={thumbnail} setFileState={setThumbnail} />
        </FileUploadContainer>
        <h2>Code</h2>
        <FileUploadContainer>
          <h3>코드 업로드 유의사항</h3>
          <br />
          <h4>✅ 코드 확장자는 .jsx만 가능합니다.</h4>
          <h4>✅ 코드는 여러 개 업로드 가능합니다.</h4>
          <h4>✅ 코드파일은 한 폴더에 저장됩니다.</h4>
          <h4>✅ styled-component 외 별도의 라이브러리를 사용하시면 작동하지 않습니다.</h4>
          <h4>✅ 코드파일 중 index.jsx라는 이름의 파일을 반드시 포함해야하며, 그 파일 내 default로 export된 컴포넌트만이 실행됩니다. </h4>
        </FileUploadContainer>
        <FileUploadContainer>
          <FileUpload name="code" multiple fileState={codeList} setFileState={setCodeList} />
        </FileUploadContainer>
        <ButtonContainer>
          <button type="submit">Submit</button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}
