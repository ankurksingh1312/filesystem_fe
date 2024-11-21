// import React from 'react';
// import styled from 'styled-components';
// import { Folder, Item } from '../types';
// import SingleItem from './SingleItem';

// interface FolderItemProps {
//   folder: Folder;
//   items: Item[];
//   onToggle: () => void;
// }

// const FolderContainer = styled.div`
//   margin: 10px 0;
//   padding: 10px;
//   background: #f5f5f5;
//   border-radius: 4px;
// `;

// const FolderHeader = styled.div`
//   display: flex;
//   align-items: center;
//   cursor: pointer;
  
//   .folder-icon {
//     margin-right: 10px;
//   }
// `;

// const FolderContent = styled.div<{ isOpen: boolean }>`
//   margin-left: 20px;
//   display: ${props => props.isOpen ? 'block' : 'none'};
// `;

// const FolderItem: React.FC<FolderItemProps> = ({ folder, items, onToggle }) => {
//   return (
//     <FolderContainer>
//       <FolderHeader onClick={onToggle}>
//         <span className="folder-icon">📁</span>
//         <span>{folder.name}</span>
//         <span>{folder.isOpen ? '▼' : '▶'}</span>
//       </FolderHeader>
//       <FolderContent isOpen={folder.isOpen}>
//         {items.sort((a, b) => a.order - b.order).map(item => (
//           <SingleItem key={item.id} item={item} />
//         ))}
//       </FolderContent>
//     </FolderContainer>
//   );
// };

// export default FolderItem;
export {}