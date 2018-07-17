export function formValueCheck(event) {
	let validateMessage = this.FormValueValidation(event);

	if (validateMessage !== undefined && event.target.name === 'firstname') {
		this.setState({firstnameError: 'First name ' + validateMessage });
	} else if (validateMessage === undefined && event.target.name === 'firstname')
	this.setState({firstnameError: '' });
	if (validateMessage !== undefined && event.target.name === 'lastname') {
		this.setState({lastnameError: 'Last name ' + validateMessage });
	} else if (validateMessage === undefined && event.target.name === 'lastname')
	this.setState({lastnameError: '' });
	if ( validateMessage !== undefined && event.target.name === 'email') {
		this.setState({emailError: validateMessage });
	} else if (validateMessage === undefined && event.target.name === 'email')
	this.setState({emailError: '' });
	if (validateMessage !== undefined && event.target.name === 'login') {
		this.setState({loginError: 'Login ' + validateMessage });
	} else if (validateMessage === undefined && event.target.name === 'login')
	this.setState({loginError: '' });
	if (validateMessage !== undefined &&event.target.name === 'password') {
		this.setState({passwordError: validateMessage });
	} else if (validateMessage === undefined &&event.target.name === 'password')
	this.setState({passwordError: '' });
}

export function FormValueValidation(event, langCode) {
	let textReg = /^[A-z]+$/g;
	let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
	let passReg = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/g;
	let returnText;
	let returnLabel;
	const confirmMessage = {
		en: [
			'should contain at least 2 and not more than 16 characters',
			'should contain only alphabetic characters',
			'Your email address is invalid',
			'Password should contain at least 4 and not more than 16 characters',
			'First name',
			'Last name',
			'Login'
		],
		ua: [
			'має складатися принаймні 2 і не більше 16 символів',
			'має складатися тільки з алфавітних символів',
			'Ваша електронна адреса недійсна',
			'Пароль повинен містити принаймні 4 і не більше 16 символів',
			'Ваше ім’я',
			'Прізвище',
			'Логін'
		]
	}

	if (langCode === 'en') {
		returnText = confirmMessage.en;
		if (event.target.name === 'firstname')
			returnLabel = confirmMessage.en[4];
		else if (event.target.name === 'lastname')
			returnLabel = confirmMessage.en[5];
		else if (event.target.name === 'login')
			returnLabel = confirmMessage.en[6];
	}
	else {
		returnText = confirmMessage.ua;
		if (event.target.name === 'firstname')
			returnLabel = confirmMessage.ua[4];
		else if (event.target.name === 'lastname')
			returnLabel = confirmMessage.ua[5];
		else if (event.target.name === 'login')
			returnLabel = confirmMessage.ua[6];
	}

	if (event.target.name === 'password') {
		if (event.target.value.length < 4 || event.target.value.length > 15) {
			return returnText[3];
		}
		return checkString(event.target.value, langCode);
	} else if (event.target.name === 'email') {
		if (checkValue(emailReg, event.target.value) === false)
		return returnText[2];
	} else {
		if (event.target.value.length < 2 || event.target.value.length > 15)
		return (returnLabel + ' ' + returnText[0]);
		else if (checkValue(textReg, event.target.value) === false)
		return (returnLabel + ' ' + returnText[1]);
	}
}

export function checkValue(regexp, str) {
	if (str.search(regexp) != -1) {
		return (true)
	} else {
		return (false);
	}
}

export function checkString(str, langCode) {
	let ch;
	let i;
	let returnText;
	let capitalFlag = false;
	let lowerCaseFlag = false;
	let numberFlag = false;

	const confirmMessage = {
		en: ['Password must be at least 1 number',
		'Password must be at least 1 capital letter',
		'Password must be at least 1 lowercase letter'
	],
	ua: ['Пароль повинен містити принаймні 1 номер',
	'Пароль повинен містити принаймні 1 велику букву',
	'Пароль повинен містити принаймні 1 маленьку букву'
]
}

if (langCode === 'en')
returnText = confirmMessage.en;
else
returnText = confirmMessage.ua;

for(i=0;i < str.length;i++) {
	ch = str.charAt(i);
	if( str.search(/(?=.*\d)/g) != -1 ) {
		numberFlag = true;
	} else if ( str.search(/(?=.*\d)/g) === -1 ) {
		return returnText[0];
	}
	if ( (str.search(/(?=.*[A-Z])/g) != -1) ) {
		capitalFlag = true;
	} else if (str.search(/(?=.*[A-Z])/g) === -1) {
		return returnText[1];
	}
	if ( (str.search(/(?=.*[a-z])/g) != -1) ) {
		lowerCaseFlag = true;
	} else if (str.search(/(?=.*[a-z])/g) === -1) {
		return returnText[2];
	}
	if(numberFlag && capitalFlag && lowerCaseFlag)
	return true;
}
return false;
}
