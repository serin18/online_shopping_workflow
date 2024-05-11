import React, { useState } from 'react';
import axios from 'axios';
import Workflow from './Workflow';
import './App.css';

const App = () => {
  const [orderStage, setOrderStage] = useState('orderPlaced');
  const [returnReason, setReturnReason] = useState(''); 

  const handleSuccessfulDelivery = async () => {
    try {
      const response = await axios.get('https://3f096af4-e0bf-4789-be5e-4c859cde5ad7.mock.pstmn.io/delivered');
      if (response.status === 200) {
        console.log('Order delivered successfully!');
        setOrderStage('delivered');
      } else {
        console.error('Failed to deliver order:', response.statusText);
      }
    } catch (error) {
      console.error('Error delivering order:', error.message);
    }
  };

  const handleReturn = () => {
    console.log('Initiating return process with reason:', returnReason);
    switch (returnReason) {
        case 'Damaged product':
            initiateRefund();
            break;
        case 'Wrong item received':
            initiateExchange();
            break;
        case 'Changed my mind':
            initiateStoreCredit();
            break;
        default:
            console.error('Invalid return reason:', returnReason);
            break;
    }
  };

  const initiateRefund = async () => {
    console.log('Initiating refund process...');
  };

  const initiateExchange = async () => {
    console.log('Initiating exchange process...');
  };

  const initiateStoreCredit = async () => {
    console.log('Initiating store credit process...');
  };

  return (
    <div className="App">
      <h1>Online-Shopping Order Processing</h1>
      <div className="order-stage">
        {orderStage === 'orderPlaced' && (
          <div>
            <p>Order placed. Awaiting shipment.</p>
            <button onClick={() => setOrderStage('shipped')} className="button primary">
              Ship Order
            </button>
            <button onClick={() => setOrderStage('canceled')} className="button secondary">
              Cancel Order
            </button>
          </div>
        )}
        {orderStage === 'shipped' && (
          <div>
            <p>Order shipped. Out for delivery.</p>
            <button onClick={handleSuccessfulDelivery} className="button primary">
              Out For Delivery
            </button>
            <button onClick={() => setOrderStage('canceled')} className="button secondary">
              Cancel Order
            </button>
          </div>
        )}
        {orderStage === 'delivered' && (
          <div>
            <p>Order delivered. Thank you!</p>
          </div>
        )}
        {orderStage === 'canceled' && (
          <p>Order canceled.</p>
        )}
        {orderStage === 'delivered' && (
          <div>
            <select value={returnReason} onChange={(e) => setReturnReason(e.target.value)}>
              <option value="">Select reason for return</option>
              <option value="Damaged product">Damaged product</option>
              <option value="Wrong item received">Wrong item received</option>
              <option value="Changed my mind">Changed my mind</option>
            </select>
            <button onClick={handleReturn}>Initiate Return</button> 
          </div>
        )}
      </div>
      <Workflow />
    </div>
  );
};

export default App;
