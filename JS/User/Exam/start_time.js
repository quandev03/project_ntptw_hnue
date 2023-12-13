import { event_change_page } from "../../Logic/event-change-page.js";
import { get_element_id } from "../../Logic/get_element_id.js";
import { set_item } from "../../Logic/storage.js";
import handle_submit from "./handle_submit.js";
import next_question from "./next-question.js";
import save_result from "./save_result.js";

export default function count_down() {
  const count_down = get_element_id('count_down')
  count_down.style.display = 'flex';
  let time = 60;
  const set_time = setInterval(() => { 
    time--;
    count_down.innerText = time
    if (time == 0) {
      clearInterval(set_time)
      alert("Hết giờ")
      save_result()
      // setInterval(() => {event_change_page('./../../../index.html') },3000)
    }
  }, 1000)
  set_item('setInterval', 'session', set_time)
}
