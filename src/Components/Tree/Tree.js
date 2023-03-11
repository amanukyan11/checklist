import Class1 from "./images/photo1.png";
import Class2 from "./images/photo2.png";
import Class3 from "./images/photo3.png";
import Class4 from "./images/photo4.png";
import Class5 from "./images/photo5.png";
import "./Tree.css"
import React, { useState } from "react";

function Tree () {   
    let img = null;
    const [active, setActive] = useState(0);
  
    const handleChangeActive = () => {
    setActive((previousStar) => (previousStar + 1) % 5);
};

    if (active===0) {
      img = (
        <img
          className="photo1"
          src={Class1}
          alt="photo 1"
          onClick={() => handleChangeActive()}
        />
      );
    } else if (active===1) {
      img = (
        <img
          className="photo2"
          src={Class2}
          alt="photo 2"
          onClick={() => handleChangeActive()}
        />
      );
    } else if (active===2) {
      img = (
        <img
          className="photo3"
          src={Class3}
          alt="photo 3"
          onClick={() => handleChangeActive()}
        />
      );
    } else if (active===3) {
      img = (
        <img
          className="photo4"
          src={Class4}
          alt="photo 4"
          onClick={() => handleChangeActive()}
        />
      );
    } else if (active===4) {
      img = (
        <img
          className="photo5"
          src={Class5}
          alt="photo 5"
          onClick={() => handleChangeActive()}
        />
      );
    } 
  
    return (
      <>
        <div className="toggle-wrapper">
          {img}
        </div>
      </>
    );
}

export default Tree;