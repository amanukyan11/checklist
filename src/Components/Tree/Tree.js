import Class1 from "./images/photo1.png";
import Class2 from "./images/photo2.png";
import Class3 from "./images/photo3.png";
import Class4 from "./images/photo4.png";
import Class5 from "./images/photo5.png";
import "./Tree.css"
import React, { useState, useEffect } from "react";

function Tree (props) {   
  const [img, setImage] = useState(null);

  useEffect(() => {
    let tree_prog = props.prog % 5;
    if (tree_prog===0) {
      setImage(
        <img
          className="photo1"
          src={Class1}
          alt="photo 1"
        />
      );
    } else if (tree_prog===1) {
      setImage(
        <img
          className="photo2"
          src={Class2}
          alt="photo 2"
        />
      );
    } else if (tree_prog===2) {
      setImage(
        <img
          className="photo3"
          src={Class3}
          alt="photo 3"
        />
      );
    } else if (tree_prog===3) {
      setImage(
        <img
          className="photo4"
          src={Class4}
          alt="photo 4"
        />
      );
    } else if (tree_prog===4) {
      setImage(
        <img
          className="photo5"
          src={Class5}
          alt="photo 5"
        />
      );
    } }, [])
  
    return (
      <>
        <div className="toggle-wrapper">
          {img}
        </div>
      </>
    );
}

export default Tree;