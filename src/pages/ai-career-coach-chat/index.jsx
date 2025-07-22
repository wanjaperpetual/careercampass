import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/ui/Header';
import StudentBottomTabs from '../../components/ui/StudentBottomTabs';
import ChatMessage from './components/ChatMessage';
import ConversationStarters from './components/ConversationStarters';
import ChatInput from './components/ChatInput';
import ChatHeader from './components/ChatHeader';
import QuickActions from './components/QuickActions';
import ChatHistory from './components/ChatHistory';
import { generateCareerChatResponse } from '../../lib/gemini';

const AICareerCoachChat = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentChatId, setCurrentChatId] = useState('current');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [savedAdvice, setSavedAdvice] = useState([]);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (message) => {
    const userMessage = {
      id: Date.now(),
      text: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setError(null);

    try {
      // Get conversation history for context
      const conversationHistory = messages.slice(-5); // Last 5 messages for context
      
      const aiResponse = await generateCareerChatResponse(message, conversationHistory);
      
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      setError('Sorry, I encountered an issue. Please check your internet connection and try again.');
      
      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        text: "I apologize, but I'm having trouble connecting right now. Please make sure you're connected to the internet and try asking your question again. You can also try rephrasing your question or asking about something else related to your career journey.",
        isUser: false,
        timestamp: new Date(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleStarterClick = (starterText) => {
    handleSendMessage(starterText);
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear this conversation?')) {
      setMessages([]);
      setCurrentChatId('new-' + Date.now());
      setError(null);
    }
  };

  const handleQuickAction = (action, message) => {
    switch (action) {
      case 'save':
        if (message && !message.isUser) {
          setSavedAdvice(prev => [...prev, {
            id: Date.now(),
            text: message.text,
            timestamp: new Date(),
            chatId: currentChatId
          }]);
          alert('Advice saved successfully!');
        }
        break;
      case 'share':
        if (navigator.share) {
          navigator.share({
            title: 'Career Advice from AI Coach',
            text: message?.text || 'Check out this career guidance conversation',
            url: window.location.href
          });
        } else {
          // Fallback for browsers without Web Share API
          navigator.clipboard.writeText(message?.text || window.location.href);
          alert('Content copied to clipboard!');
        }
        break;
      default:
        break;
    }
  };

  const handleSelectChat = (chatId) => {
    if (chatId === 'new') {
      setMessages([]);
      setCurrentChatId('new-' + Date.now());
      setError(null);
    } else {
      // In a real app, load chat history from storage/API
      setCurrentChatId(chatId);
    }
    setIsHistoryOpen(false);
  };

  const handleBack = () => {
    window.location.href = '/student-dashboard';
  };

  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <ChatHeader
            onBack={handleBack}
            onMenuToggle={() => setIsHistoryOpen(true)}
            onClearChat={handleClearChat}
            messageCount={messages.length}
          />
          
          {/* Error Banner */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-2 text-sm">
              {error}
            </div>
          )}
          
          {/* Messages Container */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.length === 0 ? (
              <ConversationStarters onStarterClick={handleStarterClick} />
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message.text}
                    isUser={message.isUser}
                    timestamp={message.timestamp}
                    isError={message.isError}
                  />
                ))}
                
                {isTyping && (
                  <ChatMessage
                    isTyping={true}
                  />
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Quick Actions */}
          {messages.length > 0 && (
            <QuickActions
              onAction={handleQuickAction}
              lastMessage={lastMessage}
            />
          )}
          
          {/* Chat Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
          />
        </div>
        
        {/* Desktop Chat History Sidebar */}
        <div className="hidden lg:block w-80 border-l border-border">
          <ChatHistory
            isOpen={true}
            onClose={() => {}}
            onSelectChat={handleSelectChat}
            currentChatId={currentChatId}
          />
        </div>
      </div>
      
      {/* Mobile Chat History */}
      <ChatHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectChat={handleSelectChat}
        currentChatId={currentChatId}
      />
      
      <StudentBottomTabs />
    </div>
  );
};

export default AICareerCoachChat;