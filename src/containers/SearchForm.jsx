import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { setPlace, startSearch } from '../actions';

// import { searchHotelByLocation } from '../domain/HotelRepository';

const SearchForm = props => (
  <form
    className="search-form"
    onSubmit={
      (e) => {
        e.preventDefault();
        props.history.push(`/?place=${props.place}`);
        props.startSearch();
      }
    }
  >
    <input
      className="place-input"
      size="30"
      type="text"
      value={props.place}
      onChange={
        (e) => {
          e.preventDefault();
          props.setPlace(e.target.value);
        }
      }
    />
    <input className="submit-button" type="submit" value="検索" />
  </form>
);

SearchForm.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  place: PropTypes.string.isRequired,
  startSearch: PropTypes.func.isRequired,
  setPlace: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    place: state.place,
  }),
  { setPlace, startSearch },
)(SearchForm);
