import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { setValueInput, initialValue } from '../../helpers/search';
import './Search.scss';
import { ProductsContext } from '../../ProductsProvider';

export const Search = () => {
  const [value, setValue] = useState(initialValue);
  const {
    applyValue,
    appliedValue,
    setAppliedValue,
    path,
  } = useContext(ProductsContext);

  return (
    <div className={classNames('Search', {
      search_hidden: ['home', 'cart'].includes(path) || path.includes('product'),
      })}
    >
      <input
        className="Search-Input"
        type="text"
        name={path}
        placeholder={`Search in ${path}...`}
        value={setValueInput(path, value)}
        onChange={e => {
          setValue({...value,[path]: e.target.value});
          applyValue({...appliedValue, [path]: e.target.value});
      }}
      />
      {value[path] ? (
        <button
          className="Search-ButtonClear button-search"
          type="button"
          tabIndex="0"
          onClick={() => {
            setValue({...value,[path]: ''});
            setAppliedValue({...value,[path]: ''});
        }}
        >
          <img
            src="./img/icons-page/clear.svg"
            alt="Clear"
          />
        </button>
      ) : (
      <button
        className="Search-ButtonSearch button-search"
        type="button"
        tabIndex="0"
      >
        <img
          src="./img/icons-page/search.svg"
          alt="Search"
        />
      </button>
      )}
    </div>
  )
}