import { event_change_page } from "./../../JS/Logic/event-change-page.js"
import { get_item } from "./../../JS/Logic/storage.js";

document
  .getElementById('html')
  .addEventListener('click', () => event_change_page('./../../HTML/page_404.html'));
document
  .getElementById('css')
  .addEventListener('click', () => event_change_page('./../../HTML/page_404.html'));
document
  .getElementById('js')
  .addEventListener('click', () => event_change_page('./../../HTML/Question_HTML/question_user.html'));

document
  .getElementById('back')
  .addEventListener(
    'click',
    () => {
      event_change_page('./../../index.html');
    }
)
function handle_load_page ()  {
  let dataUser = get_item('account', 'session');
  if (!dataUser) event_change_page('./../../index.html');
}
document.addEventListener('load', handle_load_page());