import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { fridayApi } from '../../services/api';
import { X, Send, Minimize2, Maximize2, Zap, RotateCcw, ChevronDown } from 'lucide-react';

const QUICK_ACTIONS = [
  "Which bat should I buy?",
  "Compare bats in my price range",
  "What protection gear do I need?",
  "Build my complete cricket kit",
  "Best bat under ₹10,000",
  "Explain bat sweet spot profiles",
  "Kookaburra vs SS TON",
  "Which ball for T20 matches?",
];

const WELCOME_MESSAGE = {
  role: 'assistant',
  content: `Hi! I'm **FRIDAY** — PITCH™'s AI cricket equipment advisor. 🏏

I can help you:
• Find the right bat for your style & budget
• Compare products side-by-side  
• Explain cricket gear specifications
• Build your complete match kit

What are you looking for today?`,
  id: 'welcome',
};

export const FridayWidget = () => {
  const { quickViewProduct } = useStore();
  const { cart } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [unread, setUnread] = useState(0);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnread(0);
      inputRef.current?.focus();
    }
  }, [isOpen, messages, scrollToBottom]);

  const buildContext = useCallback(() => ({
    currentProduct: quickViewProduct || null,
    cart: cart.map(item => ({
      name: item.product?.name,
      price: item.unitPrice,
      quantity: item.quantity,
    })),
  }), [quickViewProduct, cart]);

  const sendMessage = useCallback(async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || isLoading) return;

    setInput('');
    setHasError(false);
    const userMsg = { role: 'user', content: trimmed, id: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const context = buildContext();
      const { reply } = await fridayApi.chat(trimmed, context);
      setMessages(prev => [...prev, { role: 'assistant', content: reply, id: Date.now() + 1 }]);
      if (!isOpen) setUnread(u => u + 1);
    } catch (err) {
      setHasError(true);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again in a moment, or browse our catalog directly.",
        id: Date.now() + 1,
        isError: true,
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, buildContext, isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setHasError(false);
  };

  const formatMessage = (content) => {
    if (!content) return '';
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/•/g, '<span class="text-willow">•</span>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => { setIsOpen(o => !o); setIsMinimized(false); }}
        aria-label="Open FRIDAY AI Assistant"
        className={`cursor-hover fixed bottom-6 right-6 z-[9990] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border-none ${
          isOpen ? 'bg-carbon border border-willow scale-95' : 'bg-willow hover:bg-red-700 scale-100 hover:scale-105 animate-glow'
        }`}
        style={{ boxShadow: isOpen ? '0 0 0 1px #E60000, 0 8px 32px rgba(0,0,0,0.4)' : undefined }}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-bone" />
        ) : (
          <Zap className="w-6 h-6 text-bone" />
        )}
        {unread > 0 && !isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 text-white text-[9px] font-bold flex items-center justify-center font-mono">
            {unread}
          </span>
        )}
        {!isOpen && (
          <div className="absolute -top-8 right-0 bg-carbon/90 border border-bone/15 rounded-full px-2.5 py-1 whitespace-nowrap font-mono text-[9px] text-bone/70 uppercase tracking-widest">
            FRIDAY
          </div>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          className={`fixed z-[9989] shadow-2xl flex flex-col glass-dark border border-bone/10 transition-all duration-300 ${
            isMinimized
              ? 'bottom-24 right-6 w-72 h-14 rounded-2xl overflow-hidden'
              : 'bottom-24 right-6 w-[380px] max-w-[calc(100vw-24px)] rounded-2xl overflow-hidden'
          }`}
          style={{ maxHeight: isMinimized ? '56px' : '600px', height: isMinimized ? '56px' : '600px' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-bone/10 bg-carbon/40 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-7 h-7 rounded-full bg-willow flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-bone" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border border-carbon" />
              </div>
              <div>
                <p className="font-mono text-[11px] font-bold text-bone uppercase tracking-widest">FRIDAY</p>
                <p className="font-mono text-[8px] text-bone/40 uppercase tracking-wider">PITCH™ AI Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={clearChat}
                className="p-1.5 text-bone/40 hover:text-bone transition-colors rounded bg-transparent border-none"
                title="Clear chat"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsMinimized(m => !m)}
                className="p-1.5 text-bone/40 hover:text-bone transition-colors rounded bg-transparent border-none"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-bone/40 hover:text-willow transition-colors rounded bg-transparent border-none"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Product context banner */}
              {quickViewProduct && (
                <div className="px-3 py-2 bg-willow/10 border-b border-willow/20 flex items-center gap-2 flex-shrink-0">
                  <Zap className="w-3 h-3 text-willow flex-shrink-0" />
                  <p className="font-mono text-[9px] text-willow uppercase tracking-wider truncate">
                    Viewing: {quickViewProduct.name}
                  </p>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-5 h-5 rounded-full bg-willow flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <Zap className="w-2.5 h-2.5 text-bone" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] px-3 py-2.5 rounded-xl text-xs leading-relaxed font-sans ${
                        msg.role === 'user'
                          ? 'bg-willow text-bone rounded-tr-sm'
                          : msg.isError
                          ? 'bg-red-950/40 border border-red-900/30 text-bone/80 rounded-tl-sm'
                          : 'bg-carbonMid border border-bone/[0.08] text-bone/85 rounded-tl-sm'
                      }`}
                      dangerouslySetInnerHTML={msg.role === 'assistant' ? { __html: formatMessage(msg.content) } : undefined}
                    >
                      {msg.role === 'user' ? msg.content : undefined}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isLoading && (
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-willow flex items-center justify-center flex-shrink-0">
                      <Zap className="w-2.5 h-2.5 text-bone" />
                    </div>
                    <div className="bg-carbonMid border border-bone/[0.08] px-4 py-3 rounded-xl rounded-tl-sm">
                      <div className="flex gap-1.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-bone/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-bone/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-bone/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length <= 1 && (
                <div className="px-3 pb-2 flex-shrink-0">
                  <p className="font-mono text-[8px] uppercase tracking-widest text-bone/30 mb-2">Quick Actions</p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_ACTIONS.slice(0, 4).map((action) => (
                      <button
                        key={action}
                        onClick={() => sendMessage(action)}
                        className="text-[9px] font-mono px-2.5 py-1 rounded-full border border-bone/15 text-bone/60 hover:border-willow hover:text-willow transition-colors bg-transparent whitespace-nowrap"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="px-3 pb-3 pt-2 border-t border-bone/[0.07] flex-shrink-0">
                <div className="flex gap-2 items-end">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about cricket gear..."
                    rows={1}
                    maxLength={500}
                    className="flex-1 bg-carbonMid border border-bone/10 rounded-xl px-3 py-2.5 text-xs text-bone placeholder-bone/30 focus:border-willow/50 focus:outline-none resize-none font-sans transition-colors"
                    style={{ minHeight: '40px', maxHeight: '100px' }}
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
                    }}
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || isLoading}
                    className="cursor-hover w-10 h-10 rounded-xl bg-willow hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0 border-none transition-colors"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4 text-bone" />
                  </button>
                </div>
                <p className="font-mono text-[7px] text-bone/20 text-center mt-1.5 uppercase tracking-wider">
                  FRIDAY · PITCH™ AI · Context-Aware Cricket Advisor
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
