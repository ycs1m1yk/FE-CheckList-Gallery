import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ICodeProps } from '@types/interface';

const FrameViewer = styled.iframe`
    width:100%;
    height: 100%;
    margin: 0;
`;

const Container = styled.div`
    width:100%;
    height: 500px;
    overflow: visible;
    resize: both;
`;

export function DetailViewer({ files }:{files: ICodeProps[]}) {
  const [defaultFile, setDefaultFile] = useState<string>();
  useEffect(() => {
    if (files) {
      files.forEach((file) => {
        if (file.fileName === 'index.jsx') {
          const fileEndPoint = file.fileUrl
            .split('/')
            .slice(-2, -1)
            .join();
          setDefaultFile(fileEndPoint);
        }
      });
    }
  }, []);
  return (
    <Container>
      {defaultFile && <FrameViewer maginwidth="0" marginheight="0" frameborder="0" src={`${import.meta.env.VITE_VIEWER_URL}/${defaultFile}`} />}
    </Container>
  );
}
