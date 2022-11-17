const events = {
  connection: 'connection',
  CLIENT: {
    ADD_USER: 'add_user',
    SEND_MESSAGE: 'send_message',
    KEY_DOWN: 'key_down',
  },
  SERVER: {
    GET_USERS: 'get_users',
    GET_MESSAGE: 'get_message',
    LOADING: 'loading',
  },
};
export default events;
