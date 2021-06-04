import { Button } from '@material-ui/core';
import { auth, provider } from 'firebaseConfig';
import React from 'react';
import styled from 'styled-components';

function Login(props) {
	const signIn = (e) => {
		e.preventDefault();
		auth.signInWithPopup(provider).catch((err) => alert(err.message));
	};
	return (
		<LoginContainer>
			<LoginInnerContainer>
				<img src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg" alt="" />
				<h1>Sign in to the slack</h1>
				<p>sugar.slack.com</p>

				<Button type="submit" onClick={signIn}>
					Sign in width google
				</Button>
			</LoginInnerContainer>
		</LoginContainer>
	);
}

export default Login;

const LoginContainer = styled.div`
	background-color: #f8f8f8;
	height: 100vh;
	display: grid;
	place-items: center;
`;

const LoginInnerContainer = styled.div`
	padding: 100px;
	text-align: center;
	background: #fff;
	border-radius: 10px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

	> img {
		object-fit: contain;
		height: 100px;
		margin-bottom: 40px;
	}

	> button {
		margin-top: 50px;
		text-transform: inherit;
		background-color: #0a8d48;
		color: #fff;
	}
`;
