import React from 'react';
import Loader from 'react-loader-spinner';
import cardAPI from '../Services/CardApi';
import { CardErrorView } from './CardErrorView';
import { LoadMoreButton } from '../LoadMoreButton/LoadMoreButton';
import { Modal } from '../Modal/Modal';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './ImageGallery.module.css';

class ImageGallery extends React.Component {
  state = {
    cardImage: [],
    error: null,
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;

    if (prevName !== nextName) {
      this.setState({ status: 'pending', page: 1 });

      cardAPI
        .fetchCard(nextName, this.state.page)
        .then(cardImage => {
          if (cardImage.total === 0) {
            this.setState({
              error: `Not found ${nextName}`,
              status: 'rejected',
            });
          } else {
            this.setState(prevState => ({
              cardImage: cardImage.hits,
              status: 'resolved',
            }));
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (this.state.page !== 1) {
      cardAPI
        .fetchCard(this.props.imageName, this.state.page)
        .then(cardImage =>
          this.setState(prevState => ({
            cardImage: [...prevState.cardImage, ...cardImage.hits],
            status: 'resolved',
          })),
        )
        .then(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  loadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  //====открыть модалку ===
  onOpenModal = (largeImageUR, alt) => {
    this.setState({
      largeImageURL: largeImageUR,
      alt: alt,
    });
  };
  //====закрыть модалку ===
  onCloseModal = () => {
    this.setState({
      largeImageURL: '',
      alt: '',
    });
  };

  //===========================-------------render--------
  render() {
    console.log(this.state.cardImage);
    const { error, status, largeImageURL } = this.state;
    const images = this.state.cardImage;

    //==== если пусто ====
    if (status === 'idle') {
      return <div>While null, enter something</div>;
    }

    //==== что-то загружается (загрузка) ====
    if (status === 'pending') {
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
    if (status === 'resolved') {
      return (
        <ul className={s.ImageGallery}>
          {/* ====рендер всех картинок==== */}
          {images.map(img => {
            return (
              <ImageGalleryItem
                key={img.id}
                alt={img.tags}
                webformatURL={img.webformatURL}
                largeImageURL={img.largeImageURL}
                onOpenModal={this.onOpenModal}
              />
            );
          })}

          <LoadMoreButton LoadMoreBtn={this.loadMoreBtn} />
          {/* ====модалка==== */}
          {largeImageURL && (
            <Modal
              largeImageURL={largeImageURL}
              alt={this.state.alt}
              onClose={this.onCloseModal}
            />
          )}
        </ul>
      );
    }

    //==== отклонено (ошибка) ====
    if (status === 'rejected') {
      console.log(error);
      return <CardErrorView massage={error} />;
    }
  }
}

export { ImageGallery };
