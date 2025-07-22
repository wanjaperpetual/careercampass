import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ChatInput = ({ onSendMessage, disabled = false, isTyping = false }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled && !isTyping) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(prev => prev + transcript);
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [message]);

  return (
    <div className="border-t border-border bg-card p-4 safe-area-bottom">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isTyping ? "AI is typing..." : "Ask me about your career interests, academic strengths, or university options..."}
            disabled={disabled || isTyping}
            className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 pr-12 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            rows={1}
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleVoiceInput}
            disabled={disabled || isTyping || isRecording}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 ${
              isRecording ? 'text-error animate-pulse' : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <Icon name={isRecording ? "MicOff" : "Mic"} size={16} />
          </Button>
        </div>
        
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim() || disabled || isTyping}
          className="w-12 h-12 rounded-full flex-shrink-0"
        >
          <Icon name="Send" size={18} />
        </Button>
      </form>
      
      {isRecording && (
        <div className="mt-2 text-center">
          <p className="text-sm text-error animate-pulse">
            🎤 Listening... Speak clearly about your career interests
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatInput;