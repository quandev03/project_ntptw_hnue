// TODO: handle function

import { create_element } from "../../Logic/create-element.js"
import { create_icon } from "../../Logic/create-icon.js"
import { get_date } from "../../Logic/get-date.js"
import { get_element_id } from "../../Logic/get_element_id.js"
import { get_item } from "../../Logic/storage.js"
import { delete_question } from "./event-delete-question.js"
import { edit_question } from "./event-edit-question.js"

function handleLoadPage() {
  const bodyPage = get_element_id("main_page")
  let dataUser = get_item('account', 'session')
  let dataQuestion = get_item('data_question', 'local')
  console.log(dataQuestion);
  if (dataQuestion === null) {
    dataQuestion = []
  }

  console.log(dataUser.id, "", dataQuestion);
  let data_question = dataQuestion.filter( (element) => dataUser.id == element[0].id_user)
  console.log(data_question);
  const nav_tag_2 = get_element_id("nav_tag_2")
  if (dataUser == null) {
    let nav1 = create_element("a",'', '', "Login")
    let nav2 = create_element("a", '', '', "Sign Up")

    nav1.setAttribute("href", "http://127.0.0.1:5500/HTML/Login_HTML/login_user.html")
    nav2.setAttribute("href", "")
    nav_tag_2.appendChild(nav1)
    nav_tag_2.appendChild(nav2)
    let notification = create_element("h1", '', '', "Please login to use services")

    bodyPage.appendChild(notification)
  } else {
    // ! information account
    let fullName = create_element('h2', 'logout', '',dataUser.fullName)
    fullName.innerHTML = dataUser.fullName
    fullName.setAttribute('id', 'logout')
    nav_tag_2.appendChild(fullName)
    // ! render question
    if (data_question[0] != null) {
      //! render a question
      data_question.map(
        (element) => {
          let questionInfo = element[0]

        let question = create_element('div', '', 'question')
        // ? create element div with variable name is question

        let content = create_element('pre', '', '', `Question: ${questionInfo.content}`)
        // ? create element pre with variable name is content to render content question

        let stt = create_element('pre', '', '', `Ordinal number: ${questionInfo.stt}`)
        // ? create element pre with variable name is content to render stt question

        let timeSent = create_element('pre', '', '', `Time sent question: ${get_date(questionInfo.time_sent_answer)}`)
          let status = create_element('pre', '', 'status', `Status:`)
        // !  approved, waiting for approval, not approved
          let icon;
          console.log(questionInfo.status);
          if (questionInfo.status == 'approvals') icon = create_icon('material-icons', 'check', 20, 'green')
          else if (questionInfo.status == 'waiting for approval') icon = create_icon('material-icons', 'access_time', 20, 'orange');
          else icon = create_icon('material-icons', 'cancel', 20, 'red');
          status.appendChild(icon);
          
          let answers = create_element('table');
          answers.setAttribute("class", "answer")
          let answersInfo = element[1]
          switch (questionInfo.kind_of_question) { //kiểm tra kiểu câu trả lời
            case 'only optional': // trắc nhiệm 1 đáp án
              answersInfo.map((element => {
                const tr = create_element('tr')
                const td = create_element('td', '', '', element.answer)
  
                if (element.isTrue) tr.style.backgroundColor = "rgba(47, 158, 80, 0.54)";
                else tr.style.backgroundColor = 'rgba(255, 0, 0, 0.54)';
  
                tr.style.border_radius = '10px'
  
                tr.appendChild(td)
                
                // ! element.isTrue
  
                answers.appendChild(tr)
              }))
  
              break;
            case 'multi optional': // trắc nhiệm nhiều đáp án
              answersInfo.map(element => {
                const tr = create_element('tr')
                const td = create_element('td', '', '', element.answer)
  
                if (element.isTrue) tr.style.backgroundColor = "rgba(47, 158, 80, 0.54)";
                else tr.style.backgroundColor = 'rgba(255, 0, 0, 0.54)';
  
                tr.style.border_radius = '10px'
  
                tr.appendChild(td)
                
                // ! element.isTrue
  
                answers.appendChild(tr)
              })
              break;
            default:
            // mặc định là câu trả lời tự luận
              const li2 = create_element('pre', '', '', ` Answer: ${element[1][0].answer}`)

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
    else {
      const frame = create_element("div", '', 'frame_title')

      const title = create_element("h1", '', 'title-h1', 'No answer')

      frame.appendChild(title)
      bodyPage.appendChild(frame)
    }
    let button_edit = create_element("button", 'edit-button', '', "EDIT")

    let button_delete = create_element('button', "delete-button", '', "DELETE")

    let button_add_question = create_element('button', "add-question-button", '', "ADD QUESTION");


    let group_button = create_element('div', '', 'group-button');
    group_button.appendChild(button_add_question);
    group_button.appendChild(button_edit);
    group_button.appendChild(button_delete);

    
    bodyPage.appendChild(group_button)
    
    

  }  



}


//? change page to add a question 
function add_question_change_page() {
  let change = document.createElement('a')  // ?create an element with card 'a'
  change.setAttribute('href', 'http://127.0.0.1:5500/HTML/Question_HTML/add_question.html') // ? set attribute href for element 
  change.setAttribute('hidden', true) // ? enable attribute hidden for element
  change.appendChild(document.getElementById('main_page')) // ? append element in main_page
  change.click() // ? create event click to navigate to http://127.0.0.1:5500/HTML/Question_HTML/add_question.html

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
