import React from "react";

function LoadingComponent() {
  return (
    <div className="text-center">
      <img src={require(`assets/svgs/Spinner.svg`)} className="" alt="loading" />
  	</div>
  )
}

export default LoadingComponent;
