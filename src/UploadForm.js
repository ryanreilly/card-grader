import React from 'react';
import { Input } from '@mui/material';

const UploadForm = ({ onChange }) => {
  return (
    <Input
      type="file"
      accept="image/*"
      onChange={onChange}
      style={{ marginBottom: '10px' }}
    />
  );
};

export default UploadForm;