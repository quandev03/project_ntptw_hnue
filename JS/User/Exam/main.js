
// TODO: set import function

import { create_element } from "../../Logic/create-element.js";
import { create_table } from "../../Logic/create-row.js";
import { get_element_id } from "../../Logic/get_element_id.js";
import { get_item, set_item } from "../../Logic/storage.js";
import { event_change_page } from "../../Logic/event-change-page.js";
import get_random_exam from "./select-question.js";
import next_question from "./next-question.js";
import count_down from "./start_time.js";
import selection_history from "./selection_history.js";
import time_since from "./get_time.js";

// TODO: function handle listeners event
function handleLoadPage() {

  // ! get data and selected element
  const bodyPage = get_element_id("main_page")
  const dataUser = get_item('account', 'session')
  const nav_tag_2 = get_element_id("nav_tag_2")
  
  
  // ! login
  if (dataUser == null) {
    event_change_page('../../../index.html')
    console.log(a);
  } else {
    //! infor account render
    const history_exam = selection_history()
    const table = create_table(dataUser.id, dataUser.fullName, dataUser.address, dataUser.age);
    const frame = create_element("div", "frame_info");
    frame.appendChild(table);
    bodyPage.appendChild(frame);
    let fullName = create_element('h2', 'logout', '', dataUser.fullName);
    nav_tag_2.appendChild(fullName);
    console.log(history_exam.length);
    for (let index = history_exam.length - 1; index >= 0; index--) {
      console.log('a');
      const item = create_element('div', '', 'item_history')
      const point = create_element('p', '', 'point', history_exam[index].point.toFixed(1));
      if (history_exam[index].point.toFixed(1) >= 6) point.style.backgroundColor = "rgba(53, 255, 63, 1)"
      else point.style.backgroundColor = "red"
      const time = create_element('p', '', 'time_since', time_since(history_exam[index].time))
      item.appendChild(point)
      item.appendChild(time)
      get_element_id('list_history_exam').appendChild(item)

    }
  }
}

// ! logout
function logout() {
  sessionStorage.removeItem('account');
  location.reload();
}

// ! change page topic
function change_topic() {
  const dataUser = get_item('account', 'session')
  if (dataUser != null) event_change_page('./topic-page.html');
  else alert("Bạn phải đăng nhập để sử dụng dịch vụ");
}
// TODO: add event listeners
document.addEventListener("load", handleLoadPage());
document.getElementById('logout').addEventListener('click', logout);
document.getElementById('question_topic').addEventListener('click', change_topic);
document.getElementById('start').addEventListener('click', () => {
  get_element_id('button_next_question').style.display ='block';
  set_item('this_exam', 'session', get_random_exam())
  set_item('this_question', 'session', 0)
  set_item('list_answer', 'session', new Array())
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
})
document.getElementById('button_next_question').addEventListener('click', next_question)