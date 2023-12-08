import { event_change_page } from "../Logic/event-change-page.js"
import { get_item } from "../Logic/storage.js";

document
  .getElementById('html')
  .addEventListener('click', () => { event_change_page('http://127.0.0.1:5500/HTML/page_404.html') });
document
  .getElementById('css')
  .addEventListener('click', () => { event_change_page('http://127.0.0.1:5500/HTML/page_404.html') });
document
  .getElementById('js')
  .addEventListener('click', () => { event_change_page('http://127.0.0.1:5500/HTML/Question_HTML/question_user.html') });

document
  .getElementById('back')
  .addEventListener(
    'click',
    () => { event_change_page('http://127.0.0.1:5500') }
)
function handle_load_page ()  {
  console.log('af');
  let dataUser = get_item('account', 'session');
  console.log(dataUser);
  if (!dataUser) event_change_page('http://127.0.0.1:5500/index.html')
}
document.addEventListener('load', handle_load_page())