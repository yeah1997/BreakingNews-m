import request from '@/utils/request'

// Get Main Articles list
export const getArticles = (params) => {
  return request({
    url: '/v1_0/articles',
    method: 'GET',
    params
  })
}

// Get A Aricles By Id
export const getArticleById = (art_id) => {
  return request({
    url: `/v1_0/articles/${art_id}`,
    method: 'GET',
  })
}

// Add Collect
export const addCollect = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    body: {
      target
    }
  })
}

// Delete Collect
export const deleteCollect = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE',
  })
}

// Add Like
export const addLike = (target) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    body: {
      target
    }
  })
}

// Delete Like
export const deleteLike = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE',
  })
}