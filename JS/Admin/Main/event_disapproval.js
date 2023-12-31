import { get_item, set_item } from "./../../../JS/Logic/storage.js";
import { selection_data_all } from "./../../../JS/Admin/Main/selection_data.js";

export const event_disapproval = () =>{
  let approvals_question_stt;
  const data = get_item('data_question', 'local')
  const stt_question = parseInt(prompt("Nhập ID câu hỏi để từ chối duyệt"))
  data.map((element, index) => {
    if (stt_question == element[0].stt) {
      approvals_question_stt = index
    }
  })
  const this_question = data.filter(element=> element[0].stt == stt_question)
  let data_question = this_question[0]
  data_question[0].status = 'disapprovals'
  data[approvals_question_stt] = data_question
  set_item('data_question', 'local', data) 
  selection_data_all()
}
