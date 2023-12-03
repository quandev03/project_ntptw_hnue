// TODO: create function to handle listeners events 

function handle_load_page() {

  // ! get element from page
  // ? lấy sự các element chính
  const body_page = document.getElementById('main_page')
  const nav_tag = document.getElementById('nav_tag_1')
  // ! create title
  // ? tạo ra tiêu đề trang đang nhập của administrative
  const title = document.createElement('h1')
  title.setAttribute('id', 'title')
  title.innerHTML = 'Login Administrator' 
  nav_tag.appendChild(title)
  // ! tạo ra tài khoản admin mặc định
  const admin_account = {
    username: 'admin',
    password: 'admin',
  }
  localStorage.setItem('admin_account', JSON.stringify(admin_account)) // ? lưu tài khoản admin mặc định
  // ! create title 2
  // ? tạo tiêu đề cho phần đăng nhập với administrative
  const title2 = document.createElement('h1')
  title2.setAttribute('id', 'title2')
  title2.innerText = "Administrator"


  // ! create input element

  // ? tạo phần nhập admin name account
  const label_username = document.createElement('label')
  
  const input_username = document.createElement('input')
  input_username.placeholder = "Enter username"

  // ? tao phần nhâp mất khẩu
  const label_password = document.createElement('label')
  const input_password = document.createElement('input')
  input_password.type = 'password'
  input_password.placeholder = 'Enter your Password'
  label_username.innerHTML = 'Username'
  input_username.setAttribute('id', 'input_username')
  label_username.setAttribute('for', 'username_input')
  label_password.innerHTML = 'Password'
  input_password.setAttribute('id', 'password_input')
  label_password.setAttribute('for', 'password_input')
  // ! create form input element
  // ? tạo form cho phần nhâpj thông tin
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
  const button_login = document.createElement('button')
  button_login.innerHTML = 'Login'
  button_login.setAttribute('id', 'button_login')
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


// ! function handle login
function handle_login() {
  // ! get data from local storage
  const data_account = JSON.parse(localStorage.getItem('admin_account'))
  // ! get data input
  const username = document.getElementById('input_username').value
  const password = document.getElementById('password_input').value
  if (username == data_account.username && password == data_account.password) { // check tải khoản và mật khẩu admin
    sessionStorage.setItem('status_login', JSON.stringify({ admin_login: true })); // nêu đúng sẽ đặt trạng thái đăng nhâp kaf true
    const change_page = document.createElement('a') // ? tạo ra 1 element ảo để chạy lại trang
    change_page.setAttribute('href', 'http://127.0.0.1:5500/HTML/admin_main.html')
    change_page.click();
  }else { // nếy sau sẽ đặt trạng thái là false
    sessionStorage.setItem('admin_login', JSON.stringify({ admin_login: false }));
    const change_page = document.createElement('a') // ? tạo ra 1 element ảo để chạy lại trang
    change_page.setAttribute('href', 'http://127.0.0.1:5500/HTML/admin_main.html')
    change_page.click();
  }

  
}



// TODO: create listener event
document.addEventListener('load', handle_load_page()) // TODO: sự kiêu load trang lần đầù
document.getElementById('button_login').addEventListener('click', handle_login) // TODO: sự kiện đằng nhập