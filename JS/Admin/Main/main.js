// TODO: function handle listeners event

import { create_element } from "http://127.0.0.1:5500/JS/Logic/create-element.js";
import { create_icon } from "http://127.0.0.1:5500/JS/Logic/create-icon.js";
import { event_change_page } from "http://127.0.0.1:5500/JS/Logic/event-change-page.js";
import { get_date } from "http://127.0.0.1:5500/JS/Logic/get-date.js";
import { get_element_id } from "http://127.0.0.1:5500/JS/Logic/get_element_id.js";
import { get_item, set_item } from "http://127.0.0.1:5500/JS/Logic/storage.js";
import { event_approval } from "http://127.0.0.1:5500/JS/Admin/Main/event_approval.js";
import { event_disapproval } from "http://127.0.0.1:5500/JS/Admin/Main/event_disapproval.js";
import { selection_data_all, selection_data_approvals, selection_data_await, selection_data_disapprovals } from "./selection_data.js";
let status_sm = false;
const event_show_more = () => {
  status_sm = !status_sm;
  if (status_sm) {
    get_element_id('disapprovals-button').style.display = 'block';
    get_element_id('approvals-button').style.display = 'block';
    get_element_id('show_more').innerHTML = `<i class="material-icons" style="font-size:35px; color: #fff">highlight_off</i>`;

  }
  else {
    get_element_id('disapprovals-button').style.display = 'none';
    get_element_id('approvals-button').style.display = 'none';
    get_element_id('show_more').innerHTML = `<i class="material-icons" ;style="font-size:35px">arrow_drop_down_circle</i>`;
  }
}

// TODO: Handle event load page
function handleLoadPage() {
  const body_page = get_element_id('main_page');
  const nav_tag = get_element_id('nav_tag_2');
  const status_login = JSON.parse(sessionStorage.getItem('status_login'));
  if (status_login != null) {
    //! create title 
    const title = create_element('h1', 'title', '', "Admin");
    nav_tag.appendChild(title);

    // ! get data from local storage
    let data = get_item('data_selection', 'session');
    if (!data) {
      data = new Array();
    }
    data.map( // hàm lấy ra từng dư liệu của nhỏ
      (element) => {
        let questionInfo = element[0];
        console.log(questionInfo.status);

        let question = create_element('div', '', 'question');

        let content = create_element('p', '', 'content', `Câu hỏi: ${questionInfo.content}`);

        let image;

        if (questionInfo.image) {
          image = create_element('img', '', 'images')
          image.src = questionInfo.image;
        }  

        let stt = create_element('pre', '', '', `ID: ${questionInfo.stt}`);

        let timeSent = create_element('pre', '', '', `Thời gian gửi: ${get_date(questionInfo.time_sent_answer)}`);

        let status = create_element('pre', '', 'status', `Trạng thái:`);
        
        let icon;
        if (questionInfo.status == 'approvals') icon = create_icon('material-icons', 'check', 20, 'green');
        else if (questionInfo.status == 'waiting for approval') icon = create_icon('material-icons', 'access_time', 20, 'orange');
        else icon = create_icon('material-icons', 'cancel', 20, 'red');
        status.appendChild(icon);

        let answers = create_element('table', '', 'answer');

        let answersInfo = element[1];

        switch (questionInfo.kind_of_question) {

          case 'only optional': 
            answersInfo.map((element => {
              const p = create_element('p', '', '', element.answer);
              if (element.isTrue) p.style.backgroundColor = "rgba(47, 158, 80, 0.54)";
              else p.style.backgroundColor = 'rgba(255, 0, 0, 0.54)';
              answers.appendChild(p);
            }))
            break;
          
          case 'multi optional':
            answersInfo.map(element => {
              const p = create_element('p', '', '', element.answer);
              if (element.isTrue) p.style.backgroundColor = "rgba(47, 158, 80, 0.54)";
              else p.style.backgroundColor = 'rgba(255, 0, 0, 0.54)';
              answers.appendChild(p);
            })
            break;
          
          default:
            const li2 = create_element('pre', 'essay', '', `${element[1][0].answer}`);
            answers.appendChild(li2);
        }

        //! render element to form questions
        question.appendChild(stt);
        question.appendChild(content);
        if (questionInfo.image) question.appendChild(image)
        question.appendChild(timeSent);
        question.appendChild(status);
        question.appendChild(answers);

        // ! appear in body
        body_page.appendChild(question);
      }
    )

    //! create button approvals and disapprovals
    let button_disapprovals = create_element('button', 'disapprovals-button')
    button_disapprovals.innerHTML = '<i class="material-icons" style="font-size:36px;">cancel</i>'

    let button_approvals = create_element('button', 'approvals-button', '', "APPROVALS")
    button_approvals.innerHTML = '<i class="material-icons" style="font-size:36px">done</i>'

    let show_more = create_element('button', 'show_more', '', "APPROVALS")
    show_more.innerHTML = `<i class="material-icons" style="font-size:35px">arrow_drop_down_circle</i>`

    // ! create select data
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

    // ! render
    body_page.appendChild(button_disapprovals)
    body_page.appendChild(button_approvals)

    body_page.appendChild(show_more)
  } else event_change_page('http://127.0.0.1:5500/HTML/Login_HTML/login_admin.html')
}

// ! logout
function logout() { 
  sessionStorage.removeItem('status_login')
  location.reload()
}


// TODO: add event listeners
document.addEventListener("load", handleLoadPage())
get_element_id('disapprovals-button').addEventListener('click', event_disapproval)
get_element_id('approvals-button').addEventListener('click', event_approval)
get_element_id('title').addEventListener('click', logout)
get_element_id('show_more').addEventListener('click', event_show_more)
get_element_id('set_data_approvals').addEventListener('click', selection_data_approvals)
get_element_id('set_data_disapprovals').addEventListener('click', selection_data_disapprovals)
get_element_id('set_data_await').addEventListener('click', selection_data_await);
get_element_id('set_data_all').addEventListener('click', selection_data_all)
document.addEventListener("scroll", function () {
  const body_page = get_element_id('main_page');
  const changeTopButton = get_element_id('change_top');

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
