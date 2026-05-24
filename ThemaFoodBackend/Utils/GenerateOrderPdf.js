import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import OrderInvoiceTemplate from "../Templates/OrderInvoiceTemplate.js";

//======================
// Generate Order PDF
//======================

const GenerateOrderPdf = async (Order) => {
  let Browser;

  try {
    const InvoiceFolder = path.join("Invoices");

    if (!fs.existsSync(InvoiceFolder)) {
      fs.mkdirSync(InvoiceFolder, {
        recursive: true,
      });
    }

    const FileName = `Order-${Order._id}.pdf`;

    const FilePath = path.join(
      InvoiceFolder,
      FileName
    );

    //======================
    // Launch Browser
    //======================

    Browser =
      await puppeteer.launch({
        headless: "new",

        executablePath:
          puppeteer.executablePath(),

        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
        ],
      });

    const Page =
      await Browser.newPage();

    const HtmlContent =
      OrderInvoiceTemplate(Order);

    await Page.setContent(
      HtmlContent,
      {
        waitUntil:
          "networkidle0",
      }
    );

    await Page.pdf({
      path: FilePath,
      format: "A4",
      printBackground: true,
    });

    return FilePath;
  } catch (error) {
    console.log(
      "Generate PDF Error:",
      error.message
    );

    throw error;
  } finally {
    if (Browser) {
      await Browser.close();
    }
  }
};

export default GenerateOrderPdf;