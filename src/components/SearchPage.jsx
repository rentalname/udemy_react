import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import queryString from 'query-string';

import { geocode } from '../domain/Geocoder';
import { searchHotelByLocation } from '../domain/HotelRepository';
import GeocodeResult from './GeocodeResult';
import HotelsTable from './HotelsTable';
import Map from './Map';
import SearchForm from './SearchForm';

const sortedHotels = (hotels, sortKey) => _.sortBy(hotels, h => h[sortKey]);

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: this.getPlaceParam() || '東京タワー',
      location: {
        lat: 34.39208,
        lng: 132.450993,
      },
      sortKey: 'price',
    };
  }

  componentDidMount() {
    const place = this.getPlaceParam();
    if (place) {
      this.startSearch(this.state.place);
    }
  }

  getPlaceParam() {
    const params = queryString.parse(this.props.location.search);
    const place = params.place;

    if (place && place.length > 0) {
      return place;
    }
    return null;
  }

  setErrorMessage(message) {
    this.setState({
      address: message,
      location: {
        lat: 0,
        lng: 0,
      },
    });
  }

  handlePlaceSubmit(e) {
    e.preventDefault();
    this.props.history.push(`/?place=${this.state.place}`);
    this.startSearch();
  }

  hssandlePlaceChange(place) {
    this.setState({ place });
  }

  startSearch() {
    geocode(this.state.place).then(({ status, address, location }) => {
      switch (status) {
        case 'OK':
        {
          this.setState({ address, location });
          return searchHotelByLocation(location);
        }
        case 'ZERO_RESULTS':
        {
          this.setErrorMessage('結果が見つかりませんでした');
          break;
        }
        default:
        {
          this.setErrorMessage('エラーが発生しました');
        }
      }
      return [];
    }).then((hotels) => {
      this.setState({ hotels: sortedHotels(hotels, this.state.sortKey) });
    }).catch(() => {
      this.setErrorMessage('通信に失敗しました');
    });
  }

  handleSortKeyChange(sortKey) {
    this.setState({ sortKey, hotels: sortedHotels(this.state.hotels, sortKey) });
  }

  render() {
    return (
      <div className="search-page">
        <h1 className="app-title">ホテル検索</h1>
        <SearchForm
          place={this.state.place}
          onPlaceChange={place => this.hssandlePlaceChange(place)}
          onSubmit={e => this.handlePlaceSubmit(e)}
        />
        <div className="result-area">
          <Map location={this.state.location} />
          <div className="result-right">
            <GeocodeResult address={this.state.address} location={this.state.location} />
            <h2>ホテル検索結果</h2>
            <HotelsTable
              hotels={this.state.hotels}
              onSort={sortKey => this.handleSortKeyChange(sortKey)}
              sortKey={this.state.sortKey}
            />
          </div>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
};

export default SearchPage;