// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SBT を定義する
 * @author <あなたの名前>
 * @notice ABC Building の入館証
 */
contract EntryPass is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    /**
     * @dev SBT のコレクションに名前とシンボルをコントラクトデプロイ時にセットする
     */
    constructor() ERC721("ABC entry pass", "ABCPS") {}

    /**
     * 対象者に入館証を送信する
     * 必須条件: 関数実行者がコントラクト作成者と一致
     * @param recipient 受け取り者のアドレス
     * @param uri SBT のURI
     */
    function award(address recipient, string memory uri) public onlyOwner {
        _tokenIds.increment();

        _safeMint(recipient, _tokenIds.current());
        _setTokenURI(_tokenIds.current(), uri);
    }

    /**
     * トークンを譲渡不可能に設定する
     * @dev {ERC721-_beforeTokenTransfer} を見て
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal override {
        require(from == address(0), "This token is SBT");

        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }
}