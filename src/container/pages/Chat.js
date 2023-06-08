import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import handleToast from "../../util/toast";
import { requires } from "../../services/api";
import { Context } from "../../store/userStore";
import { socket } from "../../socket";

const Chat = () => {
  const messagesEndRef = useRef();
  const { currUser, setIsAudio } = useContext(Context);

  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState();
  const [messageInput, setMessageInput] = useState("");
  const [active, setActive] = useState(null)

  // socket.emit('userData', currUser);

  

  const fetchRooms = async () => {
    try {
      const { data } = await requires.getRoomsChat();
      if (data.message === "ok") {
        setRooms(data.result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleMessage = async (id) => {
    if(id) {
      setActive(id);
      try {
        const { data } = await requires.getMessages(id);
        if (data.message === "ok") {
          setMessages(data.result);
          setRoomId(id);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
  }, [messages]);


  const handleSendMessage = async() => {
    if(!messageInput && !roomId) {
      return;
    }
    console.log(messageInput == '/end');
    if(messageInput == '/end') {
      const { data } = await requires.deleteRoom(roomId);
      if(data.message === 'ok') {
        // socket.emit('end-room', data.result);
        // const newRoom = rooms.filter(r => r._id.toString() !== data.result._id.toString()).reverse();
        // setRooms(newRoom);
        // fetchRooms();
        // setMessages([]);
      }
      return;
    }
    try{
      const value = {
        content: messageInput,
        userId: currUser.userId,
        roomId: roomId
      }
      const { data } = await requires.sendMessage(value);
      if(data.message === 'ok') {
        socket.emit("send-message", data.result);
        setMessages(prev => [...prev, data.result]);
        setMessageInput('');
      }
    }catch(err) {
      console.error(err);
    }
  };

  const handleEnter = (e) => {
    if(e.key === 'Enter' && messageInput) {
      handleSendMessage();
    }
  }


  // socket
  useEffect(() => {
    socket.on('chat', data => {
      if(data.action === 'create-room') {
        setRooms(prev => [...prev, data.result]);
      }
      if(data.action === 'delete-room') {
        const newRoom = rooms.filter(r => r._id.toString() !== data.result._id.toString()).reverse();
        setRooms(newRoom);
        fetchRooms();
        setMessages([]);
        setMessageInput('');
      }
    })

    socket.on('receiver', (data) => {
        setIsAudio(prev => !prev)
        if(messages.length >= 1) {
          setMessages(prev => [...prev, data]);
        }
    })
    
    return () => {
      socket.removeAllListeners()
    }
  }, [messages])
  
  return (
    <div
      className="p-4 bg-light text-dark scroll-bar"
      style={{ height: "88vh", overflow: "scroll" }}
    >
      <div className="pb-4" style={{ height: "10%", boxSizing: "border-box" }}>
        <h5>Chat</h5>
        <div>Apps/Chat</div>
      </div>
      <div
        className="d-flex gx-4 bg-white p-4 justify-content-between"
        style={{ boxSizing: "border-box", height: "90%" }}
      >
        <div
          className="chat-left col-2 border p-1"
          style={{
            overflowY: "auto",
            overflowX: "none",
          }}
        >
          {rooms &&
            rooms?.map((r) => {
              const isActive = active === r._id;
              return (
                <div key={r._id}>
                <div
                  onClick={handleMessage.bind(null, r._id)}
                  className="p-1 cursor-pointer active-room"
                  style={{backgroundColor: `${isActive ? '#d6e6eb': ''}`}}
                >
                  <div className="">
                    <i className="fas fa-user-tie fs-4"></i>
                    <span className="ms-2 fs-5">{r.client?.name}</span>
                  </div>
                  <span>Email: {r.client?.email}</span>
                </div>
                <hr></hr>
                </div>
              );
            })}
        </div>

        <div className="chat-right col-9 justify-content-end">
          <div
            style={{
              overflowY: "auto",
              overflowX: "none",
              height: "518px",
            }}
            className="scroll-bar"
          >
            {messages &&
              messages.map((m) => {
                console.log(messages);
                return (
                  <div
                    key={m._id}
                    className="d-flex flex-wrap"
                    style={{
                      justifyContent:
                        m.creator?.role === 0 ? "flex-start" : "flex-end",
                      wordWrap: "break-word",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor:
                          m.creator?.role === 0 ? "#e4fbf8" : "#eef5ff",
                        // textAlign: m.creator.role === 0 ? "left" : "right",
                        // textAlign: m.creator.role === 0 ? "left" : "right",
                        width: "fit-content",
                        maxWidth: "70%",
                      }}
                      className="text-black my-2 p-2 rounded-3"
                    >
                      {m.content}
                    </div>
                  </div>
                );
              })}
            <div ref={messagesEndRef}></div>
          </div>
          <div className="col d-flex input-message">
            <input
              type="text"
              placeholder="Enter to send or /end to the end"
              className="form-control"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={handleEnter}
            />
            <button className="btn btn-primary" onClick={handleSendMessage}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
