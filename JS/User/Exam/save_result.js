import { get_item, set_item } from "../../Logic/storage.js";
import handle_submit from "./handle_submit.js";

export default function save_result() {
  clearInterval(get_item('setInterval', 'session'));
  let history_exam = get_item('history_exam', 'local');
  if (!history_exam) history_exam = new Array();
  const dataUser = get_item('account', 'session')
  const history = {
    time: Date.now(),
    point: handle_submit(),
    id_user: dataUser.id
  }
  history_exam.push(history);
  alert(`Điểm của bạn là: ${history.point}`);
  set_item('history_exam', 'local', history_exam);
  location.reload();
}