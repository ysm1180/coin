import axios from 'axios';

function getServerAxios() {
  const headers = {
    'content-type': 'application/json',
  };
  const instance = axios.create({
    headers,
  });

  return instance;
}

export function getAccounts() {
  return getServerAxios().get(
    `api/upbit/private/accounts`
  );
}