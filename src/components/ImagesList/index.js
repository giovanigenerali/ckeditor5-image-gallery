import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function ImagesList(props) {
  const { editor } = props;
  const [images, setImages] = useState(null);
  const [imagesLoading, setImagesLoading] = useState(true);

  useEffect(() => {
    fetch('https://fake-images.glitch.me')
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
        setImagesLoading(false);
      });
  }, []);

  return (
    <>
      {imagesLoading && <p>Carregando...</p>}

      {!imagesLoading &&
        images &&
        images.map((image) => {
          return (
            <div
              key={image.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
            >
              <img
                src={image.url}
                alt={image.url.split('/').pop()}
                style={{ maxWidth: '150px' }}
                onClick={() => {
                  editor.execute('imageGallery', {
                    src: image.url,
                    alt: image.url.split('/').pop(),
                  });
                  editor.editing.view.focus();
                }}
              />
              <span>{image.url.split('/').pop()}</span>
            </div>
          );
        })}
    </>
  );
}

ImagesList.propTypes = {
  editor: PropTypes.object.isRequired,
};
