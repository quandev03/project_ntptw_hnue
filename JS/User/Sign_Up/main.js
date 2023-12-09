// TODO: create function handling event

import { create_element } from "http://127.0.0.1:5500/JS/Logic/create-element.js"
import { create_id } from "http://127.0.0.1:5500/JS/Logic/create-id.js"
import { event_change_page } from "http://127.0.0.1:5500/JS/Logic/event-change-page.js"
import { get_element_id } from "http://127.0.0.1:5500/JS/Logic/get_element_id.js"
import { get_item, set_item } from "http://127.0.0.1:5500/JS/Logic/storage.js"
import { create_icon} from "http://127.0.0.1:5500/JS/Logic/create-icon.js"
import { handle_signup } from "http://127.0.0.1:5500/JS/User/Sign_Up/handle-submit.js"

function handle_load_page() {
  const bodyPage = get_element_id("main_page")

  //! create form
  const form = create_element('div', 'form_sign_up')

  // !  code for page loading

  const title = create_element("h1", 'title_signup', '', "Đăng kí")
  form.appendChild(title)
  

  // ? code for enter input information username
  const username_input = create_element("input", 'username_input')
  username_input.setAttribute("placeholder", "Tên đăng nhập")

  // ? code for enter input information full name
  const fullName_input = create_element("input", 'fullName_input')
  fullName_input.setAttribute("placeholder", "Nhập họ tên")
  // ? code for enter input information address
  const address_input = create_element("input", "address_input")
  address_input.setAttribute("placeholder", "Nhập địa chỉ")
  // ? code for enter input information age
  const age_input = create_element("input", 'age_input')
  age_input.setAttribute("placeholder", "Nhập tuổi")
  age_input.setAttribute("type", "number")
  age_input.setAttribute("min", '0')
  // ? code for enter input information password
  const password_input = create_element("input", 'password_input')
  password_input.setAttribute("placeholder", "Nhập mật khẩu")
  password_input.setAttribute("type", 'password')
  // ? code for enter input information password confirm
  const password_confirm_input = create_element("input", "password_confirm_input")
  password_confirm_input.setAttribute("placeholder", "Nhập lại mật khẩu")
  password_confirm_input.setAttribute("type", 'password')

  // ! create button handlers for signup buttons
  const button_signup = create_element('button', 'button_signup', '', 'Đăng kí')


  // ! create icon
  const icon_user = create_icon('material-icons', 'account_circle', 25, 'gray')
  const icon_full_name = create_icon('material-icons', 'assignment_ind', 25, 'gray')
  const icon_age = create_icon('material-icons', 'cake', 25, 'gray')
  const icon_address = create_icon('material-icons', 'place', 25, 'gray')
  const icon_pass = create_icon('material-icons', 'vpn_key', 25, 'gray')
  const icon_re_pass = create_icon('material-icons', 'vpn_key', 25, 'gray')
  icon_user.setAttribute('id', 'icon_user')
  icon_full_name.setAttribute('id', 'icon_full_name')
  icon_age.setAttribute('id', 'icon_age')
  icon_address.setAttribute('id', 'icon_address')
  icon_pass.setAttribute('id', 'icon_pass')
  icon_re_pass.setAttribute('id', 'icon_re_pass')
  
  // ! render in here 
  form.appendChild(username_input)
  form.appendChild(fullName_input)
  form.appendChild(age_input)
  
  form.appendChild(address_input)
  form.appendChild(password_input)
  form.appendChild(password_confirm_input)
  form.appendChild(button_signup)

  form.appendChild(icon_age)
  form.appendChild(icon_user)
  form.appendChild(icon_full_name)
  form.appendChild(icon_address)
  form.appendChild(icon_pass)
  form.appendChild(icon_re_pass)
  
  bodyPage.appendChild(form)
}

// ! function check already exists of account
function check_already_accounted(accounts, username) {
  let check_already = false
  accounts.map(account => {
    if (username === undefined) {
      username = ''
    }
    if (account.username == username) {
      check_already = true
    }
    
  })
  if (check_already) {
    return true
  }
  else {
    return false
  }
}



// TODO: add listeners event handlers function
document.addEventListener('load', handle_load_page())
document.getElementById('button_signup').addEventListener('click', handle_signup)
document.addEventListener("keydown", (event) => { 
  if (event.key === "Enter") {
    handle_signup();
  }
})