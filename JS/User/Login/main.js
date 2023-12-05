// TODO: create function to handle listeners events 

import { create_element } from "../../Logic/create-element.js"
import { event_change_page } from "../../Logic/event-change-page.js"
import { get_element_id } from "../../Logic/get_element_id.js"
import { get_item, set_item } from "../../Logic/storage.js"

function handle_load_page() {

  // ! get element from page
  const body_page = get_element_id('main_page') // ? lấy đối tượng main_page

  // ! create title
  // ? tạo tiêu đề chính
  const title = create_element('h1', 'title_login', '', "Login")

  // ! create input element
  // ? tạo lable Username
  const label_username = create_element('label', '', 'label', 'Username')
  const input_username = create_element('input', 'input_username', 'input')
  const label_password = create_element('label', '', 'label', 'Password')
  const input_password = create_element('input','password_input', 'input')

  input_username.setAttribute('placeholder', 'Username')
  label_username.setAttribute('for', 'username_input')
  label_password.setAttribute('for', 'password_input')
  input_password.setAttribute('type', 'password')
  input_password.setAttribute('placeholder', 'Enter your password')
  
  const label_hidden_password = create_element('label', 'label-hidden','', 'Appear Password')
  const input_hidden_password = create_element('input', 'input_hidden_password')
  input_hidden_password.setAttribute('type', 'checkbox')



  // ! create form input element
  const form_username = create_element('div', 'form_username', 'form_input_login')

  const form_password = create_element('div', 'form_password', 'form_input_login')
  const form_hidden_pass = create_element('div', 'form_hidden_pass', 'form_hidden_password')
  form_hidden_pass.appendChild(input_hidden_password)
  form_hidden_pass.appendChild(label_hidden_password)
  form_username.appendChild(label_username)
  form_username.appendChild(input_username)
  form_password.appendChild(label_password)
  form_password.appendChild(input_password)




  // ! create button login
  const button_login = create_element('button', 'button_login', '', 'Login')
  //! create frame 
  const frame_form = create_element('div', 'frame_form')
  frame_form.appendChild(title)
  frame_form.appendChild(form_username)
  frame_form.appendChild(form_password)
  frame_form.appendChild(form_hidden_pass)
  frame_form.appendChild(button_login)


  // ! render in here
  body_page.appendChild(frame_form)


}


// ! function handle login
function handle_login() {
  // ! get data input
  const username = get_element_id('input_username').value
  const password = document.getElementById('password_input').value
  let info_user
  const accounts = JSON.parse(localStorage.getItem('accounts'))
  accounts.map(account => {
    if (account.username === username && account.password === password) {
      info_user = {
        fullName: account.full_name,
        address: account.address,
        age: account.age,
        id: account.id
      }
      set_item('account', 'session', info_user);
    }
  })
  if (get_item('account', 'session') === null) {
  alert('Login failed')
  }else {
    event_change_page('http://127.0.0.1:5500/HTML/main.html');
  }
}



// TODO: create listener event
document.addEventListener('load', handle_load_page())
document.getElementById('button_login').addEventListener('click', handle_login)

document.getElementById('input_hidden_password').addEventListener('click', () => {
  if (document.getElementById('input_hidden_password').checked) {
    document.getElementById('label-hidden').innerHTML = "Hidden Password"
    document.getElementById('password_input').setAttribute('type', 'text')
  } else {
    document.getElementById('label-hidden').innerHTML = "Appear Password"
    document.getElementById('password_input').setAttribute('type', 'password')
  }
})