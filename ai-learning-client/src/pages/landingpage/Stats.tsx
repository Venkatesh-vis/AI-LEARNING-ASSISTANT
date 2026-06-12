import { motion } from "framer-motion";
import {
BrainCircuit,
Database,
ShieldCheck,
FileText,
} from "lucide-react";

const stats = [
{
icon: BrainCircuit,
value: "Gemini 2.5",
label: "AI Generation Engine",
},
{
icon: FileText,
value: "RAG",
label: "Context-Aware Retrieval",
},
{
icon: Database,
value: "MongoDB",
label: "Document Storage",
},
{
icon: ShieldCheck,
value: "JWT",
label: "Secure Authentication",
},
];

const Stats = () => {
return ( <section className="py-24 relative"> <div className="max-w-7xl mx-auto px-6"> <div className="text-center mb-14"> <h2 className="text-4xl md:text-5xl font-bold">
Built With Modern AI Infrastructure </h2>

      <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
        Combining Retrieval-Augmented Generation,
        Gemini AI, MongoDB, and secure authentication
        to create an intelligent learning experience.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.label}
            initial={{
              opacity: 0,
              y: 30,
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
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-5">
              <Icon
                className="text-emerald-400"
                size={26}
              />
            </div>

            <h3 className="text-3xl font-bold">
              {item.value}
            </h3>

            <p className="text-slate-400 mt-2">
              {item.label}
            </p>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>


);
};

export default Stats;
