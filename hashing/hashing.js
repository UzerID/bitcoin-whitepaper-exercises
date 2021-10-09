"use strict";

// const keccak256 = require('keccak256');
const crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

function createBlock(_data) {
	const blockchainLength = Blockchain.blocks.length;
	let block = {
		index: blockchainLength,
		prevHash: Blockchain.blocks[blockchainLength-1].hash,
		data: _data,
		timestamp: Date.now()
	}
	block.hash = blockHash(block);
	return block;
}

// TODO: insert each line into blockchain
for (let line of poem) {
	Blockchain.blocks.push(createBlock(line));
}

console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);


// **********************************

function blockHash(bl) {
	return crypto.createHash("sha256").update(JSON.stringify(bl)).digest("hex");
}

function verifyChain(blockchain) {
	let isValid = true;
	for (const [i, block] of blockchain.blocks.entries()) {
		if (block.index < 0 || block.data == undefined
			|| (block.index > 0 && block.prevHash != blockchain.blocks[i-1].hash)) {
				isValid = false;
				break;
			}
		let hash = "000000"
		if (block.index > 0) {
			let clone = Object.assign({}, block);
			delete clone.hash;
			hash = blockHash(clone);
		}
		if (block.hash != hash) {
			isValid = false;
			break;
		}

	}
	return isValid;
}
// console.log(Blockchain.blocks)