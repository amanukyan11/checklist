import React from 'react';
import './main.css'
import './progress_bar.css'

 

//https://css-tricks.com/css3-progress-bars/
class ProgressBar extends React.Component {
    render() {
        return (
        <div class="meter orange nostripes">
           
          </div>
        )
    }
}

class Timer extends React.Component {
    render() {
        return (
        <div className="Timer">
            <img src="http://clipart-library.com/newimages/clip-art-clock-14.png" alt="tree"></img>
        </div>)
    }
}

class Tree extends React.Component {
    render(){
        return (
        <div className="Tree">
            <img src='https://cdn.pixabay.com/photo/2014/12/22/00/07/tree-576847__480.png' alt="tree"></img> 
        </div>
        )
    }
   
}

class Checklist extends React.Component {
    render() {
        return (
        <React.Fragment>
            <h1>Checklist 1</h1>
            <ul className='Checklist'>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        </React.Fragment>
        )
    }
}

/*
class MenuOption extends React.Component {

}
*/

class Menu extends React.Component {
    render() {
        return <div className="Menu ">Menu</div>
    }
}

class Main extends React.Component {
    render() {
        return (
        <div className="container">
            <div className="mainLeft">
                <Menu/>
            </div>
            <div className="mainCenter">
                <Checklist/>
                <ProgressBar/>
            </div>
            <div className="mainRight">
                <Tree/>
                <Timer/>
            </div>
        </div>
        )
    }
}

export default Main