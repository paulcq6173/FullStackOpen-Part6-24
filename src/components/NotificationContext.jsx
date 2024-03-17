import { createContext, useContext, useReducer } from 'react';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  const { type, payload } = action;
  let newState;

  switch (type) {
    case 'ERROR':
      newState = {
        message: payload,
      };
      return newState;
    case 'SUCCESS':
      newState = {
        message: payload,
      };
      return newState;
    case 'RESET':
      return null;
    default:
      return state;
  }
};

export const useNotifyValue = () => {
  const context = useContext(NotificationContext);
  return context[0];
};

export const useNotifyDispatch = () => {
  const context = useContext(NotificationContext);
  return context[1];
};

export const NotificationContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(notificationReducer, null);

  return (
    <NotificationContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
