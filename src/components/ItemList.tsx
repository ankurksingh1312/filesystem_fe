// import React, { useMemo } from 'react';
// import { Droppable, Draggable } from 'react-beautiful-dnd';
// import DraggableItem from './DraggableItem';
// // import FolderComponent from './FolderComponent';
// import { IFilesNfolders} from '../types';
// import styled from 'styled-components';

// const ListContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: ${({ theme }) => theme.spacing.md};
//   padding: ${({ theme }) => theme.spacing.md};
// `;

// const DroppableArea = styled.div`
//   min-height: 100px;
//   padding: ${({ theme }) => theme.spacing.sm};
// `;

// interface ItemListProps {
//   filesNfolders: IFilesNfolders[],
//   onFileNfolderUpdate?:(_id: string, updates: any) => void;
// }

// const ItemList: React.FC<ItemListProps> = ({ filesNfolders, onFileNfolderUpdate }) => {


//   return (
//     <Droppable droppableId="root" type="FILE">
//       {(provided) => (
//         <ListContainer
//           ref={provided.innerRef}
//           {...provided.droppableProps}
//         >
//           {/* Standalone Items */}
//           {filesNfolders.map((item, index) => (
//             <DraggableItem 
//               key={item._id}
//               item={item}
//               index={index}
//             />
//           ))}


          
//           {provided.placeholder}
//         </ListContainer>
//       )}
//     </Droppable>
//   );
// };

// export default ItemList;


import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DraggableItem from './DraggableItem';
import { IFilesNfolders } from '../types';
import styled from 'styled-components';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
`;

const DroppableArea = styled.div`
  min-height: 100px;
  padding: ${({ theme }) => theme.spacing.sm};
`;

interface ItemListProps {
  filesNfolders: IFilesNfolders[];
  onFolderToggle: (folderId: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({ filesNfolders, onFolderToggle }) => {
  return (
    <Droppable droppableId="root" type="FILE">
      {(provided) => (
        <ListContainer
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {filesNfolders.map((item, index) => (
            <DraggableItem 
              key={item._id}
              item={item}
              index={index}
              onFolderToggle={onFolderToggle}
            />
          ))}
          {provided.placeholder}
        </ListContainer>
      )}
    </Droppable>
  );
};

export default ItemList;