import {useState,type ReactNode,} from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = ({children,}: AppLayoutProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        open={open}
        setOpen={setOpen}
      />

      <div className="lg:ml-72">
        <Header setOpen={setOpen} />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;