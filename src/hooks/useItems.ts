import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { IFilesNfolders } from '../types';
import  {socketService}  from '../services/socketService';

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


  const handleFilesNfolderUpdate = useCallback((data: any) => {
    console.log('handleFilesNfolderUpdate called with:', data?.updatedItems);
    if (data?.updatedItems) {
      setFilesNfolders(prev => {
        console.log('Updating files and folders:', prev, data?.updatedItems);
        return data?.updatedItems; 
      });
    }


  }, []);


  useEffect(() => {
    const socket = socketService.connect();
    fetchData();
    socketService.subscribe('filesNfolderUpdate', handleFilesNfolderUpdate);
    console.log('# subscribed to filesNfolderUpdate');

    return () => {
      socketService.unsubscribe('filesNfolderUpdate');
      console.log('-# unsubscribed from filesNfolderUpdate');
    };
  }, [fetchData, handleFilesNfolderUpdate]);

  return {
    filesNfolders,
    fetchData,
    setFilesNfolders,
    handleFilesNfolderUpdate
  };
}; 


