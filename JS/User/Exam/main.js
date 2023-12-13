
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
import {handle_start_exam} from "./handle_start_exam.js";

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
document.getElementById('start').addEventListener('click', handle_start_exam)
document.getElementById('button_next_question').addEventListener('click', next_question)