import { motion } from "framer-motion";
import {
BrainCircuit,
Upload,
BookOpen,
GraduationCap,
BarChart3,
MessageSquare,
} from "lucide-react";

const features = [
{
icon: Upload,
title: "PDF Upload & Processing",
description:
"Upload study materials, notes, technical documentation, and learning resources for AI-powered analysis.",
},
{
icon: MessageSquare,
title: "Document Chat",
description:
"Ask questions and receive contextual answers directly from your uploaded documents using RAG.",
},
{
icon: BrainCircuit,
title: "AI Summaries",
description:
"Convert lengthy PDFs into concise summaries that highlight key concepts and important information.",
},
{
icon: BookOpen,
title: "Smart Flashcards",
description:
"Generate revision-ready flashcards automatically from uploaded content and study materials.",
},
{
icon: GraduationCap,
title: "AI Quizzes",
description:
"Create personalized quizzes from documents with automatic evaluation and scoring.",
},
{
icon: BarChart3,
title: "Learning Analytics",
description:
"Track quiz performance, study progress, completed flashcards, and overall learning activity.",
},
];

const Features = () => {
return ( <section
   id="features"
   className="py-32 relative"
 > <div className="max-w-7xl mx-auto px-6"> <div className="text-center max-w-3xl mx-auto mb-20"> <span className="text-emerald-400 font-medium">
FEATURES </span>

      <h2 className="mt-4 text-5xl font-bold">
        Everything You Need To

        <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Learn Smarter With AI
        </span>
      </h2>

      <p className="mt-6 text-slate-400 text-lg">
        Transform static PDFs into
        interactive learning experiences
        with AI-powered summaries,
        quizzes, flashcards, analytics,
        and contextual document chat.
      </p>
    </div>

    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => {
        const Icon = feature.icon;

        return (
          <motion.div
            key={feature.title}
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
              delay: index * 0.1,
            }}
            className="
              group
              cursor-pointer
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-white/[0.04]
              p-8
              backdrop-blur-xl
              hover:border-emerald-500/30
              hover:-translate-y-2
              transition-all
              duration-300
            "
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 transition" />

            <div className="relative">
              <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
                <Icon
                  size={26}
                  className="text-emerald-400"
                />
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                {feature.title}
              </h3>

              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>

);
};

export default Features;
