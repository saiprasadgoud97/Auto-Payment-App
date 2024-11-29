import React, { useState, useEffect } from "react";

const Test = () => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [orders, setOrders] = useState([]);
  const [earlyButton,setEarlyButton]=useState(false)
  const mockdata = [
    {
      "id": 1,
      "orderId": 1001,
      "orderRate": 250,
      "CODcharges": 50,
      "usersId": "USR123",
      "status": "Delivered",
      "shippingDate": "2024-11-25T10:00:00Z",
      "pickupTime": "2024-11-24T08:00:00Z",
      "deadWeight": 15.5,
      "length": 40.0,
      "breadth": 30.0
    },
    {
      "id": 2,
      "orderId": 1002,
      "orderRate": 300,
      "CODcharges": 60,
      "usersId": "USR456",
      "status": "Delivered",
      "shippingDate": "2024-11-27T14:00:00Z",
      "pickupTime": "2024-11-24T08:00:00Z",
      "deadWeight": 15.5,
      "length": 40.0,
      "breadth": 30.0
    }
  ];


  useEffect(() => {
    setOrders(mockdata);
    checkPaymentCycle(mockdata);
  }
  , []);


  const checkPaymentCycle = (ordersData) => {
    const today = new Date();
    const dayOfWeek = today.getDay();


    if (dayOfWeek === 1 || dayOfWeek === 5) {
      setIsButtonEnabled(true);
        return;
    }


    const last2Days = new Date();
    last2Days.setDate(today.getDate() - 2);


     ordersData.filter(order =>
        setEarlyButton(new Date(order.shippingDate)>= last2Days)

    );

    if (earlyButton) {
      setIsButtonEnabled(true);
      return;
    }

    setIsButtonEnabled(false);
  };

  return (
    <div>
      <button disabled={!isButtonEnabled}>
        Automatic Payment
      </button>
      {!isButtonEnabled && <p>Payment cycle is not active.</p>}
    </div>
  );
};

export default Test;
