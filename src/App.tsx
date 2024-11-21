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

// interface IFilesNfolders {
//   _id: string;
//   type: 'FOLDER' | 'ITEM';
//   name: string;
//   icon: string;
//   isOpen: boolean ;
//   children?: IFilesNfolders[];
// }

const App: React.FC = () => {
  const {
    filesNfolders,
    fetchData,
    handleFilesNfolderUpdate,
    setFilesNfolders
    // handleFolderUpdate: originalHandleFolderUpdate,
  } = useItems();

  // const handleFolderUpdate = (folderId: string, updates: any) => {
  //   originalHandleFolderUpdate({ id: folderId, ...updates });
  // };

  // const onDragEnd = async (result: DropResult) => {
  //   const { source, destination, draggableId, type } = result;

  //   if (!destination) return;

  //   if (type === 'ITEM') {
  //     try {
  //       await axios.put(`http://localhost:5000/api/items/${draggableId.replace('item-', '')}`, {
  //         order: destination.index,
  //         folderId: destination.droppableId === 'main' ? null : destination.droppableId
  //       });
        
  //       await fetchData();
  //       socketService.emit('itemUpdated', items);
  //     } catch (error) {
  //       console.error('Error updating item order:', error);
  //     }
  //   }
  // };

  // const onDragEnd = async (result: DropResult) => {
  //   const { source, destination, draggableId, type } = result;

  //   console.log("  ###", result)
  
  //   if (!destination) return;
  
  //   // If dropping in the same place
  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return;
  //   }
  
  //   try {

  //     // if (type === 'ITEM') {
  //     //   // Handle item movement
  //     //   const itemId = draggableId;
  //     //   const newFolderId = destination.droppableId === 'standalone' 
  //     //     ? null 
  //     //     : destination.droppableId;
  
  //     //   await axios.put(`http://localhost:5000/api/items/${itemId}`, {
  //     //     order: destination.index,
  //     //     folderId: newFolderId
  //     //   });
  //     // } else if (type === 'PARENT') {
  //     //   // Handle folder reordering
  //     //   const folderId = draggableId.replace('folder-', '');
  //     //   await axios.put(`http://localhost:5000/api/folders/${folderId}`, {
  //     //     order: destination.index
  //     //   });
  //     // }
  
  //     await fetchData();
  //     socketService.emit('itemUpdated', items);
  //   } catch (error) {
  //     console.error('Error updating item/folder order:', error);
  //   }
  // };

  // const onDragEnd = (result: DropResult) => {
  //   const { destination, source } = result;

  //   console.log(result);

  //   if (!destination) {
  //     return;
  //   }

  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return;
  //   }

  //   let add;
  //   let active = todos;
  //   let complete = CompletedTodos;
  //   // Source Logic
  //   if (source.droppableId === "TodosList") {
  //     add = active[source.index];
  //     active.splice(source.index, 1);
  //   } else {
  //     add = complete[source.index];
  //     complete.splice(source.index, 1);
  //   }

  //   // Destination Logic
  //   if (destination.droppableId === "TodosList") {
  //     active.splice(destination.index, 0, add);
  //   } else {
  //     complete.splice(destination.index, 0, add);
  //   }

  //   setCompletedTodos(complete);
  //   setTodos(active);
  // };


  // const onDragEnd = async (result: DropResult) => {
  //   const { source, destination, draggableId, type } = result;

  //   console.log(" ## result",result)
  
  //   if (!destination) return;

  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return;
  //   }
  
  //   try {
  //     if (type === 'ITEM') {

  //       const itemId = draggableId;

  //       let add;
  //       let active = todos;
  //       let complete = CompletedTodos;
  //       // Source Logic
  //       if (source.droppableId === "MAIN") {
  //         add = active[source.index];
  //         active.splice(source.index, 1);
  //       } else {
  //         add = complete[source.index];
  //         complete.splice(source.index, 1);
  //       }
    
  //       // Destination Logic
  //       if (destination.droppableId === "TodosList") {
  //         active.splice(destination.index, 0, add);
  //       } else {
  //         complete.splice(destination.index, 0, add);
  //       }
    
  //       setCompletedTodos(complete);
  //       setTodos(active);

  //       // await axios.put(`http://localhost:5000/api/items/${itemId}`, {
  //       //   order: destination.index,
  //       //   folderId: destination.droppableId === 'MAIN' 
  //       //     ? null 
  //       //     : destination.droppableId
  //       // });

  //       // await axios.put(`http://localhost:5000/api/items/${itemId}`, {
  //       //   order: destination.index,
  //       //   folderId: destination.droppableId === 'MAIN' 
  //       //     ? null 
  //       //     : destination.droppableId
  //       // });
  



  //       await fetchData();
  //       socketService.emit('filesNfolderUpdated', {});
  //     }
  //   } catch (error) {
  //     console.error('Error updating item order:', error);
  //   }
  // };


  // const onDragEnd = async (result: DropResult) => {
  //   const { source, destination, draggableId, type } = result;
  
  //   // If no destination, item was dropped outside valid droppable
  //   if (!destination) return;
  
  //   // If dropped in same location, no action needed
  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return;
  //   }
  
  //   try {
  //     // Handle item dragging
  //     if (type === 'MAIN') {
  //       const itemId = draggableId;
  //       const newFolderId = destination.droppableId === 'MAIN' ? null : destination.droppableId;
        
  //       // Create new arrays to maintain immutability
  //       const updatedFilesNfolders = [...filesNfolders];
        
  //       // Find the item to move
  //       const itemToMove = updatedFilesNfolders.find(
  //         item => item._id === itemId && item.type === 'ITEM'
  //       );
  
  //       if (!itemToMove) return;
  
  //       // Remove from source
  //       if (source.droppableId === 'MAIN') {
  //         // Remove from main list
  //         const sourceIndex = updatedFilesNfolders.findIndex(item => item._id === itemId);
  //         updatedFilesNfolders.splice(sourceIndex, 1);
  //       } else {
  //         // Remove from source folder
  //         const sourceFolder = updatedFilesNfolders.find(
  //           item => item.type === 'FOLDER' && item._id === source.droppableId
  //         ) as FolderNode;
          
  //         if (sourceFolder?.children) {
  //           sourceFolder.children = sourceFolder.children.filter(
  //             child => child._id !== itemId
  //           );
  //         }
  //       }
  
  //       // Add to destination
  //       if (destination.droppableId === 'MAIN') {
  //         // Add to main list
  //         updatedFilesNfolders.splice(destination.index, 0, itemToMove);
  //       } else {
  //         // Add to destination folder
  //         const destFolder = updatedFilesNfolders.find(
  //           item => item.type === 'FOLDER' && item._id === destination.droppableId
  //         ) as FolderNode;
          
  //         if (destFolder) {
  //           if (!destFolder.children) destFolder.children = [];
  //           destFolder.children.splice(destination.index, 0, itemToMove as ItemNode);
  //         }
  //       }
  
  //       // Update the backend
  //       await axios.put(`http://localhost:5000/api/items/${itemId}`, {
  //         order: destination.index,
  //         folderId: newFolderId
  //       });
  
  //       // Update local state
  //       handleFilesNfolderUpdate(updatedFilesNfolders);
        
  //       // Notify other clients
  //       socketService.emit('filesNfolderUpdated', { filesNfolders: updatedFilesNfolders });
  //     }
  
  //     // Handle folder dragging
  //     // if (type === 'PARENT') {
  //     //   const folderId = draggableId.replace('folder-', '');
        
  //     //   // Create new array to maintain immutability
  //     //   const updatedFilesNfolders = [...filesNfolders];
        
  //     //   // Find the folder to move
  //     //   const folderIndex = updatedFilesNfolders.findIndex(
  //     //     item => item._id === folderId && item.type === 'FOLDER'
  //     //   );
        
  //     //   if (folderIndex === -1) return;
  
  //     //   // Remove folder from source
  //     //   const [movedFolder] = updatedFilesNfolders.splice(folderIndex, 1);
        
  //     //   // Insert folder at destination
  //     //   updatedFilesNfolders.splice(destination.index, 0, movedFolder);
  
  //     //   // Update the backend
  //     //   await axios.put(`http://localhost:5000/api/folders/${folderId}`, {
  //     //     order: destination.index
  //     //   });
  
  //     //   // Update local state
  //     //   handleFilesNfolderUpdate(updatedFilesNfolders);
        
  //     //   // Notify other clients
  //     //   socketService.emit('filesNfolderUpdated', { filesNfolders: updatedFilesNfolders });
  //     // }
  
  //   } catch (error) {
  //     console.error('Error updating item/folder order:', error);
  //     // Optionally add error handling UI feedback here
  //   }
  // };


  // const onDragEnd = async (result :DropResult) => {
  //   const { source, destination } = result;

  //   // If dropped outside of a valid destination, do nothing
  //   if (!destination) return;

  //   // Reorder the list
  //   const updatedItems = Array.from(filesNfolders);
  //   const [movedItem] = updatedItems.splice(source.index, 1); // Remove the item
  //   updatedItems.splice(destination.index, 0, movedItem); // Insert it at the new index

  //   await axios.put(`http://localhost:5000/api/filesystem/673f308736c79d8949c1fc39`, {
  //     filesNfolders: updatedItems 
  //   });

  //     setFilesNfolders(updatedItems);


      
  //     await fetchData();
  //     socketService.emit('filesNfolderUpdated', {});

  // };

  // const onDragEnd = async (result: DropResult) => {
  //   const { source, destination, draggableId } = result;
  
  //   // If dropped outside of a valid destination, do nothing
  //   if (!destination) return;
  
  //   // Find the dragged item
  //   const findItemById = (items: IFilesNfolders[], id: string): IFilesNfolders | null => {
  //     for (const item of items) {
  //       if (item._id === id) return item;
  //       if (item.type === 'FOLDER' && item.children) {
  //         const foundInChildren = findItemById(item.children, id);
  //         if (foundInChildren) return foundInChildren;
  //       }
  //     }
  //     return null;
  //   };
  
  //   const draggedItem = findItemById(filesNfolders, draggableId);
  //   if (!draggedItem) return;
  
  //   // Deep clone the current state to avoid direct mutations
  //   const updatedItems = JSON.parse(JSON.stringify(filesNfolders));
  
  //   // Remove item from its original location
  //   const removeItemFromParent = (items: IFilesNfolders[], itemId: string): IFilesNfolders | null => {
  //     for (let i = 0; i < items.length; i++) {
  //       if (items[i]._id === itemId) {
  //         return items.splice(i, 1)[0];
  //       }
  //       if (items[i].type === 'FOLDER' && items[i].children) {
  //         const foundInChildren = removeItemFromParent(items[i].children ||[], itemId);
  //         if (foundInChildren) return foundInChildren;
  //       }
  //     }
  //     return null;
  //   };
  
  //   const movedItem = removeItemFromParent(updatedItems, draggableId);
  //   if (!movedItem) return;
  
  //   // Determine if destination is a folder or root level
  //   const destinationFolder = findItemById(updatedItems, destination.droppableId);
    
  //   if (destinationFolder && destinationFolder.type === 'FOLDER') {
  //     // Moving into a folder
  //     if (!destinationFolder.children) destinationFolder.children = [];
  //     destinationFolder.children.splice(destination.index, 0, movedItem);
  //   } else {
  //     // Moving to root level
  //     updatedItems.splice(destination.index, 0, movedItem);
  //   }
  
  //   // Update backend and local state
  //   await axios.put(`http://localhost:5000/api/filesystem/673f308736c79d8949c1fc39`, {
  //     filesNfolders: updatedItems 
  //   });
  
  //   setFilesNfolders(updatedItems);
  //   await fetchData();
  //   socketService.emit('filesNfolderUpdated', {});
  // };

  // const onDragEnd = async (result: DropResult) => {
  //   const { source, destination, draggableId } = result;
   
  //   // If dropped outside of a valid destination, do nothing
  //   if (!destination) return;
   
  //   // Find the dragged item
  //   const findItemById = (items: IFilesNfolders[], id: string): IFilesNfolders | null => {
  //     for (const item of items) {
  //       if (item._id === id) return item;
  //       if (item.type === 'FOLDER' && item.children) {
  //         const foundInChildren = item.children.find(child => child._id === id);
  //         if (foundInChildren) return foundInChildren;
  //       }
  //     }
  //     return null;
  //   };
   
  //   const draggedItem = findItemById(filesNfolders, draggableId);
  //   if (!draggedItem) return;
   
  //   // Deep clone the current state to avoid direct mutations
  //   const updatedItems = JSON.parse(JSON.stringify(filesNfolders));
   
  //   // Remove item from its original location
  //   const removeItemFromParent = (items: IFilesNfolders[], itemId: string): IFilesNfolders | null => {
  //     for (let i = 0; i < items.length; i++) {
  //       if (items[i]._id === itemId) {
  //         return items.splice(i, 1)[0];
  //       }
  //       if (items[i].type === 'FOLDER' && items[i].children) {
  //         const childIndex = items[i].children.findIndex(child => child._id === itemId);
  //         if (childIndex !== -1) {
  //           return items[i].children.splice(childIndex, 1)[0];
  //         }
  //       }
  //     }
  //     return null;
  //   };
   
  //   const movedItem = removeItemFromParent(updatedItems, draggableId);
  //   if (!movedItem) return;
   
  //   // Determine if destination is a folder or root level
  //   const destinationFolder = findItemById(updatedItems, destination.droppableId);
    
  //   if (destinationFolder && destinationFolder.type === 'FOLDER') {
  //     // Moving into a folder
  //     if (!destinationFolder.children) destinationFolder.children = [];
  //     destinationFolder.children.splice(destination.index, 0, {
  //       ...movedItem,
  //       type: 'ITEM',
  //       children: []
  //     });
  //   } else {
  //     // Moving to root level
  //     updatedItems.splice(destination.index, 0, movedItem);
  //   }
   
  //   // Update backend and local state
  //   await axios.put(`http://localhost:5000/api/filesystem/673f308736c79d8949c1fc39`, {
  //     filesNfolders: updatedItems 
  //   });
   
  //   setFilesNfolders(updatedItems);
  //   await fetchData();
  //   socketService.emit('filesNfolderUpdated', {});
  //  };
  // const onDragEnd = async (result: DropResult) => {
  //   const { source, destination, draggableId } = result;
  
  //   // If dropped outside of a valid destination, do nothing
  //   if (!destination) return;
  
  //   // Deep clone the current state to avoid direct mutations
  //   const updatedItems = JSON.parse(JSON.stringify(filesNfolders));
  
  //   // Find and remove the dragged item from its original location
  //   const removeItemFromParent = (items: IFilesNfolders[]): IFilesNfolders | null => {
  //     for (const item of items) {
  //       // Check root-level items
  //       if (item._id === draggableId) {
  //         return items.splice(items.findIndex(i => i._id === draggableId), 1)[0];
  //       }
  
  //       // Check within folder children
  //       if (item.type === 'FOLDER' && item.children) {
  //         const childIndex = item.children.findIndex(child => child._id === draggableId);
  //         if (childIndex !== -1) {
  //           return item.children.splice(childIndex, 1)[0];
  //         }
  //       }
  //     }
  //     return null;
  //   };
  
  //   const movedItem = removeItemFromParent(updatedItems);
  //   if (!movedItem) return;
  
  //   // Find destination folder
  //   const findDestinationFolder = (items: IFilesNfolders[]): IFilesNfolders | null => {
  //     for (const item of items) {
  //       if (item._id === destination.droppableId) return item;
  //       if (item.type === 'FOLDER' && item.children) {
  //         const foundInChildren = item.children.find(child => child._id === destination.droppableId);
  //         if (foundInChildren) return item;
  //       }
  //     }
  //     return null;
  //   };
  
  //   const destinationFolder = findDestinationFolder(updatedItems);
    
  //   if (destinationFolder && destinationFolder.type === 'FOLDER') {
  //     // Moving into a folder
  //     if (!destinationFolder.children) destinationFolder.children = [];
      
  //     // Explicitly create an item matching the exact interface
  //     const itemToInsert: IFilesNfolders['children'][number] = {
  //       _id: movedItem._id,
  //       type: 'ITEM',
  //       name: movedItem.name,
  //       icon: movedItem.icon,
  //       children: [],
  //       isOpen: false
  //     };
  
  //     destinationFolder.children.splice(destination.index, 0, itemToInsert);
  //   } else {
  //     // Moving to root level
  //     updatedItems.splice(destination.index, 0, movedItem);
  //   }
  
  //   // Update backend and local state
  //   await axios.put(`http://localhost:5000/api/filesystem/673f308736c79d8949c1fc39`, {
  //     filesNfolders: updatedItems 
  //   });
  
  //   setFilesNfolders(updatedItems);
  //   await fetchData();
  //   socketService.emit('filesNfolderUpdated', {});
  // };

  // const onDragEnd = async (result: DropResult) => {
  //   const { source, destination, draggableId } = result;
  
  //   // If dropped outside of a valid destination, do nothing
  //   if (!destination) return;
  
  //   // Deep clone the current state to avoid direct mutations
  //   const updatedItems = JSON.parse(JSON.stringify(filesNfolders));
  
  //   // Helper function to find a folder by ID
  //   const findFolderById = (items: IFilesNfolders[], id: string): IFilesNfolders | null => {
  //     for (const item of items) {
  //       if (item._id === id && item.type === 'FOLDER') return item;
  //       if (item.type === 'FOLDER' && item.children.length > 0) {
  //         const found = findFolderById(item.children as IFilesNfolders[], id);
  //         if (found) return found;
  //       }
  //     }
  //     return null;
  //   };
  
  //   // Helper function to find and remove an item by ID
  //   const findAndRemoveItem = (items: IFilesNfolders[], id: string): IFilesNfolders | null => {
  //     // Check root level
  //     const rootIndex = items.findIndex(item => item._id === id);
  //     if (rootIndex !== -1) {
  //       return items.splice(rootIndex, 1)[0];
  //     }
  
  //     // Check in folders
  //     for (const item of items) {
  //       if (item.type === 'FOLDER') {
  //         const childIndex = item.children.findIndex(child => child._id === id);
  //         if (childIndex !== -1) {
  //           return item.children.splice(childIndex, 1)[0];
  //         }
  
  //         // Recursively check nested folders
  //         if (item.children.length > 0) {
  //           const found = findAndRemoveItem(item.children as IFilesNfolders[], id);
  //           if (found) return found;
  //         }
  //       }
  //     }
  //     return null;
  //   };
  
  //   // Find and remove the dragged item
  //   const movedItem = findAndRemoveItem(updatedItems, draggableId);
  //   if (!movedItem) return;
  
  //   // Handle dropping into a folder or root level
  //   if (destination.droppableId !== 'root') {
  //     // Find the destination folder
  //     const destFolder = findFolderById(updatedItems, destination.droppableId);
      
  //     if (destFolder) {
  //       // Initialize children array if it doesn't exist or is empty
  //       if (!destFolder.children) {
  //         destFolder.children = [];
  //       }
  
  //       // Create a properly typed item for insertion
  //       const itemToInsert = {
  //         _id: movedItem._id,
  //         type: 'ITEM' as const,
  //         name: movedItem.name,
  //         icon: movedItem.icon,
  //         isOpen: false,
  //         children: []
  //       };
  
  //       // Insert at the correct position
  //       destFolder.children.splice(destination.index, 0, itemToInsert);
  //     }
  //   } else {
  //     // Moving to root level
  //     updatedItems.splice(destination.index, 0, {
  //       ...movedItem,
  //       type: movedItem.type,
  //       children: movedItem.type === 'FOLDER' ? [] : movedItem.children,
  //       isOpen: false
  //     });
  //   }
  
  //   // Update backend and local state
  //   try {
  //     await axios.put(`http://localhost:5000/api/filesystem/673f308736c79d8949c1fc39`, {
  //       filesNfolders: updatedItems 
  //     });
  
  //     setFilesNfolders(updatedItems);
  //     await fetchData();
  //     socketService.emit('filesNfolderUpdated', {});
  //   } catch (error) {
  //     console.error('Error updating items:', error);
  //   }
  // };
  // const onDragEnd = async (result: DropResult) => {
  //   const { source, destination, draggableId } = result;
  
  //   // If dropped outside of a valid destination, do nothing
  //   if (!destination) return;
  
  //   // Deep clone the current state to avoid direct mutations
  //   const updatedItems = JSON.parse(JSON.stringify(filesNfolders));
  
  //   // Helper function to find a folder by ID
  //   const findFolderById = (items: IFilesNfolders[], id: string): IFilesNfolders | null => {
  //     for (const item of items) {
  //       if (item._id === id && item.type === 'FOLDER') return item;
  //       if (item.type === 'FOLDER' && item.children?.length > 0) {
  //         const found = findFolderById(item.children, id);
  //         if (found) return found;
  //       }
  //     }
  //     return null;
  //   };
  
  //   // Helper function to find and remove an item by ID
  //   const findAndRemoveItem = (items: IFilesNfolders[], id: string): IFilesNfolders | null => {
  //     // Check root level
  //     const rootIndex = items.findIndex(item => item._id === id);
  //     if (rootIndex !== -1) {
  //       return items.splice(rootIndex, 1)[0];
  //     }
  
  //     // Check in folders
  //     for (const item of items) {
  //       if (item.type === 'FOLDER' && item.children) {
  //         const childIndex = item.children.findIndex(child => child._id === id);
  //         if (childIndex !== -1) {
  //           return item.children.splice(childIndex, 1)[0];
  //         }
  
  //         // Recursively check nested folders
  //         const found = findAndRemoveItem(item.children, id);
  //         if (found) return found;
  //       }
  //     }
  //     return null;
  //   };
  
  //   // Find and remove the dragged item
  //   const movedItem = findAndRemoveItem(updatedItems, draggableId);
  //   if (!movedItem) return;
  
  //   // Handle dropping into a folder or root level
  //   if (destination.droppableId !== 'root') {
  //     // Find the destination folder
  //     const destFolder = findFolderById(updatedItems, destination.droppableId);
      
  //     if (destFolder && destFolder.type === 'FOLDER') {
  //       // Ensure children array exists
  //       if (!destFolder.children) {
  //         destFolder.children = [];
  //       }
  
  //       // Create a properly typed item for insertion
  //       const itemToInsert: IFilesNfolders = {
  //         _id: movedItem._id,
  //         type: movedItem.type,
  //         name: movedItem.name,
  //         icon: movedItem.icon,
  //         isOpen: false,
  //         children: movedItem.type === 'FOLDER' ? [] : []
  //       };
  
  //       // Insert at the correct position
  //       //@ts-ignore
  //       destFolder.children.splice(destination.index, 0, itemToInsert);
  //     }
  //   } else {
  //     // Moving to root level
  //     updatedItems.splice(destination.index, 0, {
  //       ...movedItem,
  //       isOpen: false,
  //       children: movedItem.type === 'FOLDER' ? [] : undefined
  //     });
  //   }
  
  //   // Update backend and local state
  //   try {
  //     await axios.put(`http://localhost:5000/api/filesystem/673f308736c79d8949c1fc39`, {
  //       filesNfolders: updatedItems 
  //     });
  
  //     setFilesNfolders(updatedItems);
  //     await fetchData();
  //     socketService.emit('filesNfolderUpdated', {});
  //   } catch (error) {
  //     console.error('Error updating items:', error);
  //   }
  // };
  // const onDragEnd = async (result: DropResult) => {
  //   const { source, destination, draggableId } = result;
  
  //   // If dropped outside of a valid destination, do nothing
  //   if (!destination) return;
  
  //   // Deep clone the current state to avoid direct mutations
  //   const updatedItems = JSON.parse(JSON.stringify(filesNfolders));
  
  //   // Helper function to find a folder by ID
  //   const findFolderById = (items: IFilesNfolders[], id: string): IFilesNfolders | null => {
  //     for (const item of items) {
  //       if (item._id === id && item.type === 'FOLDER') return item;
  //       if (item.type === 'FOLDER' && Array.isArray(item.children) && item.children.length > 0) {
  //         const found = findFolderById(item.children, id);
  //         if (found) return found;
  //       }
  //     }
  //     return null;
  //   };
  
  //   // Helper function to find and remove an item by ID
  //   const findAndRemoveItem = (items: IFilesNfolders[], id: string): IFilesNfolders | null => {
  //     // Check root level
  //     const rootIndex = items.findIndex(item => item._id === id);
  //     if (rootIndex !== -1) {
  //       return items.splice(rootIndex, 1)[0];
  //     }
  
  //     // Check in folders
  //     for (const item of items) {
  //       if (item.type === 'FOLDER') {
  //         // Ensure children is always an array
  //         if (!Array.isArray(item.children)) {
  //           item.children = [];
  //         }
          
  //         const childIndex = item.children.findIndex(child => child._id === id);
  //         if (childIndex !== -1) {
  //           return item.children.splice(childIndex, 1)[0];
  //         }
  
  //         // Recursively check nested folders
  //         const found = findAndRemoveItem(item.children, id);
  //         if (found) return found;
  //       }
  //     }
  //     return null;
  //   };
  
  //   // Find and remove the dragged item
  //   const movedItem = findAndRemoveItem(updatedItems, draggableId);
  //   if (!movedItem) return;
  
  //   // Handle dropping into a folder or root level
  //   if (destination.droppableId !== 'root') {
  //     // Find the destination folder
  //     const destFolder = findFolderById(updatedItems, destination.droppableId);
      
  //     if (destFolder && destFolder.type === 'FOLDER') {
  //       // Always ensure children is an array
  //       if (!Array.isArray(destFolder.children)) {
  //         destFolder.children = [];
  //       }
  
  //       // Create a properly typed item for insertion
  //       const itemToInsert: IFilesNfolders = {
  //         _id: movedItem._id,
  //         type: movedItem.type,
  //         name: movedItem.name,
  //         icon: movedItem.icon,
  //         isOpen: false,
  //         children: movedItem.type === 'FOLDER' ? [] : []  // Always initialize as an empty array
  //       };
  
  //       // Insert at the correct position
  //       destFolder.children.splice(destination.index, 0, itemToInsert);
  //     }
  //   } else {
  //     // Moving to root level
  //     const rootItem: IFilesNfolders = {
  //       ...movedItem,
  //       isOpen: false,
  //       children: movedItem.type === 'FOLDER' ? [] : []  // Always initialize as an empty array
  //     };
      
  //     updatedItems.splice(destination.index, 0, rootItem);
  //   }
  
  //   // Update backend and local state
  //   try {
  //     await axios.put(`http://localhost:5000/api/filesystem/673f308736c79d8949c1fc39`, {
  //       filesNfolders: updatedItems 
  //     });
  
  //     setFilesNfolders(updatedItems);
  //     await fetchData();
  //     socketService.emit('filesNfolderUpdated', {});
  //   } catch (error) {
  //     console.error('Error updating items:', error);
  //   }
  // };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
  
    if (!destination) return;
  
    // Helper function to ensure all items have children arrays
    const ensureChildren = (items: IFilesNfolders[]): IFilesNfolders[] => {
      return items.map(item => ({
        ...item,
        children: Array.isArray(item.children) 
          ? ensureChildren(item.children)
          : [],
      }));
    };
  
    // Deep clone and ensure children arrays exist
    const updatedItems = ensureChildren(JSON.parse(JSON.stringify(filesNfolders)));
  
    // Helper function to find a folder by ID
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
  
    // Helper function to find and remove an item by ID
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
  
    // Ensure the moved item has a children array
    const preparedItem: IFilesNfolders = {
      _id: movedItem._id,
      type: movedItem.type,
      name: movedItem.name,
      icon: movedItem.icon,
      isOpen: false,
      children: []
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
      await axios.put(`http://localhost:5000/api/filesystem/673f308736c79d8949c1fc39`, {
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
            // onFileNfolderUpdate={handleFilesNfolderUpdate}
          />
        </DragDropContext>
      </Container>
    </ThemeProvider>
  );
};

export default App;
