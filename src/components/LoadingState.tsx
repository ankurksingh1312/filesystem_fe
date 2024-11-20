import React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  width: 100%;
`;

const LoadingState: React.FC = () => {
  return (
    <LoadingContainer>
      <CircularProgress />
    </LoadingContainer>
  );
};

export default LoadingState; 