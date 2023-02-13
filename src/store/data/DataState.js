import DataContext from './DataContext';
import { priceList } from 'utils/data';

function DataState({ children }) {
  return (
    <DataContext.Provider value={{ data: priceList }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataState;
