import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewImage = ({ id }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/image/download/${id}`, {
          responseType: 'arraybuffer',
        });
        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        const imageUrl = `data:image/jpeg;base64,${base64Image}`;
        setImageUrl(imageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [id]);

  return (
    <div>
        {JSON.stringify(imageUrl)}
      {imageUrl ? (
        <img src={imageUrl} alt={`Image ${id}`} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewImage;
