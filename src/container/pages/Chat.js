import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import handleToast from "../../util/toast";
import { requires } from "../../services/api";
import { Context } from "../../store/userStore";

const Chat = () => {
  const messagesEndRef = useRef();
  const { currUser } = useContext(Context);

  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState([]);
  const [messageInput, setMessageInput] = useState("");

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
    if(!messageInput) {
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
        handleMessage(roomId);
        setMessageInput('');
      }
    }catch(err) {
      console.error(err);
    }
  };

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
              return (
                <div
                  key={r._id}
                  onClick={handleMessage.bind(null, r._id)}
                  className="p-1 cursor-pointer"
                >
                  <div className="">
                    <i className="fas fa-user-tie fs-4"></i>
                    <span className="ms-2 fs-5">{r.client.name}</span>
                  </div>
                  <span>Email: {r.client.email}</span>
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
                return (
                  <div
                    key={m._id}
                    className="d-flex flex-wrap"
                    style={{
                      justifyContent:
                        m.creator.role === 0 ? "flex-start" : "flex-end",
                      wordWrap: "break-word",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor:
                          m.creator.role === 0 ? "#e4fbf8" : "#eef5ff",
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
              placeholder="Enter to message"
              className="form-control"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)
              }
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
