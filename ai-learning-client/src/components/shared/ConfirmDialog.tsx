import { Trash2, X } from "lucide-react";

type ConfirmDialogProps = {
  open: boolean;
  title?: string;
  description: string;

  confirmText?: string;
  cancelText?: string;

  loading?: boolean;

  onConfirm: () => void;
  onClose: () => void;
};

const ConfirmDialog = ({
  open,
  title = "Confirm Deletion",
  description,
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) => {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/30
        backdrop-blur-sm
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          bg-white
          p-7
          shadow-2xl
          animate-in
          fade-in
          zoom-in-95
          duration-200
        "
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div
            className="
              h-14
              w-14
              rounded-2xl
              bg-red-100
              flex
              items-center
              justify-center
            "
          >
            <Trash2
              size={24}
              className="text-red-500"
            />
          </div>

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

        {/* Content */}
        <div className="mt-5">
          <h2
            className="
              text-2xl
              font-semibold
              text-slate-900
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-4
              text-sm
              leading-6
              text-slate-500
            "
          >
            {description}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="
              h-12
              rounded-xl
              border
              border-slate-200
              bg-white
              font-medium
              text-slate-700
              hover:bg-slate-50
              transition
              cursor-pointer
            "
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="
              h-12
              rounded-xl
              bg-red-500
              text-white
              font-medium
              shadow-lg
              shadow-red-500/20
              hover:bg-red-600
              transition
              cursor-pointer
              disabled:opacity-70
            "
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div
                  className="
                    h-4
                    w-4
                    rounded-full
                    border-2
                    border-white/30
                    border-t-white
                    animate-spin
                  "
                />
                Deleting...
              </span>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;