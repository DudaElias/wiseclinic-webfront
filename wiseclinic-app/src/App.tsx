import { LocalizationProvider } from '@mui/x-date-pickers';
import './App.css';
import Menu from './components/Menu';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Menu/>
    </LocalizationProvider>
  );
}

export default App;
