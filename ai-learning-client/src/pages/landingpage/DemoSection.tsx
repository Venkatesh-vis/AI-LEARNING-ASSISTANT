import { motion } from "framer-motion";
import {
BrainCircuit,
MessageSquare,
FileText,
Sparkles,
} from "lucide-react";

const DemoSection = () => {
return ( <section className="py-32 relative"> <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent" />

  <div className="relative max-w-7xl mx-auto px-6">
    <div className="text-center max-w-3xl mx-auto mb-20">
      <span className="text-emerald-400 font-medium">
        LIVE DEMO
      </span>

      <h2 className="mt-4 text-5xl font-bold">
        Chat With Your

        <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Learning Materials
        </span>
      </h2>

      <p className="mt-6 text-slate-400 text-lg">
        Upload PDFs and instantly ask
        questions, generate summaries,
        create flashcards, and test your
        knowledge with AI.
      </p>
    </div>

    <motion.div
      initial={{
        opacity: 0,
        y: 60,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      className="
        rounded-[40px]
        border
        border-white/10
        bg-white/[0.04]
        backdrop-blur-2xl
        overflow-hidden
      "
    >
      <div className="grid lg:grid-cols-2">
        {/* LEFT PANEL */}
        <div className="p-8 border-r border-white/10">
          <div className="rounded-3xl bg-[#111827] p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="text-cyan-400" />

              <div>
                <h4 className="font-semibold">
                  Document Uploaded
                </h4>

                <p className="text-sm text-slate-400">
                  Operating Systems Notes.pdf
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-slate-400 text-sm">
                  AI Resources Generated
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    "Summary",
                    "Flashcards",
                    "Quiz",
                    "Chat",
                    "Analytics",
                  ].map((item) => (
                    <span
                      key={item}
                      className="
                        rounded-full
                        bg-emerald-500/10
                        px-3
                        py-1
                        text-sm
                        text-emerald-300
                      "
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-emerald-500/10 p-4 border border-emerald-500/20">
                <p className="text-sm text-emerald-300">
                  126 Chunks Processed • Ready For AI Queries
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-8">
          <div className="space-y-4">
            <div className="rounded-2xl bg-white/[0.03] p-4 border border-white/10">
              <div className="flex gap-3">
                <MessageSquare className="text-cyan-400" />

                <div>
                  <p className="font-medium">
                    User Question
                  </p>

                  <p className="text-slate-400 mt-1">
                    What is process scheduling
                    in an operating system?
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-500/10 p-4 border border-emerald-500/20">
              <div className="flex gap-3">
                <BrainCircuit className="text-emerald-400" />

                <div>
                  <p className="font-medium">
                    AI Response
                  </p>

                  <p className="text-slate-300 mt-1">
                    Process scheduling is the
                    mechanism used by an operating
                    system to determine which
                    process should execute next.
                    It improves CPU utilization,
                    responsiveness, and overall
                    system efficiency.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/[0.03] p-4 border border-white/10">
              <div className="flex gap-3">
                <Sparkles className="text-cyan-400" />

                <div>
                  <p className="font-medium">
                    AI Generated Summary
                  </p>

                  <p className="text-slate-400 mt-1">
                    Scheduling algorithms help
                    optimize CPU usage and manage
                    multiple processes efficiently.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section>


);
};

export default DemoSection;
