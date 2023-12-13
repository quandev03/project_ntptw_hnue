// TODO: handle function

import { create_element } from "../../Logic/create-element.js"
import { create_icon } from "../../Logic/create-icon.js"
import { event_change_page } from "../../Logic/event-change-page.js"
import { get_date } from "../../Logic/get-date.js"
import { get_element_id } from "../../Logic/get_element_id.js"
import { get_item } from "../../Logic/storage.js"
import { event_add_question } from "./event-add-question.js"
import { delete_question } from "./event-delete-question.js"
import { edit_question } from "./event-edit-question.js"
let status_sm = false;
const event_show_mode = () => {
  status_sm = !status_sm
  if (status_sm) {
    document.getElementById('add-question-button').style.display = 'block';
    document.getElementById('edit-button').style.display = 'block';
    document.getElementById('delete-button').style.display = 'block';
    document.getElementById('hidden').innerHTML = `<i class="material-icons" style="font-size:35px; color: #fff">highlight_off</i>`;
    
  }
  else {
    document.getElementById('delete-button').style.display = 'none';
    document.getElementById('edit-button').style.display = 'none';
    document.getElementById('add-question-button').style.display = 'none';
    document.getElementById('hidden').innerHTML = `<i class="material-icons" style="font-size:35px">arrow_drop_down_circle</i>`;
  }
}
function handleLoadPage() {
  const bodyPage = get_element_id("main_page");
  let dataUser = get_item('account', 'session');
  if (!dataUser) event_change_page('./../../../index.html');
  let dataQuestion = get_item('data_question', 'local');
  if (dataQuestion === null) {
    dataQuestion = new Array();
  };

  // ! selection data question
  let data_question = dataQuestion.filter((element) => dataUser.id == element[0].id_user);

  const nav_tag_2 = get_element_id("nav_tag_2");
  if (dataUser == null) {
  }
  else
  {
    // ! information account
    let fullName = create_element('h2', 'logout', '', dataUser.fullName);
    fullName.innerHTML = dataUser.fullName;
    fullName.setAttribute('id', 'logout');
    nav_tag_2.appendChild(fullName);

    // ! render question
    if (data_question[0] != null) {

      //! render a question
      data_question.map(
        (element) => {
          let questionInfo = element[0]

          let question = create_element('div', '', 'question');
          let content = create_element('p', '', 'content', `Câu hỏi: ${questionInfo.content}`);
          let image;
          
          if (questionInfo.image) {
          image = create_element('img', '', 'images');
          image.src = questionInfo.image;
          };
          
          let stt = create_element('pre', '', '', `ID: ${questionInfo.stt}`);

          let timeSent = create_element('pre', '', '', `Thời gian gửi: ${get_date(questionInfo.time_sent_answer)}`);
          let status = create_element('pre', '', 'status', `Status:`);
        // !  approved, waiting for approval, not approved
          let icon;
          if (questionInfo.status == 'approvals') icon = create_icon('material-icons', 'check', 20, 'green');
          else if (questionInfo.status == 'waiting for approval') icon = create_icon('material-icons', 'access_time', 20, 'orange');
          else icon = create_icon('material-icons', 'cancel', 20, 'red');
          status.appendChild(icon);
          
          let answers = create_element('table');
          answers.setAttribute("class", "answer");
          let answersInfo = element[1];

          switch (questionInfo.kind_of_question) {

            case 'only optional':
              answersInfo.map((element => {
                const p = create_element('p', '', 'answer_choose', element.answer)  
                if (element.isTrue) p.style.backgroundColor = "rgba(47, 158, 80, 0.54)";
                else p.style.backgroundColor = 'rgba(255, 0, 0, 0.54)';
                answers.appendChild(p)
              })) 
              break;
            
            case 'multi optional':
              answersInfo.map(element => {
                const p = create_element('p', '', 'answer_choose', element.answer)
                if (element.isTrue) p.style.backgroundColor = "rgba(47, 158, 80, 0.54)";
                else p.style.backgroundColor = 'rgba(255, 0, 0, 0.54)';
                answers.appendChild(p)
              })
              break;
            
            default:
              const li2 = create_element('pre', 'essay', '', ` Đáp án: ${element[1][0].answer}`);
              answers.appendChild(li2)             
          };

          // ! appear in div card
          question.appendChild(stt);
          question.appendChild(content);
          if (questionInfo.image) {
            question.appendChild(image);
          };
          question.appendChild(timeSent);
          question.appendChild(status);
          question.appendChild(answers);

          // ! appear in body
          bodyPage.appendChild(question);
        }
      )
    }
    else {
      const frame = create_element("div", '', 'frame_title');
      const title = create_element("h1", 'no_question', 'title-h1', 'Không có câu hỏi nào');
      frame.appendChild(title);
      bodyPage.appendChild(frame);
    }

    const button_edit = create_element("button", 'edit-button', '');
    const button_delete = create_element('button', "delete-button", '');
    const button_add_question = create_element('button', "add-question-button", '');
    button_delete.innerHTML = '<i class="material-icons" style="font-size:25px">delete</i>';
    button_edit.innerHTML = '<i class="material-icons" style="font-size:25px">build</i>';
    button_add_question.innerHTML = '<i class="material-icons" style="font-size:25px">add_circle_outline</i>';

    const hidden = create_element('button', 'hidden');
    hidden.innerHTML = '<i class="material-icons" style="font-size:35px">arrow_drop_down_circle</i>';

    bodyPage.appendChild(button_add_question);
    bodyPage.appendChild(button_edit);
    bodyPage.appendChild(button_delete);
    bodyPage.appendChild(hidden);
  }  
}

// ! logout
function logout() { 
  sessionStorage.removeItem('account');
  event_change_page('./../../../index.html');
}

// TODO: add event listeners
document.addEventListener("load", handleLoadPage());
document.getElementById('edit-button').addEventListener("click", edit_question);
document.getElementById('delete-button').addEventListener("click", delete_question);
document.getElementById('add-question-button').addEventListener('click', event_add_question);
document.getElementById('logout').addEventListener('click', logout);
document.getElementById('hidden').addEventListener('click', event_show_mode);
document.addEventListener("scroll", function () {
  const body_page = document.getElementById('main_page');
  const changeTopButton = document.getElementById('change_top');
  if (window.scrollY >= 800) {
    if (!changeTopButton) {
      const change_top = create_element('button', 'change_top');
      const icon = create_icon('material-icons', 'expand_less', 20);
      change_top.appendChild(icon);
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
