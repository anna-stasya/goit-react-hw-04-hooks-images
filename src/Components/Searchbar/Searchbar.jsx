import { useState } from 'react';
import { toast } from 'react-toastify';

import s from './Searchbar.module.css';

function Searchbar({ onNameSabmit }) {
  const [searchbar, setSearchbar] = useState('');

  const handleNameChange = event => {
    setSearchbar(event.currentTarget.value.toLowerCase());
  };

  const handleSabmit = event => {
    event.preventDefault();

    if (searchbar.trim() === '') {
      toast.error('Error! Еnter something');
      return;
    }
    onNameSabmit(searchbar);
    setSearchbar('');
  };

  return (
    <header className={s.Searchbar}>
      <form onSubmit={handleSabmit} className={s.SearchForm}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchbar}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}

export { Searchbar };
