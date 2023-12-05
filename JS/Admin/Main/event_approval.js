import { get_item, set_item } from "../../Logic/storage.js";

export const event_approval = () => {
  const data = get_item('data_question', 'local');
  const stt_question = parseInt(prompt("Enter ordinal number approvals request:"))

  let approvals_question_stt;
  data.map((element, index) => {
    if (stt_question === element[0].stt) {
      approvals_question_stt = index
    }
  })

  let data_question = data[approvals_question_stt]
  data_question[0].status = 'approvals'
  data[approvals_question_stt] = data_question
  set_item('data_question', 'local', data) 
  location.reload()
}