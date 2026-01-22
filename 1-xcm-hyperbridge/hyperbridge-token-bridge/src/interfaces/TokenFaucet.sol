// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ITokenFaucet {
    function drip(address token) external;
}