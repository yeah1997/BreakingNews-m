import request from '@/utils/request'

// Get Comment
export const getComment = (params) => {
    return request({
        method: 'GET',
        url: '/v1_0/comments',
        params
    })
}

// Add Like
export const addCommentLike = (target) => {
    return request({
        method: 'POST',
        url: '/v1_0/comment/likings',
        data: {
            target
        }
    })
}

// Delete Comment
export const deleteCommentLike = (target) => {
    return request({
        method: 'DELETE',
        url: `/v1_0/comment/likings/${target}`,
    })
}

// Public Comment 
export const addComment = (data) => {
    return request({
        method: 'POST',
        url: '/v1_0/comments',
        data
    })
}