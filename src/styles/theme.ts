export const theme = {
  colors: {
    primary: '#2196f3',
    secondary: '#f50057',
    background: '#f5f5f5',
    surface: '#ffffff',
    text: '#333333',
    border: '#e0e0e0',
    hover: '#f0f0f0'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px'
  },
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 8px rgba(0,0,0,0.1)',
    large: '0 8px 16px rgba(0,0,0,0.1)'
  }
} as const;

export type Theme = typeof theme; 