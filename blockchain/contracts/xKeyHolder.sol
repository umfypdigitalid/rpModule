// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import './xERC725.sol';

// **Warning!** This file is a protoype version of our work around ERC 725.
// This file is now out of date and **should not be used**.
// Our current identity contracts are here:
// https://github.com/OriginProtocol/origin/tree/master/origin-contracts/contracts/identity

contract xKeyHolder is xERC725 {

    uint256 executionNonce;

    struct Execution {
        address to;
        uint256 value;
        bytes data;
        bool approved;
        bool executed;
    }

    mapping (bytes32 => Key) keys;
    mapping (uint256 => bytes32[]) keysByPurpose;
    mapping (uint256 => Execution) executions;

    event ExecutionFailed(uint256 indexed executionId, address indexed to, uint256 indexed value, bytes data);

    constructor() {
        bytes32 _key = keccak256(abi.encodePacked(msg.sender)); //_key sender address
        keys[_key].key = _key;
        keys[_key].purpose = 1;
        keys[_key].keyType = 1;
        keysByPurpose[1].push(_key);
        emit KeyAdded(_key, keys[_key].purpose, 1);
    }

    function getKey(bytes32 _key)public view override returns(uint256 purpose, uint256 keyType, bytes32 key){
        return (keys[_key].purpose, keys[_key].keyType, keys[_key].key);
    }

    function getKeyPurpose(bytes32 _key) public view override returns(uint256 purpose){
        return (keys[_key].purpose);
    }

    function getKeysByPurpose(uint256 _purpose)public view override returns(bytes32[] memory _keys){
        return keysByPurpose[_purpose];
    }

    function addKey(bytes32 _key, uint256 _purpose, uint256 _type)public override returns (bool success){
        require(keys[_key].key != _key, "Key already exists"); // Key should not already exist
        if (msg.sender != address(this)) {
          require(keyHasPurpose(keccak256(abi.encodePacked(msg.sender)), 1), "Sender does not have management key"); // Sender has MANAGEMENT_KEY
        }

        keys[_key].key = _key;
        keys[_key].purpose = _purpose;
        keys[_key].keyType = _type;

        keysByPurpose[_purpose].push(_key);

        emit KeyAdded(_key, _purpose, _type);

        return true;
    }

    function approve(uint256 _id, bool _approve)public override returns (bool success){
        require(keyHasPurpose(keccak256(abi.encodePacked(msg.sender)), 2), "Sender does not have action key");
    
        emit Approved(_id, _approve);
        bytes memory data;
        if (_approve == true) {
            executions[_id].approved = true;
            (success, data) = executions[_id].to.call(executions[_id].data);
            if (success) {
                executions[_id].executed = true;
                emit Executed(
                    _id,
                    executions[_id].to,
                    executions[_id].value,
                    executions[_id].data
                );
                return true;
            } else {
                emit ExecutionFailed(
                    _id,
                    executions[_id].to,
                    executions[_id].value,
                    executions[_id].data
                );
                return false;
            }
        } else {
            executions[_id].approved = false;
        }
        return true;
    }

    function execute(address _to, uint256 _value, bytes memory _data)
        public override
        returns (uint256 executionId)
    {
        require(!executions[executionNonce].executed, "Already executed");
        executions[executionNonce].to = _to;
        executions[executionNonce].value = _value;
        executions[executionNonce].data = _data;

        emit ExecutionRequested(executionNonce, _to, _value, _data);

        if (keyHasPurpose(keccak256(abi.encodePacked(msg.sender)),1) || keyHasPurpose(keccak256(abi.encodePacked(msg.sender)),2)) {
            approve(executionNonce, true);
        }

        executionNonce++;
        return executionNonce-1;
    }

    function removeKey(bytes32 _key)
        public
        returns (bool success)
    {
        require(keys[_key].key == _key, "No such key");
        emit KeyRemoved(keys[_key].key, keys[_key].purpose, keys[_key].keyType);

        /* uint index;
        (index,) = keysByPurpose[keys[_key].purpose.indexOf(_key);
        keysByPurpose[keys[_key].purpose.removeByIndex(index); */

        delete keys[_key];

        return true;
    }

    function keyHasPurpose(bytes32 _key, uint256 _purpose) public view returns(bool result){
        bool isThere;
        if (keys[_key].key == 0) return false;
        isThere = keys[_key].purpose <= _purpose;
        return isThere;
    }

}