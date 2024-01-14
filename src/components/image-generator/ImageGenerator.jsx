import React from "react";
import "./ImageGenerator.css";
import default_image from "../assets/default_image.svg";
import { useState, useRef } from "react";

export const ImageGenerator = () => {
  const [image_url, setImage_url] = useState("/");
  let inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const ImageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0; //text not added in the input field
    }
    setLoading(true);
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "process.env.API_KEY", //your api key goes here
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1, //only 1 image gentd,
          size: "512x512",
        }),
      }
    );
    let data = await response.json();
    // console.log(data);
    let data_array = data.data;
    setImage_url(data_array[0].url);
    setLoading(false); //after displaying img, its false, so it will hide the text
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image<span> Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img
            src={image_url === "/" ? default_image : image_url}
            alt=""
            className=""
          />
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>
            Loading...
          </div>
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe the image you want to generate"
        />
        <div
          className="generate-btn"
          onClick={() => {
            ImageGenerator();
          }}
        >
          Generate
        </div>
      </div>
    </div>
  );
};
