import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import default_image from "../assets/default_image.svg";

export const ImageGenerator = () => {
    const[image_url, setImage_url]=useState("/");
    let inputRef=useRef(null);
    const [loading, setLoading]=useState(false);

    const imageGenerator= async() =>{
        if(inputRef.current.value===""){
            return 0;
        }
        const response=await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    //"Authorization":"Your OpenAI API key goes here",
                    "User-Agent":"Chrome",
                },
                body:JSON.stringify({
                    prompt:${inputRef.current.value},
                    n:1,
                    size:"512x512",
                }),
            }
        );
        let data=await response.json();
        // console.log(data);
        let data_array=data.data;
        setImage_url(data_array[0].url);
        setLoading(false)   ;
         }

  return (
    <div className="ai-image-generator">
      <div className="header">
        Ai Image <span> generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={image_url==="/"?default_image:image_url} alt="" />
        </div>
        <div className="loading">
            <div className={loading?"loading-bar-full":"laoding-bar"}></div>
            <div className={loading?"loading-text":"display-none"}>Loading....</div>
        </div>
        <div className="search-box">
          <input
            type="text"
            ref={inputRef}
            className="search-input"
            placeholder="Describe the image you want to generate"
          />
          <div className="generate-btn" onClick4={()=>{imageGenerator()}}>Generate</div>
        </div>
      </div>
    </div>
  );
};
