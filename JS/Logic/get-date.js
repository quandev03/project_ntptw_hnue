export const get_date = (input_date) => {
  const date = new Date(input_date);
  return `${date.getHours()}:${date.getMinutes()}  ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}