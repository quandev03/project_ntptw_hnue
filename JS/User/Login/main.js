// TODO: create function to handle listeners events 

import { create_element } from "../../Logic/create-element.js"
import { create_icon } from "../../Logic/create-icon.js"
import { event_change_page } from "../../Logic/event-change-page.js"
import { get_element_id } from "../../Logic/get_element_id.js"
import { get_item, set_item } from "../../Logic/storage.js"
let hide_pass = false; //  trạng thái ẩn hiện mật khẩu
function handle_load_page() {

  const body_page = get_element_id('main_page') // ? lấy đối tượng main_page

  // ! create title
  // ? tạo tiêu đề chính
  const title = create_element(
    'h1',
    'title_login',
    '',
    "Login"
  )

  // ! create input element
  // ? tạo label Username
  const label_username = create_element('label', '', 'label', 'Username')
  const input_username = create_element('input', 'input_username', 'input')
  const label_password = create_element('label', '', 'label', 'Password')
  const input_password = create_element('input','password_input', 'input')

  input_username.setAttribute('placeholder', 'Username')
  label_username.setAttribute('for', 'username_input')
  label_password.setAttribute('for', 'password_input')
  input_password.setAttribute('type', 'password')
  input_password.setAttribute('placeholder', 'Enter your password')


  // ! create form input element
  const form_username = create_element('div', 'form_username', 'form_input_login')
  const user_name_form= create_element('div')
  const form_password = create_element('div', 'form_password', 'form_input_login')
  const form_hidden_pass = create_element('div', 'form_hidden_pass', 'form_hidden_password')
 
  form_username.appendChild(label_username)
  form_username.appendChild(input_username)
  form_password.appendChild(label_password)
  form_password.appendChild(input_password)


  const icon_eye = create_icon('material-symbols-outlined', 'visibility_off', 10, 'gray')
  icon_eye.setAttribute('id', 'icon_eye')

  // ! create button login
  const button_login = create_element('button', 'button_login', '', 'Login')
  //! create frame 
  const frame_form = create_element('div', 'frame_form')

  frame_form.appendChild(title)
  frame_form.appendChild(form_username)
  frame_form.appendChild(form_password)
  frame_form.appendChild(button_login)
  const button_change_admin = create_element('p', 'button_change_admin', '', "Đăng nhập với quyền quản trị viên")
  frame_form.appendChild(button_change_admin)
  frame_form.appendChild(icon_eye)


  // ! render in here
  body_page.appendChild(frame_form)


}


// ! function handle login
function handle_login() {
  console.log('asf');
  // ! get data input
  const username = get_element_id('input_username').value
  const password = get_element_id('password_input').value
  let accounts = JSON.parse(localStorage.getItem('accounts'))
  if (!accounts) accounts = new Array()
  const data_user = accounts.filter(account => account.username ==username)[0]
  if (!username) {
      alert("Username không được để trống")
    }
  else if (data_user) {
    if (!password) alert('Mật khẩu không được để trống')
    else if (data_user.password === password) {
      let info_user = {
        fullName: data_user.full_name,
        address: data_user.address,
        age: data_user.age,
        id: data_user.id
      }
      set_item('account', 'session', info_user);
      event_change_page('http://127.0.0.1:5500/HTML/main.html');
    }
    else {
      alert("Mật khẩu không chính xác, vui lòng nhập lại mật khẩu!");
      password = ''
    }
  }
  else {
    alert(
      `Tài khoản không tồn tại
      Vui lòng nhập lại, vui lòng nhập lại
      `
    )
    get_element_id('input_username').value = '',
    get_element_id('password_input').value = ''
  }
}



// TODO: create listener event
document.addEventListener('load', handle_load_page())
document.getElementById('button_login').addEventListener('click', handle_login)

document.getElementById('icon_eye').addEventListener('click', () => {
  hide_pass = !hide_pass
  if (hide_pass) {

    document.getElementById('icon_eye').innerText = "visibility"
    document.getElementById('password_input').setAttribute('type', 'text')
  } else {

    document.getElementById('icon_eye').innerText = "visibility_off"
    document.getElementById('password_input').setAttribute('type', 'password')
  }
})

document.getElementById('button_change_admin')
  .addEventListener('click', () => {
    event_change_page('http://127.0.0.1:5500/HTML/admin_main.html')
  });
document.addEventListener("keydown", (event) => { 
  if (event.key === "Enter") {
    handle_login();
  }
})