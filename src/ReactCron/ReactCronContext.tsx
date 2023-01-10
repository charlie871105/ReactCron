import React, { createContext } from 'react';
import { ReactCronContextType } from './type';

export const ReactCronContext = createContext<ReactCronContextType | null>(
  null
);
