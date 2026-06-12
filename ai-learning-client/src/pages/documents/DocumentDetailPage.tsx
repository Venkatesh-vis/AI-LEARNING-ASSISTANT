import { useEffect, useState } from "react";
import {ArrowLeft,} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {useNavigate,useParams,} from "react-router-dom";
import {useAppDispatch,useAppSelector,} from "../../features/hooks/reduxHooks";
import { getDocumentById } from "../../features/documents/documentThunk";
import Spinner from "../../components/shared/Spinner";
import Content from "../../components/documents/Content";
import Chat from "../../components/documents/Chat";
import AIActions from "../../components/documents/AIactions";

type TabType =
  | "content"
  | "chat"
  | "actions"
  | "flashcards"
  | "quizzes";

const tabs = [
  {
    key: "content",
    label: "Content",
  },
  {
    key: "chat",
    label: "Chat",
  },
  {
    key: "actions",
    label: "AI Actions",
  },
  {
    key: "flashcards",
    label: "Flashcards",
  },
  {
    key: "quizzes",
    label: "Quizzes",
  },
] as const;

const DocumentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {document,getDocumentLoading,} = useAppSelector((state) => state.document);
  const [activeTab, setActiveTab] =useState<TabType>("content");

  useEffect(() => {
    if (id) {
      dispatch(
        getDocumentById(id)
      );
    }
  }, [id]);

  if (getDocumentLoading) {
    return <Spinner />;
  }

  console.log(document);
  

  return (
    <div
  className="
    space-y-6
    md:space-y-8
  "
>
      {/* Back */}
      <button
        onClick={() =>
          navigate("/documents")
        }
        className="
    inline-flex
    w-fit
    items-center
    gap-2
    text-sm
    md:text-base
    text-slate-500
    hover:text-slate-700
    cursor-pointer
  "
      >
        <ArrowLeft size={16} />
        Back to Documents
      </button>

      {/* Title */}
      <div>
        <h1
  className="
    text-2xl
    md:text-3xl
    font-bold
    text-slate-900
    break-words
  "
>
          {document?.title}
        </h1>
      </div>

      {/* Tabs */}
      <div
        className="
          border-b
          border-slate-200
        "
      >
        {/* Tabs */}
<div className="border-b border-slate-200 pb-2">
  <div
    className="
      overflow-x-auto
      scrollbar-hide
    "
  >
    <div
      className="
        inline-flex
        min-w-max
        rounded-2xl
        bg-slate-100
        p-1
      "
    >
    {tabs.map((tab) => (
      <button
        key={tab.key}
        onClick={() =>
          setActiveTab(tab.key)
        }
        className="
          relative
          px-5
          py-2.5
          text-sm
          font-medium
          rounded-xl
          cursor-pointer
          transition-colors
        "
      >
        {activeTab === tab.key && (
          <motion.div
            layoutId="activeTab"
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 35,
            }}
            className="
              absolute
              inset-0
              rounded-xl
              bg-white
              shadow-sm
            "
          />
        )}

        <span
          className={`
            relative
            z-10
            ${
              activeTab === tab.key
                ? "text-emerald-600"
                : "text-slate-500"
            }
          `}
        >
          {tab.label}
        </span>
      </button>
    ))}
  </div>
</div>
      </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
  <motion.div
    key={activeTab}
    initial={{
      opacity: 0,
      y: 8,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    exit={{
      opacity: 0,
      y: -8,
    }}
    transition={{
      duration: 0.2,
    }}
    className="min-h-[400px]"
  >
    {activeTab === "content" && document && (
      <div>
        <Content document={document}  />
      </div>
    )}

    {activeTab === "chat" && (
      <div>
        <Chat documentId={document?._id}/>
      </div>
    )}

    {activeTab === "actions" && (
      <div>
        <AIActions documentId={document?._id}/>
      </div>
    )}

    {activeTab === "flashcards" && (
      <div>
        renderFlashcardsTab
      </div>
    )}

    {activeTab === "quizzes" && (
      <div>
        renderQuizzesTab
      </div>
    )}
  </motion.div>
</AnimatePresence>
    </div>
  );
};

export default DocumentDetailPage;