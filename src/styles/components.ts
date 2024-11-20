import styled from 'styled-components';
import { Paper as MuiPaper } from '@mui/material';
import { devices } from './breakpoints';

export const Container = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  margin: 0 auto;

  ${devices.sm} {
    padding: ${({ theme }) => theme.spacing.lg};
    max-width: 540px;
  }

  ${devices.md} {
    max-width: 720px;
  }

  ${devices.lg} {
    max-width: 960px;
  }

  ${devices.xl} {
    max-width: 1140px;
  }
`;

export const DraggableContainer = styled.div<{ isDragging?: boolean }>`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  transition: background-color 0.2s ease;
  background-color: ${({ isDragging, theme }) =>
    isDragging ? theme.colors.hover : theme.colors.surface};
  touch-action: none;
`;

export const FolderContainer = styled(MuiPaper)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.medium};

  ${devices.md} {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const ItemContainer = styled(MuiPaper)`
  padding: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 48px;

  ${devices.md} {
    padding: ${({ theme }) => theme.spacing.md};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
    transform: translateY(-2px);
  }

  @media (hover: none) {
    &:hover {
      transform: none;
    }
  }
`;

export const FolderHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  min-height: 48px;

  h6 {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const FolderContent = styled.div<{ isOpen: boolean }>`
  padding-left: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};

  ${devices.md} {
    padding-left: ${({ theme }) => theme.spacing.lg};
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  ${devices.md} {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const FormField = styled.div`
  flex: 1;

  input {
    width: 100%;
  }
`;

export const AddButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  min-height: 48px;

  ${devices.md} {
    width: auto;
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
  }
`; 