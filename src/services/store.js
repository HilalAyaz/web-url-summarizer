import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { articleApi } from './article'

export const store = configureStore({
  reducer: {
    [articleApi.reducerPath]: articleApi.reducer
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(articleApi.middleware)
  }
})


setupListeners(store.dispatch)
