import { motion } from "framer-motion";
import {
GraduationCap,
Briefcase,
BookOpen,
} from "lucide-react";

const testimonials = [
{
icon: GraduationCap,
title: "Students",
quote:
"Upload lecture notes, textbooks, and study materials to generate summaries, flashcards, and quizzes for faster revision.",
},
{
icon: Briefcase,
title: "Interview Preparation",
quote:
"Convert React, Node.js, MongoDB, System Design, or DevOps PDFs into interactive learning resources and AI-powered Q&A.",
},
{
icon: BookOpen,
title: "Continuous Learning",
quote:
"Chat with technical documentation, company guides, and knowledge bases to learn concepts without manually searching documents.",
},
];

const Testimonials = () => {
return ( <section className="py-32"> <div className="max-w-7xl mx-auto px-6"> <div className="text-center mb-20"> <span className="text-emerald-400 font-medium">
USE CASES </span>

      <h2 className="mt-4 text-5xl font-bold">
        Built For

        <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Modern Learners
        </span>
      </h2>

      <p className="mt-6 text-slate-400 text-lg max-w-2xl mx-auto">
        Whether you're studying for exams,
        preparing for interviews, or learning
        new technologies, the platform helps
        transform documents into interactive
        learning experiences.
      </p>
    </div>

    <div className="grid gap-8 lg:grid-cols-3">
      {testimonials.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
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
              rounded-3xl
              border
              cursor-pointer
              border-white/10
              bg-white/[0.04]
              backdrop-blur-xl
              p-8
              hover:border-emerald-500/30
              hover:-translate-y-2
              transition-all
              duration-300
            "
          >
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
              <Icon
                size={26}
                className="text-emerald-400"
              />
            </div>

            <h3 className="text-2xl font-semibold mb-4">
              {item.title}
            </h3>

            <p className="text-slate-400 leading-relaxed">
              {item.quote}
            </p>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>


);
};

export default Testimonials;
