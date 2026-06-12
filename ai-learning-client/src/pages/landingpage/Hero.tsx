import { motion } from "framer-motion";
import {
  ArrowRight,
  Upload,
  FileText,
  BrainCircuit,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden"> <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-emerald-500/20 blur-[180px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[180px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 mb-6">
              <Sparkles
                size={16}
                className="text-emerald-400"
              />

              <span className="text-sm text-emerald-300">
                RAG-Powered Learning Platform
              </span>
            </div>

            <h1
              className="
            text-5xl
            md:text-6xl
            lg:text-7xl
            font-bold
            leading-tight
          "
            >
              Transform PDFs Into

              <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Interactive Learning
              </span>

              Experiences
            </h1>

            <p className="mt-8 text-lg text-slate-400 max-w-xl">
              Upload study materials, notes,
              documentation, or interview
              preparation PDFs and instantly
              generate AI-powered summaries,
              flashcards, quizzes, and
              contextual chat.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
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
    Get Started
    <ArrowRight size={18} />
  </span>
</Link>

              <a
                className="
              rounded-2xl
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              px-8
              py-4
              hover:bg-white/10
              transition
            "
                href="#features"
              >
                Explore Features
              </a>
            </div>

            <div className="flex flex-wrap gap-8 mt-12">
              <div>
                <h3 className="text-3xl font-bold">
                  RAG
                </h3>

                <p className="text-slate-400">
                  Context Retrieval
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">
                  AI
                </h3>

                <p className="text-slate-400">
                  Learning Engine
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">
                  PDF
                </h3>

                <p className="text-slate-400">
                  Knowledge Base
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1,
            }}
          >
            <div
              className="
            relative
            rounded-[32px]
            border
            border-white/10
            bg-white/5
            backdrop-blur-2xl
            p-6
          "
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-[#111827] p-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Upload
                      size={20}
                      className="text-emerald-400"
                    />

                    <div>
                      <p className="font-medium">
                        Operating Systems Notes.pdf
                      </p>

                      <p className="text-xs text-slate-400">
                        48 Pages Processed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#111827] p-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <FileText
                      size={20}
                      className="text-cyan-400"
                    />

                    <div>
                      <p className="font-medium">
                        Document Chunks
                      </p>

                      <p className="text-xs text-slate-400">
                        126 Chunks Generated
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-5">
                  <div className="flex items-center gap-3">
                    <BrainCircuit className="text-emerald-400" />

                    <div>
                      <h4 className="font-semibold">
                        Learning Resources Ready
                      </h4>

                      <p className="text-sm text-slate-300">
                        Flashcards • Quiz • Summary
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#111827] p-5 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageSquare
                      size={18}
                      className="text-emerald-400"
                    />

                    <h4 className="font-semibold">
                      AI Chat
                    </h4>
                  </div>

                  <div className="rounded-xl bg-white/5 p-3 text-sm text-slate-300">
                    What is process scheduling?
                  </div>

                  <div className="rounded-xl bg-emerald-500/10 mt-3 p-3 text-sm text-slate-300">
                    Process scheduling is the
                    mechanism used by an
                    operating system to decide
                    which process executes next.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>


  );
};

export default Hero;
