const studentsmodel = require("./Models/studentsmodel");
const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");

router.get("/listofstudents", async (req, res) => {
  const students = await studentsmodel.find();
  res.json(students);
});

router.post("/createstudent", async (req, res) => {
  const { name, major, address } = req.body;
  const students = new studentsmodel({
    name,
    major,
    address,
  });
  const newstudents = await students.save();
  res.json(newstudents);
});

router.get("/getPDF/:studentID", (req, res) => {
  if (!req.params.studentID) {
    res.json("Need ID");
  }
  const doc = new PDFDocument();
  let filename = "Students";
  // Stripping special characters
  filename = encodeURIComponent(filename) + ".pdf";
  // Setting response to 'attachment' (download).
  // If you use 'inline' here it will automatically open the PDF
  res.setHeader(
    "Content-disposition",
    'attachment; filename="' + filename + '"'
  );
  res.setHeader("Content-type", "application/pdf");
  studentsmodel.findById({ _id: req.params.studentID }).then((data) => {
    doc.x = 400;
    doc.y = 300;
    doc.text(data.name, 50, 50);
    doc.text(data.major, 80, 60);
    doc.text(data.address.city, 90, 70);
    doc.text(data.address.address_1 + data.address.address_2);
    doc.text(data.address.state, 100, 80);
    doc.text(data.address.zip, 110, 90);
    doc.pipe(res);
    doc.end();
  });
});

router.get("/searchstudent/:key", async (req, res) => {
  const students = await studentsmodel.find({
    $or: [
      { name: { $regex: req.params.key } },
      { major: { $regex: req.params.key } },
      { "address.state": { $regex: req.params.key } },
      { "address.zip": { $regex: req.params.key } },
      { "address.address_1": { $regex: req.params.key } },
      { "address.address_2": { $regex: req.params.key } },
      { "address.city": { $regex: req.params.key } },
    ],
  });
  res.json(students);
  // console.log(students);
});

module.exports = router;
