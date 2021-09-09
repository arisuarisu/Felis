import { configureStore } from '@reduxjs/toolkit';
import rolechoiceReducer from  '../features/rolechoice/rolechoiceSlice';
import catshopReducer from  '../features/catshop/catshopSlice';
import accomodationReducer from  '../features/accomodation/accomodationSlice';
import catfriendsReducer from  '../features/catfriends/catfriendsSlice';

export default configureStore({
  reducer: {
    rolechoice: rolechoiceReducer,
    catshop: catshopReducer,
    accomodation: accomodationReducer,
    catfriends: catfriendsReducer
  },
  devTools: true
});
