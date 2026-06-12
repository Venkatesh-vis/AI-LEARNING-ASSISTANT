import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (<section className="py-32 px-6"> <div
    className="
       max-w-6xl
       mx-auto
       rounded-[40px]
       border
       border-white/10
       bg-gradient-to-r
       from-emerald-500/10
       via-cyan-500/10
       to-purple-500/10
       backdrop-blur-2xl
       p-12
       text-center
       relative
       overflow-hidden
     "
  > <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.2),transparent_70%)]" />

    <div className="relative">
      <h2 className="text-4xl md:text-5xl font-bold">
        Ready To Transform Your

        <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          PDFs Into Knowledge?
        </span>
      </h2>

      <p className="mt-6 text-slate-300 text-lg max-w-2xl mx-auto">
        Upload documents, chat with your
        content, generate flashcards,
        create quizzes, and accelerate
        your learning with AI-powered
        assistance.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <Link
          to="/dashboard"
          className="
    group
    cursor-pointer
    relative
    overflow-hidden
    rounded-2xl
    bg-emerald-500
    px-8
    py-4
    font-semibold
    shadow-xl
    shadow-emerald-500/20
    inline-flex
    items-center
    justify-center
  "
        >
          <span
            className="
      absolute
      top-0
      left-[-100%]
      h-full
      w-1/3
      skew-x-12
      bg-gradient-to-r
      from-transparent
      via-white/40
      to-transparent
      transition-all
      duration-700
      group-hover:left-[150%]
    "
          />

          <span className="relative flex items-center gap-2">
            Start Learning Free
            <ArrowRight size={18} />
          </span>
        </Link>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
        <span>✓ Upload PDFs</span>
        <span>✓ AI Chat</span>
        <span>✓ Flashcards</span>
        <span>✓ Quizzes</span>
        <span>✓ Learning Analytics</span>
      </div>
    </div>
  </div>
  </section>


  );
};

export default CTA;
