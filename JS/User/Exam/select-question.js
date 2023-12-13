import { get_item } from "../../Logic/storage.js";

function getRandomNumber(x) {
  return Math.floor(Math.random() * (x + 1));
}

export default function get_random_exam() {
  const data_question = get_item('data_question', 'local');
  const data_user = get_item('account', 'session');
  let data_question_selected = data_question.filter(question => question[0].id_user !== data_user.id);
  console.log(data_question_selected);
  data_question_selected = data_question_selected.filter(question => question != null)
  console.log(data_question_selected);
  data_question_selected = data_question_selected.filter(question => question[0].status === 'approvals')
  console.log(data_question_selected);
  if (data_question_selected.length >= 5) {
    let data_question_exam = new Array();
    for (let i = 0; i < 5; i++) {
      const question_this = data_question_selected[getRandomNumber(data_question_selected.length)]
      console.log(question_this);
      if(question_this) data_question_exam.push(question_this)
      data_question_selected = data_question_selected.filter(question => question != question_this)
    }
    data_question_selected.filter(question => question != undefined)
    console.log(data_question_selected);
    return data_question_selected;
  }
  else {
    data_question_selected.filter(question => question != undefined)
    return data_question_selected;
  }
}