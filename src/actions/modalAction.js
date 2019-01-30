import axios from 'axios';

export const openModal = name => dispatch => dispatch({
  type: 'OPEN_MODAL',
  name
});

export const closeModal = () => dispatch => dispatch({
  type: 'CLOSE_MODAL',
});

