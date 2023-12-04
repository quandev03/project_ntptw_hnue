// TODO: create function to handle listeners events 

import { create_element } from "../../Logic/create-element.js"
import { get_element_id } from "../../Logic/get_element_id.js"
import { set_item } from "../../Logic/storage.js"
import { handle_login } from "./handle_login.js"

function handle_load_page() {

  // ! get element from page
  // ? lấy sự các element chính
  const body_page = get_element_id('main_page')
  const nav_tag = get_element_id('nav_tag_1')
  // ! create title
  // ? tạo ra tiêu đề trang đang nhập của administrative

  const title = create_element('h1','title','','Login Administrator')

  // ! tạo ra tài khoản admin mặc định
  const admin_account = {
    username: 'admin',
    password: 'admin',
  }
  // localStorage.setItem('admin_account', JSON.stringify(admin_account)) // ? lưu tài khoản admin mặc định
  set_item('admin_account', 'local', admin_account);
  // ! create title 2
  // ? tạo tiêu đề cho phần đăng nhập với administrative
  const title2 = create_element('h1', 'title2', '', 'Administrator')


  // ! create input element

  // ? tạo phần nhập admin name account
  const label_username = create_element('label', '', '', 'Username')
  
  
  const input_username = create_element('input', 'input_username')
  label_username.setAttribute('for', 'username_input')
  input_username.placeholder = "Enter username"

  // ? tao phần nhâp mất khẩu

  const label_password = create_element('label','', '', 'Password' )
  const input_password = create_element('input', 'password_input')
  input_password.type = 'password'
  input_password.placeholder = 'Enter your Password'
  label_password.setAttribute('for', 'password_input')
  // ! create form input element
  // ? tạo form cho phần nhập thông tin
  const form_username = document.createElement('div')
  const form_password = document.createElement('div')

  form_username.setAttribute('class', 'form_input_login')
  form_password.setAttribute('class', 'form_input_login')

  // ! hiển thị đối tượng
  form_username.appendChild(label_username)
  form_username.appendChild(input_username)
  form_password.appendChild(label_password)
  form_password.appendChild(input_password)

  // ! create button login
  const button_login = create_element('button', 'button_login', '', 'Login')
  // ! create form input
  // ? hiện thị các đối tương
  const form_input = document.createElement("div")
  form_input.setAttribute('id', 'form_input')
  form_input.appendChild(title2)
  form_input.appendChild(form_username)
  form_input.appendChild(form_password)
  form_input.appendChild(button_login)

  // ! render in here
  body_page.appendChild(form_input)
}




// TODO: create listener event
document.addEventListener('load', handle_load_page()) // TODO: sự kiêu load trang lần đầù
get_element_id('button_login').addEventListener('click', handle_login) // TODO: sự kiện đằng nhập