import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends Component {
  render() {
    return (
      <>
        <Header />
        <WalletForm />
      </>
    );
  }
}

export default connect()(Wallet);
