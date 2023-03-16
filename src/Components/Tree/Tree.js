import Class1 from "./images/photo1.png";
import Class2 from "./images/photo2.png";
import Class3 from "./images/photo3.png";
import Class4 from "./images/photo4.png";
import Class5 from "./images/photo5.png";
import "./Tree.css"
import React, { useState, useEffect, useRef } from "react";

function Tree (props) {   
  const [index, setIndex] = useState(0);
  const srcs = [Class1, Class2, Class3, Class4, Class5];
  const desc = ["Sprout", "Seedling", "Sapling", "Young Tree", "Mature Tree"]
  const prevIndex = usePrevious(index);
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  useEffect(() => {
    if (prevIndex === index) {
      return;
    }
    console.log(index);
    if (props.prog > 20) {
      setIndex(4);
    }
    else {
      setIndex(~~(props.prog / 5));
    }
  })
  
    return (
      <>
        <div className="toggle-wrapper">
        <img
          className={`photo${index + 1}`}
          src={srcs[index]}
          alt={desc[index]}
        />
        </div>
      </>
    );
}

export default Tree;