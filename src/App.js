import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Components
import { Searchbar } from './Components/Searchbar/Searchbar';
import { ImageGallery } from './Components/ImageGallery/ImageGallery';

import './App.css';
// import s from './App.module.css';

class App extends React.Component {
  state = {
    imageName: '',
    searchbar: '',
  };

  //отправка формы
  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    return (
      <div>
        <Searchbar onNameSabmit={this.handleFormSubmit} />

        <ImageGallery imageName={this.state.imageName}></ImageGallery>

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
