import { postData } from '../../controller/bcDataController';

export default async function handler (req, res) {
	if (req.method === 'POST') {
		return postData(req, res);
	}
};
