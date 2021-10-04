// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import './ClaimHolder.sol';
import './KeyHolder.sol';

contract EthereumClaimsRegistry is KeyHolder{

    mapping(address => ClaimHolder) public claimHolder;

    event ClaimSet(
        address indexed issuer,
        address indexed subject,
        bytes32 indexed key,
        bytes value,
        uint updatedAt);

    event ClaimRetrieved(

    );

    function addClaim(address holder, uint256 _topic, uint256 _scheme, address _issuer, bytes memory _data, string memory _uri) public onlyIssuer{
        // Issuer add claim
        bytes32 signature = keccak256(abi.encode(holder, _topic, _data));
        claimHolder[holder].addClaim(_topic, _scheme, _issuer, abi.encode(signature), _data, _uri);
        emit ClaimSet(_issuer, holder, "", _data, block.timestamp);
    }

    function getClaim(address holder) public view returns (uint256 _topic, uint256 _scheme, address _issuer, bytes memory signature, bytes memory _data, string memory _uri){
        return claimHolder[holder].getClaim(0);
    }

    function retrieveClaim(bytes memory signature, uint[] memory topic) public view onlyRP onlyIssuer{
        /* 
        1. Receive claim token from the API
        2. Verify the claim as a valid claim
        3. Get the claim attribute
        4. Return claim attribute

        Claim:
            Digital signature (private key encrypt)
            Permission to access which field
            VerifyFlag (verify validity of token)
            ClaimFlag (verify whether claim ady or not)
        */
    }

    function removeClaim(address issuer, address subject, bytes32 key) public onlyIssuer {
        // Issuer remove claim

    }
}