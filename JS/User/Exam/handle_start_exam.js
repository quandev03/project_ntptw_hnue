import { create_element } from "../../Logic/create-element.js";
import { get_element_id } from "../../Logic/get_element_id.js";
import { get_item, set_item } from "../../Logic/storage.js";
import get_random_exam from "./select-question.js";
import count_down from "./start_time.js";

export const handle_start_exam = () => {
  get_element_id('button_next_question').style.display ='block';
  set_item('this_exam', 'session', get_random_exam())
  set_item('this_question', 'session', 0)
  set_item('list_answer', 'session', new Array())
  console.log('active');
  console.log(get_item('this_exam', 'session').length);
  if (get_item('this_exam', 'session').length > 0) {
  const this_question = get_item('this_exam', 'session')[get_item('this_question', 'session')][0]
  console.log(get_item('this_exam', 'session'));
  console.log(get_item('this_exam', 'session')[get_item('this_question', 'session')]);
    count_down();
    get_element_id('question').innerText = this_question.content
    if (this_question.image) {
      const img = get_element_id('img_question');
      img.src = this_question.image
      img.style.display = 'block'
    }
    else get_element_id('img_question').style.display = 'none';
    const answers = get_element_id('list_answer')

    if (
      this_question.kind_of_question == 'only optional'
    ) {
      let quantity = get_item('this_exam', 'session')[get_item('this_question', 'session')][1].length
      const answers_list = create_element('div', 'answers_lists')
      for (let index = 0; index < quantity; index++) {
        const answers = create_element('div', '', 'answer')
        const radio = create_element('input', `radio${index}`, 'radio')
        radio.type = 'radio'
        radio.name = 'radio'
        const p = create_element('p', `answer_option_${index}`, 'answer_option')
        p.innerText = get_item('this_exam', 'session')[get_item('this_question', 'session')][1][index].answer
        answers.appendChild(radio)
        answers.appendChild(p)
        answers_list.appendChild(answers)
      }
      answers.appendChild(answers_list)
    }
    else if (
      this_question.kind_of_question == 'multi optional'
    ) {
      let quantity = get_item('this_exam', 'session')[get_item('this_question', 'session')][1].length
      const answers_list = create_element('div', 'answers_lists')
      for (let index = 0; index < quantity; index++) {
        const answers = create_element('div', '', 'answer')
        const checkbox = create_element('input', `checkbox${index}`, 'radio')
        checkbox.type = 'checkbox'
        const p = create_element('p', `answer_option_${index}`, 'answer_option')
        p.innerText = get_item('this_exam', 'session')[get_item('this_question', 'session')][1][index].answer
        answers.appendChild(checkbox)
        answers.appendChild(p)
        answers_list.appendChild(answers)
      }
      answers.appendChild(answers_list)
    }
    else {
      const input_answer = create_element('input', 'input_answer');
      const answers_list = create_element('div', 'answers_lists')
      answers_list.appendChild(input_answer)
      answers.appendChild(answers_list)
    }

    get_element_id('button_this_question').innerText = `Câu ${get_item('this_question', 'session') + 1}`
  }
  else alert("Xin lỗi, không có câu hỏi nào được ghi nhận")
}