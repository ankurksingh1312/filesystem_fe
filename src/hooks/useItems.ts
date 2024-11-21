import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { IFilesNfolders } from '../types';
import { socketService } from '../services/socketService';

export const useItems = () => {

  const [filesNfolders, setFilesNfolders] = useState<IFilesNfolders[]>([]);


  const fetchData = useCallback(async () => {
    try {
      

      const [data] = await Promise.all([
        axios.get<{filesNfolders :IFilesNfolders[]}>('http://localhost:5000/api/filesystem/673f308736c79d8949c1fc39'),
      ]);
      console.log('# fetchData', data.data.filesNfolders);
      setFilesNfolders(data.data.filesNfolders);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  // const handleItemUpdate = useCallback((updatedItem: Item) => {
  //   console.log(' # handleItemUpdate', updatedItem);
  //   setItems(prevItems => 
  //     prevItems.map(item => 
  //       item._id === updatedItem._id ? updatedItem : item
  //     )
  //   );
  // }, []);

  const handleFilesNfolderUpdate = useCallback((updatedFileNfolder: IFilesNfolders) => {
    console.log(' # handleFilesNfolderUpdate', updatedFileNfolder);
    setFilesNfolders(prevFileNFolders => 
      prevFileNFolders.map(fileNfolder => 
        fileNfolder._id === fileNfolder._id ? updatedFileNfolder : fileNfolder
      )
    );
  }, []);

  // const handleDragEnd = async (result: any) => {
  //   if (!result.destination) return;

  //   const { source, destination, draggableId } = result;
    
  //   // Handle reordering logic here
  //   const updates = calculateNewOrder(
  //     items,
  //     folders,
  //     source,
  //     destination,
  //     draggableId
  //   );

  //   // Emit changes through socket
  //   socketService.emit('updateOrder', updates);
  // };
  
  useEffect(() => {
    fetchData();
    socketService.subscribe('filesNfolderUpdate', handleFilesNfolderUpdate);
    console.log('# subscribed to filesNfolderUpdate');
    // socketService.subscribe('folderUpdate', handleFolderUpdate);
    // console.log('# subscribed to folderUpdate');

    return () => {
      socketService.unsubscribe('filesNfolderUpdate');
      console.log('-# unsubscribed from filesNfolderUpdate');
      // socketService.unsubscribe('folderUpdate');
      // console.log('-# unsubscribed from folderUpdate');
    };
  }, [fetchData, handleFilesNfolderUpdate]);

  return {
    filesNfolders,
    fetchData,
    setFilesNfolders,
    // handleItemUpdate,
    // handleFolderUpdate,
    handleFilesNfolderUpdate
    // handleDragEnd
  };
}; 


// Helper function to calculate new order
// function calculateNewOrder(
//   items: Item[],
//   folders: Folder[],
//   source: any,
//   destination: any,
//   draggableId: string
// ) {
//   // Implementation of reordering logic
//   // Returns the updates needed for both items and folders
//   // This would be a complex implementation handling all drag and drop cases
//   // Including moving items between folders
//   return {
//     items: [],
//     folders: []
//   };
// }