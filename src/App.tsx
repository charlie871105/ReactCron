import { Box, ThemeProvider } from '@mui/material';
import ReactCron from './ReactCron';
import { DefaultTheme } from './Theme';

function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <ReactCron
          initValue="* * * * *"
          onChange={(cron, error) => console.log(cron, error)}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
