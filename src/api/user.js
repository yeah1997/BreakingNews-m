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
        url: `/v1_0/user`,
        method: 'GET',
    })
}