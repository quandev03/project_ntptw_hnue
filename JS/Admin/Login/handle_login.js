import { event_change_page } from "../../Logic/event-change-page.js"
import { get_element_id } from "../../Logic/get_element_id.js"
import { get_item, set_item } from "../../Logic/storage.js"
import { selection_data_all } from "../Main/selection_data.js"

export const handle_login = () => {
  // ! get data from local storage
  const data_account = get_item('admin_account', 'local')
  // ! get data input
  const username = get_element_id('input_username').value
  const password = get_element_id('password_input').value


  if (username == data_account.username && password == data_account.password) { // check tải khoản và mật khẩu admin
    set_item('status_login', 'session', { admin_login: true })
    // sessionStorage.setItem(, JSON.stringify({ admin_login: true })); // nêu đúng sẽ đặt trạng thái đăng nhâp kaf true
    selection_data_all()
    event_change_page('http://127.0.0.1:5500/HTML/admin_main.html')
  }else { // nếu sau sẽ đặt trạng thái là false
    set_item('admin_login', 'session', { admin_login: false })
    alert("Login Failed");
  }

  
}