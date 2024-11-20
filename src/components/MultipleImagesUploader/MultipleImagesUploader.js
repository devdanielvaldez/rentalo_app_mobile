import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import css from './MultipleImagesUploader.module.css';

const MultipleImagesUploader = ({
  maxNumber,
  afterPhotos = false,
  label,
  underLabel,
  handleUploadPhotos,
  handleAfterPhotos,
}) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const onChange = (imageList) => setImages(imageList);

  const uploadPhotos = () => {
    setLoading(true);

    const photosArray = images.map(i => i.file);

    if (afterPhotos) {
      handleAfterPhotos(photosArray, setImages)
        .then(() => setLoading(false));
    } else {
      handleUploadPhotos(photosArray, setImages)
        .then(() => setLoading(false));
    }
  };

  return (
    <div className={css.vehiclePhotoUpload}>
      <ImageUploading
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
          <div className={css.root}>
            <h2 className={css.uploadPhotoLabel}>{label}</h2>
            <p className={css.uploadPhotoUnderlabel}>{underLabel}</p>

            <div className={css.topPhotosWrapper}>
              <button
                id="uploadInsuranceBtn"
                className={imageList.length === maxNumber ? css.buttonDisabled : css.button}
                onClick={onImageUpload}
                {...dragProps}
              >
                Cargar copia de seguro comercial
              </button>

              {/* <button onClick={onImageRemoveAll} className={css.button}>
                Remove all insurance
              </button> */}
            </div>

            {imageList.map((image, index) => (
              <div key={index} className={css.imageItem}>
                <img src={image['data_url']} alt="subir imagen" className={css.image} />
                <div className={css.imageButtonWrapper}>
                  <button className={css.button} onClick={() => onImageUpdate(index)}>
                    Actualizar
                  </button>
                  <button className={css.button} onClick={() => onImageRemove(index)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>

      {images.length > 0 ? (
        <div className={css.uploadToStWrapper}>
          <button
            className={
              images.length < maxNumber || loading ? css.buttonLongDisabled : css.buttonLong
            }
            onClick={uploadPhotos}
            loading={loading}
          >
            {loading ? 'Cargando...' : 'Guardar'}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default MultipleImagesUploader
