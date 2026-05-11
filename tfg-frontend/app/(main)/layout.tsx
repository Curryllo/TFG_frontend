import NavBar from "@/components/NavBar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
          {children}
        </main>
      </div>
    </>
  );
}