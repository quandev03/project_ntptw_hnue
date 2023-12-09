import { create_id } from "../../Logic/create-id.js"
import { event_change_page } from "../../Logic/event-change-page.js"
import { get_element_id } from "../../Logic/get_element_id.js"
import { reset_info } from "../../Logic/reset-info.js"
import { get_item, set_item } from "../../Logic/storage.js"
import { check_already_accounted } from "./check-account.js"

export const handle_signup = () => {
  // ! get value to sign up from input
  const username = get_element_id('username_input').value
  const full_name = get_element_id('fullName_input').value
  const age = get_element_id('age_input').value
  const address = get_element_id('address_input').value
  const password = get_element_id('password_input').value
  const confirm_password = get_element_id('password_confirm_input').value

  console.log(username, full_name, age, address, password, confirm_password);
  // ! check password
  let accounts = get_item('accounts', 'local')
  if (!accounts) accounts = new Array();
  if (check_already_accounted(accounts, username) === false) {

    if (username.length >= 3) {
      if (full_name != '') {
        if (age < 100) {
          if (address) {
            if (password === confirm_password && password != '') {
              if (password.length >= 8) {
                console.log('success');
                const new_account = {
                  id: create_id(),
                  username: username,
                  full_name: full_name,
                  age: age,
                  address: address,
                  password: password
                }
                console.log(accounts);
                if (!accounts) accounts = new Array();
                accounts.push(new_account)
                console.log(accounts);
                set_item('accounts', 'local', accounts)
                event_change_page('http://127.0.0.1:5500/HTML/Login_HTML/login_user.html')
              }
              else {
                alert('Mật khẩu phải lớn hơn 8 kí tự!');
              }
            }
            else {
              alert('Hai mật khẩu không giống nhau');
            }
          }
          else {
            alert('Địa chỉ không được đễ trống');
          }
        }
        else {
          alert('Bạn chắc chưa :)))')
        }
      }
      else {
        alert("Họ và tên không được bỏ trống");
      }
    }
    else {
      alert("Tền đăng nhập không được bỏ trống và phải lớn hơn 3 kí tự");
      reset_info();
    }
  }
  else {
    alert('Tài khoản đã tồn tại');
    reset_info();
  }
}
