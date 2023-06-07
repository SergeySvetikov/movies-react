import React, { ChangeEvent, useState } from 'react';

interface SearchState {
  search: string;
  filter: string;
  error: boolean;
  errorMessage: string;
}

interface SearchProps {
  searchMovie: (str: string, filter: string) => void;
  showMainPage?: () => void;
}

function Search(props: SearchProps) {
  const [state, setState] = useState<SearchState>({
    search: '',
    filter: 'all',
    error: false,
    errorMessage: '',
  });

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const filter = e.target.dataset.type || '';
    setState((prevState) => ({
      ...prevState,
      filter: filter,
      error: false,
      errorMessage: '',
    }));
    props.searchMovie(state.search, filter);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, search: e.target.value }));
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && state.search.trim() !== '') {
      props.searchMovie(state.search, state.filter);
    }
  };

  const isButtonDisabled = state.search.trim() === '';

  return (
    <div className="row">
      <div className="input-field">
        <input
          className="validate"
          placeholder="Поиск"
          type="search"
          value={state.search}
          onChange={handleChange}
          onKeyDown={handleKey}
        />
        <button
          className="btn search-btn blue-grey darken-1"
          disabled={isButtonDisabled}
          onClick={() => props.searchMovie(state.search, state.filter)}
        >
          Найти
          <i className="large material-icons right"></i>
        </button>
      </div>
      <div>
        <label>
          <input
            className="color-radio"
            name="group1"
            type="radio"
            data-type="all"
            checked={state.filter === 'all'}
            onChange={handleFilter}
          />
          <span>Все</span>
        </label>
        <label>
          <input
            className="color-radio"
            name="group1"
            type="radio"
            data-type="movie"
            checked={state.filter === 'movie'}
            onChange={handleFilter}
          />
          <span>Фильмы</span>
        </label>
        <label>
          <input
            className="color-radio"
            name="group1"
            type="radio"
            data-type="series"
            checked={state.filter === 'series'}
            onChange={handleFilter}
          />
          <span>Сериалы</span>
        </label>
      </div>
      {state.error && <div className="error-message">{state.errorMessage}</div>}
    </div>
  );
}

export { Search };
