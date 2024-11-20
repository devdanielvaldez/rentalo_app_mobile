import React from 'react';
import styled from 'styled-components';
const Button = styled.button`
  /* background: ${props => (props.primary ? '#FF7900' : 'white')}; */
  color: ${props => (props.primary ? 'white' : '#FF7900')};

  font-size: 1em;
  /* margin: 1em;
  padding: 0.25em 1em; */
  border: none; 
  background: #ff790026 0% 0% no-repeat padding-box;
  border-radius: 15px;
  cursor: pointer;
`;
const FileUpload = props => {
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
      <Button onClick={handleClick}>Seleccionar</Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </>
  );
};
export default FileUpload;
