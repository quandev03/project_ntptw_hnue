// TODO: create function to handle listeners events 

function handle_load_page() {

  // ! get element from page
  const body_page = document.getElementById('main_page')

  // ! create title
  const title = document.createElement('h1')
  title.innerHTML = 'Login'
  title.setAttribute('id', 'title_login')

  // ! create input element
  const label_username = document.createElement('label')
  label_username.setAttribute('class', 'label')
  
  const input_username = document.createElement('input')
  const label_password = document.createElement('label')
  label_password.setAttribute('class', 'label')
  const input_password = document.createElement('input')
  label_username.innerHTML = 'Username'
  input_username.setAttribute('class', 'input'); input_username.setAttribute('placeholder', 'Username')
  input_username.setAttribute('id', 'input_username')
  label_username.setAttribute('for', 'username_input')
  label_password.innerHTML = 'Password'
  input_password.setAttribute('class', 'input')
  input_password.setAttribute('id', 'password_input')
  label_password.setAttribute('for', 'password_input')
  input_password.setAttribute('type', 'password')
  input_password.setAttribute('placeholder', 'Enter your password')
  
  const label_hidden_password = document.createElement('label')
  label_hidden_password.setAttribute('id', 'label-hidden')
  label_hidden_password.innerHTML = 'Appear Password'
  const input_hidden_password = document.createElement('input')
  input_hidden_password.setAttribute('type', 'checkbox')
  input_hidden_password.setAttribute('id', 'input_hidden_password')


  // ! create form input element
  const form_username = document.createElement('div')
  form_username.setAttribute('id', 'form_username')
  const form_password = document.createElement('div')
  form_password.setAttribute('id', 'form_password')

  const form_hidden_pass = document.createElement('div')
  form_hidden_pass.setAttribute('id', 'form_hidden_pass')

  form_hidden_pass.appendChild(input_hidden_password)
  form_hidden_pass.appendChild(label_hidden_password)

  form_username.setAttribute('class', 'form_input_login')
  form_password.setAttribute('class', 'form_input_login')
  form_hidden_pass.setAttribute('class', 'form_hidden_password')
  form_username.appendChild(label_username)
  form_username.appendChild(input_username)
  form_password.appendChild(label_password)
  form_password.appendChild(input_password)




  // ! create button login
  const button_login = document.createElement('button')
  button_login.innerHTML = 'Login'
  button_login.setAttribute('id', 'button_login')
  

  //! create frame 
  const frame_form = document.createElement('div')
  frame_form.setAttribute('id', 'frame_form')

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
  const username = document.getElementById('input_username').value
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
      sessionStorage.setItem('account', JSON.stringify(info_user))
      console.log('true');
    }
  })
  if (sessionStorage.getItem('account') === null) {
  alert('Login failed')
  }else {
    const change_page = document.createElement('a')
    change_page.setAttribute('href', 'http://127.0.0.1:5500/HTML/main.html')
    change_page.setAttribute('hidden', 'true')
    change_page.click()
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