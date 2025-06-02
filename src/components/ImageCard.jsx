import React from "react";

const ImageCard = ({ imageUrl, imageName }) => {
  return (
    <div className="card mb-3">
      <img src={imageUrl} className="card-img-top" alt={imageName} />
      <div className="card-body">
        <h5 className="card-title">{imageName}</h5>
      </div>
    </div>
  );
};

export default ImageCard;
