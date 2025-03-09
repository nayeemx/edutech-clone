import { FaCheck, FaTimes } from 'react-icons/fa'; // Import icons

const Tables = () => {
  // Sample data (replace with your actual data).
  const tableData = [
    { col1: "Classrooms", col2: "Unlimited", col3: "Unlimited" },
    { col1: "Student", col2: "Unlimited", col3: "Unlimited" },
    { col1: "Teacher", col2: "Unlimited", col3: "Unlimited" },
    { col1: "Admin account", col2: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Bulk Import data (from excel)", col2: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Bulk Import data (as pdf & excel)", col2: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Attendance management", col2: "Auto & Manual", col3: "Auto & Manual" },
    { col1: "Auto check-in/check-out alert", col2: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Academic payment collection", col2: "Cash & online", col3: "Cash & online" },
    { col1: "Recurring & one-time payments", col2: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Invoice generator & payment completion alert", col2: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Calendar (class timing & custom events)", col2: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Bulk SMS gateway", col2: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Dynamic SMS alerts", col2: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Notice-Board", col2: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Assessments", col2: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Assessment segmentation & grading", col2: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Report Card", col2: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Overseer - student progress tracking", col2: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Sentinel – Student Safety", col2: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Money manager with custom income/expense", col2: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Money manager activity history", col2: <FaTimes className="text-white bg-[#93a1b8] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Business insights & analytics", col2: <FaTimes className="text-white bg-[#93a1b8] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Multi-currency support", col2: <FaTimes className="text-white bg-[#93a1b8] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Stakeholder revenue/profit auto-splitting", col2: <FaTimes className="text-white bg-[#93a1b8] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Student archival", col2: <FaTimes className="text-white bg-[#93a1b8] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Edutech - auto class recording", col2: <FaTimes className="text-white bg-[#93a1b8] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Edutechs AI", col2: <FaTimes className="text-white bg-[#93a1b8] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Zoom Integration", col2: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Online admissions", col2: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Staff Management", col2: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Staff attendance & salary disbursement", col2: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Video Courses", col2: "Up to 1TB", col3: "Up to 1TB" },
    { col1: "File storage", col2: "Up to 1TB", col3: "Up to 1TB" },
    { col1: "Student & parent account", col2: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Moderators", col2: 2, col3: "Unlimited" },
    { col1: "Moderator privilege control", col2: "Basic", col3: "Full" },
    { col1: "Data loss protection", col2: <FaTimes className="text-white bg-[#93a1b8] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Basic training for data security & cyberattacks", col2: <FaTimes className="text-white bg-[#93a1b8] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },
    { col1: "Activity tracking", col2: <FaTimes className="text-white bg-[#93a1b8] text-sm p-[6px] w-[2vw] h-auto rounded-full" />, col3: <FaCheck className="text-white bg-[#2679fa] text-sm p-[6px] w-[2vw] h-auto rounded-full" /> },

  ];


  return (
    <div className="overflow-y-auto h-[120vh] relative" style={{ scrollbarWidth: 'none' }}>
        {/* Sticky header */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xl font-bold text-[#545454] uppercase tracking-wider">
              Compare Features
              </th>
              <th scope="col">
                <div className='flex flex-col font-normal gap-2 my-4 text-justify'>
                  <h4 className='text-xl text-[#67758f] font-semibold'>Lite</h4>
                  <p>৳0/student per month</p>
                  <button className='bg-[#038fde] text-white text-nowrap px-[4px] py-[8px] rounded-full w-[55%]'>
                    <p className='relative'>Start For Free</p>
                  </button>
                </div>
              </th>
              <th scope="col">
              <div className='flex flex-col font-normal gap-2 my-4 text-justify'>
                  <h4 className='text-xl text-[#2679fa] font-semibold'>Pro</h4>
                  <p>৳20/student per month</p>
                  <button className='text-[#2679fa] border-1 border-[#2679fa] px-[4px] py-[6px] rounded-full w-[35%]'>
                    <p className='relative'>Upgrade</p>
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">{row.col1}</td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">{row.col2}</td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">{row.col3}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Hide scrollbars (cross-browser) */}
        <style jsx>{`
          .overflow-y-auto::-webkit-scrollbar {
            display: none;
          }
          .overflow-y-auto {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}</style>
      </div>
  );
};

export default Tables;