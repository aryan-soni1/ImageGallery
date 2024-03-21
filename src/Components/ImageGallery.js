

import React, { useState } from "react";
import ImageItem from "./ImageItem";
import Spinner from "./Spinner";

const ImageGallery = () => {
  const [searchItem, setSearchItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1); // Track current page number
  const perPage = 10; // Number of images per page

  const fetchImages = async (searchItem, page) => {
    try {
      setLoading(true); // Set loading to true when fetching images
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=${page}&query=${searchItem}&client_id=yMaSSZxmwzibNXJ4YVGQni-hX0SFwbyRDyKwJN7P4Ac&per_page=${perPage}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      const data = await response.json();
      setImages(data.results);
    } catch (error) {
      console.error("Error fetching images:", error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching images
    }
  };

  const changeHandle = (e) => {
    setSearchItem(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchItem.trim() !== "") {
      setPage(1); // Reset page to 1 when submitting a new search query
      fetchImages(searchItem, 1);
    }
  };

  const nextPage = () => {
    setPage(page + 1);
    fetchImages(searchItem, page + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8">
      <form onSubmit={submitHandler} className="mb-8">
        <input
          type="text"
          placeholder="Search"
          value={searchItem}
          onChange={changeHandle}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Search
        </button>
      </form>
      <div>
        {loading && <Spinner />} {/* Display spinner when loading */}
        {images &&
          images.map((image) => <ImageItem key={image.id} image={image} />)}
      </div>
      {images.length === perPage && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={nextPage}
        >
          Next Page
        </button>
      )}
    </div>
  );
};

export default ImageGallery;

