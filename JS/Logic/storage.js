export const get_item = (
  key,
  type
) => {
  if (type === 'local') {
    return JSON.parse(localStorage.getItem(key));
  }
  else if (type === 'session') {
    return JSON.parse(sessionStorage.getItem(key));
  }
}

export const set_item = (
  key,
  type,
  value
) => { 
  if (type === 'local') {
    return localStorage.setItem(key, JSON.stringify(value));
  }
  else if (type === 'session') {
    return sessionStorage.setItem(key, JSON.stringify(value));
  }
}