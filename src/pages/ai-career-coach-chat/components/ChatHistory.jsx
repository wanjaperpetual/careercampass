import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ChatHistory = ({ isOpen, onClose, onSelectChat, currentChatId }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock chat history data
  const chatHistory = [
    {
      id: 'chat-1',
      title: 'Career Options in Technology',
      lastMessage: 'Based on your interest in mathematics and programming...',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      messageCount: 15
    },
    {
      id: 'chat-2',
      title: 'University Recommendations',
      lastMessage: 'Here are some universities in Kenya that offer...',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      messageCount: 8
    },
    {
      id: 'chat-3',
      title: 'Skills for Future Jobs',
      lastMessage: 'The most important skills for the next decade include...',
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      messageCount: 12
    },
    {
      id: 'chat-4',
      title: 'Medicine vs Engineering',
      lastMessage: 'Both fields offer excellent opportunities. Let me help you...',
      timestamp: new Date(Date.now() - 432000000), // 5 days ago
      messageCount: 22
    }
  ];

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });
  };

  const filteredHistory = chatHistory.filter(chat =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 md:relative md:inset-auto">
      {/* Mobile Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 md:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border md:relative md:w-full">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Chat History</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
          
          {/* Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {filteredHistory.length > 0 ? (
              <div className="p-2">
                {filteredHistory.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => onSelectChat(chat.id)}
                    className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                      currentChatId === chat.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h3 className={`font-medium text-sm truncate ${
                        currentChatId === chat.id ? 'text-primary-foreground' : 'text-foreground'
                      }`}>
                        {chat.title}
                      </h3>
                      <span className={`text-xs flex-shrink-0 ml-2 ${
                        currentChatId === chat.id ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {formatDate(chat.timestamp)}
                      </span>
                    </div>
                    <p className={`text-xs truncate ${
                      currentChatId === chat.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}>
                      {chat.lastMessage}
                    </p>
                    <div className={`flex items-center mt-2 text-xs ${
                      currentChatId === chat.id ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      <Icon name="MessageCircle" size={12} className="mr-1" />
                      {chat.messageCount} messages
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No conversations found</p>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Button
              variant="outline"
              fullWidth
              onClick={() => {
                onSelectChat('new');
                onClose();
              }}
            >
              <Icon name="Plus" size={16} className="mr-2" />
              New Conversation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;