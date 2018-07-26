import request from '../utils/request'

export async function addArticleApi (payload) {
  return request('/api/admin/article/add', {
    method: 'POST',
    body: payload,
  })
}

export const fetchLatestApi =  (payload) =>
  request('/api/admin/article/latest', {
    method: 'POST',
    body: payload,
  })

export async function fetchArticleByIdApi(payload) {
  return request('/api/admin/article/get', {
    method: 'POST',
    body: payload,
  });
}

export async function updateArticleByIdApi(payload) {
  return request('/api/admin/article/update', {
    method: 'POST',
    body: payload,
  });
}

export async function deleteArticleByIdApi(payload) {
  return request('/api/admin/article/delete', {
    method: 'POST',
    body:  payload,
  });
}

export async function recoverArticleByIdApi(payload) {
  return request('/api/admin/article/recover', {
    method: 'POST',
    body:  payload,
  });
}

export async function fetchDeleteArticlesApi(payload) {
  return request('/api/admin/article/list_delete_blog', {
    method: 'POST',
    body: payload,
  });
}



