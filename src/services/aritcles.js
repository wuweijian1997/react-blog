import request from '../utils/request'

export async function addArticleApi (payload) {
  return request('/api/article', {
    method: 'POST',
    body: payload,
  })
}

export const fetchLatestApi =  (payload) =>
  request('/api/article/latest', {
    method: 'POST',
    body: payload,
  })

export async function fetchArticleByIdApi(payload) {
  return request('/api/article/' + payload.id, {
    method: 'GET',
  });
}

export async function searchArticle(payload) {
  return request('/api/article/search', {
    method: 'POST',
    body:  payload,
  });
}

export async function changeBlogLikeStatus(payload) {
    return request('/api/blog_like', {
        method: 'POST',
        body: payload
    });
}

export async function changeBlogStarStatus(payload) {
    return request('/api/blog_star', {
        method: 'POST',
        body: payload
    });
}





