import React, { useState } from 'react';

// --- Import your feature images ---
import noExpiryImage from '../../assets/sms/no-expiry.png';
import easyRechargeImage from '../../assets/sms/easy-recharge.png'; // Placeholder
import noWordLimitImage from '../../assets/sms/no-word-limit.png'; // Placeholder
import whatsappIntegrationImage from '../../assets/sms/whatsapp.png';
import noPurchaseLimitImage from '../../assets/sms/no-purchase-limit.png';
import dynamicSMSImage from '../../assets/sms/dynamic-sms.png';
import excelIntegrationImage from '../../assets/sms/excel-csv.png';
import phonebookGroupsImage from '../../assets/sms/phonebook.png';
import scheduledSMSImage from '../../assets/sms/schedule-sms.png';
import smsAutomationImage from '../../assets/sms/sms-automation.png';
import messageTemplateImage from '../../assets/sms/message-template.png';

// Import react-icons
import { FaPlay } from 'react-icons/fa'; // Example: Font Awesome Play icon

const TopFeatures = () => {
  // Define an array of background colors
  const backgroundColors = [
    'bg-[#f6eadf]', 'bg-[#dde9f4]', 'bg-[#e6e6ef]', 'bg-[#e0eee5]', 'bg-[#e0e1e2]',
    'bg-[#f6eadf]', 'bg-[#f6eadf]', 'bg-[#dde9f4]', 'bg-[#e6e6ef]', 'bg-[#f6eadf]',
    'bg-[#dde9f4]'
  ];


 const features = [
    {
      title: 'No Expiry Date',
      description: 'The SMS you buy is yours to keep, for as long as you need.',
      image: noExpiryImage,
      overlayIcon: <FaPlay />, // Use the imported React Icon component
    },
    {
      title: 'Easy Recharge',
      description: 'Recharge your SMS balance anytime with online payment.',
      image: easyRechargeImage,
       overlayIcon: <FaPlay />, // Use the imported React Icon component

    },
    {
      title: 'No Word Limit',
      description: 'No matter how long your message gets, we will not restrict you with any Limit.',
      image: noWordLimitImage,
      overlayIcon: <FaPlay />,
    },
    {
        title: 'WhatsApp Integration',
        description: 'Prefer WhatsApp over text messages? We got you covered!',
        image: whatsappIntegrationImage,
        overlayIcon: <FaPlay />,
      },
      {
          title: 'No purchase Limit',
          description: 'Be it one or thousand.  Buy whichever amount of messages you need.',
          image: noPurchaseLimitImage,
          overlayIcon: <FaPlay />,
        },
        {
          title: 'Dynamic SMS',
          description: 'Attach unique name, phone, marks etc. to each participant without typing manually.',
          image: dynamicSMSImage,
          overlayIcon:  <FaPlay />,
        },
        {
          title: 'Excel/CSV Integration',
          description: 'Import numbers, name and other data directly from Excel/CSV file.',
          image: excelIntegrationImage,
          overlayIcon:  <FaPlay />,
        },
        {
          title: 'Phonebook Groups',
          description: 'Save frequently contacted participants to custom groups of your choice.',
          image: phonebookGroupsImage,
          overlayIcon:  <FaPlay />,
        },
        {
          title: 'Scheduled SMS',
          description: 'Need to send SMS at a specific time?  Set up a scheduled SMS and it will be sent automatically.',
          image: scheduledSMSImage,
          overlayIcon:  <FaPlay />,
        },
        {
          title: 'SMS Automation',
          description: 'Send SMS to your recipients automatically based on the rules you set',
          image: smsAutomationImage,
          overlayIcon:  <FaPlay />,
        },
        {
                title: 'Message Template',
                description: 'Save the messages you type frequently in templates for future use.',
                image: messageTemplateImage,
                overlayIcon: <FaPlay />,
              },
  ];

  const [visibleRows, setVisibleRows] = useState(2);
  const cardsPerRow = 3;
  const totalRows = Math.ceil(features.length / cardsPerRow);

  const showMore = () => {
    setVisibleRows((prevRows) => prevRows + 2);
  };

  const showLess = () => {
    setVisibleRows(2);
  };

  return (
    <div className="p-8">
      <h2 className="text-center text-2xl font-normal mb-6">Top Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {features.slice(0, visibleRows * cardsPerRow).map((feature, index) => (
          <div
            key={index}
            className={`group relative flex flex-col p-6 rounded-3xl shadow-md w-full max-w-sm ${
              backgroundColors[index % backgroundColors.length]
            }`}
          >
            {/* Image */}
            <img
              src={feature.image}
              alt={feature.title}
              className="max-w-10 h-auto object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60 rounded-3xl opacity-0 group-hover:opacity-[0.7] transition-opacity duration-200 flex items-center justify-center"></div>

            {/* Overlay Icon -  Apply Tailwind classes directly to the icon component */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className='bg-[#f64747] p-4 rounded-full'>
              {React.cloneElement(feature.overlayIcon, {
                className:
                  "text-white text-4xl hover:text-blue-500 transition-colors duration-200" +
                  (feature.overlayIcon.props.className
                    ? " " + feature.overlayIcon.props.className
                    : ""),
              })}
              </div>
            </div>

            {/* Text Content */}
            <div className="pt-4">
              <h3 className="text-2xl font-normal mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 font-semibold">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* "See More/Less" buttons - No changes here */}
      <div className="text-center mt-8">
        {visibleRows < totalRows ? (
          <button
            onClick={showMore}
            className="text-[#007bff] hover:text-[#0056b3] font-normal transition duration-200 ease-in-out"
          >
            See More
          </button>
        ) : (
          <button
            onClick={showLess}
            className="text-[#007bff] hover:text-[#0056b3]  font-normal transition duration-200 ease-in-out"
          >
            See Less
          </button>
        )}
      </div>
    </div>
  );
};

export default TopFeatures;