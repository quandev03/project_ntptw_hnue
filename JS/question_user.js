// TODO: handle function

function handleLoadPage() {
  const bodyPage = document.getElementById("main_page")
  let dataUser = JSON.parse(sessionStorage.getItem("account"))
  let dataQuestion = JSON.parse(localStorage.getItem("data_question"))
  if (dataQuestion === null) {
    dataQuestion = []
  }
  let data_question = []
  dataQuestion.map(
    element => {
      console.log(element[0].id_user);
      if (dataUser.id === element[0].id_user) {
        data_question.push(element)
      }
    }
  )
  console.log(data_question);
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
    // ! render question
    if (data_question[0] != null) {
      //! render a question
      dataQuestion.map(
        (element) => {
          let questionInfo = element[0]
          console.log(questionInfo);
          let question = document.createElement('div') // ? create element div with variable name is question
          question.setAttribute("class", "question") // ? set the class for the question element div tag
          let content = document.createElement("pre") // ? create element pre with variable name is content to render content question
          let stt = document.createElement("pre") // ? create element pre with variable name is content to render stt question
          let timeSent = document.createElement("pre") // ? create element pre with variable name is content to render timeSent question
          let status = document.createElement("pre") // ? create element pre with variable name is content to render status question
          // let kind_of_question_render = document.createElement("pre") // ? create element pre
          // kind_of_questionInfo: ${questionInfo.kind_of_question}`
          content.innerHTML = `Question: ${questionInfo.content}`
          stt.innerHTML = `Ordinal number: ${questionInfo.stt}`
          timeSent.innerHTML = `Time sent question: ${questionInfo.time_sent_answer}`
          status.innerHTML = `Status: ${questionInfo.status}`
          let answers = document.createElement('ul');
          answers.setAttribute("class", "answer")
          let answersInfo = element[1]
          switch (questionInfo.kind_of_question) {
            case 'only optional':
              answersInfo.map((element => {
                const li = document.createElement('pre')
                const radio = document.createElement('input')
                radio.setAttribute('type', 'radio')
                radio.setAttribute('disabled', true)
                radio.checked = element.isTrue
                li.appendChild(radio)
                let content = document.createElement('pre')
                content.innerHTML = element.answer;
                const form_answer = document.createElement('div')  
                form_answer.appendChild(radio)
                form_answer.appendChild(content)
                form_answer.setAttribute('class', 'form_answer')
                li.appendChild(form_answer)
                answers.appendChild(li)
              }))

              break;
            case 'multi optional':
              answersInfo.map(element => {
                console.log(element);
                const li1 = document.createElement('li')
                const checkbox = document.createElement('input')
                checkbox.setAttribute('type', 'checkbox')
                checkbox.checked = element.isTrue
                checkbox.setAttribute('disabled', true)
                li1.appendChild(checkbox)
                const content1 = document.createElement('pre')
                content1.innerHTML = element.answer
                li1.appendChild(content1)
                const form_answer = document.createElement('div')  
                form_answer.appendChild(checkbox)
                form_answer.appendChild(content1)
                form_answer.setAttribute('class', 'form_answer')
                li1.appendChild(form_answer)
                answers.appendChild(li1)
              })
              break;
            default:
              const li2 = document.createElement('li')
              li2.innerHTML = ` Answer: ${element[1][0].answer}`
              answers.appendChild(li2)
              
          }

          

          // ! appear in div card
          question.appendChild(stt)
          question.appendChild(content)
          question.appendChild(timeSent)
          question.appendChild(status)
          question.appendChild(answers);
          

          // ! appear in body
          bodyPage.appendChild(question)
        }
      )
    }
    let button_edit = document.createElement('button')
    button_edit.innerHTML = "EDIT"
    button_edit.setAttribute("id", "edit-button")
    let button_delete = document.createElement('button')
    button_delete.setAttribute("id", "delete-button")
    button_delete.innerHTML = "DELETE";
    let button_add_question = document.createElement('button');
    button_add_question.setAttribute("id", "add-question-button");
    button_add_question.innerHTML = "ADD QUESTION";
    let group_button = document.createElement('div');
    group_button.appendChild(button_add_question);
    group_button.appendChild(button_edit);
    group_button.appendChild(button_delete);
    group_button.setAttribute("class", "group_button");
    
    bodyPage.appendChild(group_button)
    
    

  }  



}

function delete_question() {
  const data_question_JSON = localStorage.getItem("data_question");
  const data_question = JSON.parse(data_question_JSON);
  const data_delete_question_string = prompt("Enter ordinal number wanted to delete")
  const data_delete_question = parseInt(data_delete_question_string)
  console.log(data_delete_question);
  console.log(data_question);
  let delete_question_stt = null
  data_question.map((element, index) => {
    if (data_delete_question === element[0].stt) {
      delete_question_stt = index
    }
  })
  if (delete_question_stt === null) {
    alert("Can't find question")
  } else {
    console.log(delete_question_stt);
    data_question.splice(delete_question_stt, data_delete_question + 1)
    console.log(data_question);
    localStorage.setItem("data_question", JSON.stringify(data_question))
  }
  location.reload()
}

//? change page to add a question 
function add_question_change_page() {
  let change = document.createElement('a')  // ?create an element with card 'a'
  change.setAttribute('href', 'http://127.0.0.1:5500/HTML/Question_HTML/add_question.html') // ? set attribute href for element 
  change.setAttribute('hidden', true) // ? enable attribute hidden for element
  change.appendChild(document.getElementById('main_page')) // ? append element in main_page
  change.click() // ? create event click to navigate to http://127.0.0.1:5500/HTML/Question_HTML/add_question.html

}
function edit_question() {

  // ! create element and set attribute
  let change = document.createElement('a')
  change.setAttribute('href', 'http://127.0.0.1:5500/HTML/Question_HTML/edit_question.html')
  change.setAttribute('hidden', true)
  change.appendChild(document.getElementById('main_page'))

  // ! create event click to navigate to http://127.0.

  const data_question_JSON = localStorage.getItem("data_question");
  const data_question = JSON.parse(data_question_JSON);
  const data_edit_question_string = prompt("Enter ordinal number wanted to edit")
  const data_edit_question = parseInt(data_edit_question_string)
  console.log(data_edit_question);
  console.log(data_question);
  let edit_question_stt = null
  data_question.map((element, index) => {
    if (data_edit_question === element[0].stt) {
      edit_question_stt = index
    }
  })
  if (edit_question_stt === null) {
    alert("Can't find question")
    change.setAttribute('href', 'http://127.0.0.1:5500/HTML/Question_HTML/question_user.html')
    change.click()
    location.reload()
  } else {
    localStorage.setItem('edit_question_stt', edit_question_stt)
    change.click()
  }
  
}


// ! logout
function logout() { 
  sessionStorage.removeItem('account')
  const change_page = document.createElement('a')
    change_page.setAttribute('href', 'http://127.0.0.1:5500/HTML/main.html')
    change_page.setAttribute('hidden', 'true')
    change_page.click()
}

// TODO: add event listeners
document.addEventListener("load", handleLoadPage())
document.getElementById('edit-button').addEventListener("click", edit_question)
document.getElementById('delete-button').addEventListener("click", delete_question)
document.getElementById('add-question-button').addEventListener('click', add_question_change_page)
document.getElementById('logout').addEventListener('click', logout)
