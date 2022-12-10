import PhraseModel from '../model/phraseModel';
import mongoose from 'mongoose';
import dbConnect from '../lib/dbConnect';

// checks if ID is in the correct format before proceeding
const idFormatChecker = (id, res) => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'invalid ID format' });
	}
};

// add post to blockchain
export const postData = async (req, res) => {
	console.log('posting data...');

	const { userPhrase, userMessage } = req.body;

	// add doc to database
	try {
		dbConnect();

		const newData = await PhraseModel.create({ userPhrase, userMessage });

		console.log('posted data!');
		res.status(200).json(newData);
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ error: error.message });
	}
};
