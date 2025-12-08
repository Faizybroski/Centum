import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserDTO } from '@/dto'
import { TRoles } from '@/types'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    role: '' as TRoles,
    userProfile: {} as UserDTO,
    subscribeToNewsletter: false,
  },
  reducers: {
    updateUser: (state, action: PayloadAction<UserDTO>) => {
      state.userProfile = action.payload
      state.isLoggedIn = true
      state.role = action.payload.role as TRoles
      state.subscribeToNewsletter = action.payload.is_newsletter_subscribed
    },
  },
})

export const { updateUser } = userSlice.actions
