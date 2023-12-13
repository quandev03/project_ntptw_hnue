import { create_element } from "../../Logic/create-element.js";
import { get_element_id } from "../../Logic/get_element_id.js";
import { get_item, set_item } from "../../Logic/storage.js";
import handle_submit from "./handle_submit.js";
import save_result from "./save_result.js";
function get_answer() {
  const this_question = get_item('this_exam', 'session')[get_item('this_question', 'session')];
  let answer_choose = new Array()
  if (
    this_question[0].kind_of_question == 'only optional'
  ) {
    let quantity = this_question[1].length
    for (let index = 0; index < quantity; index++) {
      if (get_element_id(`radio${index}`).checked) {
        answer_choose.push(get_element_id(`answer_option_${index}`).innerText);
      }
    }
  }
  else if (
    this_question[0].kind_of_question == 'multi optional'
  ) {
    let quantity = this_question[1].length
    for (let index = 0; index < quantity; index++) {
      if (get_element_id(`checkbox${index}`).checked) {
        answer_choose.push(get_element_id(`answer_option_${index}`).innerText);
      }
    }
  }
  else {
    const answers_essay = get_element_id('input_answer');
    console.log(answers_essay.value);
    answer_choose.push(answers_essay.value);
  }
  return answer_choose
}
export default function next_question() {
  let answer_of_exam = get_item('list_answer', 'session');
  console.log(answer_of_exam);
  if (!answer_of_exam) answer_of_exam = new Array()
  const pre_question = get_item('this_exam', 'session')[get_item('this_question', 'session')];
  const answer_of_pre_question = get_answer()
  console.log(answer_of_pre_question);
  if (answer_of_pre_question[0]) {
    const answer_this_question = [pre_question[0].stt,answer_of_pre_question]
    answer_of_exam.push(answer_this_question)
    console.log(answer_of_exam);
  set_item('list_answer', 'session', answer_of_exam)
  const this_question = get_item('this_question', 'session') + 1;
  const this_exam = get_item('this_exam', 'session')
  if (this_exam.length-1>get_item('this_question', 'session')) {
    const reset_element = get_element_id('answers_lists')
    if (reset_element) {
      reset_element.parentNode.removeChild(reset_element);
    }
    get_element_id('question').innerText = this_exam[this_question][0].content;
    const answers = get_element_id('list_answer')
    set_item('this_question', 'session', this_question)
    
  
    if (get_item('this_exam', 'session')[get_item('this_question', 'session')][0].image) {
      const img = get_element_id('img_question');
      img.src = this_question.image
      img.style.display = 'block'
    }
    else get_element_id('img_question').style.display = 'none';
    if (
      get_item('this_exam', 'session')[get_item('this_question', 'session')][0].kind_of_question == 'only optional'
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
      get_item('this_exam', 'session')[get_item('this_question', 'session')][0].kind_of_question == 'multi optional'
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
  else {
    const response = confirm("Bạn có muốn nộp bài chưa :) !")
    if (!response) alert("Nộp mẹ đi, hết bố rồi còn đâu :)))");
    else {
      save_result()
    }
  }

  }
  else {
    alert('Bạn chưa trả lời câu hỏi này')
  }

}