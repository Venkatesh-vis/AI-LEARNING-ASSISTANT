import {
  User,
  Mail,
  CalendarDays,
} from "lucide-react";
import { useAppSelector } from "../../features/hooks/reduxHooks";

export default function ProfilePage() {
  const { user } = useAppSelector(
    (state) => state.auth
  );

  if (!user) {
    return (
      <div
        className="
          py-20
          text-center
          text-slate-500
        "
      >
        User not found.
      </div>
    );
  }

  const initials = user.username
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="
        mx-auto
        max-w-6xl
        space-y-8
      "
    >
      {/* Heading */}

      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-slate-900
          "
        >
          My Profile
        </h1>

        <p
          className="
            mt-2
            text-slate-500
          "
        >
          View your account information.
        </p>
      </div>

      {/* Profile */}

      <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-8
          shadow-sm
        "
      >
        <div
          className="
            flex
            flex-col
            gap-8
            lg:flex-row
            lg:items-center
          "
        >
          {/* Avatar */}

          <div
            className="
              flex
              justify-center
            "
          >
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.username}
                className="
                  h-28
                  w-28
                  rounded-full
                  border-4
                  border-emerald-100
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-28
                  w-28
                  items-center
                  justify-center
                  rounded-full
                  bg-emerald-100
                  text-4xl
                  font-bold
                  text-emerald-600
                "
              >
                {initials}
              </div>
            )}
          </div>

          {/* User */}

          <div className="flex-1">
            <h2
              className="
                text-3xl
                font-bold
                text-slate-900
              "
            >
              {user.username}
            </h2>

            <p
              className="
                mt-2
                text-lg
                text-slate-500
              "
            >
              {user.email}
            </p>
          </div>
        </div>

        {/* Divider */}

        <div
          className="
            my-8
            border-t
            border-slate-200
          "
        />

        {/* Details */}

        <div
          className="
            grid
            gap-6
            md:grid-cols-2
          "
        >
          {/* Username */}

          <div
            className="
              flex
              items-start
              gap-4
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-emerald-100
                text-emerald-600
              "
            >
              <User size={20} />
            </div>

            <div>
              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                Username
              </p>

              <p
                className="
                  mt-1
                  text-lg
                  font-semibold
                  text-slate-900
                "
              >
                {user.username}
              </p>
            </div>
          </div>

          {/* Email */}

          <div
            className="
              flex
              items-start
              gap-4
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-blue-100
                text-blue-600
              "
            >
              <Mail size={20} />
            </div>

            <div>
              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                Email Address
              </p>

              <p
                className="
                  mt-1
                  break-all
                  text-lg
                  font-semibold
                  text-slate-900
                "
              >
                {user.email}
              </p>
            </div>
          </div>

          {/* Joined */}

          <div
            className="
              flex
              items-start
              gap-4
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-amber-100
                text-amber-600
              "
            >
              <CalendarDays size={20} />
            </div>

            <div>
              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                Member Since
              </p>

              <p
                className="
                  mt-1
                  text-lg
                  font-semibold
                  text-slate-900
                "
              >
                {user.createdAt != null
                  ? new Date(user.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}