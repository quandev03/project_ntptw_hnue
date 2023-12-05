
// TODO: set fake data 

import { create_element } from "../../Logic/create-element.js";
import { get_element_id } from "../../Logic/get_element_id.js";
import { get_item } from "../../Logic/storage.js";

// TODO: function handle listeners event
function handleLoadPage() {
  const bodyPage = get_element_id("main_page")
  let dataUser = get_item('account', 'session')

  const nav_tag_2 = get_element_id("nav_tag_2")
  // ! kiểm tra đăng nhập
  if (dataUser == null) { 
    // ! nếu chưa đăng nhập thì tạo trang đăng nhâp
    
    let nav1 = create_element("a", '', 'home', "Login")
    let nav2 = create_element("a", '', 'home', "Sign Up")
    nav1.setAttribute("href", "http://127.0.0.1:5500/HTML/Login_HTML/login_user.html")
    nav2.setAttribute("href", "http://127.0.0.1:5500/HTML/SignUP_HTML/sign_up.html")
    nav_tag_2.appendChild(nav1)
    nav_tag_2.appendChild(nav2)

    let notification = create_element("h1", '', '', 'Please login to use services')
    // ? thông báo yêu cầu đăng nhập
    bodyPage.appendChild(notification) // ? hiện thị thông báo
  } else {
  // ! trạng thái đã đăng nhập
    let idRender = create_element("pre", '', '', `user ID: ${dataUser.id}`)
    // ? tạo element hiển thị id
    let idFullName = create_element("pre", '', '', ` full name: ${dataUser.fullName}`)
    // ? tạo element hiển thị tên đầy đủ
    let idAge = create_element("pre", '', '', ` age: ${dataUser.age}`)
    // ? tạo element hiển thị tuổi
    let idAddress = create_element("pre", '', '', `address: ${dataUser.address}`)
    // ? tạo element hiển thị địa chỉ

  //! hiện thị các element
  bodyPage.appendChild(idRender)
  bodyPage.appendChild(idFullName)
  bodyPage.appendChild(idAge)
  bodyPage.appendChild(idAddress)
  // ! tạo trường hiển thi tên ở thanh nav_bar
    
  let fullName = create_element('h2', 'logout', '', dataUser.fullName)

  nav_tag_2.appendChild(fullName)

  }

}


// ! logout
// ? tạo hàm đăng xuất
function logout() { 
  sessionStorage.removeItem('account') // ? xoá thông tin đăng nhập
  location.reload() // ? load lại trang web
}



// TODO: add event listeners
document.addEventListener("load", handleLoadPage()) // ? sự kiện load trang sẽ chaỵ hàm handleLoadPage
document.getElementById('logout').addEventListener('click', logout) // ? sự kiên đăng xuất sẽ chạy hàm logout