export const reset_info = () => { 
  get_element_id('username_input').value = null;
  get_element_id('fullName_input').value = null;
  get_element_id('age_input').value = null;
  get_element_id('address_input').value = null;
  get_element_id('password_input').value = null;
  get_element_id('password_confirm_input').value = null;
}