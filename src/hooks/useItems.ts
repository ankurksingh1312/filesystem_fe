import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Item, Folder } from '../types';
import { socketService } from '../services/socketService';

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);

  const fetchData = useCallback(async () => {
    try {
      console.log('# fetchData');
      
      const [itemsRes, foldersRes] = await Promise.all([
        axios.get<Item[]>('http://localhost:5000/api/items'),
        axios.get<Folder[]>('http://localhost:5000/api/folders')
      ]);
      setItems(itemsRes.data);
      setFolders(foldersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  const handleItemUpdate = useCallback((updatedItem: Item) => {
    console.log(' # handleItemUpdate', updatedItem);
    setItems(prevItems => 
      prevItems.map(item => 
        item._id === updatedItem._id ? updatedItem : item
      )
    );
  }, []);

  const handleFolderUpdate = useCallback((updatedFolder: Folder) => {
    console.log(' # handleFolderUpdate', updatedFolder);
    setFolders(prevFolders => 
      prevFolders.map(folder => 
        folder._id === updatedFolder._id ? updatedFolder : folder
      )
    );
  }, []);

  useEffect(() => {
    fetchData();

    socketService.subscribe('itemUpdate', handleItemUpdate);
    console.log('# subscribed to itemUpdate');
    socketService.subscribe('folderUpdate', handleFolderUpdate);
    console.log('# subscribed to folderUpdate');

    return () => {
      socketService.unsubscribe('itemUpdate');
      console.log('-# unsubscribed from itemUpdate');
      socketService.unsubscribe('folderUpdate');
      console.log('-# unsubscribed from folderUpdate');
    };
  }, [fetchData, handleItemUpdate, handleFolderUpdate]);

  return {
    items,
    folders,
    fetchData,
    handleItemUpdate,
    handleFolderUpdate
  };
}; 