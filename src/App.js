import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
function App() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const API_URL = process.env.REACT_APP_API_URL || 'https://whatsapp-saas-2yo3.onrender.com';
  useEffect(() => { axios.get(`${API_URL}/api/users`).then(r => setUsers(r.data)); }, [API_URL]);
  const loadMessages = async id => { setSelectedUser(id); const r = await axios.get(`${API_URL}/api/messages/${id}`); setMessages(r.data); };
  const sendMessage = async () => { await axios.post(`${API_URL}/api/messages/${selectedUser}`, { text: newMessage }); setNewMessage(''); loadMessages(selectedUser); };
  return (<div className="container"><h1>WhatsApp SaaS Dashboard</h1><div className="sidebar"><h2>Usuarios</h2>{users.map(u => <button key={u.id} onClick={() => loadMessages(u.id)}>{u.name}</button>)}</div><div className="chat"><h2>Mensajes</h2><div className="chat-box">{messages.map((m, i) => <div key={i} className={m.from === 'agent' ? 'msg agent' : 'msg client'}>{m.text}</div>)}</div>{selectedUser && <div className="input-box"><input value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Escribir mensaje..." /><button onClick={sendMessage}>Enviar</button></div>}</div></div>);
}
export default App;