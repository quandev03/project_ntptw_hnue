// TODO: function handle listeners event
function handleLoadPage() {
  const body_page = document.getElementById('main_page')
  const nav_tag = document.getElementById('nav_tag_2')
  const status_login = JSON.parse(sessionStorage.getItem('status_login'))
  console.log(status_login);
  if (status_login != null) {
    //! create title 
    const title = document.createElement('h1')
    title.innerHTML = 'Admin'
    title.setAttribute('id', 'title')
    nav_tag.appendChild(title)

    // ! get data from local storage
    const data = JSON.parse(localStorage.getItem('data_question'))

    data.map(
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
        content.innerHTML = `Question: ${questionInfo.content}`
        stt.innerHTML = `Ordinal number: ${questionInfo.stt}`
        timeSent.innerHTML = `Time sent question: ${questionInfo.time_sent_answer}`
        status.innerHTML = `Status: ${questionInfo.status}`
        let answers = document.createElement('ul');
        answers.setAttribute("class", "answer")
        let answersInfo = element[1]
        switch (questionInfo.kind_of_question) {
          case 'only optional':
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
          case 'multi optional':
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
          default:
            const li2 = document.createElement('pre')
            li2.innerHTML = ` Answer: ${element[1][0].answer}`
            answers.appendChild(li2)

        }
        question.appendChild(stt);
        question.appendChild(content);
        question.appendChild(timeSent);
        question.appendChild(status);
        question.appendChild(answers);



        // ! appear in body
        body_page.appendChild(question);



      }
    )
    let button_disapprovals = document.createElement('button')
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
  } else {
    const change_page = document.createElement('a')
    change_page.setAttribute('href', 'http://127.0.0.1:5500/HTML/Login_HTML/login_admin.html')
    change_page.click();
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
function logout() {
  const status_login = JSON.parse(sessionStorage.getItem("status_login"))
  status_login.admin_login = false
  sessionStorage.setItem("status_login", JSON.stringify(status_login))
  location.reload()
}

// TODO: add event listeners
document.addEventListener("load", handleLoadPage())
document.getElementById('disapprovals-button').addEventListener('click', handleDisapprovalRequest)
document.getElementById('approvals-button').addEventListener('click', handleApprovalRequest)
document.getElementById('title').addEventListener('click', logout)