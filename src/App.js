import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Components
import { Searchbar } from './Components/Searchbar/Searchbar';
import { ImageGallery } from './Components/ImageGallery/ImageGallery';

import './App.css';
// import s from './App.module.css';

function App() {
  const [imageName, setImageName] = useState('');

  // //отправка формы
  // const handleFormSubmit = imageName => {
  //   setImageName(imageName);
  // };

  return (
    <div>
      <Searchbar onNameSabmit={setImageName} />

      <ImageGallery imageName={imageName}></ImageGallery>

      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
