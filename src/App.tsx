import { Box, ThemeProvider } from '@mui/material';
import ReactCron from './ReactCron';
import { DefaultTheme } from './Theme';

function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <ReactCron onChange={(cron) => console.log(cron)} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
