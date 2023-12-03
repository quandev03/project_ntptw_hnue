// TODO: function handle listeners event
// ! onload: function handle
function handleLoadPage() {
  // ! lấy dữ liệu về
  const bodyPage = document.getElementById("main_page")
  let dataUser = JSON.parse(sessionStorage.getItem("account"))
  const nav_tag_2 = document.getElementById("nav_tag_2")
  if (dataUser == null) { //? kiểm tra trạng thái đăng nhập
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
    // ? hiện thị tên tải khoản
    let fullName = document.createElement('h2')
    fullName.innerHTML = dataUser.fullName
    fullName.setAttribute('id', 'logout')
    nav_tag_2.appendChild(fullName)

    // ! fetch data from local storage
    const data_question = JSON.parse(localStorage.getItem('data_question')) // lấy dữ liệu câu hỏi
    const edit_question_stt = JSON.parse(localStorage.getItem('edit_question_stt')) // lấy id câu hỏi cần chỉnh sửa
    const question_edit = data_question.splice(edit_question_stt, edit_question_stt + 1) // ? lấy câu hỏi cần trỉnh sửa
    const info_question = question_edit[0][0] // ? lấy thông tin câu hỏi
    const info_answer = question_edit[0][1] // ? lấy thông tin của các câu trả lời
    
    // ! render add questions
    // ? hiện thị tiêu để trang web
    let title = document.createElement('h1')
    title.innerHTML = "Edit Question"
    title.setAttribute('id', 'title') // ! id tiêu đề

    // ! question // ! hiển thị câu hỏi
    let labels = document.createElement('label')
    labels.setAttribute("class", "label")
    labels.innerHTML = "Your question: " // ? tạp tiêu đề
    let question = document.createElement('input') // ? hiển thị nội dung câu hỏi
    question.setAttribute('placeholder', "enter question in here")
    question.setAttribute('id', 'question_input')
    question.value = info_question.content
    labels.setAttribute('for', 'question_input')
    let from_question = document.createElement('div') // ? tạo form nôij dung câu hỏi
    from_question.setAttribute('id', 'from_question')
    from_question.appendChild(labels)
    from_question.appendChild(question)

    // ! kind of question
    // ? hiện thị kiểu câu hỏi
    let label_kind_of_question = document.createElement('label')
    label_kind_of_question.setAttribute('for', 'kind_of_question')
    label_kind_of_question.innerHTML = 'Kind of question:  '
    label_kind_of_question.setAttribute("class", "label")

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
    // ? hiện thị các các lựa chọn của câu hỏi

    kind_of_question.appendChild(essay)
    kind_of_question.appendChild(only_optional)
    kind_of_question.appendChild(multi_optional)
    kind_of_question.value =info_question.kind_of_question
    kind_of_question.setAttribute('id', 'kind_of_question')
    

    // ! tạo from cho select kiểu cẩu hỏi
    let from_kind_of_question = document.createElement('div')
    from_kind_of_question.appendChild(label_kind_of_question)
    from_kind_of_question.appendChild(kind_of_question)
    
    // ! enter the answer in here
    let answers = document.createElement('div')
    answers.setAttribute('id', 'answer') 
    switch (info_question.kind_of_question) { // ? kiểm tra kiểu của câu hỏi
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
    let button = document.createElement('button') // ? tạo nút submit
    button.setAttribute('id', 'button_submit')
    button.setAttribute('type', 'submit')
    button.innerHTML = 'Submit'
    // ! frame
    const frame_editor = document.createElement("div") // ? tạo frame hiện thị các element
    frame_editor.setAttribute('id', 'frame_editor')
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

function handle_submit() { // ? tạo hàm submit
  // ! fetch data
  const data_question = JSON.parse(localStorage.getItem('data_question'))
  const edit_question_stt = JSON.parse(localStorage.getItem('edit_question_stt'))
  const question_edit = data_question.splice(edit_question_stt, edit_question_stt + 1)
  const info_question = question_edit[0][0] // ? lấy thông tin câu hỏi
  const info_answer = question_edit[0][1] // ? lấy thông tin câu trả lời
  let number_of_response = info_answer.length
  const kind_of_question = document.getElementById('kind_of_question').value
  let list_answer
  const answers = localStorage.getItem('answers')
  switch (kind_of_question) {
    case 'multi optional':
      let responses_checkbox = []
      for (let i = 0; i < number_of_response; i++) { // ? lấy thông tin câu trả lời
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
      // ? lấy thông tin câu trả lời
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
      // ? lấy thông tin câu trả lời
      const answer = [{
        answer: document.getElementById('answer-essay').value,
        isTrue: true
      }]
      list_answer = answer
      break;
    default:
      alert("Error: Unknown")
  }
  const time_sent_answer = new Date(Date.now()) // ? lấy thời gian gửi
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
  
  location.reload(); // ? load lại trang
  const change_page = document.createElement('a')
  change_page.setAttribute('href', 'http://127.0.0.1:5500/HTML/Question_HTML/question_user.html')
  change_page.setAttribute('hidden', true)
  change_page.click()
}

//! logout
function logout() { // ? hàm xử lí sự kiệu đăng xuất
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

