import React, { useState } from 'react';
import { Container, AppBar, Toolbar, Typography, Card, CardContent, Button, CircularProgress, Grid } from '@mui/material';
import UploadForm from './UploadForm';
import ScoreDisplay from './ScoreDisplay';

// Placeholder function to simulate image processing (replace with your actual logic)
const processImage = async (imageFile) => {
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a 2-second delay
  return {
    centering: 8.5,
    corners: 9.0,
    edges: 8.0,
    surface: 9.5,
    overall: 9.0
  };
};

function App() {
  const [image, setImage] = useState(null); // Store the image preview URL
  const [scores, setScores] = useState(null); // Store the calculated scores
  const [loading, setLoading] = useState(false); // Track processing state
  const [error, setError] = useState(null); // Handle errors

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(URL.createObjectURL(file));
      setError(null);
      setScores(null); // Reset scores when a new image is selected
    } else {
      setError('Please select a valid image file.');
    }
  };

  const handleGrade = async () => {
    if (!image) {
      setError('Please select an image first.');
      return;
    }
    setLoading(true);
    try {
      const scores = await processImage(image);
      setScores(scores);
      setError(null);
    } catch (err) {
      setError('Failed to process the image. Please try again.');
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
              disabled={!image || loading}
              style={{ marginTop: '20px' }}
            >
              {loading ? <CircularProgress size={24} /> : 'Grade'}
            </Button>
            {error && <Typography color="error" style={{ marginTop: '10px' }}>{error}</Typography>}
            {scores && <ScoreDisplay scores={scores} />}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default App;
