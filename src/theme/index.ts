import { createTheme } from '@mui/material/styles';

const colors = {
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
  },
  text: {
    primary: '#333333',
    secondary: '#666666',
  },
  border: {
    light: '#e0e0e0',
    main: '#cccccc',
    dark: '#999999',
  },
  grey: {
    50: '#fafafa',
  },
};

export const theme = createTheme({
  palette: {
    primary: colors.primary,
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
  },
  typography: {
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      marginBottom: 24, // 3 * 8px spacing
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      marginBottom: 16, // 2 * 8px spacing
    },
    button: {
      textTransform: 'none' as const,
      fontWeight: 500,
    },
  },
  components: {
    // Button component overrides
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          minWidth: 100,
        },
        outlined: {
          borderColor: colors.border.main,
          color: colors.text.secondary,
          '&:hover': {
            borderColor: colors.border.dark,
            backgroundColor: colors.grey[50],
          },
        },
      },
    },
    // TextField component overrides
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: colors.border.light,
            },
            '&:hover fieldset': {
              borderColor: colors.border.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary.main,
            },
          },
          '& .MuiInputLabel-root': {
            color: colors.text.secondary,
            '&.Mui-focused': {
              color: colors.primary.main,
            },
          },
        },
      },
    },
  },
});

export default theme;