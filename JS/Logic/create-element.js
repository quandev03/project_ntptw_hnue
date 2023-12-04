export const create_element = (
  type,
  id,
  class_name,
  text
) => {
  const element = document.createElement(type);
  if(id) element.setAttribute("id", id);
  if(class_name) element.setAttribute("class", class_name);
  if (text) element.innerText = text;
  return element;
}