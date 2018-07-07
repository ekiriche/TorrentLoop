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

export function FormValueValidation(event) {
	let textReg = /^[A-z]+$/g;
	let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
	let passReg = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/g;

	if (event.target.name === 'password') {
		if (event.target.value.length < 4 || event.target.value.length > 15) {
			return 'Password should contain at least 4 and not more than 16 characters';
		}
		return checkString(event.target.value);
	} else if (event.target.name === 'email') {
		if (checkValue(emailReg, event.target.value) === false)
		return 'Your email address is invalid';
	} else {
		if (event.target.value.length < 4 || event.target.value.length > 15)
		return 'should contain at least 4 and not more than 16 characters';
		else if (checkValue(textReg, event.target.value) === false)
		return ('should contain only alphabetic characters');
	}
}

export function checkValue(regexp, str) {
	if (str.search(regexp) != -1) {
		return (true)
	} else {
		return (false);
	}
}

export function checkString(str) {
	let ch;
	let i;
	let capitalFlag = false;
	let lowerCaseFlag = false;
	let numberFlag = false;
	for(i=0;i < str.length;i++) {
		ch = str.charAt(i);
		if( str.search(/(?=.*\d)/g) != -1 ) {
			numberFlag = true;
		} else if ( str.search(/(?=.*\d)/g) === -1 ) {
			return 'Passwords must beat less 1 number'
		}
		if ( (str.search(/(?=.*[A-Z])/g) != -1) ) {
			capitalFlag = true;
		} else if (str.search(/(?=.*[A-Z])/g) === -1) {
			return 'Passwords must beat less 1 capital letter'
		}
		if ( (str.search(/(?=.*[a-z])/g) != -1) ) {
			lowerCaseFlag = true;
		} else if (str.search(/(?=.*[a-z])/g) === -1) {
			return 'Passwords must beat less 1 lowercase letter'
		}
		if(numberFlag && capitalFlag && lowerCaseFlag)
		return true;
	}
	return false;
}
