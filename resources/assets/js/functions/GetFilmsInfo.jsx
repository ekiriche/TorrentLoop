import axios from 'axios';

export default function GetFilmsInfo(type) {
	let BaseUrl = 'https://yts.am/api/v2/';
	return new Promise((resolve, reject) => {
		axios.get(BaseUrl + type)
		.then(res => {
			resolve(res.data);
		})
		.catch(error => {
			reject(error);
		});
	});
}
