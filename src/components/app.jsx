import React, { Component } from 'react';

import { geocode } from '../domain/Geocoder';
import GeocodeResult from './GeocodeResult';
import Map from './Map';
import SearchForm from './SearchForm';

const GEOCODE_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 34.39208,
        lng: 132.450993,
      },
    };
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

  handlePlaceSubmit(place) {
    geocode(place).then(({ status, address, location }) => {
      switch (status) {
        case 'OK':
        {
          this.setState({ address, location });
          break;
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
    }).catch(() => {
      this.setErrorMessage('通信に失敗しました');
    });
  }

  render() {
    return (
      <div>
        <h1>緯度経度検索</h1>
        <SearchForm onSubmit={place => this.handlePlaceSubmit(place)} />
        <GeocodeResult address={this.state.address} location={this.state.location} />
        <Map location={this.state.location} />
      </div>
    );
  }
}

export default App;
