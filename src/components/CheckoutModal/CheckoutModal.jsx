// CheckoutModal.js (Styled Heading and Close Button)
import { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

const CheckoutModal = ({ isOpen, closeModal, productData, initialQuantity = 1, quantityInputRef }) => {
  // ... (All the state variables and useEffect remain the same) ...
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [quantity, setQuantity] = useState(initialQuantity);
  const [total, setTotal] = useState(0);
  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && productData) {
      setName("");
      setPhone("");
      setAddress("");
      setQuantity(initialQuantity);
      setTotal(productData.price * initialQuantity);
      setErrors({});
      setPaymentMethod("");
    }
  }, [isOpen, productData, initialQuantity]);

    const validate = () => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Please enter your name!";
        }

        if (!phone.trim()) {
          newErrors.phone = "Please enter your phone number!";
        } else if (!/^\+?\d{1,3}\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone)) {
          newErrors.phone = "Invalid phone number format (e.g., +1 (841) 127-7163)";
        }

        if (!address.trim()) {
            newErrors.address = "Please enter your address!";
        }

        if (!paymentMethod) {
            newErrors.paymentMethod = "Please select a payment method.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

  const isFormValid = !errors.name && !errors.phone && !errors.address && !errors.paymentMethod && name && phone && address && paymentMethod;

  const handleConfirm = () => {
    if (validate() && productData) {
      console.log("Order Confirmed:", {
        name,
        phone,
        address,
        paymentMethod,
        product: productData.name,
        quantity,
        total,
      });
      closeModal();
      setName("");
      setPhone("");
      setAddress("");
      setQuantity(1);
      setPaymentMethod("");
      setErrors({});
    }
  };

  // --- Key Improvement:  onChange handler for phone ---
    const handlePhoneChange = (e) => {
        const newPhone = e.target.value;
        setPhone(newPhone);

        // Immediate validation (part of the fix)
        if (!newPhone.trim()) {
            setErrors(prevErrors => ({ ...prevErrors, phone: "Please enter your phone number!" }));
        } else if (!/^\+?\d{1,3}\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(newPhone)) {
            setErrors(prevErrors => ({ ...prevErrors, phone: "Invalid phone number format" }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, phone: undefined })); // Clear the error
        }
    };

  if (!isOpen) return null;
  if (!productData) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal} />
        <div className="bg-white p-8 rounded-lg shadow-lg w-10/12 md:w-1/2 relative z-50">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal} />
      <div
        ref={modalRef}
        className="bg-white px-12 py-16 rounded-lg shadow-lg w-10/12 md:10/12 relative z-50"
      >
        {/* ---  Header Section  --- */}
        <div className="flex items-center justify-between mb-4 border-b pb-2">
          <h2 className="text-2xl font-bold">Checkout</h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={closeModal}
          >
            <IoClose size={24} />
          </button>
        </div>
        {/* ---  End Header Section  --- */}

        <div className="flex justify-between mt-12">
          <div className="w-[60%]">
            <h3 className="text-lg font-semibold mb-4">
              Contact Information
            </h3>
            <div className="mb-4">
              <input
                type="text"
                id="Name"
                value={name}
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="phone"
                value={phone}
                placeholder="Phone"
                onChange={handlePhoneChange} // Use the new handler
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Delivery Address
              </label>
              <textarea
                id="address"
                value={address}
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
                rows="3"
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700">
                Payment Method
              </h3>
              <label className="flex items-center mt-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cashOnDelivery"
                  checked={paymentMethod === "cashOnDelivery"} // This is now correct
                  onChange={() => setPaymentMethod("cashOnDelivery")}
                  className="mr-2"
                />
                Cash on Delivery
              </label>
               {errors.paymentMethod && (
                    <p className="text-red-500 text-xs mt-1">{errors.paymentMethod}</p>
                )}
            </div>
          </div>

          <div className="w-1/3 p-8 shadow-lg rounded-lg">
            <h3 className="text-lg font-normal mb-6 pb-2 border-b-2 border-[#f0f0f0]">Order Summary</h3>
            <div className="flex items-center mb-4 relative">
              <img
                src={productData.image}
                alt={productData.name}
                className="w-16 h-16 object-cover mr-4"
              />
              <span className="absolute bottom-[8vh] right-[16.3vw] w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                {quantity}
              </span>
              <div>
                <p className="font-normal">{productData.name}</p>
                <p>Price: <span className="font-light">৳</span><span className="font-semibold"> {productData.price}</span></p>
              </div>
            </div>
            <div className="mb-4 flex justify-between items-center">
              <label
                htmlFor="quantity"
                className="block font-semibold text-gray-700"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                ref={quantityInputRef}
                onChange={(e) => {
                  const newQuantity = Math.max(1, parseInt(e.target.value || 1));
                  setQuantity(newQuantity);
                  setTotal(productData.price * newQuantity);
                }}
                min="1"
                className="mt-1 block w-20 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <p className="text-lg font-semibold flex justify-between items-center">
                <div className="font-normal">Total:</div>
                <div><span className="font-light">৳</span>{total.toFixed(2)}</div>
              </p>
            </div>
            <button
              className={`bg-green-500 hover:bg-green-600 text-white w-full font-bold py-2 px-4 rounded mt-4 ${
                !isFormValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleConfirm}
              disabled={!isFormValid}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;