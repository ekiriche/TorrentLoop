import axios from 'axios';

export function GetStream(BaseUrl) {
	return new Promise((resolve, reject) => {
		axios.get(BaseUrl)
		.then(res => {
			resolve(res.data);
		})
		.catch(error => {
			reject(error);
		});
	});
}
