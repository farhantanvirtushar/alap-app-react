import { createSlice} from '@reduxjs/toolkit'
import { StoreModel } from '../models/redux/StoreModel'

var initState: StoreModel = {
    inboxItems:[]
}
export const rootReducer = createSlice({
    name: 'rootReducer',
    initialState: initState,
    reducers: {
      setInbox: (state,action) => {
        state.inboxItems = action.payload
      },

    }
  })

export const {setInbox} = rootReducer.actions