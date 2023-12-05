// TODO: function handle listeners event

import { create_element } from "../../Logic/create-element.js"
import { event_change_page } from "../../Logic/event-change-page.js"
import { event_selection } from "./event_selection.js"
import { handle_submit } from "./event_submit.js"

// ! onload: function handle
function handleLoadPage() {
  const bodyPage = document.getElementById("main_page")
  let dataUser = JSON.parse(sessionStorage.getItem("account")) // lấy dữ liệu đăng nhâpj
  let dataQuestion = JSON.parse(localStorage.getItem("data_question")) // láy dữ liêuh câu hỏi
  const nav_tag_2 = document.getElementById("nav_tag_2")
  if (dataUser == null) { //! kiểm tra trạng thái đăng nhấp
    event_change_page("http://127.0.0.1:5500/HTML/Login_HTML/login_user.html")
  } else {

    // ! information account
    let fullName = create_element('h2', 'logout', 'home', dataUser.fullName) // ! hiển thị tên
    nav_tag_2.appendChild(fullName)
    // ! render add questions
    let title = create_element('h1', 'title', '', "Add Question")// ! Quan tâm cái này

    // ? question 
    // tạo trường hiển thị câu hỏi
    let labels = create_element('label', '', 'label', "Your question: ") // tạo ra 1 phẩn tử label / không set id/ 
    let question = create_element('input', 'question_input', ) // ! Quan tâm cái này
    question.setAttribute('placeholder', "enter question in here")
    labels.setAttribute('for', 'question_input')
    let from_question = create_element('div', 'from_question') // ! Quan tâm cái này
    from_question.appendChild(labels)
    from_question.appendChild(question)

    // ? kind of question
    // tạo trường nhập kiểu câu hỏi
    let label_kind_of_question = create_element('label', '', 'label', 'Kind of question:  ')
    label_kind_of_question.setAttribute('for', 'kind_of_question')

    // ? các kiểu câu hỏi
    let kind_of_question = create_element('select', 'kind_of_question')
    
    let only_optional = create_element('option', '', '', 'Only optional')
    only_optional.setAttribute('value', 'only optional')
    
    let multi_optional = create_element('option', '', '', 'Multi optional')
    multi_optional.setAttribute('value', 'multi optional')
    
    let essay = create_element('option', '', '', 'Essay');
    essay.setAttribute('value', 'essay');

    let select = create_element('option', '', '','select')
    select.setAttribute('value', 'select')

    // ! rendered selection
    kind_of_question.appendChild(select)
    kind_of_question.appendChild(essay)
    kind_of_question.appendChild(only_optional)
    kind_of_question.appendChild(multi_optional)


    // ! tạo form cho lựa chọn kiểu câu hỏi
    let from_kind_of_question = create_element('div', 'from_kind_of_question')
    from_kind_of_question.appendChild(label_kind_of_question)
    from_kind_of_question.appendChild(kind_of_question)
    
    // ! enter the answer in here
    let answer = create_element('div', 'answers')
    // ! button submit
    let button = create_element('button', 'button_submit', '','Gửi câu hỏi')
    // ! form input 
    //? hiển thi element
    const form = create_element('div', 'form_input')
    form.appendChild(title)
    form.appendChild(from_question)
    form.appendChild(from_kind_of_question)
    form.appendChild(answer)
    form.appendChild(button)
    // ! render website in here
    bodyPage.appendChild(form)
    
  }  
}



// ! logout
function logout() {
  sessionStorage.removeItem('account')
  event_change_page('http://127.0.0.1:5500/HTML/main.html')
}


// TODO: add event listeners  handlers
document.addEventListener('load', handleLoadPage())
document.getElementById('kind_of_question').addEventListener('change', event_selection)
document.getElementById('button_submit').addEventListener('click', handle_submit)
document.getElementById('logout').addEventListener('click', logout)