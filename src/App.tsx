import React from 'react';
import { ThemeProvider } from 'styled-components';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { theme } from './styles/theme';
import { Container } from './styles/components';
import ItemList from './components/ItemList';
import AddItemForm from './components/AddItemForm';
import { useItems } from './hooks/useItems';
import { socketService } from './services/socketService';
import axios from 'axios';
import AddFolderForm from './components/AddFolderForm';
import { IFilesNfolders } from './types';



const App: React.FC = () => {
  const {
    filesNfolders,
    fetchData,
    handleFilesNfolderUpdate,
    setFilesNfolders
    // handleFolderUpdate: originalHandleFolderUpdate,
  } = useItems();



  // const onDragEnd = async (result: DropResult) => {
  //   const { source, destination, draggableId } = result;
  
  //   if (!destination) return;
  
  //   // Helper function to ensure all items have children arrays
  //   const ensureChildren = (items: IFilesNfolders[]): IFilesNfolders[] => {
  //     return items.map(item => ({
  //       ...item,
  //       children: Array.isArray(item.children) 
  //         ? ensureChildren(item.children)
  //         : [],
  //     }));
  //   };
  
  //   // Deep clone and ensure children arrays exist
  //   const updatedItems = ensureChildren(JSON.parse(JSON.stringify(filesNfolders)));
  
  //   // Helper function to find a folder by ID
  //   const findFolderById = (items: IFilesNfolders[], id: string): IFilesNfolders | null => {
  //     for (const item of items) {
  //       if (item._id === id && item.type === 'FOLDER') return item;
  //       if (item.type === 'FOLDER' && item.children.length > 0) {
  //         const found = findFolderById(item.children, id);
  //         if (found) return found;
  //       }
  //     }
  //     return null;
  //   };
  
  //   // Helper function to find and remove an item by ID
  //   const findAndRemoveItem = (items: IFilesNfolders[], id: string): IFilesNfolders | null => {
  //     for (let i = 0; i < items.length; i++) {
  //       const item = items[i];
        
  //       if (item._id === id) {
  //         return items.splice(i, 1)[0];
  //       }
        
  //       if (item.type === 'FOLDER') {
  //         const childResult = findAndRemoveItem(item.children, id);
  //         if (childResult) return childResult;
  //       }
  //     }
  //     return null;
  //   };
  
  //   // Find and remove the dragged item
  //   const movedItem = findAndRemoveItem(updatedItems, draggableId);
  //   if (!movedItem) return;
  
  //   // Ensure the moved item has a children array
  //   const preparedItem: IFilesNfolders = {
  //     _id: movedItem._id,
  //     type: movedItem.type,
  //     name: movedItem.name,
  //     icon: movedItem.icon,
  //     isOpen: false,
  //     children: []
  //   };
  
  //   // Handle dropping into a folder or root level
  //   if (destination.droppableId !== 'root') {
  //     const destFolder = findFolderById(updatedItems, destination.droppableId);
      
  //     if (destFolder && destFolder.type === 'FOLDER') {
  //       destFolder.children.splice(destination.index, 0, preparedItem);
  //     }
  //   } else {
  //     updatedItems.splice(destination.index, 0, preparedItem);
  //   }
  
  //   try {
  //     // Update backend
  //     await axios.put(`http://localhost:5000/api/filesystem/673f308736c79d8949c1fc39`, {
  //       filesNfolders: updatedItems 
  //     });
  
  //     // Update local state
  //     setFilesNfolders(updatedItems);
  //     await fetchData();
  //     socketService.emit('filesNfolderUpdated', {});
  //   } catch (error) {
  //     console.error('Error updating items:', error);
  //   }
  // };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container>
//         <AddItemForm fetchData={fetchData} filesNfolders={filesNfolders} setFilesNfolders={setFilesNfolders}/>
//         <AddFolderForm fetchData={fetchData} filesNfolders={filesNfolders} setFilesNfolders={setFilesNfolders} />

//         <DragDropContext onDragEnd={onDragEnd}>
//           <ItemList 
//             filesNfolders={filesNfolders}
//             // onFileNfolderUpdate={handleFilesNfolderUpdate}
//           />
//         </DragDropContext>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default App;



const handleFolderToggle = async (folderId: string) => {
  // Helper function to update folder state
  const updateFolderState = (items: IFilesNfolders[], id: string): IFilesNfolders[] => {
    return items.map(item => {
      if (item._id === id && item.type === 'FOLDER') {
        return { ...item, isOpen: !item.isOpen };
      }
      if (item.type === 'FOLDER' && item.children.length > 0) {
        return { ...item, children: updateFolderState(item.children, id) };
      }
      return item;
    });
  };

  const updatedItems = updateFolderState(filesNfolders, folderId);

  try {
    // Update backend
    await axios.put('http://localhost:5000/api/filesystem/673f308736c79d8949c1fc39', {
      filesNfolders: updatedItems
    });

    // Update local state
    setFilesNfolders(updatedItems);
    socketService.emit('filesNfolderUpdated', {});
  } catch (error) {
    console.error('Error updating folder state:', error);
  }
};

const onDragEnd = async (result: DropResult) => {
  const { source, destination, draggableId } = result;

  if (!destination) return;

  // Helper function to ensure all items have children arrays and preserve isOpen state
  const ensureChildren = (items: IFilesNfolders[]): IFilesNfolders[] => {
    return items.map(item => ({
      ...item,
      isOpen: item.type === 'FOLDER' ? (item.isOpen || false) : false,
      children: Array.isArray(item.children) 
        ? ensureChildren(item.children)
        : [],
    }));
  };

  // Deep clone and ensure children arrays exist
  const updatedItems = ensureChildren(JSON.parse(JSON.stringify(filesNfolders)));

  // Helper function to find a folder by ID (preserving isOpen state)
  const findFolderById = (items: IFilesNfolders[], id: string): IFilesNfolders | null => {
    for (const item of items) {
      if (item._id === id && item.type === 'FOLDER') return item;
      if (item.type === 'FOLDER' && item.children.length > 0) {
        const found = findFolderById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  // Helper function to find and remove an item by ID (preserving isOpen state)
  const findAndRemoveItem = (items: IFilesNfolders[], id: string): IFilesNfolders | null => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      if (item._id === id) {
        return items.splice(i, 1)[0];
      }
      
      if (item.type === 'FOLDER') {
        const childResult = findAndRemoveItem(item.children, id);
        if (childResult) return childResult;
      }
    }
    return null;
  };

  // Find and remove the dragged item
  const movedItem = findAndRemoveItem(updatedItems, draggableId);
  if (!movedItem) return;

  // Preserve the isOpen state when preparing the moved item
  const preparedItem: IFilesNfolders = {
    _id: movedItem._id,
    type: movedItem.type,
    name: movedItem.name,
    icon: movedItem.icon,
    isOpen: movedItem.type === 'FOLDER' ? (movedItem.isOpen || false) : false,
    children: movedItem.children || []
  };

  // Handle dropping into a folder or root level
  if (destination.droppableId !== 'root') {
    const destFolder = findFolderById(updatedItems, destination.droppableId);
    
    if (destFolder && destFolder.type === 'FOLDER') {
      destFolder.children.splice(destination.index, 0, preparedItem);
    }
  } else {
    updatedItems.splice(destination.index, 0, preparedItem);
  }

  try {
    // Update backend
    await axios.put('http://localhost:5000/api/filesystem/673f308736c79d8949c1fc39', {
      filesNfolders: updatedItems 
    });

    // Update local state
    setFilesNfolders(updatedItems);
    await fetchData();
    socketService.emit('filesNfolderUpdated', {});
  } catch (error) {
    console.error('Error updating items:', error);
  }
};

return (
  <ThemeProvider theme={theme}>
    <Container>
      <AddItemForm fetchData={fetchData} filesNfolders={filesNfolders} setFilesNfolders={setFilesNfolders}/>
      <AddFolderForm fetchData={fetchData} filesNfolders={filesNfolders} setFilesNfolders={setFilesNfolders} />

      <DragDropContext onDragEnd={onDragEnd}>
        <ItemList 
          filesNfolders={filesNfolders}
          onFolderToggle={handleFolderToggle}
        />
      </DragDropContext>
    </Container>
  </ThemeProvider>
);
};

export default App;