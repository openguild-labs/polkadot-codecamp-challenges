//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/IERC20.sol";

contract MyERC20 is IERC20 {
    string private _name;
    string private _symbol;
    uint8 private _decimals;
    uint private _totalSupply;

    mapping(address => uint) private _balances;
    mapping(address => mapping(address => uint)) private _allowances;

    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_
    ) {
        _name = name_;
        _symbol = symbol_;
        _decimals = decimals_;
    }

    function name() external view override returns (string memory) {
        return _name;
    }

    function symbol() external view override returns (string memory) {
        return _symbol;
    }

    function decimals() external view override returns (uint8) {
        return _decimals;
    }

    function totalSupply() external view override returns (uint) {
        return _totalSupply;
    }

    function balanceOf(address owner) external view override returns (uint) {
        return _balances[owner];
    }

    function allowance(
        address owner,
        address spender
    ) external view override returns (uint) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint value) external override returns (bool) {
        _allowances[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transfer(address to, uint value) external override returns (bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint value
    ) external override returns (bool) {
        uint currentAllowance = _allowances[from][msg.sender];
        require(currentAllowance >= value, "ERC20: allowance exceeded");

        unchecked {
            _allowances[from][msg.sender] = currentAllowance - value;
        }

        _transfer(from, to, value);
        return true;
    }

    function _transfer(address from, address to, uint value) internal {
        require(to != address(0), "ERC20: transfer to zero address");
        require(_balances[from] >= value, "ERC20: insufficient balance");

        unchecked {
            _balances[from] -= value;
            _balances[to] += value;
        }

        emit Transfer(from, to, value);
    }

    function mint(address to, uint value) external {
        _mint(to, value);
    }

    function _mint(address to, uint value) internal {
        require(to != address(0), "ERC20: mint to zero address");

        _totalSupply += value;
        _balances[to] += value;

        emit Transfer(address(0), to, value);
    }
}