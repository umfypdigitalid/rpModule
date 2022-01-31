// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import './xClaimHolder.sol';

// **Warning!** This file is a protoype version of our work around ERC 725.
// This file is now out of date and **should not be used**.
// Our current identity contracts are here:
// https://github.com/OriginProtocol/origin/tree/master/origin-contracts/contracts/identity

contract xClaimVerifier {

  event ClaimValid(xClaimHolder _identity, uint256 claimType);
  event ClaimInvalid(xClaimHolder _identity, uint256 claimType);
  event ClaimDataValid(xClaimHolder _identity, uint256 claimType, bytes data);
  event ClaimDataInvalid(xClaimHolder _identity, uint256 claimType, bytes data);

  xClaimHolder public trustedClaimHolder;

  constructor (address _trustedClaimHolder) {
    trustedClaimHolder = xClaimHolder(_trustedClaimHolder);
  }

  function verifyClaimData (xClaimHolder _identity, uint256 _claimType, bytes memory _data) public returns(bool) {
    if (checkClaim(_identity, _claimType)){
      uint256 foundClaimType;
      uint256 scheme;
      address issuer;
      bytes memory sig;
      bytes memory data;
      string memory uri;
      bytes32 claimId = keccak256(abi.encodePacked(_identity, _claimType));
      ( foundClaimType, scheme, issuer, sig, data , uri) = _identity.getClaim(claimId);
      bytes32 hashData = keccak256(abi.encodePacked(data)); 
      bool validData = hashData == keccak256(abi.encodePacked(_data));
      if (validData){
        emit ClaimDataValid(_identity, _claimType, _data);
        return true;
      } else {
        emit ClaimDataInvalid(_identity, _claimType, _data);
        return false;
      }
    }
    return false;
  }

  function checkClaim(xClaimHolder _identity, uint256 claimType)
    public view
    returns (bool claimValid)
  {
    if (claimIsValid(_identity, claimType)) {
      // emit ClaimValid(_identity, claimType);
      return true;
    } else {
      // emit ClaimInvalid(_identity, claimType);
      return false;
    }
  }

  function claimIsValid(xClaimHolder _identity, uint256 claimType)
    public view

    returns (bool claimValid)
  {
    uint256 foundClaimType;
    uint256 scheme;
    address issuer;
    bytes memory sig;
    bytes memory data;

    // Construct claimId (identifier + claim type)
    bytes32 claimId = keccak256(abi.encodePacked(address(_identity), claimType));

    // Fetch claim from user
    ( foundClaimType, scheme, issuer, sig, data, ) = _identity.getClaim(claimId);

    bytes32 dataHash = keccak256(abi.encodePacked(_identity, claimType, data));
    bytes32 prefixedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", dataHash));

    // Recover address of data signer
    address recovered = getRecoveredAddress(sig, prefixedHash);

    // Take hash of recovered address
    bytes32 hashedAddr = keccak256(abi.encodePacked(recovered));

    // Does the trusted identifier have they key which signed the user's claim?
    return trustedClaimHolder.keyHasPurpose(hashedAddr, 3);
  }

  function getRecoveredAddress(bytes memory sig, bytes32 dataHash)
      pure
    public
      returns (address addr)
  {
      bytes32 ra;
      bytes32 sa;
      uint8 va;

      // Check the signature length
      if (sig.length != 65) {
        return address(0);
      }

      // Divide the signature in r, s and v variables
      assembly {
        ra := mload(add(sig, 32))
        sa := mload(add(sig, 64))
        va := byte(0, mload(add(sig, 96)))
      }

      if (va < 27) {
        va += 27;
      }

      address recoveredAddress = ecrecover(dataHash, va, ra, sa);

      return (recoveredAddress);
  }

}