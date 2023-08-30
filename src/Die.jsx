import React from "react";

function Die(props) {

  const color = props.fixed ? "fixed" : "";

  return (
    <div className={`Die ${color}`} onClick={props.hold}>
      
      <p>{props.value}</p>
    </div>
  );
}

export default Die;
