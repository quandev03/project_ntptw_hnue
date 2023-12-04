export const create_icon = (
  class_name,
  name_icon,
  size, 
  color
) => {
  const icon = document.createElement('i');
  icon.className = class_name;
  icon.innerText = name_icon;
  icon.style = `font-size: ${size}; color: ${color};`;
  return icon;
}