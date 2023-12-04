import { get_item, set_item } from "../../Logic/storage.js";

export const delete_question = () => {
  const data_question = get_item('data_question', 'local')


  const data_delete_question = parseInt(prompt("Enter ordinal number wanted to delete"))

  let delete_question_stt;
  data_question.map((element, index) => {
    if (data_delete_question === element[0].stt) {
      delete_question_stt = index
    }
  })
  if (delete_question_stt === null) {
    alert("Can't find question")
  } else {

    data_question.splice(delete_question_stt, data_delete_question + 1)

    set_item('data_question', 'local', data_question)
  }
  location.reload()
}
