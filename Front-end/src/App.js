import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import token from './token';

class App extends Component {
  state = {
    owner: '',
    balance: '',
    value: '',
    message: '',
    address: '',
    addressFrom: ''
  };
  componentDidMount() {
    const owner = "0xfAC50A5B897b947F529Eb4F2DbcAa5141AE2676E";        // change this line with your current address;    
    this.setState({ owner });
  }

  getTokens = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts(); // your code here;
    this.setState({ message: 'Waiting on transaction success...' });
    //await // your code here;
    await token.methods.getTokens().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: 'You got your tokens!' });
  };

  tokenBalance = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();// your code here;
    console.log(typeof accounts[0], accounts[0]);
    this.setState({ message: 'Waiting on transaction success...' });
    let result = await token.methods.balances(this.state.address).call(); // your code here;  
    this.setState({ message: result });
  };


  transfer = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts(); // your code here;

    this.setState({ message: 'Waiting on transaction success...' });  
    console.log("address is ==> ", this.state.addressFrom);
    await token.methods.transfer(this.state.addressFrom, this.state.value).send({
      from: accounts[0]
    });// your code here;
    this.setState({ message: "transaction has been entered" });
  };

  transferFrom = async event => {
    event.preventDefault();
    // const accounts = await web3.eth.getAccounts(); // your code here;
    this.setState({ message: 'Waiting on transaction success...' });
    await token.methods.transferFrom(this.state.addressFrom, this.state.address, this.state.value).send({
      from: this.state.addressFrom
    });// your code here;
    this.setState({ message: "transaction has been entered" });
  };

  approve = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts(); // your code here;
    this.setState({ message: 'Waiting on transaction success...' });
    await token.methods.approve(this.state.address, this.state.value).send({
      from: accounts[0]
    });// your code here;
    this.setState({ message: "transaction has been entered" });
  };

  getEthers = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts(); // your code here;
    this.setState({ message: 'Waiting on transaction success...' });
    await token.methods.getEthers(this.state.value).send({
      from: accounts[0]
    });// your code here;
    this.setState({ message: 'You sold your tokens!' });
  };

  render() {
    return (
      <div>
        <h2>My Currency</h2>
        <p>
          This token is owned by {this.state.owner}.
        </p>
        <hr />
        <form onSubmit={this.getTokens}>
          <h4>Buy Tokens</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>getTokens</button>
        </form>
        <hr />
        <form onSubmit={this.tokenBalance}>
          <h4>View your balance of Tokens</h4>
          <div>
            <label>Enter the address</label>
            <input
              address={this.state.address}
              onChange={event => this.setState({ address: event.target.value })}
            />
          </div>
          <button>Get balance!</button>
        </form>

        <hr />
        <form onSubmit={this.transfer}>
          <h4>Transfer token to an address</h4>
          <div>
            <label>Enter the address to transfer to</label>
            <input
              address={this.state.address}
              onChange={event => this.setState({ address: event.target.value })}
            />
            <br /><br />
            <label>Enter the token to transfer</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Transfer tokens!</button>
        </form>
        <hr />
        <form onSubmit={this.transferFrom}>
          <h4>Transfer token to an address to another</h4>
          <div>
            <label>Enter the address to transfer from</label>
            <input
              addressFrom={this.state.addressFrom}
              onChange={event => this.setState({ addressFrom: event.target.value })}
            />
            <br /><br />
            <label>Enter the address to transfer to</label>
            <input
              address={this.state.address}
              onChange={event => this.setState({ address: event.target.value })}
            />
            <br /><br />
            <label>Enter the token to transfer</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Transfer tokens!</button>
        </form>
        <hr />
        <form onSubmit={this.approve}>
          <h4>give permission to an account to spend some ether</h4>
          <div>
            <label>Enter the address of the spender</label>
            <input
              address={this.state.address}
              onChange={event => this.setState({ address: event.target.value })}
            />
            <br /><br />
            <label>Enter the allowance value</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Set allowance!</button>
        </form>
        <hr />
        <form onSubmit={this.getEthers}>
          <h4>Sell Tokens</h4>
          <div>
            <label>Amount of tokens to sell</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>sell Tokens</button>
        </form>
        <hr />
        <h1> Transaction status : {this.state.message}</h1>
        <hr />

      </div>
    );
  }
}
export default App