
// TODO: set import function

import { create_element } from "./../../../JS/Logic/create-element.js";
import { create_table } from "./../../../JS/Logic/create-row.js";
import { get_element_id } from "./../../../JS/Logic/get_element_id.js";
import { get_item } from "./../../../JS/Logic/storage.js";
import { event_change_page } from "../../Logic/event-change-page.js";

// TODO: function handle listeners event
function handleLoadPage() {

  // ! get data and selected element
  const bodyPage = get_element_id("main_page")
  const dataUser = get_item('account', 'session')
  const nav_tag_2 = get_element_id("nav_tag_2")

  // ! login
  if (dataUser == null) { 
    let nav1 = create_element("a", '', 'home', "Đăng nhập");
    let nav2 = create_element("a", '', 'home', "Đăng kí");
    nav1.setAttribute("href", "./HTML/Login_HTML/login_user.html");
    nav2.setAttribute("href", "./HTML/SignUP_HTML/sign_up.html");
    nav_tag_2.appendChild(nav1);
    nav_tag_2.appendChild(nav2);
    let notification = create_element("h1", 'notification', '', 'Đăng nhập để sử dụng dịch vụ')
    bodyPage.appendChild(notification);
  } else {
    //! infor account render
    const table = create_table(dataUser.id, dataUser.fullName, dataUser.address, dataUser.age);
    const frame = create_element("div", "frame_info");
    frame.appendChild(table);
    bodyPage.appendChild(frame);
    let fullName = create_element('h2', 'logout', '', dataUser.fullName);
    nav_tag_2.appendChild(fullName);
  }
}

// ! logout
function logout() { 
  sessionStorage.removeItem('account');
  location.reload();
}

// ! change page topic
function change_topic() {
  const dataUser = get_item('account', 'session')
  if (dataUser != null) event_change_page('./HTML/topic-page.html');
  else alert("Bạn phải đăng nhập để sử dụng dịch vụ");
}
// ! change page test
function change_test() {
  const dataUser = get_item('account', 'session')
  if (dataUser != null) event_change_page('./HTML/exam.html');
  else alert("Bạn phải đăng nhập để sử dụng dịch vụ");
}
// TODO: add event listeners
document.addEventListener("load", handleLoadPage());
document.getElementById('logout').addEventListener('click', logout);
document.getElementById('question_topic').addEventListener('click', change_topic);
document.getElementById('flash_test').addEventListener('click', change_test);
//flash_test