// TODO: function handle listeners event
// ! onload: function handle
function handleLoadPage() {
  const bodyPage = document.getElementById("main_page")
  let dataUser = JSON.parse(localStorage.getItem("dataUser"))
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
    nav2.setAttribute("href", "")
    nav_tag_2.appendChild(nav1)
    nav_tag_2.appendChild(nav2)

    let notification = document.createElement("h1")
    notification.innerHTML = " Please login to use services"
    bodyPage.appendChild(notification)
  } else {
    // ! information account
    let fullName = document.createElement('h2')
    fullName.innerHTML = dataUser.fullName
    fullName.setAttribute('id', 'logout')
    nav_tag_2.appendChild(fullName)

    // ! fetch data from local storage
    const data_question = JSON.parse(localStorage.getItem('data_question'))
    const edit_question_stt = JSON.parse(localStorage.getItem('edit_question_stt'))
    const question_edit = data_question.splice(edit_question_stt, edit_question_stt + 1)
    const info_question = question_edit[0][0]
    console.log(info_question);
    const info_answer = question_edit[0][1]
    console.log(info_answer);
    
    // ! render add questions
    let title = document.createElement('h1')

    // ? question
    title.innerHTML = "Edit Question"
    let labels = document.createElement('label')
    labels.innerHTML = "Your question: "
    let question = document.createElement('input')
    question.setAttribute('placeholder', "enter question in here")
    question.setAttribute('id', 'question_input')
    question.value = info_question.content
    labels.setAttribute('for', 'question_input')
    let from_question = document.createElement('div')
    from_question.appendChild(labels)
    from_question.appendChild(question)

    // ? kind of question
    let label_kind_of_question = document.createElement('label')
    label_kind_of_question.setAttribute('for', 'kind_of_question')
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
    // ! rendered selection
    

    kind_of_question.appendChild(essay)
    kind_of_question.appendChild(only_optional)
    kind_of_question.appendChild(multi_optional)
    kind_of_question.value =info_question.kind_of_question
    kind_of_question.setAttribute('id', 'kind_of_question')
    


    let from_kind_of_question = document.createElement('div')
    from_kind_of_question.appendChild(label_kind_of_question)
    from_kind_of_question.appendChild(kind_of_question)
    
    // ! enter the answer in here
    let answers = document.createElement('div')
    answers.setAttribute('id', 'answer')
    switch (info_question.kind_of_question) {
      case 'multi optional':
        info_answer.map((element, index) => {
          
          const form_answer = document.createElement("div")
          form_answer.setAttribute('id', 'list_answer')
          const checkbox = document.createElement("input")
          checkbox.setAttribute("type", "checkbox")
          checkbox.setAttribute('name', 'checkbox')
          checkbox.setAttribute("id", `checkbox_${index}`)
          checkbox.setAttribute("class", `the_input`)
          checkbox.checked = element.isTrue
          const answer = document.createElement("input")
          answer.setAttribute("id", `answer_${index}`)
          form_answer.appendChild(checkbox)
          answer.value = element.answer
          form_answer.appendChild(answer)
          answers.appendChild(form_answer)
        }
        )
        break;
      case 'only optional':
        info_answer.map((element, index) => {
          const form_answer = document.createElement("div")
          form_answer.setAttribute('id', 'list_answer')
          const radio = document.createElement("input")
          radio.setAttribute("type", "radio")
          radio.setAttribute('name', 'radio')
          radio.setAttribute("id", `radio_${index}`)
          radio.setAttribute("id", `radio`)
          radio.setAttribute("class", `the_input`)
          radio.checked = element.isTrue
          const answer = document.createElement("input")
          answer.setAttribute("id", `answer_${index}`)
          form_answer.appendChild(radio)
          answer.value = element.answer
          form_answer.appendChild(answer)
          answers.appendChild(form_answer)
        })
        break;
      default:
        const form_answer = document.createElement("div")
        form_answer.setAttribute('id', 'list_answer')
        const answer = document.createElement("input")
        answer.value = info_answer[0].answer
        form_answer.appendChild(answer)
        answers.appendChild(form_answer)
    }


    // ! button 
    let button = document.createElement('button')
    button.setAttribute('id', 'button_submit')
    button.setAttribute('type', 'submit')
    button.innerHTML = 'Submit'
    // ! render website in
    bodyPage.appendChild(title)
    bodyPage.appendChild(from_question)
    bodyPage.appendChild(from_kind_of_question)
    bodyPage.appendChild(answers)
    bodyPage.appendChild(button)
    
  }  
}



//! onchange the kind of question
function handle_submit() {
  // ! fetch data
  const data_question = JSON.parse(localStorage.getItem('data_question'))
  const edit_question_stt = JSON.parse(localStorage.getItem('edit_question_stt'))
  const question_edit = data_question.splice(edit_question_stt, edit_question_stt + 1)
  const info_question = question_edit[0][0]
  const info_answer = question_edit[0][1]
  let number_of_response = info_answer.length
  const kind_of_question = document.getElementById('kind_of_question').value
  let list_answer
  const answers = localStorage.getItem('answers')
  switch (kind_of_question) {
    case 'multi optional':
      let responses_checkbox = []
      for (let i = 0; i < number_of_response; i++) {
        let answer = document.getElementById(`answer_${i}`).value
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
      
      let responses_radio = []
      for (let i = 0; i < number_of_response; i++) {
        let answer = document.getElementById(`answer_${i}`).value;
        let isTrue = document.getElementsByName('radio')[i].checked;
        console.log( answer);
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
  console.log(list_answer);
  const content = document.getElementById('question_input').value
  
  info_question.content = content
  info_answer.content = list_answer
  const data_upload = [
    info_question,
    info_answer
  ]
  data_question[edit_question_stt] = data_upload
  console.log(data_question);
  localStorage.setItem('data_question', JSON.stringify(data_question));
  
  location.reload();
  const change_page = document.createElement('a')
  change_page.setAttribute('href', 'http://127.0.0.1:5500/HTML/Question_HTML/question_user.html')
  change_page.setAttribute('hidden', true)
  change_page.click()
}

//! logout
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
document.getElementById('button_submit').addEventListener('click', handle_submit)
document.getElementById('logout').addEventListener('click', logout)
// TODO: save code

