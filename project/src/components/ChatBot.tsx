import React, { useState } from 'react';
import { MessageCircle, Send, X, MinusCircle } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
}

const insuranceInfo = {
  general: [
    "SBI Life Insurance is a joint venture between State Bank of India and BNP Paribas Cardif.",
    "We offer a wide range of life insurance products to meet different needs.",
    "Our products include term insurance, savings plans, retirement plans, and child plans."
  ],
  products: {
    term: "SBI Life eShield provides comprehensive term insurance coverage.",
    savings: "SBI Life Smart Wealth Builder offers both insurance and investment benefits.",
    retirement: "SBI Life Retire Smart helps you build a retirement corpus with guaranteed returns.",
    child: "SBI Life Smart Champ ensures your child's future education needs."
  },
  claims: [
    "You can file a claim online through our customer portal.",
    "Required documents include policy documents, claim forms, and identity proof.",
    "Our average claim settlement time is 48 hours for complete documentation."
  ]
};

const generateResponse = (query: string): string => {
  query = query.toLowerCase();
  
  if (query.includes('hello') || query.includes('hi')) {
    return "Hello! How can I help you with SBI Life Insurance today?";
  }
  
  if (query.includes('term') || query.includes('shield')) {
    return insuranceInfo.products.term;
  }
  
  if (query.includes('savings') || query.includes('wealth')) {
    return insuranceInfo.products.savings;
  }
  
  if (query.includes('retirement') || query.includes('retire')) {
    return insuranceInfo.products.retirement;
  }
  
  if (query.includes('child') || query.includes('education')) {
    return insuranceInfo.products.child;
  }
  
  if (query.includes('claim')) {
    return insuranceInfo.claims.join(' ');
  }
  
  if (query.includes('about') || query.includes('sbi life')) {
    return insuranceInfo.general.join(' ');
  }
  
  return "I'm not sure about that. Would you like to know about our insurance products, claims process, or general information?";
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you with SBI Life Insurance today?", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    const botResponse = { text: generateResponse(input), isBot: true };
    
    setMessages([...messages, userMessage, botResponse]);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-800 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 flex items-center justify-center"
        >
          <MessageCircle size={24} />
        </button>
      ) : (
        <div className={`bg-white rounded-lg shadow-xl transition-all duration-300 ${
          isMinimized ? 'h-14' : 'h-[480px]'
        } w-[350px] flex flex-col`}>
          <div className="bg-purple-800 text-white p-3 rounded-t-lg flex justify-between items-center">
            <span className="font-semibold">SBI Life Assistant</span>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:text-purple-200 transition-colors"
              >
                <MinusCircle size={20} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-purple-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      message.isBot ? 'text-left' : 'text-right'
                    }`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg ${
                        message.isBot
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-purple-800 text-white'
                      } max-w-[80%]`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your question..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={handleSend}
                    className="bg-purple-800 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot;