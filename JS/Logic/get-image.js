import { get_item, set_item } from "./storage.js";

export const get_image = () => {

  const file = document.getElementById('get_image').files
  var reader = new FileReader();
  let data_image
  // Đọc dữ liệu ảnh và lưu vào localStorage
  reader.onload = function (e) {
    var imageData = e.target.result;
    // localStorage.setItem('savedImage', imageData);
    set_item('imageData','session', imageData);
  };

  // Đọc dữ liệu của tệp tin ảnh
  reader.readAsDataURL(file[0]);
  return get_item('imageData', 'session')
}