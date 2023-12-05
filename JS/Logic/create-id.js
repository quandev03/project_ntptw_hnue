export const create_id = () => {
  let id =''
  for (let i = 0; i < 8; i++) {
    let element = (Math.random() * 10).toFixed(0)
    element == 10 ? element = 0 : element
    id += element
  }
  return id;
}