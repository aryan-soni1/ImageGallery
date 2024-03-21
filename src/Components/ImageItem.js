import React from "react";

const ImageItem = ({ image }) => {

   

  return (
    <div className="flex items-center bg-white rounded-lg shadow-md p-4 mb-4">
      <img src={image.urls.small} alt="" className="mr-4 transition-transform duration-300 transform hover:scale-" />
      <div>
        <p className="text-lg font-semibold">{image.alt_description}</p>
        <p className="text-sm text-gray-500">{image.description}</p>
    

      </div>

    </div>
  );
};

export default ImageItem;
