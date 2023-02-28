import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const API_BASE = "http://localhost:5000";

function App() {
  const [students, setStudents] = useState([]);
  const [generatePDF, setGeneratePDF] = useState([]);

  const GetStudents = () => {
    fetch(API_BASE + "/listofstudents")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error:", err));
  };

  const PrintPDF = (_id) => {
    window.location.href = API_BASE + `/getPDF/${_id}`;
  };

  useEffect(() => {
    GetStudents();
  }, []);

  return (
    <div className="App">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell align="right">Major</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">State</TableCell>
              <TableCell align="right">Zip</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <Button variant="contained" onClick={() => PrintPDF(row._id)}>
                    Print PDF
                  </Button>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.major}</TableCell>
                <TableCell align="right">{row.address.city}</TableCell>
                <TableCell align="right">
                  {row.address.address_1 + row.address.address_2}
                </TableCell>
                <TableCell align="right">{row.address.state}</TableCell>
                <TableCell align="right">{row.address.zip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
