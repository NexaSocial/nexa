// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {NEXA} from "../src/Nexa.sol";

contract NexaScript is Script {
    NEXA nexa;

    function setUp() public {}

    function run() public {
        vm.startBroadcast(0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80);
        //Deploy do contrato

        nexa = new NEXA();

        //Pegar o enderço do contraro
        console.log("ADDRESS: ", address(nexa));

        console.log("OWNER", nexa.owner());

        vm.stopBroadcast();
    }
}

/* Rodar Script

forge script script/Nexa.s.sol:NexaScript --rpc-url "http://127.0.0.1:8545" --broadcast

*/
