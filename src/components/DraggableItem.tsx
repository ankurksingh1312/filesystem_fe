
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
  onFolderToggle?: (folderId: string) => void;
  isRootLevel?: boolean;
  onMove?: (item: IFilesNfolders, sourceParentId?: string, destParentId?: string) => void;
}> = ({ 
  item, 
  index, 
  isRootLevel = false, 
  onMove ,
  onFolderToggle
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = () => {
    if (item.type === 'FOLDER') {
      if (onFolderToggle) {
        onFolderToggle(item._id);
      }
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

// import React from 'react';
// import { Draggable, Droppable } from 'react-beautiful-dnd';
// import styled from 'styled-components';
// import { IFilesNfolders } from '../types';
// import { FaFolder, FaFolderOpen, FaFile } from 'react-icons/fa';

// interface DraggableItemProps {
//   item: IFilesNfolders;
//   index: number;
//   isRootLevel?: boolean;
//   onMove?: (
//     item: IFilesNfolders,
//     sourceParentId?: string,
//     destParentId?: string
//   ) => void;
//   onFolderToggle: (folderId: string) => void;  // Added this prop
// }

// const ItemWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 8px;
//   margin: 4px 0;
//   background: white;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   cursor: pointer;
// `;

// const ChildrenContainer = styled.div`
//   margin-left: 20px;
// `;

// const IconWrapper = styled.div`
//   margin-right: 8px;
//   cursor: pointer;
// `;

// const DraggableItem: React.FC<DraggableItemProps> = ({
//   item,
//   index,
//   isRootLevel = true,
//   onMove,
//   onFolderToggle
// }) => {
//   const handleFolderClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (item.type === 'FOLDER') {
//       onFolderToggle(item._id);
//     }
//   };

//   return (
//     <Draggable draggableId={item._id} index={index}>
//       {(provided) => (
//         <div
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//         >
//           <ItemWrapper>
//             <IconWrapper onClick={handleFolderClick}>
//               {item.type === 'FOLDER' ? (
//                 item.isOpen ? <FaFolderOpen /> : <FaFolder />
//               ) : (
//                 <FaFile />
//               )}
//             </IconWrapper>
//             {item.name}
//           </ItemWrapper>

//           {item.type === 'FOLDER' && item.isOpen && item.children.length > 0 && (
//             <ChildrenContainer>
//               <Droppable droppableId={item._id} type="FILE">
//                 {(dropProvided) => (
//                   <div
//                     ref={dropProvided.innerRef}
//                     {...dropProvided.droppableProps}
//                   >
//                     {item.children.map((child, childIndex) => (
//                       <DraggableItem
//                         key={child._id}
//                         item={child}
//                         index={childIndex}
//                         isRootLevel={false}
//                         onMove={onMove}
//                         onFolderToggle={onFolderToggle}
//                       />
//                     ))}
//                     {dropProvided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </ChildrenContainer>
//           )}
//         </div>
//       )}
//     </Draggable>
//   );
// };

// export default DraggableItem;

