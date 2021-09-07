import React from 'react';
import s from '../ImageGallery/ImageGallery.module.css';

const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  onOpenModal,
}) => {
  return (
    <li
      onClick={() => {
        onOpenModal(largeImageURL, tags);
      }}
    >
      <img src={webformatURL} alt={tags} className={s.ImageGalleryItemImage} />
    </li>
  );
};

export default ImageGalleryItem;
