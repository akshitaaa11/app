import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Send, 
  Paperclip, 
  RotateCcw, 
  Download,
  Bot,
  User
} from 'lucide-react';
import { mockChatMessages } from '../data/mockData';
import { useToast } from '../hooks/use-toast';

const Chatbot = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() && !attachedFile) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      attachment: attachedFile
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setAttachedFile(null);
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I found several scholarships that match your criteria. Let me show you the best options for your profile.",
        "Based on your academic background, I recommend focusing on STEM scholarships. Here are the top 3 opportunities:",
        "That's a great question! Let me help you understand the application requirements for that scholarship.",
        "I can help you with that! Would you like me to provide more details about the application process?",
        "Excellent! I've saved those scholarships to your favorites. Would you like me to set up deadline reminders?"
      ];

      const botMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponses[Math.floor(Math.random() * botResponses.length)],
        timestamp: new Date().toISOString(),
        avatar: '🤖'
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleFileAttach = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }
      
      setAttachedFile({
        name: file.name,
        size: file.size,
        type: file.type
      });
      
      toast({
        title: "File attached",
        description: `${file.name} has been attached to your message.`,
        variant: "default"
      });
    }
  };

  const removeAttachment = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const clearChat = () => {
    setMessages([mockChatMessages[0]]); // Keep only the initial bot message
    toast({
      title: "Chat cleared",
      description: "Your conversation has been reset.",
      variant: "default"
    });
  };

  const exportChat = () => {
    const chatContent = messages.map(msg => 
      `[${new Date(msg.timestamp).toLocaleTimeString()}] ${msg.type.toUpperCase()}: ${msg.content}`
    ).join('\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vidyavikas-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Chat exported",
      description: "Your conversation has been downloaded as a text file.",
      variant: "default"
    });
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Chat Header */}
      <div className="glass border-b border-white/20 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="glass-purple p-3 rounded-xl animate-glow">
              <Bot className="h-6 w-6 text-amber-700" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">VidyaVikas Assistant</h1>
              <p className="text-sm text-gray-600">Your personal scholarship advisor</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={exportChat}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-white/20 transition-all duration-200"
              title="Export chat"
            >
              <Download className="h-5 w-5" />
            </button>
            <button
              onClick={clearChat}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-white/20 transition-all duration-200"
              title="Clear chat"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-4xl mx-auto p-4">
          <div className="h-full overflow-y-auto space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 animate-fade-in ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 ${message.type === 'user' ? 'ml-3' : 'mr-3'}`}>
                  {message.type === 'user' ? (
                    <img
                      src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full border-2 border-white/30"
                    />
                  ) : (
                    <div className="glass-purple p-2 rounded-full">
                      <Bot className="h-6 w-6 text-amber-700" />
                    </div>
                  )}
                </div>

                {/* Message Content */}
                <div className={`flex-1 max-w-3xl ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                  <div
                    className={`inline-block p-4 rounded-2xl ${
                      message.type === 'user'
                        ? 'chat-bubble-user text-white'
                        : 'chat-bubble-bot text-gray-800'
                    } ${message.type === 'user' ? 'rounded-tr-md' : 'rounded-tl-md'}`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {message.attachment && (
                      <div className="mt-3 p-3 rounded-lg bg-white/20 border border-white/30">
                        <div className="flex items-center space-x-2">
                          <Paperclip className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-700">{message.attachment.name}</span>
                          <span className="text-xs text-gray-600">
                            ({(message.attachment.size / 1024).toFixed(1)} KB)
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className={`mt-2 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                    <span className="text-xs text-gray-500">{formatTimestamp(message.timestamp)}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3 animate-fade-in">
                <div className="glass-purple p-2 rounded-full">
                  <Bot className="h-6 w-6 text-amber-700" />
                </div>
                <div className="chat-bubble-bot p-4 rounded-2xl rounded-tl-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="glass border-t border-white/20 p-4">
        <div className="max-w-4xl mx-auto">
          {/* File Attachment Preview */}
          {attachedFile && (
            <div className="mb-3 flex items-center justify-between glass-dark p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <Paperclip className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-800">{attachedFile.name}</span>
                <span className="text-xs text-gray-600">
                  ({(attachedFile.size / 1024).toFixed(1)} KB)
                </span>
              </div>
              <button
                onClick={removeAttachment}
                className="text-red-600 hover:text-red-500 transition-colors"
              >
                Remove
              </button>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
            <div className="flex-1">
              <div className="glass-input rounded-2xl p-4 flex items-end space-x-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileAttach}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-shrink-0 p-2 text-gray-600 hover:text-gray-800 hover:bg-white/20 rounded-lg transition-all duration-200"
                  title="Attach file"
                >
                  <Paperclip className="h-5 w-5" />
                </button>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-1 bg-transparent text-gray-800 placeholder-gray-500 resize-none focus:outline-none min-h-[24px] max-h-32"
                  rows="1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={!newMessage.trim() && !attachedFile}
              className="glass-button p-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-200"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>

          <div className="mt-2 text-center">
            <p className="text-xs text-gray-500">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;