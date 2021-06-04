import { InfoOutlined, StarBorderOutlined } from '@material-ui/icons';
import ChatInput from 'components/ChatInput';
import Message from 'components/Message';
import { selectRoomId } from 'features/appSlice';
import { db } from 'firebaseConfig';
import React, { useEffect, useRef } from 'react';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

function Chat(props) {
	const chatRef = useRef(null);

	// const roomId = useSelector(state=> state.app.roomId);
	const roomId = useSelector(selectRoomId);

	const [roomDetails] = useDocument(roomId && db.collection('rooms').doc(roomId));

	const [roomMessages, loading] = useCollection(
		roomId && db.collection('rooms').doc(roomId).collection('message').orderBy('timestamp', 'asc')
	);

	useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [roomId, loading]);

	return (
		<ChatContainer>
    {roomDetails && roomMessages && (
			<>
				<Header>
					<HeaderLeft>
						<h4>
							<strong>#{roomDetails?.data().name}</strong>
						</h4>
						<StarBorderOutlined />
					</HeaderLeft>
					<HeaderRight>
						<p>
							<InfoOutlined />
							Detail{' '}
						</p>
					</HeaderRight>
				</Header>
				<ChatMessage>
					{roomMessages?.docs.map((doc) => {
						const { message, timestamp, user, userImage } = doc.data();

						return (
							<Message
								key={doc.id}
								message={message}
								timestamp={timestamp}
								user={user}
								userImage={userImage}
							/>
						);
					})}

					<ChatBottom ref={chatRef} />
				</ChatMessage>
				<ChatInput chatRef={chatRef} channelName={roomDetails?.data().name || ''} channelId={roomId} />
			</>

    )}
		</ChatContainer>
	);
}

export default Chat;

const ChatBottom = styled.div`
	padding-bottom: 200px;
`;

const ChatMessage = styled.div``;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 20px;
	border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
	display: flex;
	align-items: center;

	> h4 {
		display: flex;
		text-transform: lowercase;
		margin-right: 10px;
	}

	> h4 > .MuiSvgIcon-root {
		margin-left: 10px;
		font-size: 18px;
	}
`;

const HeaderRight = styled.div`
	> p {
		display: flex;
		align-items: center;
		font-size: 14px;
	}

	> p > .MuiSvgIcon-root {
		margin-right: 5px;
		font-size: 16px;
	}
`;

const ChatContainer = styled.div`
	margin-top: 60px;
	flex: 1;
	overflow-y: scroll;
`;
