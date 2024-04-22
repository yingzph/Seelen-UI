import { createSlice } from '@reduxjs/toolkit';

import { Rect } from '../../shared/app/Rect';
import { matcher, reducersFor, selectorsFor } from '../../shared/app/utils';
import { BorderSlice } from '../border/app';
import { ContainerTopBarSlice } from '../containerTopBar/app';
import { PopupSlice } from '../popups/app';

import {
  GeneralSettingsState,
} from './domain';

let initialState: GeneralSettingsState = {
  selectedTheme: null,
  autoStackinByCategory: true,
  border: BorderSlice.getInitialState(),
  popups: PopupSlice.getInitialState(),
  containerPadding: 10,
  workspacePadding: 10,
  resizeDelta: 50,
  globalWorkAreaOffset: new Rect().toJSON(),
  containerTopBar: ContainerTopBarSlice.getInitialState(),
};

export const GeneralSettingsSlice = createSlice({
  name: 'generalSettings',
  initialState,
  selectors: selectorsFor(initialState),
  reducers: {
    ...reducersFor(initialState),
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(matcher(BorderSlice), (state, action) => {
        state.border = BorderSlice.reducer(state.border, action);
      })
      .addMatcher(matcher(PopupSlice), (state, action) => {
        state.popups = PopupSlice.reducer(state.popups, action);
      })
      .addMatcher(matcher(ContainerTopBarSlice), (state, action) => {
        state.containerTopBar = ContainerTopBarSlice.reducer(state.containerTopBar, action);
      });
  },
});

export const GeneralSettingsActions = GeneralSettingsSlice.actions;