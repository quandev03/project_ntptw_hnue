import { get_item } from "../../Logic/storage.js";

export default function selection_history() {
  const dataUser = get_item('account', 'session')
  let history_exam = get_item('history_exam', 'local')
  if (!history_exam) history_exam = new Array();
  const history_user = history_exam.filter(history => history.id_user === dataUser.id)
  return history_user;
}