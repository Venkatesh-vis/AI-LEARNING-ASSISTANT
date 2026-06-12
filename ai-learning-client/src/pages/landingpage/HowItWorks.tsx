import { motion } from "framer-motion";
import {
Upload,
FileText,
BrainCircuit,
BarChart3,
} from "lucide-react";

const steps = [
{
icon: Upload,
title: "Upload PDF",
description:
"Upload study materials, notes, technical documentation, or learning resources.",
},
{
icon: FileText,
title: "Process Content",
description:
"Extract text, create document chunks, and prepare knowledge for retrieval.",
},
{
icon: BrainCircuit,
title: "Generate AI Resources",
description:
"Create summaries, flashcards, quizzes, and contextual document chat instantly.",
},
{
icon: BarChart3,
title: "Learn & Track Progress",
description:
"Review flashcards, take quizzes, monitor scores, and improve understanding.",
},
];

const HowItWorks = () => {
return ( <section
   id="how-it-works"
   className="py-32"
 > <div className="max-w-7xl mx-auto px-6"> <div className="text-center max-w-3xl mx-auto"> <span className="text-emerald-400 font-medium">
HOW IT WORKS </span>

      <h2 className="mt-4 text-5xl font-bold">
        Learn Smarter In

        <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Four Simple Steps
        </span>
      </h2>

      <p className="mt-6 text-slate-400 text-lg">
        Transform static documents into
        interactive learning experiences
        powered by AI and Retrieval-Augmented
        Generation.
      </p>
    </div>

    <div className="mt-24 grid lg:grid-cols-4 gap-8">
      {steps.map((step, index) => {
        const Icon = step.icon;

        return (
          <motion.div
            key={step.title}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: index * 0.15,
            }}
            className="relative"
          >
            {index < steps.length - 1 && (
              <div
                className="
                  hidden
                  lg:block
                  absolute
                  top-8
                  left-[70%]
                  w-full
                  h-px
                  bg-gradient-to-r
                  from-emerald-500/50
                  to-transparent
                "
              />
            )}

            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/[0.04]
                backdrop-blur-xl
                p-8
                text-center
                h-full
                hover:border-emerald-500/30
                hover:-translate-y-2
                transition-all
                cursor-pointer
                duration-300
              "
            >
              <div className="mx-auto h-16 w-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <Icon
                  size={28}
                  className="text-emerald-400"
                />
              </div>

              <div className="mt-6 ">
                <span className="text-emerald-400 font-medium">
                  0{index + 1}
                </span>

                <h3 className="text-2xl font-semibold mt-2">
                  {step.title}
                </h3>

                <p className="mt-4 text-slate-400">
                  {step.description}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>


);
};

export default HowItWorks;
