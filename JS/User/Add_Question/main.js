// TODO: function handle listeners event

import { create_element } from "./../../../JS/Logic/create-element.js"
import { event_change_page } from "./../../../JS/Logic/event-change-page.js"
import { event_selection } from "./../../../JS/User/Add_Question/event_selection.js"
import { handle_submit } from "./../../../JS/User/Add_Question/event_submit.js"
import { get_image } from "../../Logic/get-image.js"
import { get_element_id } from "../../Logic/get_element_id.js"

// ! onload: function handle
function handleLoadPage() {
  const bodyPage = get_element_id("main_page");
  let dataUser = JSON.parse(sessionStorage.getItem("account"));
  const nav_tag_2 = get_element_id("nav_tag_2");
  if (dataUser == null) {
    event_change_page("./../../../HTML/Login_HTML/login_user.html");
  } else {

    // ! information account
    let fullName = create_element('h2', 'logout', 'home', dataUser.fullName);
    nav_tag_2.appendChild(fullName)

    // ! render add questions
    let title = create_element('h1', 'title', '', "Thêm câu hỏi");
    let labels = create_element('label', '', 'label', "Câu hỏi của bạn: ");
    let question = create_element('input', 'question_input');
    question.setAttribute('placeholder', "Nhập câu hỏi của bạn");
    labels.setAttribute('for', 'question_input')
    let from_question = create_element('div', 'from_question') // ! Quan tâm cái này
    from_question.appendChild(labels)
    from_question.appendChild(question)

    let label_kind_of_question = create_element('label', '', 'label', 'Kiểu câu hỏi:  ');
    label_kind_of_question.setAttribute('for', 'kind_of_question');

    let kind_of_question = create_element('select', 'kind_of_question');
    let only_optional = create_element('option', '', '', 'Một đáp án');
    only_optional.setAttribute('value', 'only optional');
    let multi_optional = create_element('option', '', '', 'Nhiều đáp án');
    multi_optional.setAttribute('value', 'multi optional');
    let essay = create_element('option', '', '', 'Tự điền');
    essay.setAttribute('value', 'essay');
    let select = create_element('option', '', '', 'Lựa chọn');
    select.setAttribute('value', 'select');

    // ! rendered selection
    kind_of_question.appendChild(select);
    kind_of_question.appendChild(essay);
    kind_of_question.appendChild(only_optional);
    kind_of_question.appendChild(multi_optional);

    let from_kind_of_question = create_element('div', 'from_kind_of_question');
    from_kind_of_question.appendChild(label_kind_of_question);
    from_kind_of_question.appendChild(kind_of_question);
  
    //! add image
    const get_image = create_element('input', 'get_image');
    get_image.setAttribute('type', 'file');
    get_image.setAttribute('accept', "image/jpeg image/png image/jpg");

    // ! enter the answer in here
    let answer = create_element('div', 'answers');

    // ! button submit
    let button = create_element('button', 'button_submit', '', 'Gửi câu hỏi');
    
    // ! form input 
    const form = create_element('div', 'form_input');
    form.appendChild(title);
    form.appendChild(from_question);
    form.appendChild(get_image);
    form.appendChild(from_kind_of_question);
    form.appendChild(answer);
    form.appendChild(button);

    // ! render website in here
    bodyPage.appendChild(form);    
  }  
}

// ! logout
function logout() {
  sessionStorage.removeItem('account');
  event_change_page('./../../../index.html');
}

// TODO: add event listeners  handlers
document.addEventListener('load', handleLoadPage());
get_element_id('kind_of_question').addEventListener('change', event_selection);
get_element_id('button_submit').addEventListener('click', handle_submit);
get_element_id('logout').addEventListener('click', logout);
get_element_id('get_image').addEventListener('change', get_image);