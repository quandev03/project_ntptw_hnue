import { create_element } from "../../Logic/create-element.js"
import { event_change_page } from "../../Logic/event-change-page.js"
import { get_item, set_item } from "../../Logic/storage.js"

export const edit_question = () => {

  // ! create element and set attribute
  let change = create_element('a')
  change.setAttribute('href', 'http://127.0.0.1:5500/HTML/Question_HTML/edit_question.html')
  change.setAttribute('hidden', true)
  change.appendChild(document.getElementById('main_page'))

  // ! create event click to navigate to http://127.0.

  const data_question = get_item('data_question', 'local')

  const data_edit_question = parseInt(prompt("Enter ordinal number wanted to edit"))

  let edit_question_stt;
  data_question.map((element, index) => {
    if (data_edit_question === element[0].stt) {
      edit_question_stt = index
    }
  })
  if (edit_question_stt === null) {
    alert("Can't find question")
    event_change_page('http://127.0.0.1:5500/HTML/Question_HTML/question_user.html')
  } else {
    set_item('edit_question_stt', 'local', edit_question_stt)
    alert("Edit question")
    event_change_page('http://127.0.0.1:5500/HTML/Question_HTML/edit_question.html')
  }
  
}
