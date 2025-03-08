import { Link } from 'react-router-dom';
import { BiErrorCircle } from 'react-icons/bi'; // Import a suitable icon
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NotFoundPage = () => {

  const showError = () => {
      toast.error("Oops! Page not found.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <ToastContainer /> {/* Add ToastContainer here */}
      <BiErrorCircle className="text-red-500 text-9xl mb-4" /> {/* Use the icon */}
      <h1 className="text-4xl font-bold text-gray-700 mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-4">Page Not Found</h2>
      <p className="text-gray-500 text-center mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div className='space-x-4'>

        <Link to="/" className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-300">
            Go to Homepage
        </Link>
        <button
            onClick={showError}  // Call the showError function on button click
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-300"
        >
            Show Error (Toast)
        </button>
    </div>
    </div>
  );
};

export default NotFoundPage;