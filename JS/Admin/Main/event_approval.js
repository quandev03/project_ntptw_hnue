import { get_item, set_item } from "./../../../JS/Logic/storage.js";
import { selection_data_all } from "./selection_data.js";

export const event_approval = () => {
  const data = get_item('data_question', 'local');
  const stt_question = parseInt(prompt("Nhập ID câu hỏi để duyệt"))
  let approvals_question_stt;
  data.map((element, index) => {
    if (stt_question == element[0].stt) {
      approvals_question_stt = index
    }
  })
  let data_question = data[approvals_question_stt]
  data_question[0].status = 'approvals'
  data[approvals_question_stt] = data_question
  set_item('data_question', 'local', data) 
  selection_data_all()
}