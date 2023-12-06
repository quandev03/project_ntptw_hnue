// TODO: function handle listeners event

import { create_element } from "../../Logic/create-element.js"
import { create_icon } from "../../Logic/create-icon.js"
import { event_change_page } from "../../Logic/event-change-page.js"
import { get_date } from "../../Logic/get-date.js"
import { get_item, set_item } from "../../Logic/storage.js"
import { event_approval } from "./event_approval.js"
import { event_disapproval } from "./event_disapproval.js"

// ! hàm được tạo để tạo ra các element và hiển thị ra trang web
function handleLoadPage() {
  const body_page = document.getElementById('main_page') // lấy ra thành phần main page
  const nav_tag = document.getElementById('nav_tag_2') //lấy ra thành phần nav bar
  const status_login = JSON.parse(sessionStorage.getItem('status_login')) // trạng thái đăng nhập của admin

  if (status_login != null) { // kiểm tra trạng thái đăng nhập của admin
    //! create title 
    const title = create_element('h1', 'title', '', "Admin") //tạo ra title admin
    nav_tag.appendChild(title)//hiển thị thẻ

    // ! get data from local storage
    const data = get_item('data_question', 'local') 

    data.map( // hàm lấy ra từng dư liệu của nhỏ
      (element) => {
        let questionInfo = element[0]

        let question = create_element('div', '', 'question')
        // ? create element div with variable name is question

        let content = create_element('pre', '', '', `Question: ${questionInfo.content}`)
        // ? create element pre with variable name is content to render content question

        let stt = create_element('pre', '', '', `Ordinal number: ${questionInfo.stt}`)
        // ? create element pre with variable name is content to render stt question

        let timeSent = create_element('pre', '', '', `Time sent question: ${get_date(questionInfo.time_sent_answer)}`)
        // ? create element pre with variable name is content to render timeSent question

        let status = create_element('pre', '', 'status', `Status:`)
        // !  approved, waiting for approval, not approved
        let icon;
        console.log(questionInfo.status);
        if (questionInfo.status == 'approvals') icon = create_icon('material-icons', 'check', 20, 'green')
        else if (questionInfo.status == 'waiting for approval') icon = create_icon('material-icons', 'access_time', 20, 'orange');
        else  icon = create_icon('material-icons', 'cancel', 20, 'red');
        status.appendChild(icon)
        // ? create element pre with variable name is content to render status question

        let answers = create_element('table', '', 'answer')
        // ? tạo ra trường câu trả lời

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
          default: // mặc định là câu trả lời tự luận
            const li2 = document.createElement('pre')
            li2.innerHTML = ` Answer: ${element[1][0].answer}`
            answers.appendChild(li2)

        }
        //! hiển thị các thành phần
        question.appendChild(stt);
        question.appendChild(content);
        question.appendChild(timeSent);
        question.appendChild(status);
        question.appendChild(answers);
        // ! appear in body
        body_page.appendChild(question);
      }
    )
    let button_disapprovals = create_element('button', 'disapprovals-button', '', 'DISAPPROVALS')
    // ! tạo button
    let button_approvals = create_element('button', 'approvals-button', '', "APPROVALS")
    let group_button = create_element('div', '', 'group_button')
    group_button.appendChild(button_approvals);
    group_button.appendChild(button_disapprovals);

    body_page.appendChild(group_button)
  } else {
    // ! khi chưa đăng nhập thì sẽ được chuyển tới trang đăng nhâp admin
    event_change_page('http://127.0.0.1:5500/HTML/Login_HTML/login_admin.html')
  }
}

// ! logout
function logout() { // hàm logout
  const status_login = get_item('status_login', 'session')
  status_login.admin_login = false
  // chuyển trạng thái đăng nhập thành false

  set_item('status_login', 'local', status_login)
  // ? câp nhật trạng thái
  location.reload()
}

// TODO: add event listeners
document.addEventListener("load", handleLoadPage()) 
document.getElementById('disapprovals-button').addEventListener('click', event_disapproval)
document.getElementById('approvals-button').addEventListener('click', event_approval)
document.getElementById('title').addEventListener('click', logout)