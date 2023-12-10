// TODO: function handle listeners event

import { create_element } from "http://127.0.0.1:5500/JS/Logic/create-element.js"
import { create_icon } from "http://127.0.0.1:5500/JS/Logic/create-icon.js"
import { event_change_page } from "http://127.0.0.1:5500/JS/Logic/event-change-page.js"
import { get_date } from "http://127.0.0.1:5500/JS/Logic/get-date.js"
import { get_element_id } from "http://127.0.0.1:5500/JS/Logic/get_element_id.js"
import { get_item, set_item } from "http://127.0.0.1:5500/JS/Logic/storage.js"
import { event_approval } from "http://127.0.0.1:5500/JS/Admin/Main/event_approval.js"
import { event_disapproval } from "http://127.0.0.1:5500/JS/Admin/Main/event_disapproval.js"
import { selection_data_all, selection_data_approvals, selection_data_await, selection_data_disapprovals } from "./selection_data.js"
let status_sm = false;
const event_show_more = () => {
  status_sm = !status_sm
  if (status_sm) {
    document.getElementById('disapprovals-button').style.display = 'block';
    document.getElementById('approvals-button').style.display = 'block'
    document.getElementById('show_more').innerHTML = `<i class="material-icons" style="font-size:35px; color: #fff">highlight_off</i>`

  }
  else {
    document.getElementById('disapprovals-button').style.display = 'none';
    document.getElementById('approvals-button').style.display = 'none'
    document.getElementById('show_more').innerHTML = `<i class="material-icons" style="font-size:35px">arrow_drop_down_circle</i>`
  }
}

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
    let data = get_item('data_selection', 'session')
    if (!data) {
      data = []
    }
    data.map( // hàm lấy ra từng dư liệu của nhỏ
      (element) => {
        let questionInfo = element[0]
        console.log(questionInfo.status);

        let question = create_element('div', '', 'question')
        // ? create element div with variable name is question

        let content = create_element('p', '', 'content', `Câu hỏi: ${questionInfo.content}`)
        // ? create element pre with variable name is content to render content question

        let image;
        if (questionInfo.image) {
          image = create_element('img', '', 'images')
          image.src = questionInfo.image;
        }  

        let stt = create_element('pre', '', '', `ID: ${questionInfo.stt}`)
        // ? create element pre with variable name is content to render stt question

        let timeSent = create_element('pre', '', '', `Thời gian gửi: ${get_date(questionInfo.time_sent_answer)}`)
        // ? create element pre with variable name is content to render timeSent question

        let status = create_element('pre', '', 'status', `Trạng thái:`)
        // !  approved, waiting for approval, not approved
        let icon;
        if (questionInfo.status == 'approvals') icon = create_icon('material-icons', 'check', 20, 'green')
        else if (questionInfo.status == 'waiting for approval') icon = create_icon('material-icons', 'access_time', 20, 'orange');
        else icon = create_icon('material-icons', 'cancel', 20, 'red');
        status.appendChild(icon)
        // ? create element pre with variable name is content to render status question

        let answers = create_element('table', '', 'answer')
        // ? tạo ra trường câu trả lời

        let answersInfo = element[1]

        switch (questionInfo.kind_of_question) { //kiểm tra kiểu câu trả lời
          case 'only optional': // trắc nhiệm 1 đáp án
            answersInfo.map((element => {

              const p = create_element('p', '', '', element.answer)

              if (element.isTrue) p.style.backgroundColor = "rgba(47, 158, 80, 0.54)";
              else p.style.backgroundColor = 'rgba(255, 0, 0, 0.54)';


              // ! element.isTrue

              answers.appendChild(p)
            }))

            break;
          case 'multi optional': // trắc nhiệm nhiều đáp án
            answersInfo.map(element => {
              const p = create_element('p', '', '', element.answer)

              if (element.isTrue) p.style.backgroundColor = "rgba(47, 158, 80, 0.54)";
              else p.style.backgroundColor = 'rgba(255, 0, 0, 0.54)';




              // ! element.isTrue

              answers.appendChild(p)
            })
            break;
          default:
            // mặc định là câu trả lời tự luận
            const li2 = create_element('pre', 'essay', '', `${element[1][0].answer}`)

            answers.appendChild(li2)

        }



        //! hiển thị các thành phần
        question.appendChild(stt);
        question.appendChild(content);
        if (questionInfo.image) {
          question.appendChild(image)
        }
        question.appendChild(timeSent);
        question.appendChild(status);
        question.appendChild(answers);
        // ! appear in body
        body_page.appendChild(question);
      }
    )

    let button_disapprovals = create_element('button', 'disapprovals-button')
    button_disapprovals.innerHTML = '<i class="material-icons" style="font-size:36px;">cancel</i>'
    // ! tạo button
    let button_approvals = create_element('button', 'approvals-button', '', "APPROVALS")
    button_approvals.innerHTML = '<i class="material-icons" style="font-size:36px">done</i>'

    let show_more = create_element('button', 'show_more', '', "APPROVALS")
    show_more.innerHTML = `<i class="material-icons" style="font-size:35px">arrow_drop_down_circle</i>`
    // ! nút chọn data

    const selection_approvals = create_element('button', 'set_data_approvals', 'set_data_button')
    const icon_check = create_icon('material-icons', 'check', 20, 'green')
    selection_approvals.appendChild(icon_check)

    const selection_disapprovals = create_element('button', 'set_data_disapprovals', 'set_data_button')
    const icon_cancel = create_icon('material-icons', 'cancel', 20, 'red')
    selection_disapprovals.appendChild(icon_cancel)


    const selection_await = create_element('button', 'set_data_await', 'set_data_button')
    const icon_access_time = create_icon('material-icons', 'access_time', 20, 'orange')
    selection_await.appendChild(icon_access_time)


    const selection_all = create_element('button', 'set_data_all', 'set_data_button')
    const icon_archive = create_icon('material-icons', 'archive', 20, 'rgba(50, 164, 230)')
    selection_all.appendChild(icon_archive)

    const form_button_select = create_element('div', 'select_form_button')
    form_button_select.appendChild(selection_all)
    form_button_select.appendChild(selection_approvals)
    form_button_select.appendChild(selection_disapprovals)
    form_button_select.appendChild(selection_await)
    body_page.appendChild(form_button_select)

    body_page.appendChild(button_disapprovals)
    body_page.appendChild(button_approvals)

    body_page.appendChild(show_more)
  } else {
    // ! khi chưa đăng nhập thì sẽ được chuyển tới trang đăng nhâp admin
    event_change_page('http://127.0.0.1:5500/HTML/Login_HTML/login_admin.html')
  }
}

// ! logout
function logout() { // hàm logout
  sessionStorage.removeItem('status_login')
  location.reload()
}


// TODO: add event listeners
document.addEventListener("load", handleLoadPage())
document.getElementById('disapprovals-button').addEventListener('click', event_disapproval)
document.getElementById('approvals-button').addEventListener('click', event_approval)
document.getElementById('title').addEventListener('click', logout)
document.getElementById('show_more').addEventListener('click', event_show_more)
document.getElementById('set_data_approvals').addEventListener('click', selection_data_approvals)
document.getElementById('set_data_disapprovals').addEventListener('click', selection_data_disapprovals)
document.getElementById('set_data_await').addEventListener('click', selection_data_await);
document.getElementById('set_data_all').addEventListener('click', selection_data_all)
document.addEventListener("scroll", function () {
  const body_page = document.getElementById('main_page');
  const changeTopButton = document.getElementById('change_top');

  if (window.scrollY >= 800) {
    if (!changeTopButton) {
      const change_top = create_element('button', 'change_top');
      const icon = create_icon('material-icons', 'expand_less', 20)
      change_top.appendChild(icon)
      body_page.appendChild(change_top);
      change_top.addEventListener('click', function () {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' 
        });
      });
    }
  } else {
    if (changeTopButton) {
      changeTopButton.remove();
    }
  }
});
