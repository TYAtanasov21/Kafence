// src/components/web/Button.web.tsx
import React from 'react';
import { ButtonProps } from '../shared/Button';

const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <button style={styles.button} onClick={onPress}>
      {title}
    </button>
  );
};

const styles = {
  button: {
    padding: '10px',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    color: '#FFF',
    cursor: 'pointer',
  },
};

export default Button;
