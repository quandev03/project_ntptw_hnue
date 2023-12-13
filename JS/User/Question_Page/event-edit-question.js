import { create_element } from "./../../../JS/Logic/create-element.js"
import { event_change_page } from "./../../../JS/Logic/event-change-page.js"
import { get_item, set_item } from "./../../../JS/Logic/storage.js"

export const edit_question = () => {

  const data_question = get_item('data_question', 'local')

  const data_edit_question = parseInt(prompt("Nhập ID câu hỏi cẩn chỉnh sửa"))

  let edit_question_stt = null;
  if (data_edit_question != NaN) {
    data_question.map((element, index) => {
      if (data_edit_question == element[0].stt) {
        edit_question_stt = index
      }
    })
  }
  if (edit_question_stt == null) {  
    alert("Không tìm thấy câu hỏi cần sửa")
    location.reload()
  } else {
    set_item('edit_question_stt', 'local', edit_question_stt)
    event_change_page('./../../../HTML/Question_HTML/edit_question.html')
  }
  
}

