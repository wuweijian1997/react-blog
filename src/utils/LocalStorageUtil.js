// use localStorage to store the authority info, which might be sent from server in actual project.
export function getUser() {
  let user = localStorage.getItem('antd-pro-blog-user');
  if (user == 'undefined') {
    return null;
  }
  return JSON.parse(user);
}

export function setUser(user) {
  localStorage.setItem('antd-pro-blog-user',JSON.stringify(user) );
}

export function delUser() {
  localStorage.removeItem('antd-pro-blog-user');
}
