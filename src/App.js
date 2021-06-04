import Chat from 'Chat';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from 'components/Login';
import { auth } from 'firebaseConfig';
import Spinner from 'react-spinkit';

function App() {
	const [user, loading] = useAuthState(auth);

	if (loading) {
		return (
			<AppLoading>
				<AppLoadingContent>
					<img src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg" alt="" />
					<Spinner name="ball-spin-fade-loaded" color="purple" fadeIn="none" />
				</AppLoadingContent>
			</AppLoading>
		);
	}

	return (
		<div className="App">
			<Router>
				{!user ? (
					<Login />
				) : (
					<>
						<Header />
						<AppBody>
							<Sidebar />
							<Switch>
								<Route path="/" exact>
									<Chat />
								</Route>
							</Switch>
						</AppBody>
					</>
				)}
			</Router>
		</div>
	);
}

export default App;

const AppBody = styled.div`
	display: flex;
	height: 100vh;
`;

const AppLoading = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const AppLoadingContent = styled.div`
	text-align: center;
	padding-bottom: 100px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	> img {
		height: 100px;
		padding: 20px;
		margin-bottom: 40px;
	}
`;
