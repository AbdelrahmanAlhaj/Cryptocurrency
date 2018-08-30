
pragma solidity ^0.4.21;

import "Interface.sol";            // change this line


contract BCCoin is Interface {

    uint256 constant private MAX_UINT256 = 2**256 - 1;
    // declare balances variable here
    mapping (address => uint256) public balances;

    mapping (address => mapping (address => uint256)) public allowed;
   
    string public name;                   //fancy name: eg Simon Bucks
    uint8 public decimals;                //How many decimals to show.
    string public symbol;                 //An identifier: eg SBX
    uint8 public tokenValue;              //token value in ethers
    address public Owner;                 //address account who deplyed the contract       

    constructor (
        uint256 _initialAmount,
        string _tokenName,
        uint8 _decimalUnits,
        string _tokenSymbol,
        uint8 _tokenValue
    ) public {
       Owner = msg.sender;
       // your code here
       name= _tokenName;
       decimals = _decimalUnits;
       tokenValue = _tokenValue;
       symbol = _tokenSymbol;       
       balances[Owner] = _initialAmount;
    }


    function transfer(address _to, uint256 _value) public {
       // your code here      
        uint256 balance = balances[msg.sender];

       if(_value <= balance){
            balances[_to] = balances[_to] + _value;
            balances[msg.sender] = balances[msg.sender] - _value;
       }
    }

    function transferFrom(address _from, address _to, uint256 _value) public  {
        uint256 allowance = allowed[_from][msg.sender];
        // your code here
        
        if(_value <= allowance){            
            if (allowance < MAX_UINT256) {
                allowed[_from][msg.sender] -= _value;
                balances[_from] -= _value;
                balances[_to] += _value;                
            }
        }
     
    }    
   
    function approve(address _spender, uint256 _value) public  {
       // your code here 
       uint256 balance = balances[msg.sender];

       if(_value <= balance){
            allowed[msg.sender][_spender] = _value;        
       }
    }    

    function getTokens() public payable returns (uint256){

        uint256 receivedEthers= msg.value;
        uint256 dueTokens = receivedEthers / 100;

        uint256 availableBalance= balances[Owner];

        if (  availableBalance >= dueTokens ){

            balances[Owner] -= dueTokens;
            balances[msg.sender] += dueTokens;
                       
        }        
        return dueTokens; 
    }

    function getBalance() public view returns(uint256){        
        return msg.sender.balance;
    }

    function getEthers(uint256 TokensToSell) public payable returns(uint256){
        
        uint256 dueEthers = TokensToSell * 100;

        uint256 avaEthers= Owner.balance;

        if (  avaEthers >= dueEthers ){

            balances[Owner] += TokensToSell;
            balances[msg.sender] -= TokensToSell;

            msg.sender.transfer(dueEthers);           
        }        
        
        return dueEthers; 
    }
}