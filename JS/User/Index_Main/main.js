
// TODO: set fake data 

import { create_element } from "http://127.0.0.1:5500/JS/Logic/create-element.js";
import { create_table } from "http://127.0.0.1:5500/JS/Logic/create-row.js";
import { get_element_id } from "http://127.0.0.1:5500/JS/Logic/get_element_id.js";
import { get_item } from "http://127.0.0.1:5500/JS/Logic/storage.js";
import { event_change_page } from "../../Logic/event-change-page.js";

// TODO: function handle listeners event
function handleLoadPage() {
  const bodyPage = get_element_id("main_page")
  const dataUser = get_item('account', 'session')

  const nav_tag_2 = get_element_id("nav_tag_2")
  // ! kiểm tra đăng nhập
  if (dataUser == null) { 
    // ! nếu chưa đăng nhập thì tạo trang đăng nhâp
    
    let nav1 = create_element("a", '', 'home', "Đăng nhập");
    let nav2 = create_element("a", '', 'home', "Đăng kí");
    nav1.setAttribute("href", "http://127.0.0.1:5500/HTML/Login_HTML/login_user.html");
    nav2.setAttribute("href", "http://127.0.0.1:5500/HTML/SignUP_HTML/sign_up.html");
    nav_tag_2.appendChild(nav1);
    nav_tag_2.appendChild(nav2);

    let notification = create_element("h1", 'notification', '', 'Đăng nhập để sử dụng dịch vụ')
    // ? thông báo yêu cầu đăng nhập
    bodyPage.appendChild(notification); // ? hiện thị thông báo
  } else {
  // ! trạng thái đã đăng nhập
    const table = create_table(dataUser.id, dataUser.fullName, dataUser.address, dataUser.age);

    const frame = create_element("div", "frame_info");
   
  //! hiện thị các element
    frame.appendChild(table);
  // ! tạo trường hiển thi tên ở thanh nav_bar
    bodyPage.appendChild(frame);
    let fullName = create_element('h2', 'logout', '', dataUser.fullName);
    nav_tag_2.appendChild(fullName);

  }

}


// ! logout
// ? tạo hàm đăng xuất
function logout() { 
  sessionStorage.removeItem('account'); // ? xoá thông tin đăng nhập
  location.reload(); // ? load lại trang web
}

// ! change page topic
function change_topic() {
  const dataUser = get_item('account', 'session')
  if (dataUser != null) event_change_page('http://127.0.0.1:5500/HTML/topic-page.html');
  else alert("Bạn phải đăng nhập để sử dụng dịch vụ");
}
// TODO: add event listeners
document.addEventListener("load", handleLoadPage()) // ? sự kiện load trang sẽ chạy hàm handleLoadPage
document.getElementById('logout').addEventListener('click', logout) // ? sự kiện đăng xuất sẽ chạy hàm logout
document.getElementById('question_topic').addEventListener('click', change_topic) // ?