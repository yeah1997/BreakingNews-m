import request from '@/utils/request'

// get Search Suggestions
export const getSearchSuggestions = (q) => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

// get Search Result
export const getSearchResult = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params,
  })
}

