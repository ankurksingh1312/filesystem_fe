
import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Typography } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import styled from 'styled-components';
import { IFilesNfolders } from '../types';
import { FileIcon } from 'lucide-react';

const ItemContainer = styled.div<{ isDragging?: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: ${props => props.isDragging ? '#f0f0f0' : 'white'};
  border-radius: 4px;
  margin-bottom: 4px;
  box-shadow: ${props => props.isDragging ? '0 4px 6px rgba(0,0,0,0.1)' : 'none'};
`;

const ItemContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 12px;

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

const NestedContent = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'block' : 'none'};
  margin-left: 24px;
`;

const getFileIcon = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf': return PdfIcon;
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif': return ImageIcon;
    default: return InsertDriveFileIcon;
  }
};

const DraggableItem: React.FC<{ 
  item: IFilesNfolders; 
  index: number; 
  isRootLevel?: boolean;
  onMove?: (item: IFilesNfolders, sourceParentId?: string, destParentId?: string) => void;
}> = ({ 
  item, 
  index, 
  isRootLevel = false, 
  onMove 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = () => {
    if (item.type === 'FOLDER') {
      setIsOpen(!isOpen);
    }
  };

  const moveItem = (sourceParentId?: string, destParentId?: string) => {
    if (onMove) {
      onMove(item, sourceParentId, destParentId);
    }
  };

  return (
    <Draggable draggableId={item._id} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <ItemContainer isDragging={snapshot.isDragging}>
            <ItemContent onClick={toggleFolder}>
              {item.type === 'FOLDER' ? (
                isOpen ? <FolderOpenIcon className="item-icon" /> : <FolderIcon className="item-icon" />
              ) : (
                React.createElement(getFileIcon(item.name), { className: "item-icon" })
              )}
              <Typography className="item-title">{item.name}</Typography>
            </ItemContent>
          </ItemContainer>
          
          {item.type === 'FOLDER' && item.children && (
            <Droppable droppableId={item._id} type="FILE">
              {(provided) => (
                <NestedContent 
                  isOpen={isOpen} 
                  ref={provided.innerRef} 
                  {...provided.droppableProps}
                >
                  {item?.children?.map((childItem, childIndex) => (
                    <DraggableItem 
                      key={childItem._id} 
                      item={childItem} 
                      index={childIndex}
                      onMove={(movedItem, sourceParentId, destParentId) => 
                        moveItem(item._id, destParentId)
                      }
                    />
                  ))}
                  {provided.placeholder}
                </NestedContent>
              )}
            </Droppable>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;



