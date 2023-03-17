import React, { Component, forwardRef, useImperativeHandle, useRef } from 'react';
import Existinguser from '../ExistingUser/ExistingUser'
import Newuser from '../NewUser/NewUser'
import "./Login.css"

class login extends Component {
  constructor(props) {
    super(props);
      this.showLogin= true
      this.showNewProfile= false
      this.increment=0
      this.buttonText= "Create New Profile"
      this.switchProfile = this.switchProfile.bind(this);
   }

   switchProfile = () => {
        this.showLogin = !this.showLogin;
        this.showNewProfile = !this.showNewProfile;
        this.increment = this.increment+1
          if (this.increment %2 == 0){
            this.buttonText = "Create New Profile"
          }
          else {
            this.buttonText = "Login"
          }
      this.forceUpdate();
  }

  render() {
    return (
      <div>
        {this.showLogin && <Existinguser />}
        {this.showNewProfile && <Newuser switchProfile={this.switchProfile} />}
        <div style={{backgroundColor:"#A8C3BC", height: "40vh"}}>
          <div style={{width: "fit-content", margin:"auto", marginBottom:"0px"}}>
            <button class="but" onClick={this.switchProfile}>{this.buttonText}</button>
          </div>
          <div style={{marginTop:"0px" }}>
          <svg width="100vw" height="30vh" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 407.93 134.59">
  <path class="sprout" stroke="black" fill="transparent" d="M0,134.59c36.83-8.78,75.27-5.59,113.13-6.05,6.87-.08,14.12-.4,19.9-4.11s9.17-12.02,5.28-17.68c-13.13-7.02-23.21-19.55-27.25-33.89,15.36,2.64,28.04,16.57,29.21,32.11,4.91-13.68,17.87-24.11,32.28-25.98,1.08-.14,2.3-.2,3.14,.5,1.52,1.27,.58,3.73-.56,5.34-3.61,5.12-8.33,9.44-13.74,12.6-4.66,2.72-9.85,4.6-14.04,8s-7.28,9-5.64,14.14c1.61,5.03,7.21,7.83,12.49,8.12s10.43-1.36,15.61-2.42c11.69-2.4,23.99-1.83,35.41,1.65,4.18,1.27,9.48,2.63,12.3-.71,1.33-1.58,1.6-3.77,1.82-5.83,1.18-11.23,2.37-22.45,3.55-33.68,.12-1.16,.2-2.47-.57-3.34-.63-.71-1.63-.91-2.55-1.11-17.27-3.8-28.12-20.44-37.1-35.67,18.39,.37,35.96,12.87,42.34,30.12,5.82-4.58,5.32-13.39,8.06-20.28,5.1-12.82,20.56-17.42,34.03-20.42-1.19,17.9-14.08,34.47-31.14,40.02-2.89,.94-6.14,1.77-7.86,4.28-1.42,2.08-1.41,4.78-1.32,7.3,.33,10.09,.88,20.17,1.67,30.23,.15,1.93,.34,3.96,1.43,5.56,2.24,3.3,7,3.32,10.98,3.05,27.9-1.96,55.97-1.4,83.76,1.67,3.37,.37,7.59,.37,9.18-2.63,.67-1.27,.66-2.78,.63-4.21-.16-7.27-.31-14.54-.47-21.81-.04-1.78-.09-3.64-.91-5.23-1.79-3.49-6.31-4.29-10.18-4.92-16.48-2.69-32.22-9.78-45.16-20.33-.71-.58-1.48-1.32-1.4-2.23,.07-.8,.78-1.38,1.46-1.81,9.01-5.74,21.09-1.65,29.89,4.42,8.79,6.07,16.65,14.15,26.94,17.01-2.95-10.38-4.41-21.19-4.34-31.98,.01-1.63,.05-3.31-.56-4.83-.57-1.43-1.65-2.57-2.7-3.69-12.78-13.68-23.62-29.17-32.1-45.87,27.43,5.19,47.95,34.32,43.6,61.89,7.2-1.16,10.44-9.81,16.68-13.6,8.99-5.45,20.57,.83,28,8.27,7.43,7.44,14.41,16.76,24.76,18.63-14.98,6.33-34.17,7.41-45.85-3.91-2.94-2.85-5.6-6.56-9.63-7.29-4.38-.79-8.67,2.5-10.52,6.54s-1.83,8.66-1.78,13.11c.13,11.86,.27,23.72,.4,35.58,.04,3.27,.32,7.05,2.98,8.95,1.8,1.29,4.17,1.31,6.38,1.29,6.74-.08,13.47-.15,20.21-.23"/>
</svg>
          </div>
        </div>
      </div>

      
    );
  }
}
 
export default login;
