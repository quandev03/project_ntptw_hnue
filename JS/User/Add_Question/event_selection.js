import { create_element } from "../../Logic/create-element.js"
import { get_element_id } from "../../Logic/get_element_id.js"
import { set_item } from "../../Logic/storage.js"

export const event_selection = () => {
  const data = get_element_id('kind_of_question').value
  const answers = get_element_id('answers')
  console.log(answers);

  if (data != 'select') {
    get_element_id('kind_of_question').setAttribute('disabled', true) // ? xét trạng thái ẩn
  }
  // ! tạo form nhập câu trả lời
  switch (data) {
    case 'multi optional':
      const number_of_responses = prompt("Number of responses:  ") // ? nhập số câu trả lời
      set_item('number_of_responses', 'session', number_of_responses)
      for (let i = 0; i < number_of_responses; i++) {   // ? tạo câu trả lời
        const form_answer = create_element('div', '', 'form_answer') // ? tao form câu trả lời
        const checkbox = create_element('input', `checkbox_${i}`) //? tạo ô nhập câu hỏi
        checkbox.setAttribute("type", "checkbox") // ? 
        checkbox.setAttribute('name', 'checkbox')
        checkbox.setAttribute("value", `${i}`, 'input_true')
        const answer = create_element('input', `answer_${i}`, 'input_answer')
        answer.setAttribute('placeholder', `Nhập câu trả lời thứ ${i+1}`)
        form_answer.appendChild(checkbox)
        form_answer.appendChild(answer)
        answers.appendChild(form_answer)
      }
      break;
    case 'only optional':
      const number_of_response = prompt("Number of responses:  ")
      sessionStorage.setItem('number_of_responses', number_of_response)

      for (let i = 0; i < number_of_response; i++) {
        const form_answer = create_element('div','' ,'form_answer')
        const radio = create_element('input', `radio_${i}`, 'input_true')
        radio.setAttribute("type", "radio")
        radio.setAttribute('name', 'radio')
        radio.setAttribute('value', `${i}`)
        const answer = create_element('input', `answer_${i}`, 'input_answer')
        answer.setAttribute('placeholder', `Nhập câu trả lời thứ ${i+1}`)
        form_answer.appendChild(radio)
        form_answer.appendChild(answer)
        answers.appendChild(form_answer)
      }
      break;

    default:
      const answer = create_element('input', 'answer-essay')
      answers.appendChild(answer)
  }
}