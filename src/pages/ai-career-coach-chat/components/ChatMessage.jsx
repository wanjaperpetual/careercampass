import React from 'react';
import Icon from '../../../components/AppIcon';

const ChatMessage = ({ message, isUser, timestamp, isTyping = false, isError = false }) => {
  if (isTyping) {
    return (
      <div className="flex items-start space-x-3 animate-pulse">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Bot" size={16} className="text-primary-foreground" />
        </div>
        <div className="flex-1">
          <div className="bg-card border border-border rounded-2xl rounded-tl-sm p-4 max-w-3xl">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-primary/10 text-primary' 
          : isError 
            ? 'bg-destructive/10 text-destructive' :'bg-primary text-primary-foreground'
      }`}>
        <Icon 
          name={isUser ? 'User' : isError ? 'AlertCircle' : 'Bot'} 
          size={16} 
        />
      </div>

      {/* Message Content */}
      <div className="flex-1">
        <div className={`rounded-2xl p-4 max-w-3xl ${
          isUser 
            ? 'bg-primary text-primary-foreground rounded-tr-sm ml-auto' 
            : isError
              ? 'bg-destructive/10 border border-destructive/20 text-destructive rounded-tl-sm' :'bg-card border border-border rounded-tl-sm'
        }`}>
          <div className="prose prose-sm max-w-none">
            {message?.split('\n').map((line, index) => {
              // Handle bullet points
              if (line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*')) {
                return (
                  <div key={index} className="flex items-start space-x-2 my-1">
                    <span className="text-primary mt-1">•</span>
                    <span>{line.replace(/^[•\-*]\s*/, '')}</span>
                  </div>
                );
              }
              
              // Handle numbered lists
              if (/^\d+\./.test(line.trim())) {
                return (
                  <div key={index} className="flex items-start space-x-2 my-1">
                    <span className="text-primary font-medium">{line.match(/^\d+\./)?.[0]}</span>
                    <span>{line.replace(/^\d+\.\s*/, '')}</span>
                  </div>
                );
              }
              
              // Handle headers (lines starting with emojis or special formatting)
              if (line.trim().startsWith('🔢') || line.trim().startsWith('📊') || line.trim().startsWith('🏫') || line.trim().includes('**')) {
                return (
                  <div key={index} className={`font-semibold my-2 ${
                    isUser ? 'text-primary-foreground' : 'text-foreground'
                  }`}>
                    {line.replace(/\*\*/g, '')}
                  </div>
                );
              }
              
              // Regular paragraphs
              if (line.trim()) {
                return (
                  <p key={index} className="my-2 leading-relaxed">
                    {line}
                  </p>
                );
              }
              
              return <div key={index} className="h-2" />; // Empty line spacing
            })}
          </div>
        </div>
        
        {/* Timestamp */}
        {timestamp && (
          <div className={`text-xs text-muted-foreground mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;