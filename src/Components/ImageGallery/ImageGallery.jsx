import { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import cardAPI from '../Services/CardApi';
import { CardErrorView } from './CardErrorView';
import { LoadMoreButton } from '../LoadMoreButton/LoadMoreButton';
import { Modal } from '../Modal/Modal';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function ImageGallery({ imageName }) {
  const [cardImage, setCardImage] = useState([]);
  const [error, setError] = useState(null);
  // const [status, setStatus] = useState('idle');
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [alt, setAlt] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    //==== если пустая строка ====
    if (!imageName) {
      return;
    }

    setStatus(Status.PENDING);

    if (page === 1) {
      cardAPI
        .fetchCard(imageName, page)
        .then(cardImageNew => {
          if (cardImageNew.total === 0) {
            setError(`Not found ${imageName}`);
            setStatus(Status.REJECTED);
          } else {
            setCardImage(cardImageNew.hits);
            setStatus(Status.RESOLVED);
          }
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    }

    if (page !== 1) {
      cardAPI
        .fetchCard(imageName, page)
        .then(cardImageNew => {
          setCardImage(prevState => [...prevState, ...cardImageNew.hits]);
          setStatus(Status.RESOLVED);
        })
        .then(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    }
  }, [imageName, page]);

  //==== кнопка загрузить ещё ====
  const loadMoreBtn = () => {
    setPage(prevState => prevState + 1);
  };

  //====открыть модалку ===
  const onOpenModal = (largeImageURL, alt) => {
    setLargeImageURL(largeImageURL);
    setAlt(alt);
    window.addEventListener('keydown', onEscClick);
  };

  //-----------------закрыть по ESС---------------------
  const onEscClick = event => {
    const ESC_KEY_CODE = 'Escape';

    if (event.code === ESC_KEY_CODE) {
      onCloseModal();
    }
  };
  //====закрыть модалку ===
  const onCloseModal = () => {
    setLargeImageURL('');
    setAlt('');
    window.removeEventListener('keydown', onEscClick);
  };

  //==== если пусто ====
  if (status === Status.IDLE) {
    return <div>While null, enter something</div>;
  }

  //==== что-то загружается (загрузка) ====
  if (status === Status.PENDING) {
    return (
      <div>
        <Loader
          type="MutatingDots"
          //type="Watch"
          color="#00BFFF"
          height={80}
          width={80}
          timeout={3000}
        />
      </div>
    );
  }

  //==== рендер всех картинок ====
  if (status === Status.RESOLVED) {
    return (
      <ul className={s.ImageGallery}>
        {/* ====рендер всех картинок==== */}
        {cardImage.map(img => {
          return (
            <ImageGalleryItem
              key={img.id}
              alt={img.tags}
              webformatURL={img.webformatURL}
              largeImageURL={img.largeImageURL}
              onOpenModal={onOpenModal}
            />
          );
        })}

        <LoadMoreButton LoadMoreBtn={loadMoreBtn} />
        {/* ====модалка==== */}
        {largeImageURL && (
          <Modal
            largeImageURL={largeImageURL}
            alt={alt}
            onClose={onCloseModal}
          />
        )}
      </ul>
    );
  }

  //==== отклонено (ошибка) ====
  if (status === Status.REJECTED) {
    return <CardErrorView massage={error} />;
  }
}

export { ImageGallery };
