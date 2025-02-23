import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown as AntDropdown, Space } from 'antd';

const items = [
  {
    label: 'English',
    key: 'en',
    className: 'font-bold text-[#374957] text-left', // Tailwind classes for selected English
  },
  {
    label: 'Bangla',
    key: 'bn',
    className: 'font-bold text-[#374957] text-left', // Tailwind classes for unselected Bangla
  },
];

const Dropdown = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleMenuClick = (e) => {
    setSelectedLanguage(e.key);
  };

  const getMenuItemClassName = (item) => {
    // Base Tailwind classes for all items
    let className = 'px-4 py-2 hover:bg-[#bae0ff]';

    if (item.key === selectedLanguage) {
      className += ` ${
        items.find((i) => i.key === selectedLanguage).className
      }`;
    } else {
        className += ` ${
            items.find((i) => i.key !== selectedLanguage).className
        }`;
    }
    return className;
  };

  return (
    <AntDropdown
      menu={{
        items: items.map((item) => ({
          ...item,
          label: (
            <div className={getMenuItemClassName(item)}>{item.label}</div>
          ), // Apply Tailwind classes to label
        })),
        onClick: handleMenuClick,
        selectedKeys: [selectedLanguage],
        getPopupContainer: (triggerNode) => triggerNode.parentNode,
      }}
      trigger={['click']}
      placement="bottom"
      arrow={{ pointAtCenter: true }}
      overlayStyle={{ marginTop: '8px' }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space className="bg-[#313a52] text-white text-nowrap w-[11vw] px-4 py-2 rounded-full border-4 border-[#313a52] hover:border-[#284b6e]">
          {selectedLanguage === 'en' ? 'English' : 'Bangla'}
          <DownOutlined className="ml-[3vw]" />
        </Space>
      </a>
    </AntDropdown>
  );
};

export default Dropdown;