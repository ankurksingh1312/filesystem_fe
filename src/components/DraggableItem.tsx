import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Typography, Icon } from '@mui/material';
import { Item } from '../types';
import { ItemContainer } from '../styles/components';
import styled from 'styled-components';

const ItemContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.md};

  .item-icon {
    flex-shrink: 0;
  }

  .item-title {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

interface DraggableItemProps {
  item: Item;
  index: number;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item, index }) => {
  return (
    <Draggable draggableId={item._id} index={index}>
      {(provided, snapshot) => (
        <ItemContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          elevation={snapshot.isDragging ? 3 : 1}
        >
          <ItemContent>
            <Icon className="item-icon">{item.icon}</Icon>
            <Typography className="item-title">{item.title}</Typography>
          </ItemContent>
        </ItemContainer>
      )}
    </Draggable>
  );
};

export default DraggableItem; 