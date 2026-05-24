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

    <h2
      style="
        margin-top: 30px;
        color: #222;
      "
    >
      Ordered Products
    </h2>

    ${Order.OrderedProducts.map(
      (Product) => `
        <div
          style="
            display: flex;
            align-items: center;
            gap: 15px;
            border: 1px solid #eee;
            padding: 12px;
            margin-bottom: 12px;
            border-radius: 8px;
          "
        >

          <img
            src="${Product.ProductImage}"
            alt="${Product.ProductName}"
            width="80"
            height="80"
            style="
              object-fit: cover;
              border-radius: 8px;
            "
          />

          <div>

            <p>
              <strong>
                Product Name :
              </strong>

              ${Product.ProductName}
            </p>

            <p>
              <strong>
                Quantity :
              </strong>

              ${Product.Quantity}
            </p>

            <p>
              <strong>
                Price :
              </strong>

              ₹${Product.Price}
            </p>

          </div>

        </div>
      `
    ).join("")}

  </div>

  `;
};

export default OrderMailTemplate;