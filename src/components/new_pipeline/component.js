import React, { useState } from "react";

import CollectDataComponent from "./steps/collect_data/component";
import UploadFileComponent from "./steps/upload_file/component";
import SubmitComponent from "./steps/submit/component";

function NewPipelineComponent({currentUser}) {
  const [ stepNumber, setStepNumber ] = useState(1);

  return (
    <div className="container new-pipeline-wrapper pt-4">
      { stepNumber === 1 && <CollectDataComponent setStepNumber={setStepNumber} currentUser={currentUser} /> }
      { stepNumber === 2 && <UploadFileComponent setStepNumber={setStepNumber} /> }
      { stepNumber === 3 && <SubmitComponent setStepNumber={setStepNumber} /> }
    </div>
  )
}

export default NewPipelineComponent;
