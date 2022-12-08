const { loadFixture } = require('@nomicFoundation/hardhat-network-helpers');
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('AddWords', function () {
	const deployContractFixture = async () => {
		let [owner, rando, anotherRando] = await ethers.getSigners();

		const contract = await ethers.getContractFactory('AddWords');
		const AddWordsContract = await contract.deploy('work');
		await AddWordsContract.deployed();

		let tx = await AddWordsContract.addWord('second', 'this is the second');

		await tx.wait();

		return { owner, rando, anotherRando, AddWordsContract };
	};

	describe('Contract Deployed', () => {
		it('deploys the contract', async () => {
			const { AddWordsContract } = await loadFixture(deployContractFixture);

			console.log('contract deployed to : ', AddWordsContract.address);
		});
	});

	describe('Functionality', () => {
		it('emits WordAdded event', async () => {
			const { owner, AddWordsContract } = await loadFixture(
				deployContractFixture
			);

			await expect(AddWordsContract.addWord('third entry', 'find the event'))
				.to.emit(AddWordsContract, 'WordAdded')
				.withArgs(owner.address, 'third entry', 'find the event');
		});

		it('reflects different callers in WordAdded event', async () => {
			const { rando, AddWordsContract } = await loadFixture(
				deployContractFixture
			);

			await expect(AddWordsContract.connect(rando).addWord('3rd', 'try again'))
				.to.emit(AddWordsContract, 'WordAdded')
				.withArgs(rando.address, '3rd', 'try again');
		});

		it('Adds user inputs in wordsArray', async () => {
			const { rando, AddWordsContract } = await loadFixture(
				deployContractFixture
			);

			let tx = await AddWordsContract.connect(rando).addWord(
				'3rd',
				'try again'
			);
			await tx.wait();

			let wordsList = await AddWordsContract.getWordsArray();

			expect(await AddWordsContract.wordsArray(wordsList.length - 1)).to.equal(
				'3rd'
			);
		});
	});
});
