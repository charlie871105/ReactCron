import { Box, InputLabel, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { formatLabel, useReadableCron } from '../util';

type ReadableCronLabelProps = {
  cron: string;
};
function ReadableCronLabel({ cron }: ReadableCronLabelProps) {
  const readableCron = useReadableCron(cron);
  const { t } = useTranslation();
  return (
    <Box>
      <InputLabel>{t('Current Cron')}</InputLabel>
      <Tooltip title={readableCron} arrow>
        <Typography
          sx={{
            boxSizing: 'border-box',
            whiteSpace: 'nowrap',
            width: '250px',
            border: '2px solid',
            borderColor: 'divider',
            borderRadius: '5px',
            padding: '6px 12px',
            overflow: 'hidden',
            fontWeight: 500,
          }}
        >
          {formatLabel(readableCron, 20)}
        </Typography>
      </Tooltip>
    </Box>
  );
}

export default ReadableCronLabel;
