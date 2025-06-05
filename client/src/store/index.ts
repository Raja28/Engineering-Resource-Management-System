import { create } from 'zustand';
import { createUserSlice, type UserSlice } from './userSlice';
// import { createSettingsSlice, SettingsSlice } from './settingsSlice';

type StoreState = UserSlice ;

export const useStore = create<StoreState>()((...a) => ({
  ...createUserSlice(...a),
//   ...createSettingsSlice(...a),
}));