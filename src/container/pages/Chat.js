

const Chat = () => {
  return (
    <div className="chat">
      <div className="p-5">
        <h5>Chat</h5>
        <div>Apps/Chat</div>
      </div>
      <div className="chat-left">
        <div>
          <div><input type='text' placeholder="Search Contact" /></div>
        </div>
        <div className="list-users">
          <div>
            <div><img src='' alt='image' /><div>Username</div></div>
          </div>
          <div>
            <div><img src='' alt='image' /><div>Username</div></div>
          </div>
        </div>
      </div>

      <div className="chat-right">

      </div>
    </div>
  )
}

export default Chat;