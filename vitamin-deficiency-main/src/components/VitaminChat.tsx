
import { useState, useEffect, useCallback, useRef } from "react";
import { Send, Sparkles, RefreshCcw, Bot, User, AlertCircle, ThumbsUp, ThumbsDown, MessageSquare, Shield, Info, Download, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  isLoading?: boolean;
  error?: boolean;
  helpful?: boolean;
}

interface VitaminChatProps {
  deficiencyInfo?: {
    name: string;
    description: string;
    confidence?: number;
  } | null;
}

type Persona = "Scientific" | "Empathetic" | "Pragmatic";

export const VitaminChat = ({ deficiencyInfo }: VitaminChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [persona, setPersona] = useState<Persona>("Scientific");
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const { toast } = useToast();
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        setTimeout(() => {
          scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: "smooth" });
        }, 100);
      }
    }
  }, [messages]);

  useEffect(() => {
    if (deficiencyInfo) {
      setMessages([{
        id: 1,
        content: `I've synchronized with your ${deficiencyInfo.name} data. Based on our clinical scan, how would you like to proceed with optimization?`,
        sender: "bot",
        timestamp: new Date(),
      }]);
    } else {
      setMessages([{
        id: 1,
        content: "Ecosystem ready. Please complete an AI assessment to provide your biomarker context for personalized nutrition coaching.",
        sender: "bot",
        timestamp: new Date(),
      }]);
    }
  }, [deficiencyInfo]);

  const personaConfig = {
    Scientific: {
      icon: Shield,
      desc: "Clinical & Data-driven",
      prompt: "Respond with medical precision, citing biomarkers and physiological mechanisms."
    },
    Empathetic: {
      icon: Bot,
      desc: "Soft & Supportive",
      prompt: "Respond with warmth and encouragement, focusing on lifestyle and emotional wellbeing."
    },
    Pragmatic: {
      icon: MessageSquare,
      desc: "Fast & Actionable",
      prompt: "Respond with clear, bulleted action items and direct nutritional advice."
    }
  };

  const generateGeminiResponse = useCallback(async (userMessage: string) => {
    try {
      const context = deficiencyInfo
        ? `Biomarker context: ${deficiencyInfo.name} (${deficiencyInfo.description}).`
        : "No specific deficiency detected.";

      const prompt = `
        You are an advanced AI Nutritionist called Vitamin AI.
        Persona: ${persona}. ${personaConfig[persona].prompt}
        Context: ${context}
        
        Rules: 
        - Provide high-fidelity nutritional advice.
        - Use markdown headers and lists for clarity.
        - Focus on evidence-based recommendations.
        - Address the user question: ${userMessage}
      `;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 800 }
        })
      });

      if (!response.ok) throw new Error("API stream interrupted.");

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error: any) {
      setApiError(error.message);
      return "I encountered a synchronization error with the intelligence cloud.";
    }
  }, [deficiencyInfo, persona, GEMINI_API_KEY]);

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;
    const userContent = input.trim();
    setInput("");
    setIsProcessing(true);
    setShowSuggestions(false);

    setMessages(prev => [...prev, {
      id: Date.now(),
      content: userContent,
      sender: "user",
      timestamp: new Date()
    }, {
      id: Date.now() + 1,
      content: "Thinking...",
      sender: "bot",
      timestamp: new Date(),
      isLoading: true
    }]);

    const response = await generateGeminiResponse(userContent);

    setMessages(prev => prev.map(msg =>
      msg.isLoading ? { ...msg, content: response, isLoading: false } : msg
    ));
    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[700px] flex flex-col gap-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center shadow-xl shadow-violet-500/20">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">AI Health Advisory</h2>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-black">Neural Processor v4.0</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-10 px-4 rounded-xl border-white/5 bg-white/5 hover:bg-white/10 text-xs">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Sidebar Personas */}
        <div className="w-64 hidden xl:flex flex-col gap-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">Assistant Persona</p>
          {(Object.keys(personaConfig) as Persona[]).map((p) => {
            const Config = personaConfig[p];
            return (
              <button
                key={p}
                onClick={() => setPersona(p)}
                className={cn(
                  "flex flex-col gap-1 p-4 rounded-2xl border transition-all text-left",
                  persona === p
                    ? "bg-violet-600 border-violet-500 text-white shadow-xl shadow-violet-500/20"
                    : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                )}
              >
                <div className="flex items-center gap-2">
                  <Config.icon className="w-4 h-4" />
                  <span className="font-bold text-sm tracking-tight">{p}</span>
                </div>
                <span className={cn("text-[10px] opacity-70", persona === p ? "text-violet-100" : "text-slate-500")}>
                  {Config.desc}
                </span>
              </button>
            )
          })}
          <div className="mt-auto p-5 rounded-3xl glass-layer-2 border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-violet-400">
              <Info className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Medical Disclaimer</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Vitamin AI is an educational tool. Always consult a licensed clinical professional before starting new protocols.
            </p>
          </div>
        </div>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col glass-layer-1 border-white/5 rounded-[2.5rem] overflow-hidden">
          <ScrollArea className="flex-1 p-8" ref={scrollAreaRef}>
            <div className="space-y-8 pb-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex gap-4", message.sender === "user" ? "flex-row-reverse" : "flex-row")}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                    message.sender === "bot" ? "bg-violet-600/10 border-violet-500/20" : "bg-white/5 border-white/10"
                  )}>
                    {message.sender === "bot" ? <Bot className="w-5 h-5 text-violet-400" /> : <User className="w-5 h-5 text-slate-400" />}
                  </div>
                  <div className={cn(
                    "p-5 rounded-3xl max-w-[80%] text-sm leading-relaxed shadow-sm",
                    message.sender === "bot"
                      ? "bg-white/5 text-slate-200 border border-white/5"
                      : "bg-violet-600 text-white border border-violet-500 shadow-xl shadow-violet-500/20"
                  )}>
                    {message.isLoading ? (
                      <div className="flex gap-1 py-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" />
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:0.2s]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:0.4s]" />
                      </div>
                    ) : (
                      <div className="markdown-content prose prose-invert prose-sm">
                        {message.content}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-6 border-t border-white/5 bg-black/20 backdrop-blur-xl">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="relative flex items-center"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask V-AI about food targets or supplementation..."
                className="h-16 pl-6 pr-20 bg-white/5 border-white/10 focus:border-violet-500 rounded-2xl shadow-inner transition-all"
                disabled={isProcessing}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isProcessing}
                className="absolute right-2 h-12 w-12 rounded-xl bg-violet-600 hover:bg-violet-700 text-white"
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};
