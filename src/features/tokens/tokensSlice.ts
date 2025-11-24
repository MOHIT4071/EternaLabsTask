import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UIState = { columnView: 'all' | 'new' | 'final' | 'migrated'; selectedTokenId?: string };

const initialState: UIState = { columnView: 'all', selectedTokenId: undefined };

const slice = createSlice({ name: 'tokens', initialState, reducers: {
  setColumnView(state, action: PayloadAction<UIState['columnView']>) { state.columnView = action.payload },
  selectToken(state, action: PayloadAction<string | undefined>) { state.selectedTokenId = action.payload }
}});

export const { setColumnView, selectToken } = slice.actions;
export default slice.reducer;
