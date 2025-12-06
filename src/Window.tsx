import pfp from './assets/ef3.jpg';
import pic1 from './assets/smiley.webp';
import pic2 from './assets/smiley2.jpg';
import pic3 from './assets/cat1.gif';
import pic4 from './assets/cat2.gif';
//import Program from './Program';

interface WindowProps{
  progid: number;
}

export default function Window({progid}: WindowProps){
  switch(progid){
    case 1: 
      //console.log(`progid ${progid}`);  
      return (
        <div className="task-body">
          <div className="task-upper-div">
            <div className="pfp-div">
              <img src={pfp} alt="pic" className="pfp"/>
            </div>
            <div className="text-div">
            <h1>Under Construction</h1>
            <h3>brb</h3>
            </div>
          </div>
          <div className="task-lower-div">
            <img src={pic4} alt="pic" className="banner-pic"/>
            <p>its gonna be huge!!!</p>
          </div>
        </div>
      );
    case 2: 
      return (
        <div className="task-body">
          <div className="pfp-div">
            <img src={pic1} alt="pic" className="pfp"/>
          </div>
          <div className="text-div">
            <h3>Imagine if there was something cool here .....</h3>
          </div>
        </div>
      );  
      case 3: 
        return (
          <div className="task-body">
            <div className="pfp-div">
              <img src={pic2} alt="pic" className="pfp"/>
            </div>
            <div className="text-div">
              <h3>This section is gonna be especially sweet, probably</h3>
            </div>
          </div>
        ); 
      case 4: 
        return (
          <div className="task-body">
            <div className="pfp-div">
              <img src={pic3} alt="pic" className="pfp"/>
            </div>
            <div className="text-div">
              <h3>I'm gonna have a whole menu here it's gonna be rad</h3>
            </div>
          </div>
        );  
    default: 
      return;
  }
}