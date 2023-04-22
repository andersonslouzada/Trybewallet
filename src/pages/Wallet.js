import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Wallet extends Component {
  render() {
    return (
      <Header />
    );
  }
}

export default connect()(Wallet);
