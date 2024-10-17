import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/usersSlice";
import { albumsApi } from "./apis/albumsApi";
import { photosApi } from "./apis/photosApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    users: userReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(photosApi.middleware)
      .concat(albumsApi.middleware)
  }
});

setupListeners(store.dispatch)

export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';
export { 
  useFetchAlbumsQuery, 
  useAddAlbumMutation, 
  useRemoveAlbumMutation 
} from './apis/albumsApi';

export {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation
} from './apis/photosApi';

