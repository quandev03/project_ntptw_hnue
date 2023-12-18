import { get_item, set_item } from "./../../../JS/Logic/storage.js";

export const delete_question = () => {
  const data_question = get_item('data_question', 'local');
  const data_delete_question = prompt("Nhập ID câu hỏi");
  const data = data_question.filter(element => element[0].stt != data_delete_question)

  if (data_delete_question !== '') { 
    if (data_question.length !== data.length) {
      set_item('data_question', 'local', data);
      location.reload();
    }
    else {
      alert("Không tìm thấy câu hỏi");
    }
  }
  else {
    alert("Lỗi");
  }
}