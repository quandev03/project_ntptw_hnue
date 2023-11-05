// TODO: create function handling event

function handle_load_page() {
  const bodyPage = document.getElementById("main_page")


  // !  code for page loading
  const title = document.createElement("h1")
  title.setAttribute("id", "title_signup")
  title.innerHTML = "Sign Up"

  

  // ! code for enter input information new account

  // ? code for enter input information username

  const label_username = document.createElement("label")
  label_username.innerHTML = "Username:"
  label_username.setAttribute('for', 'username_input')

  const username_input = document.createElement("input")
  username_input.setAttribute("id", "username_input")


  // ? code for enter input information full name

  const label_fullName = document.createElement("label")
  label_fullName.innerHTML = "Full Name:"
  label_fullName.setAttribute('for', 'fullName_input')


  const fullName_input = document.createElement("input")
  fullName_input.setAttribute("id", "fullName_input")


  // ? code for enter input information address

  const label_address = document.createElement("label")
  label_address.innerHTML = "Address:"
  label_address.setAttribute('for', 'address_input')

  const address_input = document.createElement("input")
  address_input.setAttribute("id", "address_input")


  // ? code for enter input information age

  const label_age = document.createElement("label")
  label_age.innerHTML = "Age: "
  label_age.setAttribute('for', 'age_input')

  const age_input = document.createElement("input")
  age_input.setAttribute("id", "age_input")
  age_input.setAttribute("type", "number")
  age_input.setAttribute("min", '0')


  // ? code for enter input information password

  const label_password = document.createElement("label")
  label_password.innerHTML = "Password: "
  label_password.setAttribute('for', 'password_input')

  const password_input = document.createElement("input")
  password_input.setAttribute("id", "password_input")
  password_input.setAttribute("type", 'password')


  // ? code for enter input information password confirm

  const label_confirm_password = document.createElement("label")
  label_confirm_password.innerHTML = "Confirm Password:"
  label_confirm_password.setAttribute('for', 'password_confirm_input')

  const password_confirm_input = document.createElement("input")
  password_confirm_input.setAttribute("id", "password_confirm_input")
  password_confirm_input.setAttribute("type", 'password')

  // ! form input
  const form_input_username = document.createElement("div")
  form_input_username.setAttribute('class', 'form_input_signup')
  const form_input_fullName = document.createElement("div")
  form_input_fullName.setAttribute('class', 'form_input_signup')
  const form_input_age = document.createElement("div")
  form_input_age.setAttribute('class', 'form_input_signup')
  const form_input_address = document.createElement("div")
  form_input_address.setAttribute('class', 'form_input_signup')
  const form_input_password = document.createElement("div")
  form_input_password.setAttribute('class', 'form_input_signup')
  const form_input_confirm_password = document.createElement("div")
  form_input_confirm_password.setAttribute('class', 'form_input_signup')

  // ! render in form
  form_input_username.appendChild(label_username)
  form_input_username.appendChild(username_input)
  form_input_fullName.appendChild(label_fullName)
  form_input_fullName.appendChild(fullName_input)
  form_input_age.appendChild(label_age)
  form_input_age.appendChild(age_input)
  form_input_address.appendChild(label_address)
  form_input_address.appendChild(address_input)
  form_input_password.appendChild(label_password)
  form_input_password.appendChild(password_input)
  form_input_confirm_password.appendChild(label_confirm_password)
  form_input_confirm_password.appendChild(password_confirm_input)

  
  
  // ! create button handlers for signup buttons
  const button_signup = document.createElement('button')
  button_signup.innerHTML = 'Sign Up'
  button_signup.setAttribute('id', 'button_signup')


  // ! Form layers
  const form_layer = document.createElement("div")
  form_layer.setAttribute('class', 'form_layer')
  
  form_layer.appendChild(title)
  form_layer.appendChild(form_input_username)
  form_layer.appendChild(form_input_fullName)
  form_layer.appendChild(form_input_age)
  form_layer.appendChild(form_input_address)
  form_layer.appendChild(form_input_password)
  form_layer.appendChild(form_input_confirm_password)
  form_layer.appendChild(button_signup)


  // ! render in here 
  bodyPage.appendChild(form_layer)

}

const create_id = () => {
  id = ''
  for (let i = 0; i < 8; i++) {
    let element = (Math.random() * 10).toFixed(0)
    element == 10 ? element = 0 : element
    id += element
  }
  return id;
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

function handle_signup() {
  // ! get value to sign up from input
  const username = document.getElementById('username_input').value
  const full_name = document.getElementById('fullName_input').value
  const age = document.getElementById('age_input').value
  const address = document.getElementById('address_input').value
  const password_input = document.getElementById('password_input').value
  const confirm_password_input = document.getElementById('password_confirm_input').value

  // ! Create a new id

  // ! check password

  if (password_input === confirm_password_input) {
    const new_account = {
      id: create_id(),
      username: username,
      full_name: full_name,
      age: age,
      address: address,
      password: password_input
    }
    let accounts = JSON.parse(localStorage.getItem('accounts'))

    if (accounts === null) {
      accounts = [];

    }
    console.log(accounts);
    if (check_already_accounted(accounts, username) === false) {
      accounts.push(new_account)
      localStorage.setItem('accounts', JSON.stringify(accounts))
      const change_page = document.createElement('a')
      change_page.setAttribute('href', 'http://127.0.0.1:5500/HTML/Login_HTML/login_user.html')
      change_page.click()
    }
    else {
      alert(' account already exists')
    }


  } else {
    console.log('password is not valid');
  }
}



// TODO: add listeners event handlers function
document.addEventListener('load', handle_load_page())
document.getElementById('button_signup').addEventListener('click', handle_signup)