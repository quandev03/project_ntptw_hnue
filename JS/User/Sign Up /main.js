// TODO: create function handling event

import { create_element } from "../../Logic/create-element.js"
import { event_change_page } from "../../Logic/event-change-page.js"
import { get_element_id } from "../../Logic/get_element_id.js"
import { get_item, set_item } from "../../Logic/storage.js"

function handle_load_page() {
  const bodyPage = get_element_id("main_page")


  // !  code for page loading
  const title = create_element("h1", '', '', "Sign Up")
  bodyPage.appendChild(title)
  

  // ? code for enter input information username

  const label_username = create_element("label", '', '', "Username:")
  label_username.setAttribute('for', 'username_input')

  const username_input = create_element("input", 'username_input')

  // ? code for enter input information full name

  const label_fullName = create_element("label", '', '', "Full Name: ")
  label_fullName.innerHTML = "Full Name:"
  label_fullName.setAttribute('for', 'fullName_input')


  const fullName_input = create_element("input", 'fullName_input')
  fullName_input.setAttribute("id", "fullName_input")

  
  // ? code for enter input information address

  const label_address = create_element("label", '', '', "Address: ")
  label_address.setAttribute('for', 'address_input')

  const address_input = create_element("input", "address_input")

  // ? code for enter input information age
  const label_age = create_element("label")
  label_age.innerHTML = "Age: "
  label_age.setAttribute('for', 'age_input')

  const age_input = create_element("input", 'age_input', '',"")
  age_input.setAttribute("type", "number")
  age_input.setAttribute("min", '0')


  // ? code for enter input information password

  const label_password = create_element("label", '', '',"Password: ")
  label_password.setAttribute('for', 'password_input')

  const password_input = create_element("input")
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
  // ! render in here 
  bodyPage.appendChild(form_input_username)
  bodyPage.appendChild(form_input_fullName)
  bodyPage.appendChild(form_input_age)
  bodyPage.appendChild(form_input_address)
  bodyPage.appendChild(form_input_password)
  bodyPage.appendChild(form_input_confirm_password)
  bodyPage.appendChild(button_signup)
}

const create_id = () => {
  let id =''
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



// TODO: add listeners event handlers function
document.addEventListener('load', handle_load_page())
document.getElementById('button_signup').addEventListener('click', handle_signup)
