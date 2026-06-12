import { BookOpen, Lightbulb, Sparkles, } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector, } from "../../features/hooks/reduxHooks";
import { generateSummary, explainConcept, } from "../../features/ai/aiThunk";
import AIResultModal from "./AIResultModal";
import type { ConceptExplanation } from "../../features/ai/aiTypes";

type Props = {documentId: string;};

const AIActions = ({ documentId, }: Props) => {
  const dispatch = useAppDispatch();
  const { summary, conceptExplanation, generateSummaryLoading, explainConceptLoading, concepts } = useAppSelector((state) => state.summary);
  const [concept, setConcept] = useState("");
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showConceptModal, setShowConceptModal] = useState(false);
  const [selectedExplanation, setSelectedExplanation] = useState<ConceptExplanation | null>(null);


  const handleGenerateSummary = async () => {
    if (!summary) {
      try {
        await dispatch(
          generateSummary({
            documentId,
          })
        ).unwrap();
      } catch {
        return;
      }
    }

    setShowSummaryModal(true);
  };

  const handleExplainConcept = async () => {
    const value = concept.trim();
    if (!value) return;
    const key = value.toLowerCase();

    // Cached
    if (concepts[key]) {
      setSelectedExplanation(concepts[key]);
      setShowConceptModal(true);
      return;
    }

    try {
      const result = await dispatch(explainConcept({ documentId, concept: value, })).unwrap();
      setSelectedExplanation(result);
      setShowConceptModal(true);
    } catch {
      //
    }
  };

  return (
    <>
      <div
        className=" rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden " >
        {/* Header */}
        <div
          className=" flex items-center gap-4 border-b border-slate-200 px-6 py-5 " >
          <div
            className=" flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white">
            <Sparkles size={22} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">AI Assistant</h2>
            <p className="text-sm text-slate-500">Powered by advanced AI</p>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Summary */}
          <div className=" rounded-2xl border border-slate-200 p-5">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3">
                  <div className=" rounded-xl bg-blue-50 p-2 text-blue-600">
                    <BookOpen size={18} />
                  </div>

                  <h3 className="font-semibold text-slate-900">Generate Summary</h3>
                </div>

                <p className=" mt-3 text-sm text-slate-500">Get a concise summary of the entire document.</p>
              </div>

              <button
                onClick={handleGenerateSummary}
                disabled={generateSummaryLoading}
                className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-50 cursor-pointer">
                {generateSummaryLoading ? "Summarizing..." : "Summarize"}
              </button>
            </div>
          </div>

          {/* Concept */}
          <div className=" rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-3">
              <div className=" rounded-xl bg-amber-50 p-2 text-amber-600">
                <Lightbulb size={18} />
              </div>

              <h3 className=" font-semibold text-slate-900">Explain a Concept</h3>
            </div>

            <p className=" mt-3 text-sm text-slate-500"> Enter a topic or concept from the document to get a detailed explanation.</p>

            <div className=" mt-5 flex gap-3">
              <input
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                placeholder="e.g. React Hooks"
                className=" flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
              />

              <button
                onClick={handleExplainConcept}
                disabled={explainConceptLoading}
                className=" rounded-xl bg-emerald-500 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-50 cursor-pointer">
                {explainConceptLoading ? "Loading..." : "Explain"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AIResultModal
        open={showSummaryModal}
        title="Generated Summary"
        content={selectedExplanation?.explanation ?? ""}
        onClose={() => setShowSummaryModal(false)}
      />

      <AIResultModal
        open={showConceptModal}
        title="Concept Explanation"
        content={conceptExplanation?.explanation ?? ""}
        onClose={() => setShowConceptModal(false)}
      />
    </>
  );
};

export default AIActions;