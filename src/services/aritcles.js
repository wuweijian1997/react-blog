import request from '../utils/request'

export async function addArticleApi (payload) {
  return request('/api/article/add', {
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
  return request('/api/article/get', {
    method: 'POST',
    body: payload,
  });
}

export async function searchArticle(payload) {
  return request('/api/article/search', {
    method: 'POST',
    body:  payload,
  });
}




