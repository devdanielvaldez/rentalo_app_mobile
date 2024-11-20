import React, { useState, useRef } from 'react';
// import ImageUploading from 'react-images-uploading';
import css from './MultipleImagesUploader.module.css';

export function MultipleImagesUploader(props) {
  const {
    maxNumber,
    afterPhotos = false,
    label,
    underLabel,
    handleUploadPhotos,
    handleAfterPhotos,
    metadataKey,
  } = props;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputs = useRef([]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const newImages = [...images];
      newImages[index] = {
        file: file,
        img: reader.result,
      }
      setImages(newImages);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    fileInputs.current[index].value = '';
  };

  const removeAllImages = () => {
    setImages([]);
    fileInputs.current.forEach(input => input.value = '');
  };

  const uploadPhotos = () => {
    setLoading(true);
    const photosArray = images.map(i => i.file);
    afterPhotos
      ? handleAfterPhotos(photosArray)
      : handleUploadPhotos(photosArray, metadataKey);
  };

  // const onChange = (imageList) => {
  //   setImages(imageList);
  // }

  return (
    <div className={css.vehiclePhotoUpload}>
      {/* <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          dragProps,
        }) => (
          // write your building UI
          <div className={css.root}>
            <h2 className={css.uploadPhotoLabel}>{label}</h2>
            <p className={css.uploadPhotoUnderlabel}>{underLabel}</p>

            <div className={css.topPhotosWrapper}>
              <button
                className={imageList.length === maxNumber ? css.buttonDisabled : css.button}
                onClick={onImageUpload}
                {...dragProps}
              >
                Agregar fotos
              </button>

              <button onClick={onImageRemoveAll} className={css.button}>
                Remover fotos
              </button>
            </div>

            {imageList.map((image, index) => (
              <div key={index} className={css.imageItem}>
                <img src={image['data_url']} alt="" className={css.image} />
                <div className={css.imageButtonWrapper}>
                  <button className={css.button} onClick={() => onImageUpdate(index)}>
                    Actualizar
                  </button>
                  <button className={css.button} onClick={() => onImageRemove(index)}>
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading> */}

      <div className={css.root}>
        <h2 className={css.uploadPhotoLabel}>{label}</h2>
        <p className={css.uploadPhotoUnderlabel}>{underLabel}</p>

        <input
          id="file-input-add"
          type="file"
          accept="image/*"
          capture="camera"
          className={css.fileInput}
          ref={(el) => fileInputs.current[images.length] = el}
          onChange={(e) => handleImageChange(e, images.length)}
        />
        <label
          htmlFor="file-input-add"
          className={images.length === maxNumber ? css.labelDisabled : css.label}
        >
          Agregar fotos
        </label>

        <div>
          {images.map((image, index) => (
            <div key={index} className={css.imageItem}>
              <img src={image.img} alt={`Upload Image ${index}`} className={css.image} />

              <div className={css.imageButtonWrapper}>
                <label htmlFor={`file-input-${index}`} className={css.label}>Actualizar</label>
                <input
                  id={`file-input-${index}`}
                  type="file"
                  accept="image/*"
                  capture="camera"
                  className={css.fileInput}
                  ref={(el) => fileInputs.current[index] = el}
                  onChange={(e) => handleImageChange(e, index)}
                />

                <button className={css.button} onClick={() => removeImage(index)}>
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
        {images.length > 0 && (
          <button onClick={removeAllImages} className={css.button}>Remover todas</button>
        )}
      </div>

      {images.length > 0 ? (
        <div className={css.uploadToStWrapper}>
          <button
            className={
              images.length < maxNumber || loading ? css.buttonLongDisabled : css.buttonLong
            }
            onClick={uploadPhotos}
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Guardar fotos'}
          </button>
        </div>
      ) : null}
    </div>
  );
}
