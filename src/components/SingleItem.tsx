import React from 'react';
import styled from 'styled-components';
import { IFilesNfolders } from '../types';

interface SingleItemProps {
  item: IFilesNfolders;
}

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);

  .item-icon {
    margin-right: 10px;
  }
`;

const SingleItem: React.FC<SingleItemProps> = ({ item }) => {
  return (
    <ItemContainer>
      <span className="item-icon">{item.icon}</span>
      <span>{item.name}</span>
    </ItemContainer>
  );
};

export default SingleItem;