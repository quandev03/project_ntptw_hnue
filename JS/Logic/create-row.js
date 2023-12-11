import { create_element } from "http://127.0.0.1:5500/JS/Logic/create-element.js"

export const create_table = (
  id,
  full_name,
  address,
  age
) => {
  const table = create_element('table');
  const id_R = create_element('tr');
  const full_name_R = create_element('tr');
  const address_R = create_element('tr');
  const age_R = create_element('tr');

  const id_T = create_element('th', '', '', "ID");
  const full_name_T = create_element('th', '', '', "Họ tên:");
  const address_T = create_element('th', '', '', "Địa chỉ:");
  const age_T = create_element('th', '', '', "Tuổi");

  const id_C = create_element('td', '', '', `${id}`);
  const full_name_C = create_element('td', '', '', `${full_name}`);
  const address_C = create_element('td', '', '', `${address}`);
  const age_C = create_element('td', '', '', `${age}`);

  id_R.appendChild(id_T);
  id_R.appendChild(id_C);

  full_name_R.appendChild(full_name_T);
  full_name_R.appendChild(full_name_C);

  address_R.appendChild(address_T);
  address_R.appendChild(address_C);

  age_R.appendChild(age_T);
  age_R.appendChild(age_C);

  table.appendChild(id_R);
  table.appendChild(full_name_R);
  table.appendChild(age_R);
  table.appendChild(address_R);

  return table;
  

}