import {
	Add,
	Apps,
	BookmarkBorder,
	Drafts,
	ExpandLess,
	ExpandMore,
	FileCopy,
	Inbox,
	InsertComment,
	PeopleAlt,
} from '@material-ui/icons';
import CreateIcon from '@material-ui/icons/Create';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import React from 'react';
import styled from 'styled-components';
import SidebarOption from './SidebarOption';
import { auth, db } from 'firebaseConfig.js';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

function Sidebar(props) {
	const [channels, loading, error] = useCollection(db.collection('rooms'));
	const [user] = useAuthState(auth);

	return (
		<SideBarContainer>
			<SideBarHeader>
				<SideBarInfo>
					<h2>SUGAR</h2>
					<h3>
						<FiberManualRecordIcon />
						Dtd3009
					</h3>
				</SideBarInfo>
				<CreateIcon />
			</SideBarHeader>

			<SidebarOption Icon={InsertComment} title="Threads" />
			<SidebarOption Icon={Inbox} title="Mentions & reactions" />
			<SidebarOption Icon={Drafts} title="Saved & items" />
			<SidebarOption Icon={BookmarkBorder} title="Channel browser" />
			<SidebarOption Icon={PeopleAlt} title="People & user groups" />
			<SidebarOption Icon={Apps} title="Apps" />
			<SidebarOption Icon={FileCopy} title="File browser" />
			<SidebarOption Icon={ExpandLess} title="Show less" />
			<hr />
			<SidebarOption Icon={ExpandMore} title="Channels" />
			<hr />
			<SidebarOption Icon={Add} addChannelOption title="Add channel" />

			{channels?.docs.map((doc) => (
				<SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
			))}
		</SideBarContainer>
	);
}

export default Sidebar;

const SideBarContainer = styled.div`
	background-color: var(--slack-color);
	color: #fff;
	flex: 0.3;
	max-width: 260px;
	border-top: 1px solid #49274b;
	margin-top: 60px;

	> hr {
		margin-top: 10px;
		margin-bottom: 10px;
		border: 1px solid #49274b;
	}
`;

const SideBarHeader = styled.div`
	display: flex;
	border-bottom: 1px solid #49274b;
	padding: 13px;

	> .MuiSvgIcon-root {
		font-size: 18px;
		color: #49284b;
		background-color: #fff;
		border-radius: 50%;
	}
`;

const SideBarInfo = styled.div`
	flex: 1;

	> h2 {
		font-size: 15px;
		font-weight: 900;
		margin-bottom: 5px;
	}

	> h3 {
		display: flex;
		font-size: 13px;
		font-weight: 400;
		text-align: center;
	}

	> h3 > .MuiSvgIcon-root {
		font-size: 14px;
		margin-top: 1px;
		margin-right: 2px;
		color: green;
	}
`;
