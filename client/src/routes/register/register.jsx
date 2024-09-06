import './register.scss';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';

function Register() {
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { updateUser } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');
		const formData = new FormData(e.target);
		const { username, email, password } = Object.fromEntries(formData);

		try {
			await apiRequest.post('/auth/register', {
				username,
				email,
				password,
			});
			const res = await apiRequest.post('/auth/login', {
				username,
				password,
			});
			updateUser(res.data);
			// navigate('/login');
			navigate('/');
		} catch (err) {
			console.log(err);
			setError(err.response.data.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='register'>
			<div className='formContainer'>
				<form onSubmit={handleSubmit}>
					<h1>Create an Account</h1>
					<input name='username' type='text' placeholder='Username' />
					<input name='email' type='text' placeholder='Email' />
					<input name='password' type='password' placeholder='Password' />
					<button disabled={isLoading}>Register</button>
					{error && <span>{error}</span>}
					<Link to='/login'>{`Already have an account?`}</Link>
				</form>
			</div>
			<div className='imgContainer'>
				<img src='/bg.png' alt='' />
			</div>
		</div>
	);
}

export default Register;

