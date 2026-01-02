import React, { useState } from 'react';
import { Icons } from './Icons';
import { Card, Button } from './components/Shared';

const WasteClassifier = () => {
    const [imageFile, setImageFile] = useState(null);
    const [imageResult, setImageResult] = useState('');
    // const [isImageLoading, setIsImageLoading] = useState(false); // Unused for now

    const handleImageAnalysis = (file) => {
        if (!file) return;
        setImageFile(file);
        // Simulate analysis result
        setTimeout(() => {
            setImageResult('Identified: Plastic Bottle (PET). Recyclable. Please empty and crush.');
        }, 1500);
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">AI Waste Classifier</h1>
                <p className="page-subtitle">Advanced waste identification and recycling guidance</p>
            </div>

            <Card className="classifier-container">
                <div className="classifier-upload">
                    <div className="upload-zone">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageAnalysis(e.target.files[0])}
                            id="waste-image-upload"
                            className="upload-input"
                        />
                        <label htmlFor="waste-image-upload" className="upload-label">
                            <div className="upload-content">
                                <Icons.Camera />
                                <div className="upload-text">
                                    <h3>Upload Waste Image</h3>
                                    <p>Take a photo or select from your device</p>
                                </div>
                            </div>
                        </label>
                    </div>

                    {imageFile && (
                        <div className="image-preview">
                            <img
                                src={URL.createObjectURL(imageFile)}
                                alt="Uploaded waste item"
                                className="preview-image"
                            />
                        </div>
                    )}
                </div>

                <div className="classifier-actions">
                    <Button
                        /* Simplified button logic for presentation */
                        variant="accent"
                    >
                        {'Select Image'}
                    </Button>
                </div>

                {imageResult && (
                    <div className="analysis-results">
                        <h3 className="results-title">Classification Results</h3>
                        <div className="results-content">
                            <div className="result-text">{imageResult}</div>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default WasteClassifier;
