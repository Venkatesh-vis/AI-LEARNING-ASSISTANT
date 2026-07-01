import { Menu, User} from "lucide-react";
import { useAppSelector } from "../../features/hooks/reduxHooks";

type HeaderProps = { setOpen: React.Dispatch<React.SetStateAction<boolean>>; };

const Header = ({ setOpen, }: HeaderProps) => {

  const { user } = useAppSelector((state) => state.auth)

  return (
    <header
      className="
        sticky
        top-0
        z-30
        h-20
        bg-white
        border-b
        border-slate-200
      "
    >

      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden"
          >
            <Menu />
          </button>
          <div>

            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-900">
                Welcome back,
                <span className="text-emerald-600 ml-2">
                  {user?.username}
                </span>
              </h1>
            </div>
          </div>
        </div>


        <div className="flex items-center gap-3">
          <div
            className="
      h-11
      w-11
      rounded-full
      bg-emerald-100
      flex
      items-center
      justify-center
      shrink-0
    "
          >
            <User
              size={20}
              className="text-emerald-600"
            />
          </div>

          <div className="hidden sm:block">
            <p className="font-medium text-sm text-slate-800">
              {user?.username}
            </p>

            <p className="text-xs text-slate-500">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;