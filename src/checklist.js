import React, { Component } from 'react';
 
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

function Checklist({text}) {
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