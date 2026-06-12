import { BrainCircuit } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
return ( <header className="fixed top-0 left-0 w-full z-50"> <div className="absolute inset-0 bg-[#030712]/80 backdrop-blur-xl border-b border-white/10" />

  <div className="relative max-w-7xl mx-auto px-6">
    <div className="h-20 flex items-center justify-between">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-3"
      >
        <div className="h-11 w-11 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <BrainCircuit size={24} />
        </div>

        <div>
          <h1 className="font-bold text-lg text-white">
            LearnFlow AI
          </h1>

          <p className="text-xs text-slate-400">
            RAG-Powered Learning Platform
          </p>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <a
          href="#features"
          className="
            text-slate-300
            hover:text-white
            transition
          "
        >
          Features
        </a>

        <a
          href="#how-it-works"
          className="
            text-slate-300
            hover:text-white
            transition
          "
        >
          How It Works
        </a>

        <a
          href="#faq"
          className="
            text-slate-300
            hover:text-white
            transition
          "
        >
          FAQ
        </a>

        <a
          href="#contact"
          className="
            text-slate-300
            hover:text-white
            transition
          "
        >
          Contact
        </a>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className="
            hidden
            md:block
            text-slate-300
            hover:text-white
            transition
          "
        >
          Sign In
        </Link>

        <Link
          to="/dashboard"
          className="
            group
            relative
            overflow-hidden
            rounded-xl
            bg-emerald-500
            px-5
            py-2.5
            font-medium
            shadow-lg
            shadow-emerald-500/20
            hover:bg-emerald-400
            transition
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
              ease-out
              group-hover:left-[150%]
            "
          />

          <span className="relative">
            Get Started
          </span>
        </Link>
      </div>
    </div>
  </div>
</header>


);
};

export default Navbar;
