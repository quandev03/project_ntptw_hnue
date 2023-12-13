import { create_id } from "./../../../JS/Logic/create-id.js";
import { event_change_page } from "./../../../JS/Logic/event-change-page.js";
import { get_element_id } from "./../../../JS/Logic/get_element_id.js";
import { get_item, set_item } from "./../../../JS/Logic/storage.js";
import { get_image } from "../../Logic/get-image.js";

export const handle_submit = () => {
  const kind_of_question = get_element_id('kind_of_question').value;
  let list_answer;
  const user = get_item('account', 'session');
  let number_of_response;
  switch (kind_of_question) {

    case 'multi optional':
      number_of_response = get_item('number_of_responses', 'session');
      let responses_checkbox = [];
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
      number_of_response = get_item('number_of_responses', 'session');
      let responses_radio = [];
      for (let i = 0; i < number_of_response; i++) {
        let answer = get_element_id(`answer_${i}`).value;
        let isTrue = get_element_id(`radio_${i}`).checked;
        let response = {
          answer: answer,
          isTrue: isTrue
        };
        responses_radio.push(response);
      }
      list_answer = responses_radio;
      break;
    
    case 'essay':
      const answer = [{
        answer: get_element_id('answer-essay').value,
        isTrue: true
      }];
      list_answer = answer;
      break;
    
    default:
      alert("Error: Unknown");
  }
  
  const time_sent_answer = new Date(Date.now());
  let data_question = get_item('data_question', 'local');
  if (data_question === null) {
    data_question = [];
  }
  let status = "waiting for approval";
  let stt = create_id();
  let content_answer = get_element_id("question_input").value;
  let data_image = null;
  if (get_element_id('get_image').value) data_image = get_image()
  const data_sent = [
    {
      stt: stt,
      id_user: user.id,
      content: content_answer,
      time_sent_answer: time_sent_answer,
      status: status,
      kind_of_question: kind_of_question,
      image: data_image
    },
    list_answer
  ];
  data_question.push(data_sent);
  if (
    data_sent[0].kind_of_question == "essay" ||
    data_sent[0].kind_of_question == 'multi optional' ||
    data_sent[0].kind_of_question == "only optional"
  ) {
    set_item('data_question', 'local', data_question);
  }
  event_change_page('./../../../HTML/Question_HTML/question_user.html');
}
