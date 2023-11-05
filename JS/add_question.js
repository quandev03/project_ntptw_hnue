// TODO: function handle listeners event
// ! onload: function handle
function handleLoadPage() {
  const bodyPage = document.getElementById("main_page")
  let dataUser = JSON.parse(sessionStorage.getItem("account"))
  let dataQuestion = JSON.parse(localStorage.getItem("data_question"))
  console.log(dataUser);
  console.log(dataQuestion);

  const nav_tag_2 = document.getElementById("nav_tag_2")
  if (dataUser == null) {
    
    
    let nav1 = document.createElement("a")
    let nav2 = document.createElement("a")
    nav1.innerHTML = "Login"
    nav2.innerHTML = "Sign Up"
    nav1.setAttribute("href", "http://127.0.0.1:5500/HTML/Login_HTML/login_user.html")
    nav1.setAttribute("class", "home")
    nav2.setAttribute("href", "")
    nav2.setAttribute("class", "home")
    nav_tag_2.appendChild(nav1)
    nav_tag_2.appendChild(nav2)

    let notification = document.createElement("h1")
    notification.innerHTML = " Please login to use services"
    bodyPage.appendChild(notification)
  } else {

    // ! information account
    let fullName = document.createElement('h2')
    fullName.innerHTML = dataUser.fullName
    fullName.setAttribute('id', 'c')
    fullName.setAttribute('class', 'home')
    nav_tag_2.appendChild(fullName)
    // ! render add questions
    let title = document.createElement('h1')
    title.setAttribute('id', 'title')
    title.innerHTML = "Add Question"

    // ? question
    let labels = document.createElement('label')
    labels.setAttribute('class', 'label')
    labels.innerHTML = "Your question: "
    let question = document.createElement('input')
    question.setAttribute('placeholder', "enter question in here")
    question.setAttribute('id', 'question_input')
    labels.setAttribute('for', 'question_input')
    let from_question = document.createElement('div')
    from_question.appendChild(labels)
    from_question.appendChild(question)
    from_question.setAttribute("id", 'from_question')

    // ? kind of question
    let label_kind_of_question = document.createElement('label')
    label_kind_of_question.setAttribute('for', 'kind_of_question')
    label_kind_of_question.setAttribute('class', 'label')
    label_kind_of_question.innerHTML= 'Kind of question:  '

    let kind_of_question = document.createElement('select')
    kind_of_question.setAttribute('id', 'kind_of_question')
    
    let only_optional = document.createElement('option')
    only_optional.setAttribute('value', 'only optional')
    only_optional.innerHTML = 'Only optional'
    
    let multi_optional = document.createElement('option')
    multi_optional.setAttribute('value', 'multi optional')
    multi_optional.innerHTML = 'Multi optional'
    
    let essay = document.createElement('option')
    essay.setAttribute('value', 'essay')
    essay.innerHTML = 'Essay'

    let select = document.createElement('option')
    select.setAttribute('value', 'select')
    select.innerHTML = 'select'

    // ! rendered selection
    kind_of_question.appendChild(select)
    kind_of_question.appendChild(essay)
    kind_of_question.appendChild(only_optional)
    kind_of_question.appendChild(multi_optional)


    let from_kind_of_question = document.createElement('div')
    from_kind_of_question.setAttribute('id', 'from_kind_of_question')
    from_kind_of_question.appendChild(label_kind_of_question)
    from_kind_of_question.appendChild(kind_of_question)
    
    // ! enter the answer in here
    let answer = document.createElement('div')
    answer.setAttribute('id', 'answer')
    // ! button 
    let button = document.createElement('button')
    button.setAttribute('id', 'button_submit')
    button.setAttribute('type', 'submit')
    button.innerHTML = 'Submit'
  // ! form input 
    const form = document.createElement("div")
    form.setAttribute('id', 'form_input')
    form.appendChild(title)
    form.appendChild(from_question)
    form.appendChild(from_kind_of_question)
    form.appendChild(answer)
    form.appendChild(button)
    // ! render website in
    bodyPage.appendChild(form)
    
  }  
}
//! onchange the kind of question
function handle_kind_of_question() {
  const data = document.getElementById('kind_of_question').value
  const answers = document.getElementById('answer')
  
  if (data != 'select') { 
    document.getElementById('kind_of_question').setAttribute('disabled', true)
  }
  console.log(data);
  switch (data) {
    case 'multi optional':
      const number_of_responses = prompt("Number of responses:  ")
      sessionStorage.setItem('number_of_responses', number_of_responses)
      for (let i = 0; i < number_of_responses; i++) { 
        const form_answer = document.createElement("div")
        const checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute('name', 'checkbox')
        checkbox.setAttribute("id", `checkbox_${i}`)
        checkbox.setAttribute("value", `${i}`)
        const answer = document.createElement("input")
        answer.setAttribute("id", `answer_${i}`)
        form_answer.appendChild(checkbox)
        form_answer.appendChild(answer)
        answers.appendChild(form_answer)
      }
      break;
    case 'only optional':
      const number_of_response = prompt("Number of responses:  ")
      sessionStorage.setItem('number_of_responses', number_of_response)

      for (let i = 0; i < number_of_response; i++) { 
        const form_answer = document.createElement("div")
        const radio = document.createElement("input")
        radio.setAttribute("type", "radio")
        radio.setAttribute("id", `radio_${i}`)
        radio.setAttribute('name', 'radio')
        radio.setAttribute('value', `${i}`)
        const answer = document.createElement("input")
        answer.setAttribute("id", `answer_${i}`)
        form_answer.appendChild(radio)
        form_answer.appendChild(answer)
        answers.appendChild(form_answer)
      }
      break;
    
    default:
      const label = document.createElement('label')
      const answer = document.createElement('input')
      answer.setAttribute('id', 'answer-essay')
      answers.appendChild(answer)


  }




}
function handle_submit() {
  const kind_of_question = document.getElementById('kind_of_question').value
  let list_answer
  const user = JSON.parse(sessionStorage.getItem('account'))
  console.log(user.id);
  switch (kind_of_question) {
    case 'multi optional':
      number_of_response = sessionStorage.getItem('number_of_responses')
      let responses_checkbox = []
      for (let i = 0; i < number_of_response; i++) {
        let answer = document.getElementById(`answer_${i}`).value;
        let isTrue = document.getElementById(`checkbox_${i}`).checked
        let response = {
          answer: answer,
          isTrue: isTrue
        }
        responses_checkbox.push(response);
      }
      list_answer = responses_checkbox
      break;
    case 'only optional':
      number_of_response = sessionStorage.getItem('number_of_responses')
      let responses_radio = []
      for (let i = 0; i < number_of_response; i++) {
        let answer = document.getElementById(`answer_${i}`).value;
        let isTrue = document.getElementsByName('radio')[i].checked
        let response = {
          answer: answer,
          isTrue: isTrue
        }
        responses_radio.push(response);
      }
      list_answer = responses_radio
      break;
    
    case 'essay':
      const answer = [{
        answer: document.getElementById('answer-essay').value,
        isTrue: true
      }]
      list_answer = answer
      break;
    default:
      alert("Error: Unknown")
  }
  const time_sent_answer = new Date(Date.now())
  let data_question = JSON.parse(localStorage.getItem('data_question'))
  if (data_question === null) { 
    data_question = []
  }
  let status = "waiting for approval" //? approved, waiting for approval, not approved
  let stt = data_question.length + 1
  let content_answer = document.getElementById("question_input").value
  const data_sent = [
    {
      stt: stt,
      id_user: user.id,
      content: content_answer,
      time_sent_answer: time_sent_answer,
      status: status,
      kind_of_question: kind_of_question,
    },
    list_answer
  ]
  data_question.push(data_sent)
  console.log(data_question);
  console.log(data_sent);
  localStorage.setItem('data_question', JSON.stringify(data_question));
  
  const change = document.createElement("a")
  change.setAttribute("href", "http://127.0.0.1:5500/HTML/Question_HTML/question_user.html")
  change.click()
}


// ! logout
function logout() { 
  sessionStorage.removeItem('account')
  const change_page = document.createElement('a')
  change_page.setAttribute('href', 'http://127.0.0.1:5500/HTML/main.html')
  change_page.setAttribute('hidden', 'true')
  document.getElementById("main_page").appendChild(change_page)
  change_page.click();
}


// TODO: add listeners event handlers
document.addEventListener('load', handleLoadPage())
document.getElementById('kind_of_question').addEventListener('change', handle_kind_of_question)
document.getElementById('button_submit').addEventListener('click', handle_submit)
document.getElementById('logout').addEventListener('click', logout)