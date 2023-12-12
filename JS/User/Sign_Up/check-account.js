export function check_already_accounted(accounts, username) {
  const account = accounts.filter(account => account.username === username);
  if (account[0]) {
    return true;
  }
  else {
    return false;
  }
};
