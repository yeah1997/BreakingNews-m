import request from '@/utils/request'

// login
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

// Send Verification Code
export const sendSms = mobile => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`,
    method: 'GET'
  })
}

// Get User Info
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    method: 'GET'
  })
}

// Get User Channel List
export const getUserChannels = () => {
  return request({
    url: '/v1_0/user/channels',
    method: 'GET'
  })
}

// Follow User
export const addFollow = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

// Follow User
export const deleteFollow = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}

// Ger User Profile
export const getUserProfile = () => {
  return request({
    url: '/v1_0/user/profile',
    method: 'GET',
  })
}

// Update User Profile
export const updateUserProfile = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

// Update User Photo
export const updateUserPhoto = (data) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data
  })
}
