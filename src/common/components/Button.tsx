import { FC } from 'react';
import { StyledButton } from './Button.styles';

interface ButtonProps {
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({ children, onClick = () => {} }) => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
);
