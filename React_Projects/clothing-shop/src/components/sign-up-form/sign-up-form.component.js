import { useState } from "react";
const defaultFormData = {
	Name: "",
	email: "",
	password: "",
	confirmPassword: "",
};
const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormData);
	const { Name, email, password, confirmPassword } = formFields;

	const changeHandler = () => {};

	return (
		<div>
			<h1>Sign up with email and password</h1>
			<form onSubmit={() => {}}>
				<label>Name</label>
				<input
					onChange={changeHandler}
					name='name'
					value={Name}
					type='text'
					required
				/>

				<label>Email</label>
				<input
					onChange={changeHandler}
					name='email'
					value={email}
					type='email'
					required
				/>

				<label>Password</label>
				<input
					onChange={changeHandler}
					name='password'
					value={password}
					type='password'
					required
				/>

				<label>Confirm Password</label>
				<input
					onChange={changeHandler}
					name='confirmPassword'
					value={confirmPassword}
					type='password'
					required
				/>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};
export default SignUpForm;
