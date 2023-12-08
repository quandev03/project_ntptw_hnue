// TODO: function handle listeners event

import { create_element } from "../../Logic/create-element.js";
import { event_change_page } from "../../Logic/event-change-page.js";
import { get_element_id } from "../../Logic/get_element_id.js";
import { get_item } from "../../Logic/storage.js"
import { handle_submit } from "./event_submit.js";

// ! onload: function handle
function handleLoadPage() {
  // ! lấy dữ liệu về
  const bodyPage = document.getElementById("main_page")
  let dataUser = get_item('account', 'session')
  const nav_tag_2 = get_element_id('nav_tag_2')
  console.log(dataUser);
  if (!dataUser) { //? kiểm tra trạng thái đăng nhập
    event_change_page('http://127.0.0.1:5500/HTML/Login_HTML/login_user.html')
  } else {
    // ! information account
    // ? hiện thị tên tải khoản
    let fullName = create_element('h2', 'logout', '', dataUser.fullName)
    nav_tag_2.appendChild(fullName)

    // ! fetch data from local storage
    const data_question = get_item('data_question', 'local') // lấy dữ liệu câu hỏi
    const edit_question_stt = get_item('edit_question_stt', 'local') // lấy id câu hỏi cần chỉnh sửa
    const question_edit = data_question.splice(edit_question_stt, edit_question_stt + 1)
    // ? lấy câu hỏi cần trỉnh sửa
    const info_question = question_edit[0][0]
    // ? lấy thông tin câu hỏi
    const info_answer = question_edit[0][1]
    // ? lấy thông tin của các câu trả lời
    
    // ! render add questions
    // ? hiện thị tiêu để trang web
    const title = create_element('h1', 'title', '', 'Sửa câu hỏi')

    // ! question // ! hiển thị câu hỏi
    const labels = create_element('label', '', 'label', "Câu hỏi ")

    const question = create_element('input', 'question_input') // ? hiển thị nội dung câu hỏi
    question.setAttribute('placeholder', "Nhập câu hỏi ở đây")
    question.value = info_question.content
    labels.setAttribute('for', 'question_input')
    const from_question = create_element('div', 'from_question')
    // ? tạo form nội dung câu hỏi

    from_question.appendChild(labels)
    from_question.appendChild(question)

    // ! kind of question
    // ? hiện thị kiểu câu hỏi
    const label_kind_of_question = create_element('label', '', 'label', 'Kiểu câu hỏi  ')
    label_kind_of_question.setAttribute('for', 'kind_of_question')

    const kind_of_question = create_element('select', 'kind_of_question')
    
    const only_optional = create_element('option', '', '', 'Một đáp án')
    only_optional.setAttribute('value', 'only optional')
    
    const multi_optional = create_element('option', '', '', 'Nhiều đáp án')
    multi_optional.setAttribute('value', 'multi optional')
    
    const essay = create_element('option', '', '', 'Tự điền')
    essay.setAttribute('value', 'essay')

    // ! rendered selection
    // ? hiện thị các các lựa chọn của câu hỏi

    kind_of_question.appendChild(essay)
    kind_of_question.appendChild(only_optional)
    kind_of_question.appendChild(multi_optional)
    kind_of_question.value =info_question.kind_of_question
    

    // ! tạo from cho select kiểu cẩu hỏi
    const from_kind_of_question = create_element('div')
    from_kind_of_question.appendChild(label_kind_of_question)
    from_kind_of_question.appendChild(kind_of_question)
    
    // ! enter the answer in here
    const answers = document.createElement('div')
    answers.setAttribute('id', 'answer') 
    switch (info_question.kind_of_question) { // ? kiểm tra kiểu của câu hỏi
      case 'multi optional':
        info_answer.map((element, index) => {
          
          const form_answer = create_element('div', 'list_answer')
          const checkbox = create_element('input', `checkbox_${index}`, '`the_input`');
          checkbox.setAttribute("type", "checkbox")
          checkbox.setAttribute('name', 'checkbox')
          checkbox.checked = element.isTrue
          const answer = create_element('input', `answer_${index}`)
          form_answer.appendChild(checkbox)
          answer.value = element.answer
          form_answer.appendChild(answer)
          answers.appendChild(form_answer)
        }
        );
        break;
      case 'only optional':
        info_answer.map((element, index) => {
          const form_answer = create_element('div', 'list_answer')
          const radio = create_element('input', `radio_${index}`, `the_input` )
          radio.setAttribute("type", "radio")
          radio.setAttribute('name', 'radio')
          radio.checked = element.isTrue
          const answer = create_element('input', `answer_${index}`)
          form_answer.appendChild(radio)
          answer.value = element.answer
          form_answer.appendChild(answer)
          answers.appendChild(form_answer)
        })
        break;
      default:
        const form_answer = create_element('div', 'list_answer')

        const answer = create_element('input')
        answer.value = info_answer[0].answer
        form_answer.appendChild(answer)
        answers.appendChild(form_answer)
    }


    // ! button 
    const button = create_element('button', 'button_submit', '', 'Submit') // ? tạo nút submit
    // ! frame
    const frame_editor = create_element("div", 'frame_editor') // ? tạo frame hiện thị các element

    frame_editor.appendChild(title)
    frame_editor.appendChild(from_question)
    frame_editor.appendChild(from_kind_of_question)
    frame_editor.appendChild(answers)
    frame_editor.appendChild(button)

    // ! render website in
    bodyPage.appendChild(frame_editor) // ? hiện thị element
    
  }  
}



//! onchange the kind of question



//! logout
function logout() { // ? hàm xử lí sự kiệu đăng xuất
  sessionStorage.removeItem('account')
  const change_page = document.createElement('a')
  change_page.setAttribute('href', 'http://127.0.0.1:5500/HTML/main.html')
  change_page.setAttribute('hidden', 'true')
  document.getElementById("main_page").appendChild(change_page)
  change_page.click(document.getElementById('button_submit'));
}
console.log(document.getElementById('button_submit')? false: true);
// TODO: add listeners event handlers
document.addEventListener('load', handleLoadPage())
document.getElementById('button_submit').addEventListener('click', handle_submit)
document.getElementById('logout').addEventListener('click', logout)
// TODO: save code

