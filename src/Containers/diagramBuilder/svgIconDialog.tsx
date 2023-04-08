import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

interface ISvgIconDialogProps {
  isOpen: boolean;
  onModalClose(): void;
  onDropdownChange(key: string, value: string): void;
}

export default function SvgIconDialog({
  isOpen,
  onModalClose,
  onDropdownChange,
}: ISvgIconDialogProps) {
  const onSave = () => {
    onModalClose();
  };

  return (
    <Dialog open={isOpen} fullWidth={true} onClose={onModalClose}>
      <DialogTitle>
        Select SVGs
        <IconButton
          aria-label='close'
          onClick={onModalClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <Box sx={{ width: '100%', display: 'flex' }}>
            <Box sx={{ width: '100%', padding: '0 5px' }}>
              <Typography>Soure Icon</Typography>
              <Select
                size='small'
                sx={{ width: '100%' }}
                defaultValue={''}
                onChange={(e) =>
                  onDropdownChange('source', e.target.value as string)
                }
              >
                <MenuItem value='plus'>Plus</MenuItem>
                <MenuItem value='circle'>Circle</MenuItem>
              </Select>
            </Box>
            <Box sx={{ width: '100%', padding: '0 5px' }}>
              <Typography>Target Icon</Typography>
              <Select
                size='small'
                sx={{ width: '100%' }}
                defaultValue={''}
                onChange={(e) =>
                  onDropdownChange('target', e.target.value as string)
                }
              >
                <MenuItem value='plus'>Plus</MenuItem>
                <MenuItem value='circle'>Circle</MenuItem>
              </Select>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
