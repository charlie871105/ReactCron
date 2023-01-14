import { Box, ThemeProvider } from '@mui/material';
import ReactCron from './ReactCron';
import { DefaultTheme } from './Theme';

function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <ReactCron
          initValue="16 19 01,17,18 * *"
          onChange={(cron) => console.log(cron)}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
