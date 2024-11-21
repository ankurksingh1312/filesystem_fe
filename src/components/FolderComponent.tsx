// import React from 'react';
// import { Draggable, Droppable } from 'react-beautiful-dnd';
// import { Typography, IconButton } from '@mui/material';
// import { ExpandMore, ExpandLess, Folder as FolderIcon } from '@mui/icons-material';
// import { IFilesNfolders } from '../types';
// import { FolderContainer, FolderHeader, FolderContent } from '../styles/components';
// import DraggableItem from './DraggableItem';
// import { useFolder } from '../hooks/useFolder';

// interface FolderComponentProps {
//   folder: Folder;
//   items: Item[];
//   index: number;
//   onUpdateFolder: (folder: Folder) => void;
// }

// const FolderComponent: React.FC<FolderComponentProps> = ({
//   folder,
//   items,
//   index,
//   onUpdateFolder,
// }) => {
//   const { toggleFolder } = useFolder(folder, onUpdateFolder);

//   return (
//     <Draggable draggableId={`folder-${folder._id}`} index={index}>
//       {(provided, snapshot) => (
//         <FolderContainer
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           elevation={snapshot.isDragging ? 3 : 1}
//         >
//           <FolderHeader>
//             <FolderIcon sx={{ marginRight: 1 }} />
//             <Typography variant="h6">{folder.name}</Typography>
//             <IconButton onClick={toggleFolder}>
//               {folder.isOpen ? <ExpandLess /> : <ExpandMore />}
//             </IconButton>
//           </FolderHeader>
          
//           <Droppable droppableId={folder._id} type="ITEM">
//             {(droppableProvided) => (
//               <FolderContent
//                 ref={droppableProvided.innerRef}
//                 {...droppableProvided.droppableProps}
//                 isOpen={folder.isOpen}
//               >
//                 {items.map((item, itemIndex) => (
//                   <DraggableItem
//                     key={item._id}
//                     item={item}
//                     index={itemIndex}
//                   />
//                 ))}
//                 {droppableProvided.placeholder}
//               </FolderContent>
//             )}
//           </Droppable>
//         </FolderContainer>
//       )}
//     </Draggable>
//   );
// };

// export default FolderComponent; 
export {}