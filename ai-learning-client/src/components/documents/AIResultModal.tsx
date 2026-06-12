import { X } from "lucide-react";
import {formatAIContent} from "../../utils/formatAIContent";

type AIResultModalProps = {
  open: boolean;
  title: string;
  content: string;
  onClose: () => void;
};

const AIResultModal = ({open,title,content,onClose,}: AIResultModalProps) => {

  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        backdrop-blur-sm
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          rounded-3xl
          bg-white
          shadow-2xl
        "
      >
        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-200
            px-6
            py-5
          "
        >
          <h2
            className="
              text-xl
              font-semibold
              text-slate-900
            "
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              text-slate-400
              hover:text-slate-600
              cursor-pointer
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className=" max-h-[70vh] overflow-y-auto px-6 py-6">
          <div className=" space-y-2 text-sm">{formatAIContent(content)}</div>
        </div>
      </div>
    </div>
  );
};

export default AIResultModal;