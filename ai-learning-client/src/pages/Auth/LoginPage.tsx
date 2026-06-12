import { Link } from "react-router-dom";
import {Mail,Lock,BrainCircuit,ArrowRight,} from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../features/hooks/reduxHooks";
import { loginUser } from "../../features/auth/authThunk";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");
  const { loading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setValidationError("Please enter your email");
      return;
    }

    if (!password.trim()) {
      setValidationError("Please enter your password");
      return;
    }

    setValidationError("");

    try {
      await dispatch(loginUser({ email, password }))
    } catch {
      // Redux handles API errors
    }
  };

  return (
  <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] flex flex-col items-center justify-center px-4">
    {/* Background Effects */} 
    <div className="absolute inset-0 overflow-hidden"> <div
      className="
         absolute
         -top-40
         left-1/2
         -translate-x-1/2
         h-[550px]
         w-[550px]
         rounded-full
         bg-emerald-500/15
         blur-[140px]
       "
    />

      <div
        className="
        absolute
        bottom-0
        right-0
        h-[450px]
        w-[450px]
        rounded-full
        bg-cyan-500/10
        blur-[140px]
      "
      />

      <div
        className="
        absolute
        bottom-0
        left-0
        h-[350px]
        w-[350px]
        rounded-full
        bg-purple-500/10
        blur-[120px]
      "
      />

      <div
        className="
        absolute
        inset-0
        opacity-[0.03]
        [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
        [background-size:50px_50px]
      "
      />

      <div
        className="
        absolute
        top-24
        left-12
        h-24
        w-24
        rounded-full
        border
        border-emerald-200
      "
      />

      <div
        className="
        absolute
        bottom-24
        right-20
        h-40
        w-40
        rounded-full
        border
        border-cyan-200
      "
      />

      <div
        className="
        absolute
        top-1/2
        right-16
        h-16
        w-16
        rounded-full
        border
        border-purple-200
      "
      />

      <BrainCircuit
        size={280}
        className="
        absolute
        right-[8%]
        top-1/2
        -translate-y-1/2
        text-emerald-500/5
        hidden
        xl:block
      "
      />
    </div>

    {/* Login Card */}
    <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="h-14 w-14 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-md">
          <BrainCircuit
            className="text-white"
            size={28}
          />
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-center text-slate-900">
        Welcome back
      </h1>

      <p className="text-center text-slate-500 mt-2 mb-6">
        Sign in to continue your journey
      </p>


      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">
            Email
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);

                if (validationError) {
                  setValidationError("");
                }
              }}
              placeholder="you@example.com"
              className="
              w-full
              h-12
              pl-12
              pr-4
              border
              border-slate-200
              rounded-xl
              outline-none
              focus:border-emerald-500
              focus:ring-2
              focus:ring-emerald-100
              transition
            "
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">
            Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);

                if (validationError) {
                  setValidationError("");
                }
              }}
              placeholder="Enter password"
              className="
              w-full
              h-12
              pl-12
              pr-4
              border
              border-slate-200
              rounded-xl
              outline-none
              focus:border-emerald-500
              focus:ring-2
              focus:ring-emerald-100
              transition
            "
            />
          </div>
        </div>

        {/* Error Box */}
        {(validationError || error) && (
          <div
            className="
          mb-6
          rounded-xl
          border
          border-red-200
          bg-red-50
          px-4
          py-3
          text-sm
          text-center
          text-red-600
        "
          >
            {validationError || error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="
          group
          relative
          overflow-hidden
          w-full
          h-12
          rounded-xl
          font-medium
          flex
          items-center
          justify-center
          gap-2
          text-white
          bg-emerald-500
          hover:bg-emerald-600
          transition-all
          duration-300
          disabled:opacity-80
          disabled:cursor-not-allowed
        "
        >
          {!loading && (
            <span
              className="
              absolute
              inset-0
              -translate-x-full
              bg-gradient-to-r
              from-transparent
              via-white/30
              to-transparent
              group-hover:translate-x-full
              transition-transform
              duration-1000
            "
            />
          )}

          <span className="relative z-10 flex items-center gap-2">
            {loading ? (
              <>
                <div
                  className="
                  h-4
                  w-4
                  rounded-full
                  border-2
                  border-white/30
                  border-t-white
                  animate-spin
                "
                />

                Signing In...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight
                  size={18}
                />
              </>
            )}
          </span>
        </button>
      </form>

      <div className="border-t border-slate-100 my-7" />

      <p className="text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-emerald-600 hover:text-emerald-700"
        >
          Sign up
        </Link>
      </p>
    </div>

    <p className="relative z-10 text-xs text-slate-400 mt-8 text-center">
      By continuing, you agree to our
      Terms & Privacy Policy
    </p>
  </div>


  );
};

export default LoginPage;
