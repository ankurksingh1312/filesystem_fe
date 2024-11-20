import React from 'react';
import styled from 'styled-components';
import { Dialog, DialogTitle, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { Delete, Edit, FileCopy } from '@mui/icons-material';

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 100%;
    margin: ${({ theme }) => theme.spacing.sm};
    max-width: none;
    position: fixed;
    bottom: 0;
    margin-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

interface MobileContextMenuProps {
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

const MobileContextMenu: React.FC<MobileContextMenuProps> = ({
  open,
  onClose,
  onEdit,
  onDelete,
  onDuplicate,
}) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      fullWidth
    >
      <DialogTitle>Actions</DialogTitle>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={onEdit}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={onDuplicate}>
            <ListItemIcon>
              <FileCopy />
            </ListItemIcon>
            <ListItemText primary="Duplicate" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={onDelete}>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </ListItemButton>
        </ListItem>
      </List>
    </StyledDialog>
  );
};

export default MobileContextMenu; 