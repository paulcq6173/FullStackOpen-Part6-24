import { useNotifyValue } from './NotificationContext';

const Notification = () => {
  // Require context value only
  const object = useNotifyValue();

  if (!object) {
    return;
  }

  const { message } = object;

  const lowerCaseText = message.toLowerCase();
  let errorOccurs = false;
  if (lowerCaseText.includes('error') || lowerCaseText.includes('fail')) {
    errorOccurs = true;
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    color: errorOccurs ? 'red' : 'green',
  };

  return <div style={style}>{message}</div>;
};

export default Notification;
