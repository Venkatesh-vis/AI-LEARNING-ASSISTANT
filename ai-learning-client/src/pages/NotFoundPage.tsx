import { BrainCircuit, ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFoundPage() {
return ( <div className="relative min-h-screen overflow-hidden bg-[#030712] text-white flex items-center justify-center px-6">
{/* Background Effects */} <div className="absolute inset-0 overflow-hidden"> <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-emerald-500/15 blur-[180px]" />


    <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[180px]" />
  </div>

  <div className="relative max-w-3xl text-center">
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
        duration: 0.6,
      }}
    >
      {/* Logo */}
      <div className="mx-auto mb-8 h-20 w-20 rounded-3xl bg-emerald-500 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
        <BrainCircuit size={40} />
      </div>

      {/* 404 */}
      <h1
        className="
          text-8xl
          md:text-9xl
          font-black
          bg-gradient-to-r
          from-emerald-400
          via-cyan-400
          to-purple-400
          bg-clip-text
          text-transparent
        "
      >
        404
      </h1>

      <h2 className="mt-6 text-3xl md:text-4xl font-bold">
        Lost In The Knowledge Base
      </h2>

      <p className="mt-6 text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
        The page you're looking for doesn't
        exist, has been moved, or the link
        you followed is invalid.
      </p>

      {/* Status Box */}
      <div
        className="
          mt-10
          rounded-2xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          p-5
          flex
          items-center
          gap-3
          max-w-lg
          mx-auto
        "
      >
        <Search
          size={20}
          className="text-emerald-400 shrink-0"
        />

        <span className="text-slate-400">
          Unable to locate this resource...
        </span>
      </div>

      {/* Quick Links */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          to="/documents"
          className="text-sm text-slate-400 hover:text-emerald-400 transition"
        >
          Documents
        </Link>

        <span className="text-slate-600">
          •
        </span>

        <Link
          to="/flashcards"
          className="text-sm text-slate-400 hover:text-emerald-400 transition"
        >
          Flashcards
        </Link>

        <span className="text-slate-600">
          •
        </span>

        <Link
          to="/profile"
          className="text-sm text-slate-400 hover:text-emerald-400 transition"
        >
          Profile
        </Link>
      </div>

      {/* Buttons */}
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          to="/"
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            bg-emerald-500
            px-8
            py-4
            font-semibold
            shadow-xl
            shadow-emerald-500/20
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
            <ArrowLeft size={18} />
            Back Home
          </span>
        </Link>

        <Link
          to="/login"
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.04]
            px-8
            py-4
            hover:bg-white/[0.08]
            transition
          "
        >
          Sign In
        </Link>
      </div>

      {/* Footer */}
      <p className="mt-12 text-sm text-slate-500 tracking-wider">
        ERROR CODE: RESOURCE_NOT_FOUND_404
      </p>
    </motion.div>
  </div>
</div>


);
}
