import Navbar from '@/app/(components)/Navbar';
import Sidebar from '@/app/(components)/Sidebar';
const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    // TODO => add dark mode
    <div className={`light flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
      <Sidebar />
      <main
        className={`flex  flex-col w-ful h-full py-7 px-9 bg-gray-50 md:pl-24`}
      >
        <Navbar></Navbar>
        {children}
      </main>
    </div>
  );
};

export default DashboardWrapper;
