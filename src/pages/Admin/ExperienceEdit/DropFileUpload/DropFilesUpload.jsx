import React, {useState, useEffect} from 'react';
import Dropzone, {useDropzone} from 'react-dropzone';
import './DropFileUpload.scss';
import BackupIcon from '@mui/icons-material/Backup';
import {uploadFile} from '../../../../actions/uploadFilesActions';

export default function DropFilesUpload({updateGallery, props}) {
  const [files, setFiles] = useState([]);
  const [imagesCloudinary, setImagesCloudinary] = useState([]);
  const [updated, setUpdated] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject} = useDropzone({
    maxFiles: 4,
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
      setUpdated(updated + 1);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    updateGallery(imagesCloudinary);
  }, [updated]);

  //===========================================================
  //Return
  //===========================================================
  return (
    <>
      <div id="drop-file-upload">
        <div className="input-files" {...getRootProps()}>
          <input {...getInputProps()} />
          <BackupIcon className="icon" />
          <p>Drop files here</p>
          <p>(Only *.jpg and *.png images will be accepted)</p>
        </div>
        <div className="images-preview">{images}</div>
      </div>
    </>
  );
}
