import { event_change_page } from "../../Logic/event-change-page.js"
import { get_element_id } from "../../Logic/get_element_id.js"
import { get_item, set_item } from "../../Logic/storage.js"
import { check_already_accounted } from "./check-account.js"

export const handle_signup = () => {
  // ! get value to sign up from input
  const username = get_element_id('username_input').value
  const full_name = get_element_id('fullName_input').value
  const age = get_element_id('age_input').value
  const address = get_element_id('address_input').value
  const password_input = get_element_id('password_input').value
  const confirm_password_input = get_element_id('password_confirm_input').value


  // ! check password

  if (password_input === confirm_password_input ) {
    const new_account ={
      id: create_id(),
      username: username,
      full_name: full_name,
      age: age,
      address: address,
      password: password_input
    }
    let accounts = get_item('accounts', 'local')

    if (accounts === null) {
      accounts = [];
      
    }
    console.log(accounts);
    if (check_already_accounted(accounts, username) === false) {
      accounts.push(new_account)
      set_item('accounts', 'local', accounts)
      event_change_page('http://127.0.0.1:5500/HTML/Login_HTML/login_user.html')
    }
    else {
      alert( ' account already exists')
    }
  } else {
    console.log('password is not valid');
  }
}
