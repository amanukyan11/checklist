import React, { Component, useState } from 'react';
import "./Checklist.css"
 
// class checklist extends Component {
//   render() {
//     return (
//       <div>
//         {/* This is a todo blah checklist bleh */}
//       </div>
//     );
//   }
// }
 
// export default checklist;

function Checklist() {
  const [text, setText] = useState("");

  const buttonClick = () => {
    const input = document.getElementById("inputField").ariaValueMax;
    setText(input);
  };

  return (
    <div>
      <button onClick={buttonClick}>
        Enter text:
        <input type="text" id="inputField" />
      </button>
    </div>
  )
}

export default Checklist

// class Checklist extends React.Component {
//   render() {
//       return (
//       <React.Fragment>
//           <h1>Checklist 1</h1>
//           <ul className='Checklist'>
//               <li>Item 1</li>
//               <li>Item 2</li>
//               <li>Item 3</li>
//           </ul>
//       </React.Fragment>
//       )
//   }
// }