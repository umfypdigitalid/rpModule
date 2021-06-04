// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract CVC {
    // The keyword "public" makes variables
    // accessible from other contracts
    struct token {
        uint pk;
    }

    uint pk;
    constructor(uint input) {
        input = pk;
    }

    //@dev Something?
    function claimPKVerify() public view returns (bool){
        return pk%2==0;
    }
