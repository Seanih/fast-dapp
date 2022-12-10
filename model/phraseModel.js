import mongoose, { Schema } from 'mongoose';

// define how document data is structured
const dappDataSchema = new Schema(
	{
		userPhrase: { type: String, required: true },
		userMessage: { type: String, required: true },
	},
	{ timestamps: true }
);

// export model to interact with the collection
// assign model only if it's not asigned already
export default mongoose.models.DappData ||
	mongoose.model('DappData', dappDataSchema);
