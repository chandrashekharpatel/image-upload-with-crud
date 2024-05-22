import React, { useState, useEffect } from 'react';
import Home from '../Home';

const ShowImage = () => {
  const [imageDataList, setImageDataList] = useState([]);

  useEffect(() => {
    // Array of image IDs you want to fetch
    const imageIds = [301, 302]; // Add more IDs as needed

    // Fetch image data for each ID
    Promise.all(
      imageIds.map(id =>
        fetch(`http://localhost:8081/image/download/${id}`)
          .then(response => response.json())
          .catch(error => {
            console.error(`Error fetching image data for ID ${id}:`, error);
            return null;
          })
      )
    )
      .then(dataList => {
        // Filter out null values and set the image data list in the state
        const filteredDataList = dataList.filter(data => data !== null);
        setImageDataList(filteredDataList);
      })
      .catch(error => {
        console.error('Error fetching image data:', error);
      });
  }, []);

  return (
    <div>
        <Home />
    <div className='container'>
        <h2>View Images</h2>
      {/* Render each image if imageDataList is available */}
      {imageDataList.map(imageData => (
        <div key={imageData.id}>
          <img
            src={imageData.file}
            alt={imageData.fileName}
            style={{ maxWidth: '100%', maxHeight: '40%' }}
          />
          <h4>{imageData.fileName} </h4>
        </div>
      ))}
    </div>
    </div>
  );
};

export default ShowImage;
