import { Navbar } from "@/features/dashboard/components/navbar";
import { Sidebar } from "@/features/dashboard/components/sidebar";

type DashbaordLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashbaordLayoutProps) => {
  return (
    <div className="flex h-full w-full bg-muted">
      <Sidebar />
      <div className="flex h-full flex-1 flex-col">
        <Navbar />
        <main className="max-w-full flex-1 overflow-auto bg-white p-8 lg:rounded-tl-2xl">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
