import React, { useState } from 'react';
import { Container, AppBar, Toolbar, Typography, Card, CardContent, Button, CircularProgress } from '@mui/material';
import UploadForm from './UploadForm';
import ScoreDisplay from './ScoreDisplay';

function App() {
  const [image, setImage] = useState(null); // Store the image preview URL
  const [imageFile, setImageFile] = useState(null); // Store the actual File object for the API request
  const [scores, setScores] = useState(null); // Store the calculated scores
  const [loading, setLoading] = useState(false); // Track processing state
  const [error, setError] = useState(null); // Handle errors

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      // Validate image size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image file is too large. Please upload an image smaller than 5MB.');
        setImage(null);
        setImageFile(null);
        setScores(null);
        return;
      }
      setImage(URL.createObjectURL(file));
      setImageFile(file); // Store the File object for the API request
      setError(null);
      setScores(null); // Reset scores when a new image is selected
    } else {
      setError('Please select a valid image file.');
      setImage(null);
      setImageFile(null);
      setScores(null);
    }
  };

  const handleGrade = async () => {
    if (!imageFile) {
      setError('Please select an image first.');
      return;
    }

    setLoading(true);
    setError(null);
    setScores(null);

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch('https://card-grader-backend.onrender.com/grade', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to grade the image. Please try again.');
      }

      const data = await response.json();
      setScores(data);
    } catch (err) {
      setError(err.message || 'An error occurred while grading the image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Card Grader</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" style={{ marginTop: '20px' }}>
        <Card>
          <CardContent>
            <UploadForm onChange={handleImageChange} />
            {image && (
              <div style={{ marginTop: '20px' }}>
                <img src={image} alt="Preview of the uploaded card" style={{ maxWidth: '100%' }} />
              </div>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleGrade}
              disabled={!imageFile || loading}
              style={{ marginTop: '20px' }}
            >
              {loading ? <CircularProgress size={24} /> : 'Grade'}
            </Button>
            {loading && (
              <Typography style={{ marginTop: '10px', color: 'gray' }}>
                Processing... This may take up to 60 seconds on the first request due to server spin-up.
              </Typography>
            )}
            {error && <Typography color="error" style={{ marginTop: '10px' }}>{error}</Typography>}
            {scores && <ScoreDisplay scores={scores} />}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default App;