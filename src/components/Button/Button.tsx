import React from 'react';
import { Button as MuiButton,type ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <MuiButton {...props}>
      {children}
    </MuiButton>
  );
};

export default Button;