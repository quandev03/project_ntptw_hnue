import { event_change_page } from "http://127.0.0.1:5500/JS/Logic/event-change-page.js";
import { get_element_id } from "http://127.0.0.1:5500/JS/Logic/get_element_id.js";
import { get_item, set_item } from "http://127.0.0.1:5500/JS/Logic/storage.js";

export const handle_submit = () => {
  // ! fetch data
  const data_question = get_item('data_question', 'local');
  const edit_question_stt = get_item('edit_question_stt', 'local');
  const question_edit = data_question[edit_question_stt];
  let info_question = question_edit[0]; 
  let info_answer = question_edit[1]; 

  let number_of_response = info_answer.length;
  const kind_of_question = get_element_id('kind_of_question').value;
  let list_answer;
  const answers = get_item('answers', 'local');
  switch (kind_of_question) {
    
    case 'multi optional':
      let responses_checkbox = []
      for (let i = 0; i < number_of_response; i++) { 
        let answer = get_element_id(`answer_${i}`).value;
        let isTrue = get_element_id(`checkbox_${i}`).checked;
        let response = {
          answer: answer,
          isTrue: isTrue
        };
        responses_checkbox.push(response);
      }
      list_answer = responses_checkbox;
      break;
    
    case 'only optional':
      let responses_radio = [];
      for (let i = 0; i < number_of_response; i++) {
        let answer = get_element_id(`answer_${i}`).value;
        let isTrue = get_element_id(`radio_${i}`).checked
        let response = {
          answer: answer,
          isTrue: isTrue
        }
        responses_radio.push(response);
      }
      list_answer = responses_radio;
      break;
    
    case 'essay':
      const answer = [{
        answer: get_element_id('list_answer').value,
        isTrue: true
      }]
      list_answer = answer;
      break;
    
    default:
      alert("Error: Unknown");
  }
  const content = get_element_id('question_input').value;
  
  info_question.content = content;
  info_answer = list_answer;
  const data_upload = [
    info_question,
    info_answer
  ]
  data_question[edit_question_stt] = data_upload;
  set_item('data_question', 'local', data_question);
  event_change_page('http://127.0.0.1:5500/HTML/Question_HTML/question_user.html');
}