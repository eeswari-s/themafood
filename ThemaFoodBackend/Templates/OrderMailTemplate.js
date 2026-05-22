//================
// Order Mail Template
//================

const OrderMailTemplate = (
  Order
) => {
  return `
  
  <div
    style="
      font-family: Arial;
      padding: 20px;
    "
  >

    <h1
      style="
        color: #7a0000;
      "
    >
      New Order Received
    </h1>

    <p>
      <strong>
        Customer Name :
      </strong>

      ${Order.CustomerName}
    </p>

    <p>
      <strong>
        Phone Number :
      </strong>

      ${Order.PhoneNumber}
    </p>

    <p>
      <strong>
        Address :
      </strong>

      ${Order.Address}
    </p>

    <p>
      <strong>
        Total Amount :
      </strong>

      ₹${Order.TotalAmount}
    </p>

    <p>
      Order invoice attached
      below.
    </p>

  </div>

  `;
};

export default OrderMailTemplate;