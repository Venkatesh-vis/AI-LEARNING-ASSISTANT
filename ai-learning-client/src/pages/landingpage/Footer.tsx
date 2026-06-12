import {
BrainCircuit,
Mail,
BookOpen,
FileText,
} from "lucide-react";

const Footer = () => {
return ( <footer
   id="contact"
   className="relative border-t border-white/10 py-20"
 > <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/[0.03] to-transparent" />

  <div className="relative max-w-7xl mx-auto px-6">
    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
      {/* Brand */}
      <div>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <BrainCircuit size={24} />
          </div>

          <div>
            <h3 className="text-xl font-bold">
              LearnFlow AI
            </h3>

            <p className="text-sm text-slate-400">
              RAG-Powered Learning Platform
            </p>
          </div>
        </div>

        <p className="mt-6 text-slate-400 leading-relaxed">
          Transform PDFs into interactive
          learning experiences using AI,
          contextual document chat,
          flashcards, quizzes, and study
          analytics.
        </p>
      </div>

      {/* Product */}
      <div>
        <h4 className="font-semibold mb-5">
          Product
        </h4>

        <ul className="space-y-3 text-slate-400">
          <li className="hover:text-white cursor-pointer transition">
            PDF Upload
          </li>

          <li className="hover:text-white cursor-pointer transition">
            AI Chat
          </li>

          <li className="hover:text-white cursor-pointer transition">
            Flashcards
          </li>

          <li className="hover:text-white cursor-pointer transition">
            Quizzes
          </li>
        </ul>
      </div>

      {/* Features */}
      <div>
        <h4 className="font-semibold mb-5">
          Features
        </h4>

        <ul className="space-y-3 text-slate-400">
          <li className="flex items-center gap-2">
            <FileText size={16} />
            Document Processing
          </li>

          <li className="flex items-center gap-2">
            <BrainCircuit size={16} />
            RAG Retrieval
          </li>

          <li className="flex items-center gap-2">
            <BookOpen size={16} />
            AI Learning Tools
          </li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h4 className="font-semibold mb-5">
          Contact
        </h4>

        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 cursor-pointer">
          <Mail
            size={18}
            className="text-emerald-400"
          />

          <span className="text-slate-300 text-[12px]">
            venkateshvishwanadula257@gmail.com
          </span>
        </div>

        <p className="mt-5 text-sm text-slate-400">
          Built with React, TypeScript,
          Redux Toolkit, Node.js,
          Express, MongoDB, and Gemini AI.
        </p>
      </div>
    </div>

    <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-slate-500">
        © 2026 LearnFlow AI. All rights reserved.
      </p>

      <div className="flex gap-6 text-sm text-slate-500">
        <button className="hover:text-white transition cursor-pointer">
          Privacy Policy
        </button>

        <button className="hover:text-white transition cursor-pointer">
          Terms of Service
        </button>
      </div>
    </div>
  </div>
</footer>


);
};

export default Footer;
