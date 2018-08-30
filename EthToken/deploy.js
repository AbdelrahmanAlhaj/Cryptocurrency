// your code here

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'curious model bomb track thunder science name hat extra predict save visual',
  'https://rinkeby.infura.io/7b92b09df6f94f3cb536effefbf4c0fb'
);// your code here  
//new Web3.providers.HttpProvider("http://localhost:8545")
const web3 = new Web3(provider);// your code here

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]); // address of the deployer

    const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: '0x' + bytecode ,arguments:[100000000000000000000, 'BCCoin', 0, 'BCC' , 100]})
      .send({ gas: '1000000', from: accounts[0] });// your code here

    console.log('Contract deployed to', result.options.address); //address of the deployed contract
  } catch (error) {
    console.log(error);
  }
};
deploy();
