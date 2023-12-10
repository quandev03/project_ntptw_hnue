import { get_item, set_item } from "./storage.js";

export const get_image = () => {

  const file = document.getElementById('get_image').files
  var reader = new FileReader();
  reader.onload = function (e) {
    var imageData = e.target.result;
    set_item('imageData','session', imageData);
  };
  reader.readAsDataURL(file[0]);
  return get_item('imageData', 'session')
}