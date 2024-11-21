import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { FormContainer, FormField, AddButton } from '../styles/components';
import axios from 'axios';
import { socketService } from '../services/socketService';

interface AddFolderFormProps {
  fetchData: () => void;
  filesNfolders: any[];
  setFilesNfolders: (filesNfolders: any[]) => void;
}

const AddFolderForm: React.FC<AddFolderFormProps> = ({ fetchData, filesNfolders, setFilesNfolders  }) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !icon) return;
    
    setIsSubmitting(true);
    
    try {

      const updatedItems = Array.from(filesNfolders);


      await axios.put(`http://localhost:5000/api/filesystem/673f308736c79d8949c1fc39`, {
        filesNfolders: [...updatedItems, {name, icon, "type": "FOLDER",children:[],isOpen:false }] 
      }); 
      
      socketService.emit('filesNfolderUpdated', {});
      console.log(' #EMITED  filesNfolderUpdated', {});

      setName('');
      setIcon('');
      fetchData();

    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   if (!name.trim()) return;
    
  //   setIsSubmitting(true);
    
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/folders', {
  //       name: name.trim(),
  //       order: 9999, // Default to end of list
  //       isOpen: true // Default to open state
  //     });
      
  //     socketService.emit('folderUpdated', response.data);
  //     console.log(' #EMITED folderUpdated', response.data);
      
  //     // Reset form
  //     setName('');
  //     onAdd();
  //   } catch (error) {
  //     console.error('Error adding folder:', error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormField>
        <TextField
          label="Folder Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          placeholder="Enter folder name"
          size="small"
        />
      </FormField>
      <FormField>
        <TextField
          label="Icon"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          fullWidth
          required
        />
      </FormField>
      <AddButton 
        type="submit" 
        disabled={isSubmitting || !name.trim()}
        color="primary"
      >
        {isSubmitting ? 'Creating...' : 'Create Folder'}
      </AddButton>
    </FormContainer>
  );
};

export default AddFolderForm;