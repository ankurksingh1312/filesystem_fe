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

const App: React.FC = () => {
  const {
    items,
    folders,
    fetchData,
    handleFolderUpdate: originalHandleFolderUpdate
  } = useItems();

  const handleFolderUpdate = (folderId: string, updates: any) => {
    originalHandleFolderUpdate({ id: folderId, ...updates });
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId, type } = result;

    if (!destination) return;

    if (type === 'ITEM') {
      try {
        await axios.put(`http://localhost:5000/api/items/${draggableId.replace('item-', '')}`, {
          order: destination.index,
          folderId: destination.droppableId === 'main' ? null : destination.droppableId
        });
        
        await fetchData();
        socketService.emit('itemUpdated', items);
      } catch (error) {
        console.error('Error updating item order:', error);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AddItemForm onAdd={fetchData} />
        <DragDropContext onDragEnd={onDragEnd}>
          <ItemList 
            items={items} 
            folders={folders}
            onUpdateFolder={handleFolderUpdate}
          />
        </DragDropContext>
      </Container>
    </ThemeProvider>
  );
};

export default App;
