import React, {
  useState, useRef, Dispatch, SetStateAction,
} from 'react';
import styled, { css } from 'styled-components';
import { darken } from 'polished';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderMinus } from '@fortawesome/free-solid-svg-icons';

import { FileProps } from '@types/interface';

interface FileUploadProps{
  name:string,
  multiple:boolean,
  fileState: FileProps[],
  setFileState: React.Dispatch<React.SetStateAction< FileProps[]>>
}
const Container = styled.div`
  width:100%;
  height:100%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  // hover시 어두워지면서 포인터
${(props) => {
    const { africanviolet, daydream } = props.theme.palette;
    return css`background: linear-gradient(${africanviolet}, ${daydream})`;
  }}
  //드래그 중일때 다른 색깔
`;

const DragLabel = styled.label<{isDrag:boolean}>`
  width:80%;
  height:80%;
  border-radius: 10px;
  border: 3px dashed ${(props) => props.theme.palette.extrawhite};
  &:hover{
    background: ${(props) => darken(0.1, props.theme.palette.daydream)};
    cursor: pointer;
    transition: 0.3s linear;
  }
  ${(props) => {
    const { daydream } = props.theme.palette;
    return props.isDrag ? css`
      background: ${darken(0.1, daydream)};
    `
      : css`
    `;
  }}
  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:100%;
    height: 100%;
    color: ${(props) => props.theme.palette.extrawhite};
    & * {
      margin:2px 0;
    }
    & h3{
      margin-bottom:5px;
    }
    & p{
      display: flex;
      width: 80%;
      justify-content: space-around;
    }
  }

  & input{
    display:none;
  }

  // 모바일에서 문구 교체
  @media screen and ${(props) => props.theme.devices.mobile}{
    height: 50%;
    & div h3{
      font-size: 0;
    }
    & div h3::before{
      font-size: 1rem;
      content: 'click or touch';
    }
  }
`;

const Delbtn = styled(FontAwesomeIcon)`
  &:hover{
    color: ${(props) => props.theme.palette.triconblack}
    
  }
`;

export default function FileUpload({
  name, multiple, fileState, setFileState,
}:FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false); // 드래그 중 상태
  const dragRef = useRef<HTMLLabelElement | null>(null);// 드래그 dom
  const fileId = useRef<number>(0);

  const onUploadFile = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    e.preventDefault();
    let selectFiles: FileList;
    if (e.type === 'drop') {
    // 드래그 앤 드롭 했을때
      selectFiles = e.dataTransfer.files;
    } else {
    // "파일 첨부" 버튼을 눌러서 이미지를 선택했을 때
      selectFiles = e.target.files;
    }
    console.log(selectFiles);
    if (selectFiles.length) {
      if (multiple) {
        Object.keys(selectFiles).forEach((key, index) => {
          setFileState([...fileState, { id: fileId.current++, file: selectFiles.item(0) }]);
        });
      } else {
        setFileState([{ id: 0, file: selectFiles.item(0) }]);
      }
    }
  };
  // 드래그 시작
  const hadleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  // 드래그 커서 사라짐
  const hadleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  // 드래그 중
  const hadleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  };
  // 드롭
  const hadleDragDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    onUploadFile(e); // 드롭 시 업로드
  };
  // 삭제 버튼 클릭 시 삭제
  const deletefileHandler = (e: MouseEventHandler<SVGSVGElement>, id:number) => {
    e.preventDefault();
    e.stopPropagation();
    setFileState(fileState.filter((file) => file.id !== id));
  };
  return (
    <Container>
      <DragLabel
        htmlFor={name}
        isDrag={isDragging}
        ref={dragRef}
        onDragEnter={hadleDragEnter}
        onDragLeave={hadleDragLeave}
        onDragOver={hadleDragOver}
        onDrop={hadleDragDrop}
      >
        <input
          onChange={onUploadFile}
          type="file"
          id={name}
          multiple={multiple}
        />
        <div>
          <h3>Drag & Drop a File Here</h3>
          {Boolean(fileState.length) && fileState.map((file) => (
            <p key={file.id}>
              {file.file?.name}
              <Delbtn onClick={(e) => { deletefileHandler(e, file.id); }} icon={faFolderMinus} />
            </p>
          )) }
        </div>
      </DragLabel>
    </Container>
  );
}
