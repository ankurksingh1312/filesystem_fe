import { useCallback } from 'react';
import axios from 'axios';
import { Folder } from '../types';
import { socketService } from '../services/socketService';

export const useFolder = (folder: Folder, onUpdateFolder: (folder: Folder) => void) => {
  const toggleFolder = useCallback(async () => {
    try {
      const response = await axios.put<Folder>(
        `http://localhost:5000/api/folders/${folder._id}`,
        {
          isOpen: !folder.isOpen,
        }
      );
      onUpdateFolder(response.data);
      socketService.emit('folderUpdated', response.data);
    } catch (error) {
      console.error('Error toggling folder:', error);
    }
  }, [folder._id, folder.isOpen, onUpdateFolder]);

  return { toggleFolder };
}; 