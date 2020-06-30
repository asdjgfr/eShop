const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");
const getStream = require("get-stream");
const normalFontPath = path.join(__static, "./fonts", "puhuiti-regular.ttf");
const boldFontPath = path.join(__static, "./fonts", "puhuiti-bold.ttf");

const a4Size = {
  width: 595.28,
  height: 841.89,
  margins: { top: 72, bottom: 72, left: 90.14, right: 90.14 },
};

const buildBillPDF = function (router) {
  router.post("/api/build-bill-pdf", async (ctx) => {
    const { id } = ctx.request.body;
    console.log(chalk.blue(id));
    const doc = new PDFDocument({
      autoFirstPage: false,
    });
    doc.font(normalFontPath);
    doc.fontSize(24);
    doc.addPage(a4Size);
    doc.text("机动车维修结算清单", {
      width: a4Size.width - a4Size.margins.left * 2,
      align: "center",
    });
    doc.moveDown();
    doc.fontSize(14);
    rowText(
      [
        "承修门店：啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
        "门店地址：噢噢噢噢哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦",
        "门店电话：1233-123123123",
        "门店电话：1233-123123123",
        "门店电话：1233-123123123",
        "门店电话：1233-123123123",
      ],
      doc
    );
    doc.end();
    const pdfBuffer = await getStream.buffer(doc);
    ctx.body = {
      code: 0,
      data: pdfBuffer.toString("base64"),
    };
  });
  return router;
};

function rowText(texts, doc) {
  let rowWidth = (a4Size.width - a4Size.margins.left * 2) / 3;
  let y = 0;
  let x = 0;
  for (let i = 0, len = texts.length; i < len; i++) {
    if (i % 3 === 0) {
      y = doc.y;
      x = doc.x;
    } else {
      x = doc.x + rowWidth;
    }
    doc.text(texts[i], x, y, {
      width: rowWidth,
    });
    if ((i + 1) % 3 === 0) {
      doc.moveDown();
    }
  }
}

exports.mutations = [buildBillPDF];
