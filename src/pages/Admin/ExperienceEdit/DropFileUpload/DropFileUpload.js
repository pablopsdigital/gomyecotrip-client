import React, {useState, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import './DropFileUpload.scss';
import BackupIcon from '@mui/icons-material/Backup';
import {uploadFile} from '../../../../actions/uploadFilesActions';

export default function DropFileUpload({updateFeaturedImage, props}) {
  const [files, setFiles] = useState([]);
  const [imagesCloudinary, setImagesCloudinary] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject} = useDropzone({
    maxFiles: 1,
    accept: '.jpeg,.jpg,.png',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => Object.assign(file, {preview: URL.createObjectURL(file)}))
      );
      acceptedFiles.map((file) => {
        fileUploadImage(file);
      });
    }
  });

  const images = files.map((file) => (
    <div key={file.name}>
      <img src={file.preview} style={{width: '100px'}} alt="preview" />
    </div>
  ));

  //===========================================================
  //Send cloudinary
  //===========================================================

  const fileUploadImage = async (file) => {
    setError(null);
    var bodyFormData = new FormData();
    bodyFormData.append('image', file);
    try {
      setLoading(true);
      const response = await uploadFile(bodyFormData);
      setImagesCloudinary([...imagesCloudinary, response.url]);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    updateFeaturedImage(imagesCloudinary);
  }, [imagesCloudinary]);

  //===========================================================
  //Return
  //===========================================================
  return (
    <div id="drop-file-upload">
      <div className="input-files" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragAccept && <p>All files will be accepted</p>}
        {isDragReject && <p>Some files will be rejected</p>}
        {!isDragActive && <p>Drop some files here ...</p>}
        <BackupIcon className="icon" />
        <p>Drop files here</p>
        <p>(Only *.jpg and *.png images will be accepted)</p>
      </div>
      <div className="images-preview">{images}</div>
    </div>
  );
}
