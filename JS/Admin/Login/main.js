// TODO: create function to handle listeners events 

import { create_element } from "http://127.0.0.1:5500/JS/Logic/create-element.js"
import { event_change_page } from "http://127.0.0.1:5500/JS/Logic/event-change-page.js"
import { get_element_id } from "http://127.0.0.1:5500/JS/Logic/get_element_id.js"
import { set_item } from "http://127.0.0.1:5500/JS/Logic/storage.js"
import { handle_login } from "http://127.0.0.1:5500/JS/Admin/Login/handle_login.js"

function handle_load_page() {

  // ! get element from page
  // ? lấy sự các element chính
  const body_page = get_element_id('main_page')
  const nav_tag = get_element_id('nav_tag_1')
  // ! create title
  // ? tạo ra tiêu đề trang đang nhập của administrative

  // ! tạo ra tài khoản admin mặc định
  const admin_account = {
    username: 'admin',
    password: 'admin',
  }
  // localStorage.setItem('admin_account', JSON.stringify(admin_account)) // ? lưu tài khoản admin mặc định
  set_item('admin_account', 'local', admin_account);
  // ! create title 2
  // ? tạo tiêu đề cho phần đăng nhập với administrative
  const title2 = create_element('h1', 'title2', '', 'Quản trị viên')


  // ! create input element

  // ? tạo phần nhập admin name account
  const label_username = create_element('label', '', '', 'Tên đăng nhập')
  
  
  const input_username = create_element('input', 'input_username')
  label_username.setAttribute('for', 'username_input')
  input_username.placeholder = "Nhập tên đăng nhập"

  // ? tao phần nhâp mất khẩu

  const label_password = create_element('label','', '', 'Mật khẩu' )
  const input_password = create_element('input', 'password_input')
  input_password.type = 'password'
  input_password.placeholder = 'Nhập mật khẩu'
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
  const button_login = create_element('button', 'button_login', '', 'Đăng nhập')

  // ! create button login with user
  const login_user = create_element('p', 'login_user', '', "Đăng nhập người dùng")

  // ! create form input
  // ? hiện thị các đối tượng
  const form_input = document.createElement("div")
  form_input.setAttribute('id', 'form_input')
  form_input.appendChild(title2)
  form_input.appendChild(form_username)
  form_input.appendChild(form_password)
  form_input.appendChild(button_login)
  form_input.appendChild(login_user)

  


  // ! render in here
  body_page.appendChild(form_input)
}

const change_page_user = () => {
  event_change_page('http://127.0.0.1:5500/HTML/Login_HTML/login_user.html')
}


// TODO: create listener event
document.addEventListener('load', handle_load_page()) // TODO: sự kiện load trang lần đầù
get_element_id('button_login').addEventListener('click', handle_login) // TODO: sự kiện đằng nhập
document.getElementById('login_user').addEventListener('click', change_page_user)
document.addEventListener("keydown", (event) => { 
  if (event.key === "Enter") {
    handle_login();
  }
})