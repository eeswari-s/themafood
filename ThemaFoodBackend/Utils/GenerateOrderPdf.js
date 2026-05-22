import puppeteer from "puppeteer";

import fs from "fs";

import path from "path";

import OrderInvoiceTemplate from "../Templates/OrderInvoiceTemplate.js";

//================
// Generate Order PDF
//================

const GenerateOrderPdf = async (
  Order
) => {
  try {
    //================
    // Invoice Folder
    //================

    const InvoiceFolder =
      path.join("Invoices");

    if (
      !fs.existsSync(
        InvoiceFolder
      )
    ) {
      fs.mkdirSync(
        InvoiceFolder
      );
    }

    //================
    // PDF File Path
    //================

    const FileName = `Order-${Order._id}.pdf`;

    const FilePath = path.join(
      InvoiceFolder,
      FileName
    );

    //================
    // Launch Browser
    //================

    const Browser =
      await puppeteer.launch({
        headless: true,
      });

    const Page =
      await Browser.newPage();

    //================
    // HTML Template
    //================

    const HtmlContent =
      OrderInvoiceTemplate(
        Order
      );

    await Page.setContent(
      HtmlContent,
      {
        waitUntil:
          "networkidle0",
      }
    );

    //================
    // Generate PDF
    //================

    await Page.pdf({
      path: FilePath,

      format: "A4",

      printBackground: true,
    });

    await Browser.close();

    return FilePath;
  } catch (error) {
    throw new Error(
      error.message
    );
  }
};

export default GenerateOrderPdf;