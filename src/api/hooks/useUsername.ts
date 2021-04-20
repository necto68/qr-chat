import { useContext } from 'react';
import { UsernameContext } from '../contexts';

export const useUsername = () => useContext(UsernameContext);
