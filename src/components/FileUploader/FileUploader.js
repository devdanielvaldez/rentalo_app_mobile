import React from 'react';
import styled from 'styled-components';
const Button = styled.button`
  color: ${props => (props.primary ? 'white' : '#627178')};

  font-size: 1em;
  /* margin: 1em;
  padding: 0.25em 1em; */
  border: none;
  background: #62717824 0% 0% no-repeat padding-box;
  border-radius: 18px;
  /* width: 200px; */
  cursor: pointer;
`;
const FileUploader = props => {
  const hiddenFileInput = React.useRef(null);

  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };
  return (
    <>
      <Button onClick={handleClick}>Click para explorar</Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </>
  );
};
export default FileUploader;
