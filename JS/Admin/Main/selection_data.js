import { get_item, set_item } from "http://127.0.0.1:5500/JS/Logic/storage.js"

const selection_data_approvals = (select) => {
  const data = get_item('data_question', 'local') 
  const select_data = data.filter(element => element[0].status === 'approvals')
  if (select_data.length == 0) { 
    sessionStorage.removeItem('data_selection');
    set_item('data_selection', 'session', [])
  }
  else set_item('data_selection', 'session', select_data);
  location.reload();
}

const selection_data_disapprovals = () => {
  const data = get_item('data_question', 'local') 
  const data_select = data.filter(element => element[0].status === 'disapprovals')
  if (data_select.length == 0) { 
    sessionStorage.removeItem('data_selection');
    set_item('data_selection', 'session', [])
  }
  else set_item('data_selection', 'session', data_select);
  location.reload();
}
const selection_data_await = () => {
  const data = get_item('data_question', 'local');
  const selection_data = data.filter(element => element[0].status === 'waiting for approval');
  console.log(selection_data);
  if (selection_data.length == 0) { 
    sessionStorage.removeItem('data_selection');
    set_item('data_selection', 'session', [])
  }
  else set_item('data_selection', 'session', selection_data);
  location.reload();
}
const selection_data_all = () => {
  const data = get_item('data_question', 'local');
  set_item('data_selection', 'session', data);
  location.reload();
}

export {selection_data_approvals, selection_data_all, selection_data_disapprovals, selection_data_await}