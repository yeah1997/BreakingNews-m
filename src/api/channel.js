import request from '@/utils/request'

export const getAllChannels = ()=> {
    return request({
        url: '/v1_0/channels',
        method: 'GET'
    })
}

// add User Channel
export const addUserChannel = (channel)=> {
    return request({
        url: '/v1_0/user/channels',
        method: 'PATCH',
        data: {
            channels: [channel]
        }
    })
}

// Delete User Channel
export const deleteUserChannel = (channelID)=> {
    return request({
        url: `/v1_0/user/channels/${channelID}`,
        method: 'DELETE',
    })
}