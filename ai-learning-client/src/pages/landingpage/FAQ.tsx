import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
{
question: "What types of documents can I upload?",
answer:
"You can upload study notes, textbooks, technical documentation, interview preparation material, research papers, and other PDF documents.",
},
{
question: "How does the AI answer questions from my documents?",
answer:
"The platform uses Retrieval-Augmented Generation (RAG). Relevant sections of your uploaded documents are retrieved and provided to the AI, enabling context-aware answers.",
},
{
question: "Can I generate flashcards automatically?",
answer:
"Yes. Flashcards are generated directly from document content, helping you revise key concepts without manually creating study materials.",
},
{
question: "How are quizzes created?",
answer:
"The AI analyzes your uploaded documents and generates multiple-choice questions based on important concepts, definitions, and topics found in the content.",
},
{
question: "Can I chat with my PDFs?",
answer:
"Absolutely. After uploading a document, you can ask questions in natural language and receive answers grounded in the document's content.",
},
{
question: "Does the platform track learning progress?",
answer:
"Yes. Quiz scores, study activity, generated resources, and learning history can be used to monitor your progress over time.",
},
];

const FAQ = () => {
const [active, setActive] = useState<number | null>(0);

return ( <section
   id="faq"
   className="py-32"
 > <div className="max-w-4xl mx-auto px-6"> <div className="text-center mb-16"> <span className="text-emerald-400 font-medium">
FAQ </span>

      <h2 className="mt-4 text-5xl font-bold">
        Frequently Asked

        <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Questions
        </span>
      </h2>

      <p className="mt-6 text-slate-400 text-lg">
        Everything you need to know about
        document-based learning with AI.
      </p>
    </div>

    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={faq.question}
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.04]
            backdrop-blur-xl
            overflow-hidden
          "
        >
          <button
            onClick={() =>
              setActive(
                active === index ? null : index
              )
            }
            className="
              w-full
              flex
              items-center
              justify-between
              p-6
              text-left
            "
          >
            <span className="font-medium text-lg">
              {faq.question}
            </span>

            <ChevronDown
              className={`transition-transform ${
                active === index
                  ? "rotate-180"
                  : ""
              }`}
            />
          </button>

          {active === index && (
            <div className="px-6 pb-6 text-slate-400 leading-relaxed">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</section>


);
};

export default FAQ;
