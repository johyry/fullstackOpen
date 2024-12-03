
const Notification = ({ notificationMessage }) => {
  if (notificationMessage !== '') {
    return (
      <div className="notification">
        {notificationMessage}
      </div>
    )
  }
}

export default Notification