import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
	name: 'app',
	initialState: {
		roomId: null,
	},
	reducers: {
		enterRoom: (state, action) => {
			state.roomId = action.payload.roomId;
		},
	},
});

const { actions, reducer } = appSlice;

export const { enterRoom } = actions;

export const selectRoomId = (state) => state.app.roomId;

export default reducer;
