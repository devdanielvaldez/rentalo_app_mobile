import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import css from './DriverLicenceUpload.module.css';

export default function MyDropzone() {
  const onDrop = useCallback(acceptedFiles => {
    setFileLabel(acceptedFiles[0].name);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const [fileLabel, setFileLabel] = useState(null);
  return (
    <div className={css.dropzone} {...getRootProps()}>
      <input {...getInputProps()} />
      <center>
        <span className={css.label}>
          {fileLabel ? (
            <p>{fileLabel}</p>
          ) : isDragActive ? (
            <p>Drop the file here ...</p>
          ) : (
            <p>Drag 'n' drop the file here, or click to select file</p>
          )}
        </span>
      </center>
    </div>
  );
}
