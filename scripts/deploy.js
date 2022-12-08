// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require('hardhat');

async function main() {
	const [owner, user1, user2] = await ethers.getSigners();

	//get contract
	const contract = await ethers.getContractFactory('AddWords')
	const AddWordsContract = await contract.deploy('first')
	await AddWordsContract.deployed()

	console.log(`contract deployed to: ${AddWordsContract.address}`)

	// add words from different users
	let tx = await AddWordsContract.connect(user1).addWord('2nd', 'this is my first message')
	await tx.wait()
	
	tx = await AddWordsContract.connect(user2).addWord('3rd', 'fuckin intellisense...or whatever')
	await tx.wait()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
