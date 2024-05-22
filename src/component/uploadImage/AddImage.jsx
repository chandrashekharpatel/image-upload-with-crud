import React, { useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "../Home";

const AddImage = () => {
    const [imageData, setImageData] = useState({
        fileName: '',
        fileExtension: '',
        file: null
    });

    const handleChange = (event) => {
        const { name, value, files } = event.target;

        if (name === 'file') {
            setImageData({
                ...imageData,
                [name]: files[0]
            });
        } else {
            setImageData({
                ...imageData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('fileName', imageData.fileName);
        formData.append('fileExtension', imageData.fileExtension);
        formData.append('file', imageData.file);
    
        try {
            const response = await axios.post('http://localhost:8081/image/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Image uploaded successfully:', response.data);
            // Show success alert
            alert('Image uploaded successfully!');
            // Optionally, you can redirect the user or show a success message
        } catch (error) {
            console.error('Error uploading image:', error);
            // Handle error, show error message to user, etc.
        }
    };
    
    
    return (
        <div>
            <Home />
        <div className="container">
            <div className="d-flex justify-content-start mt-3">
                <h1>Add Image</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <div className="form-group">
                        <label htmlFor="fileName" className="form-label">File Name:</label>
                        <input type="text" className="form-control" id="fileName" name="fileName" value={imageData.fileName} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fileExtension" className="form-label">File Extension:</label>
                        <input type="text" className="form-control" id="fileExtension" name="fileExtension" value={imageData.fileExtension} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="file" className="form-label">Choose Image:</label>
                        <input type="file" className="form-control" id="file" name="file" onChange={handleChange} />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Upload Image</button>
            </form>
        </div>
        </div>
    );
};

export default AddImage;
