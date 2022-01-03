import React, {useContext} from 'react';
import FiltersContext from '../contexts/FiltersContext';

export default function useFilters() {
  return useContext(FiltersContext);
}
