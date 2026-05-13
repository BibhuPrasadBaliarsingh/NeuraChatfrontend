import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from '../components/layout/Sidebar.jsx';
import Header from '../components/layout/Header.jsx';
import ChatWindow from '../components/chat/ChatWindow.jsx';
import { chatService } from '../services/api.js';
import { useChat } from '../hooks/useChat.js';

export default function ChatPage() {
  const { chatId } = useParams();
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);
  const [chatsLoading, setChatsLoading] = useState(true);
  const [activeChat, setActiveChat] = useState(null);
  const [chatLoading, setChatLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const { sending, startNewChat, sendMessage, regenerate, deleteChat, clearAll } = useChat(chats, setChats, setActiveChat);

  useEffect(() => {
    chatService.getChats().then((res) => {
      setChats(res.data.chats);
    }).catch(() => toast.error('Failed to load chats')).finally(() => setChatsLoading(false));
  }, []);

  useEffect(() => {
    if (!chatId) { setActiveChat(null); return; }
    setChatLoading(true);
    chatService.getChatById(chatId).then((res) => {
      setActiveChat(res.data.chat);
    }).catch(() => {
      toast.error('Chat not found');
      navigate('/');
    }).finally(() => setChatLoading(false));
  }, [chatId, navigate]);

  const handleSend = useCallback(async (message) => {
    if (!chatId) {
      await startNewChat(message);
    } else {
      await sendMessage(chatId, message, setActiveChat);
      setChats((prev) =>
        prev.map((c) => c._id === chatId ? { ...c, updatedAt: new Date() } : c)
      );
    }
  }, [chatId, startNewChat, sendMessage]);

  const handleRegenerate = useCallback(async () => {
    if (chatId) await regenerate(chatId, setActiveChat);
  }, [chatId, regenerate]);

  const handleDelete = useCallback(async (id) => {
    const deleted = await deleteChat(id);
    if (deleted && id === chatId) {
      setActiveChat(null);
      navigate('/');
    }
  }, [chatId, deleteChat, navigate]);

  const handleClearAll = useCallback(async () => {
    if (!window.confirm('Clear all chats? This cannot be undone.')) return;
    await clearAll();
    setActiveChat(null);
    navigate('/');
  }, [clearAll, navigate]);

  return (
    <div className="flex h-screen overflow-hidden bg-surface-950">
      <Sidebar
        chats={chats}
        loading={chatsLoading}
        onDelete={handleDelete}
        onClearAll={handleClearAll}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <main className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header
          chat={activeChat}
          onMenuClick={() => setCollapsed(false)}
        />
        <ChatWindow
          chat={activeChat}
          loading={chatLoading}
          sending={sending}
          onSend={handleSend}
          onRegenerate={handleRegenerate}
        />
      </main>
    </div>
  );
}
