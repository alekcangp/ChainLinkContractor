pragma solidity 0.4.24;

import "https://github.com/smartcontractkit/chainlink/evm/contracts/Chainlinked.sol";
import "https://github.com/smartcontractkit/chainlink/evm/contracts/vendor/Ownable.sol";

//Token Contract

contract HappyNewYear {
 
    uint256 totalSupply_; 
    string public constant name = "Happy New Year";
    string public constant symbol = "HappyNewYear";
    uint8 public constant decimals = 18;
    uint256 public constant initialSupply = 2020*(10**uint256(decimals));
 
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
 
    mapping (address => uint256) balances; 
    mapping (address => mapping (address => uint256)) allowed;
    
    function totalSupply() public view returns (uint256){
        return totalSupply_;
    }
 
    function balanceOf(address _owner) public view returns (uint256){
        return balances[_owner];
    }
 
    function allowance(address _owner, address _spender) public view returns (uint256) {
        return allowed[_owner][_spender];
  }
 
    function transfer(address _to, uint256 _value) public returns (bool ) {
        require(_to != address(0));
        require(balances[msg.sender] >= _value); 
        balances[msg.sender] = balances[msg.sender] - _value; 
        balances[_to] = balances[_to] + _value; 
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
 
    function approve(address _spender, uint256 _value) public returns (bool) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
 
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        require(_to != address(0));
        require(_value <= balances[_from]);
        require(_value <= allowed[_from][msg.sender]); 
        balances[_from] = balances[_from] - _value; 
        balances[_to] = balances[_to] + _value; 
        allowed[_from][msg.sender] = allowed[_from][msg.sender] - _value; 
        emit Transfer(_from, _to, _value); 
        return true; 
        } 
 
     function increaseApproval(address _spender, uint _addedValue) public returns (bool) { 
     allowed[msg.sender][_spender] = allowed[msg.sender][_spender] + _addedValue; 
     emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]); 
     return true; 
     } 
 
    function decreaseApproval(address _spender, uint _subtractedValue) public returns (bool) { 
    uint oldValue = allowed[msg.sender][_spender]; 
    if (_subtractedValue > oldValue) {
 
        allowed[msg.sender][_spender] = 0;
    } 
        else {
        allowed[msg.sender][_spender] = oldValue - _subtractedValue;
    }
    emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
    return true;
    }
 
    function HappyNewYear() public {
        totalSupply_ = initialSupply;
        balances[msg.sender] = initialSupply;
        emit Transfer(0x0, msg.sender, initialSupply);
    }
}

//Random Contract Rinkeby 0x972c49907D7f22E2c8AE164C92C1019308ab03FA

contract SantaContract is Chainlinked, Ownable {
  uint256 constant private ORACLE_PAYMENT = 1 * LINK;
  string private jobId = "b00ed7210563488cbe5a3b7729c0ec72";
  uint256 public currentCoord;
  address public client;
  address private oracle = 0x7AFe1118Ea78C1eae84ca8feE5C65Bc76CcF879e;//oracle random.org rinkeby
  address private token = 0x10d05006a637470a709F9D41cB61bceA96eBe9b6; //address HappyNewYear token rinkeby
  
  
  event RequestCoord(
    bytes32 indexed requestId,
    uint256 indexed coord
  );

  constructor() public {
    setPublicChainlinkToken();
  }

  function updateCoord() public {
    client = msg.sender;
    Chainlink.Request memory req = buildChainlinkRequest(stringToBytes32(jobId), this, this.report.selector);
    req.addUint("min", 0);
    req.addUint("max", 360);
    sendChainlinkRequestTo(oracle, req, ORACLE_PAYMENT);
  }

  function report(bytes32 _requestId, uint256 _coord)
    public
    recordChainlinkFulfillment(_requestId)
  {
    emit RequestCoord(_requestId, _coord);
    currentCoord = _coord;
    HappyNewYear(token).transfer(client, 1*LINK);
  }
  
  function stringToBytes32(string memory source) private pure returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
      return 0x0;
    }

    assembly { // solhint-disable-line no-inline-assembly
      result := mload(add(source, 32))
    }
  }
  
   function withdrawLink() public  onlyOwner {
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
   }
    function withdrawHNY() public  onlyOwner {
    LinkTokenInterface hny = LinkTokenInterface(token);
    require(hny.transfer(msg.sender, hny.balanceOf(address(this))), "Unable to transfer");
  }
  
  function destroy()
    external
    onlyOwner
  {
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
    LinkTokenInterface hny = LinkTokenInterface(token);
    require(hny.transfer(msg.sender, hny.balanceOf(address(this))), "Unable to transfer");
    selfdestruct(owner);
  }
  

}
