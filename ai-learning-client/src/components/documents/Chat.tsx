import {useEffect,useRef,useState,} from "react";
import {Send,Sparkles,} from "lucide-react";
import {useAppDispatch,useAppSelector,} from "../../features/hooks/reduxHooks";
import {askQuestion,getChatHistory,} from "../../features/ai/aiThunk";
import { formatAIContent } from "../../utils/formatAIContent";

type ChatProps = {
  documentId: string;
};

const Chat = ({documentId,}: ChatProps) => {
  const dispatch = useAppDispatch();
  const {messages,loading,sendMessageLoading,} = useAppSelector((state) => state.chat);
  const [question, setQuestion] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const { user } = useAppSelector((state) => state.auth)
  const userInitial = user?.username[0].toUpperCase();

  useEffect(() => {
    dispatch(
      getChatHistory(documentId)
    );
  }, [documentId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, sendMessageLoading]);

  const handleSend = async () => {
      const value =
        question.trim();

      if (!value) {
        return;
      }

      setQuestion("");

      try {
        await dispatch(
          askQuestion({
            documentId,
            question: value,
          })
        ).unwrap();
      } catch {
        //
      }
    };

  return (
    <div className=" flex h-[75vh] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className=" border-b border-slate-200 px-6 py-4">
        <h3 className=" text-lg font-semibold text-slate-900"> AI Chat</h3>
        <p className=" text-sm text-slate-500"> Ask questions about this document</p>
      </div>

      {/* Messages */}
      <div
        className=" flex-1 overflow-y-auto px-4 py-6">
        {loading ? (
          <div
            className=" flex h-full items-center justify-center text-slate-500
            "
          >
            Loading chat...
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map(
              (message) => {
                const isUser = message.role === "user";

                return (
                  <div
                    key={message._id}
                    className={`flex ${ isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={` flex gap-3 ${isUser ? "flex-row-reverse max-w-[80%]" : "max-w-[90%]" }`}>
                      {/* Avatar */}
                      <div
                        className={` flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold ${ isUser ? "bg-emerald-500 text-white" : "bg-amber-100 text-amber-600" }`}>
                        {isUser ? (userInitial
                        ) : (
                          <Sparkles size={18}/>
                        )}
                      </div>

                      {/* Message */}
                      <div
                        className={` rounded-2xl px-4 py-3 shadow-sm ${ isUser ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-800" }`}>
                        {isUser ? 
                        (<p className=" whitespace-pre-wrap break-words text-sm leading-7">{message.content}</p>)
                         : 
                         (<div className=" text-sm leading-7 space-y-2">{formatAIContent( message.content)}</div>)
                         }
                        <p className={` mt-2 text-xs ${   isUser     ? "text-emerald-100"     : "text-slate-400" }`}>
                          {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit',minute: '2-digit',})}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
            )}

            {/* Typing Indicator */}
            {sendMessageLoading && (
              <div className="flex gap-3">
                <div className=" flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <Sparkles size={18}/>
                </div>

                <div className=" flex items-center gap-1 rounded-2xl bg-slate-100 px-4 py-3">
                  <span className=" h-2 w-2 animate-bounce rounded-full bg-slate-400"/>
                  <span className=" h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0.15s]"/>
                  <span className=" h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0.3s]"/>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className=" border-t border-slate-200 p-4"
      >
        <div className="flex gap-3">
          <input
            value={question}
            onChange={(e) =>setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" &&!sendMessageLoading) {
                handleSend();
              }
            }}
            placeholder="Ask anything about this document..."
            className=" flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"/>

          <button
            onClick={handleSend}
            disabled={sendMessageLoading}
            className=" flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-white transition hover:bg-emerald-600 disabled:opacity-50 cursor-pointer">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;