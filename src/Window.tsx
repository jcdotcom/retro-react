import pfp from './assets/ef3.jpg';
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
          <div className="pfp-div">
            <img src={pfp} alt="pfp" className="pfp"/>
          </div>
          <div className="text-div">
            <h1>My silly website</h1>
          </div>
          </div>
      );
    case 2: return (<div></div>);
    default: return (<div>default</div>);
  }
}