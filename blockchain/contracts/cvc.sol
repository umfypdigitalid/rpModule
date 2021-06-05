// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

contract CVC {
    // The keyword "public" makes variables
    // accessible from other contracts
    struct Token{
        string key;
        uint attr;
        bool verifyFlag;
        bool claimFlag;
    }

    uint input;
    Token token;
    //claimPKVerify()
    /*
    Param: claim token
    Process:    1. Should verify the digital signature put in claim token
                2. Set verification flag to true
                3. return result/token
    Return verification result: bool
    To verify the validity of PK in claim token
    */
}