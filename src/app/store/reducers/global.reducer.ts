import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as globalActions from '../actions/global.actions';

export interface AppState {
  isLoading: boolean;
}

export const initialState: AppState = {
  isLoading: false,
}

export const globalReducer = createReducer(
  initialState,
  on(globalActions.setLoadingState, (state, { isLoading }) => ({
    ...state,
    isLoading
  }))
)

export const getAppState = createFeatureSelector<AppState>('app');
export const getIsLoading = createSelector(
  getAppState,
  (state) => state.isLoading
);
