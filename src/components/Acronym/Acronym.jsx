import { useState } from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';

const Acronym = () => {
  const [activeKey, setActiveKey] = useState(null);

  const onChange = (key) => {
    setActiveKey(key === activeKey ? null : key);
  };

  const items = [
    {
      key: '1',
      label: (
        <div
          style={{ position: 'relative', width: '100%', cursor: 'pointer', fontSize: "20px", fontWeight: "600", color: "#374957" }}
          onClick={(event) => {
            event.stopPropagation(); // Prevent event bubbling from header
            onChange('1');
          }}
        >
          Can I use the free plan forever?
          <div style={{ position: 'absolute', right: 0, top: 0 }}>
            {activeKey !== '1' && (
              <PlusOutlined
                onClick={(event) => {
                  event.stopPropagation(); // Prevent event bubbling from plus icon
                  onChange('1');
                }}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <div style={{ position: 'relative', paddingTop: '10px' }}>
          Yes. You can use the free plan forever. You should only upgrade if you require some of the advanced features that are exclusive to the paid plan.
          {activeKey === '1' && (
            <CloseOutlined
              style={{ position: 'absolute', right: '0', top: '10px' }}
              onClick={(event) => {
                event.stopPropagation(); // Prevent event bubbling from close icon
                onChange('1');
              }}
            />
          )}
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div
        style={{ position: 'relative', width: '100%', cursor: 'pointer', fontSize: "20px", fontWeight: "600", color: "#374957" }}
          onClick={(event) => {
              event.stopPropagation();
              onChange('2');
          }}
        >
          Header 2:  How do I upgrade to the pro plan?
          <div style={{ position: 'absolute', right: 0, top: 0 }}>
            {activeKey !== '2' && (
              <PlusOutlined
                onClick={(event) => {
                    event.stopPropagation();
                    onChange('2');
                }}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <div style={{ position: 'relative', paddingTop: '10px' }}>
          You can upgrade just by pressing the upgrade button and logging in your account. Please note that you will be charged a subscription fee every month based on the total active students you have.
          {activeKey === '2' && (
            <CloseOutlined
              style={{ position: 'absolute', right: '0', top: '10px' }}
              onClick={(event) => {
                event.stopPropagation();
                onChange('2');
              }}
            />
          )}
        </div>
      ),
    },
     {
      key: '3',
      label: (
        <div
        style={{ position: 'relative', width: '100%', cursor: 'pointer', fontSize: "20px", fontWeight: "600", color: "#374957" }}
          onClick={(event) => {
              event.stopPropagation();
              onChange('3');
          }}
        >
          Header 3:  How do I pay for the pro plan?
          <div style={{ position: 'absolute', right: 0, top: 0 }}>
            {activeKey !== '3' && (
              <PlusOutlined
                onClick={(event) => {
                    event.stopPropagation();
                    onChange('3');
                }}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <div style={{ position: 'relative', paddingTop: '10px' }}>
          <span style={{ display: 'block', width: '99%' }}>You can easily pay for the pro plan by making the payment through bkash, nagad, visa/mastercard and most other established payment gateways. If you are facing issues with it, contact us and we will be happy to assist you.</span>
          {activeKey === '3' && (
            <CloseOutlined
              style={{ position: 'absolute', right: '0', top: '10px' }}
              onClick={(event) => {
                event.stopPropagation();
                onChange('3');
              }}
            />
          )}
        </div>
      ),
    },
    {
      key: '4',
      label: (
        <div
        style={{ position: 'relative', width: '100%', cursor: 'pointer', fontSize: "20px", fontWeight: "600", color: "#374957" }}
          onClick={(event) => {
            event.stopPropagation();
            onChange('4');
          }}
        >
         Header 4:  Can I revert back to the free plan after upgrading?
          <div style={{ position: 'absolute', right: 0, top: 0 }}>
            {activeKey !== '4' && (
              <PlusOutlined
                onClick={(event) => {
                  event.stopPropagation();
                  onChange('4');
                }}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <div style={{ position: 'relative', paddingTop: '10px' }}>
          Yes. You can revert back to the free plan whenever you want. However, please note that you will lose access to the exclusive features of the pro plan.
          {activeKey === '4' && (
            <CloseOutlined
              style={{ position: 'absolute', right: '0', top: '10px' }}
              onClick={(event) => {
                event.stopPropagation();
                onChange('4');
              }}
            />
          )}
        </div>
      ),
    },
    {
      key: '5',
      label: (
        <div
        style={{ position: 'relative', width: '100%', cursor: 'pointer', fontSize: "20px", fontWeight: "600", color: "#374957" }}
          onClick={(event) => {
            event.stopPropagation();
            onChange('5');
          }}
        >
          Header 5:  Can I upgrade later or in the future after I start using it?
          <div style={{ position: 'absolute', right: 0, top: 0 }}>
            {activeKey !== '5' && (
              <PlusOutlined
                onClick={(event) => {
                  event.stopPropagation();
                  onChange('5');
                }}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <div style={{ position: 'relative', paddingTop: '10px' }}>
          Yes, you can upgrade any time.
          {activeKey === '5' && (
            <CloseOutlined
              style={{ position: 'absolute', right: '0', top: '10px' }}
              onClick={(event) => {
                event.stopPropagation();
                onChange('5');
              }}
            />
          )}
        </div>
      ),
    },
  ];

  const customPanelStyle = {
    marginBottom: 24,
    overflow: 'hidden',
    background: 'white',
    border: 'none',
  };

  return (
    <>
      <Collapse
        activeKey={[activeKey]}
        onChange={onChange}
        expandIcon={() => null}
        items={items}
        style={customPanelStyle}
      />
    </>
  );
};

export default Acronym;