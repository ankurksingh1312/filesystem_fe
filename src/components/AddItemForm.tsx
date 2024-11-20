import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { FormContainer, FormField, AddButton } from '../styles/components';
import axios from 'axios';
import { socketService } from '../services/socketService';

interface AddItemFormProps {
  onAdd: () => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !icon) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/items', {
        title,
        icon,
        order: 9999,
      });
      
      socketService.emit('itemUpdated', response.data);
      console.log(' #EMITED  itemUpdated', response.data);
      
      setTitle('');
      setIcon('');
      onAdd();
    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormField>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
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
        disabled={isSubmitting || !title || !icon}
      >
        {isSubmitting ? 'Adding...' : 'Add Item'}
      </AddButton>
    </FormContainer>
  );
};

export default AddItemForm; 