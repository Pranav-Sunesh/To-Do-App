import React, { useEffect, useState } from 'react'

const ProgressBar = ({ progress }) => {
    const [bgcolor, setColor] = useState("")
    useEffect(() => {
      if ( progress <= 20){
        setColor("red");
      }else if(progress <= 40){
        setColor("coral");
      }else if(progress <=60){
        setColor("orange");
      }else if(progress <= 80){
        setColor("yellow");
      }else{
        setColor("lightgreen");
      }
    },[progress]);
    const style = {
        height: "100%",
        backgroundColor: bgcolor,
        width: `${progress}%`,
        borderRadius: "40px"
    }

  return (
    <div className="progress-parent" >
        <div className='progress-child' style={style} ></div>
    </div>
  )
}

export default ProgressBar