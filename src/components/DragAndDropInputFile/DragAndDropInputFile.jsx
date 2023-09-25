import React from 'react';
import './DragAndDropInputFile.css';

export default function DragAndDropInputFile(props) {
  return (
    <div className="container-input-file">
      <div className="img-holder">
        <img src={props.imagePhoto} alt="" id="img" className="img" />
      </div>
      <input
        onChange={props.onChange}
        accept={props.accept}
        name={props.name}
        id="input-file"
        type="file"
        checked={props.isChecked}
        value={props.value}
      />

      <div>
        <label className="image-upload" htmlFor="input-file">
          Choose your image
        </label>
      </div>
    </div>
  );
}
