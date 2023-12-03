// TODO: function handle listeners event
// ! hàm được tạo để tạo ra các element và hiển thị ra trang web
function handleLoadPage() {
  const body_page = document.getElementById('main_page') // lấy ra thành phần main page
  const nav_tag = document.getElementById('nav_tag_2') //lấy ra thành phần nav bar
  const status_login = JSON.parse(sessionStorage.getItem('status_login')) // trạng thái đăng nhâpj của admin

  if (status_login != null) { // kiểm tra trạng thái đăng nhấpj của admin
    //! create title 
    const title = document.createElement('h1') //tạo ra title admin
    title.innerHTML = 'Admin' // thêm text cho thẻ
    title.setAttribute('id', 'title')//thêm id cho thẻ
    nav_tag.appendChild(title)//hiển thị thẻ

    // ! get data from local storage
    const data = JSON.parse(localStorage.getItem('data_question')) // ! lấy dữ liệu câu hỏi từ kho lưu chữ
    //! chuyển dữ liệu từ dạng JSON qua javascript

    data.map( // hàm lấy ra từng dư liệu của nhỏ
      (element) => {
        let questionInfo = element[0]
        let question = document.createElement('div') // ? create element div with variable name is question
        question.setAttribute("class", "question") // ? set the class for the question element div tag
        let content = document.createElement("pre") // ? create element pre with variable name is content to render content question
        let stt = document.createElement("pre") // ? create element pre with variable name is content to render stt question
        let timeSent = document.createElement("pre") // ? create element pre with variable name is content to render timeSent question
        let status = document.createElement("pre") // ? create element pre with variable name is content to render status question
        // let kind_of_question_render = document.createElement("pre") // ? create element pre
        // kind_of_questionInfo: ${questionInfo.kind_of_question}`
        content.innerHTML = `Question: ${questionInfo.content}` // ? nhập dữ liêu cho content
        stt.innerHTML = `Ordinal number: ${questionInfo.stt}` // ? nhập dữ liệu cho ô thứ tự
        timeSent.innerHTML = `Time sent question: ${questionInfo.time_sent_answer}` // ? nhập dữ liệu thời gian gửi
        status.innerHTML = `Status: ${questionInfo.status}` // ? nhập dữ liệu về trạng thái của câu hỏi
        let answers = document.createElement('ul'); // tạo ra trường câu trả lời
        answers.setAttribute("class", "answer")
        let answersInfo = element[1]
        switch (questionInfo.kind_of_question) { //kiểm tra kiểu câu trả lời
          case 'only optional': // trắc nhiệm 1 đáp án
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
          case 'multi optional': // trắc nhiệm nhiều đáp án
            answersInfo.map(element => {
              console.log(element);
              const li1 = document.createElement('pre')
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
          default: // mặc đinhj là câu trả lời tự luận
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
    let button_disapprovals = document.createElement('button') // ! tạo button 
    button_disapprovals.setAttribute("id", "disapprovals-button")
    button_disapprovals.innerHTML = "DISAPPROVALS";
    let button_approvals = document.createElement('button');
    button_approvals.setAttribute("id", "approvals-button");
    button_approvals.innerHTML = "APPROVALS";
    let group_button = document.createElement('div');
    group_button.appendChild(button_approvals);
    group_button.appendChild(button_disapprovals);
    group_button.setAttribute("class", "group_button");

    body_page.appendChild(group_button)
  } else { // ! khi chưa đăng nhập thì sẽ được chuyển tới trang đăng nhâp admin
    const change_page = document.createElement('a') // tạo ra 1 element ảo
    change_page.setAttribute('href', 'http://127.0.0.1:5500/HTML/Login_HTML/login_admin.html') // taọ router của element ảo
    change_page.click(); //kích hoạt element ảo
  }

}


// ! function handle approval request
function handleApprovalRequest() {
  const data = JSON.parse(localStorage.getItem("data_question"));
  const stt_question = parseInt(prompt("Enter ordinal number approvals request:"))
  console.log(stt_question);
  let approvals_question_stt = null
  data.map((element, index) => {
    if (stt_question === element[0].stt) {
      approvals_question_stt = index
    }
  })
  let data_question = data[approvals_question_stt]
  data_question[0].status = 'approvals'
  data[approvals_question_stt] = data_question
  localStorage.setItem("data_question", JSON.stringify(data))
  location.reload()
}

// ! function handle disapproval request
function handleDisapprovalRequest() {
  const data = JSON.parse(localStorage.getItem("data_question"));
  setTimeout(() => { const stt_question = parseInt(prompt("Enter ordinal number disapprovals request:")) }, 2500)
  data.map((element, index) => {
    if (stt_question === element[0].stt) {
      approvals_question_stt = index
    }
  })
  let data_question = data[stt_question]
  data_question[0].status = 'disapprovals'
  data[approvals_question_stt] = data_question
  localStorage.setItem("data_question", JSON.stringify(data))
  location.reload()
}
// ! logout
function logout() { // hàm logout
  const status_login = JSON.parse(sessionStorage.getItem("status_login"))
  status_login.admin_login = false // chuyển trang thái đắng nhập thành fasle
  sessionStorage.setItem("status_login", JSON.stringify(status_login)) // câp nhật trạng thái
  location.reload() // load lại trang
}

// TODO: add event listeners
document.addEventListener("load", handleLoadPage()) 
document.getElementById('disapprovals-button').addEventListener('click', handleDisapprovalRequest)
document.getElementById('approvals-button').addEventListener('click', handleApprovalRequest)
document.getElementById('title').addEventListener('click', logout)