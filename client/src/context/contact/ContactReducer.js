import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from '../types';

const contactReducer = (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
    return {...state,contacts:action.payload}
    break;
    case ADD_CONTACT:
      return { ...state, contacts: [...state.contacts, action.payload] };
      break;
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => {
          return contact._id !== action.payload;
        }),
      };
      break;
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
      break;
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact._id == action.payload._id ? action.payload : contact
        ),
      };
      break;
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return contact.name.match(regex) || contact.email.match(regex);
        }),
      };
      break;
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
      break;
      case CONTACT_ERROR:
      return{
        ...state,
        error:action.payload
      }
      break;
    default:
      return state;
      break;
  }
};
export default contactReducer;
