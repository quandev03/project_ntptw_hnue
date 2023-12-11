import { event_change_page } from "http://127.0.0.1:5500/JS/Logic/event-change-page.js"
import { get_item } from "http://127.0.0.1:5500/JS/Logic/storage.js";

document
  .getElementById('html')
  .addEventListener('click', () => event_change_page('http://127.0.0.1:5500/HTML/page_404.html'));
document
  .getElementById('css')
  .addEventListener('click', () => event_change_page('http://127.0.0.1:5500/HTML/page_404.html'));
document
  .getElementById('js')
  .addEventListener('click', () => event_change_page('http://127.0.0.1:5500/HTML/Question_HTML/question_user.html'));

document
  .getElementById('back')
  .addEventListener(
    'click',
    () => {
      event_change_page('http://127.0.0.1:5500');
    }
)
function handle_load_page ()  {
  let dataUser = get_item('account', 'session');
  if (!dataUser) event_change_page('http://127.0.0.1:5500');
}
document.addEventListener('load', handle_load_page());