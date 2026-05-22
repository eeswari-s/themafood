//================
// Order Invoice Template
//================

const OrderInvoiceTemplate = (
  Order
) => {
  return `
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />

  <title>
    ThemaFood Invoice
  </title>

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;

      font-family: Arial,
        sans-serif;
    }

    body {
      padding: 40px;

      background: #f5f5f5;
    }

    .InvoiceContainer {
      max-width: 900px;

      margin: auto;

      background: white;

      padding: 40px;

      border-radius: 10px;
    }

    .Header {
      display: flex;

      justify-content:
        space-between;

      align-items: center;

      margin-bottom: 40px;
    }

    .Logo {
      font-size: 32px;

      font-weight: bold;

      color: #7a0000;
    }

    .InvoiceTitle {
      font-size: 24px;

      font-weight: bold;
    }

    .CustomerSection {
      margin-bottom: 30px;
    }

    .CustomerSection h2 {
      margin-bottom: 15px;

      color: #7a0000;
    }

    .CustomerSection p {
      margin-bottom: 8px;

      font-size: 15px;
    }

    table {
      width: 100%;

      border-collapse: collapse;

      margin-top: 20px;
    }

    table th {
      background: #7a0000;

      color: white;

      padding: 12px;

      text-align: left;
    }

    table td {
      padding: 12px;

      border-bottom:
        1px solid #ddd;
    }

    .TotalSection {
      margin-top: 30px;

      text-align: right;
    }

    .TotalSection h2 {
      color: #7a0000;
    }

    .Footer {
      margin-top: 50px;

      text-align: center;

      color: #777;

      font-size: 14px;
    }
  </style>
</head>

<body>

  <div class="InvoiceContainer">

    <div class="Header">
      <div class="Logo">
        ThemaFood
      </div>

      <div class="InvoiceTitle">
        Order Invoice
      </div>
    </div>

    <div class="CustomerSection">

      <h2>
        Customer Details
      </h2>

      <p>
        <strong>Name:</strong>
        ${Order.CustomerName}
      </p>

      <p>
        <strong>Phone:</strong>
        ${Order.PhoneNumber}
      </p>

      <p>
        <strong>Alternate Phone:</strong>
        ${
          Order.AlternatePhoneNumber ||
          "-"
        }
      </p>

      <p>
        <strong>Address:</strong>
        ${Order.Address}
      </p>

      <p>
        <strong>Order Status:</strong>
        ${Order.OrderStatus}
      </p>

    </div>

    <table>

      <thead>
        <tr>
          <th>
            Product
          </th>

          <th>
            Weight
          </th>

          <th>
            Quantity
          </th>

          <th>
            Price
          </th>

          <th>
            Total
          </th>
        </tr>
      </thead>

      <tbody>

        ${Order.OrderedProducts.map(
          (Product) => `
            <tr>

              <td>
                ${Product.ProductName}
              </td>

              <td>
                ${Product.Weight}
              </td>

              <td>
                ${Product.Quantity}
              </td>

              <td>
                ₹${Product.Price}
              </td>

              <td>
                ₹${Product.TotalPrice}
              </td>

            </tr>
          `
        ).join("")}

      </tbody>

    </table>

    <div class="TotalSection">

      <h3>
        Total Items :
        ${Order.TotalItems}
      </h3>

      <h2>
        Total Amount :
        ₹${Order.TotalAmount}
      </h2>

    </div>

    <div class="Footer">
      Thank you for ordering from
      ThemaFood ❤️
    </div>

  </div>

</body>
</html>
`;
};

export default OrderInvoiceTemplate;