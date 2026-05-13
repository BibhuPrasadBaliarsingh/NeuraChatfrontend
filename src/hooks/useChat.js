import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { chatService } from '../services/api.js';

export const useChat = (chatList, setChatList, setActiveChat) => {
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);

  const startNewChat = useCallback(async (message) => {
    setSending(true);
    try {
      const res = await chatService.createChat(message);
      const newChat = res.data.chat;
      setChatList((prev) => [{ _id: newChat._id, title: newChat.title, updatedAt: newChat.updatedAt }, ...prev]);
      setActiveChat(newChat);
      navigate(`/chat/${newChat._id}`);
      return newChat;
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create chat');
      return null;
    } finally {
      setSending(false);
    }
  }, [navigate, setChatList, setActiveChat]);

  const sendMessage = useCallback(async (chatId, message, setActiveChat) => {
    setSending(true);
    try {
      const res = await chatService.sendMessage(chatId, message);
      setActiveChat(res.data.chat);
      return res.data.chat;
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to send message');
      return null;
    } finally {
      setSending(false);
    }
  }, []);

  const regenerate = useCallback(async (chatId, setActiveChat) => {
    setSending(true);
    try {
      const res = await chatService.regenerate(chatId);
      setActiveChat(res.data.chat);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to regenerate');
    } finally {
      setSending(false);
    }
  }, []);

  const deleteChat = useCallback(async (chatId) => {
    try {
      await chatService.deleteChat(chatId);
      setChatList((prev) => prev.filter((c) => c._id !== chatId));
      toast.success('Chat deleted');
      return true;
    } catch {
      toast.error('Failed to delete chat');
      return false;
    }
  }, [setChatList]);

  const clearAll = useCallback(async () => {
    try {
      await chatService.clearAll();
      setChatList([]);
      setActiveChat(null);
      navigate('/');
      toast.success('All chats cleared');
    } catch {
      toast.error('Failed to clear chats');
    }
  }, [setChatList, setActiveChat, navigate]);

  return { sending, startNewChat, sendMessage, regenerate, deleteChat, clearAll };
};
