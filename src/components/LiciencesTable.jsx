import React, { useState, useEffect, useContext } from "react";
import DataTable from "react-data-table-component";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import RejectDialog from "./RejectDialog";
import { Dialog, DialogContent } from "@mui/material";
import { StatusContext } from "../context/StatusContext";

function LiciencesTable() {
  const { checkerror } = useContext(StatusContext);

  const [licenseData, setLecienceTable] = useState([]);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [status, setStatus] = useState(null);

  const handleOpen = (row, status) => {
      setSelectedRow(row);
      setStatus(status);
      setOpen(true);
  };
  const [openimg, setOpenImg] = useState(false);
  const handleCloseImg = () => {
    setOpenImg(false);
    setSelectedImage(null);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
   // console.log(checkerror.toString());
}, [checkerror]);
  const fetchLicenseData = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        .split("=")[1];
      const response = await fetch(
        "https://vehicle-share-api.runasp.net/api/license/Admin/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setLecienceTable(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchLicenseData();
  }, []);

  const getStatusString = (status) => {
    switch (status) {
      case 0:
        return "pending";
      case 1:
        return "accepted";
      case 2:
        return "rejected";
      default:
        return "";
    }
  };
  const licenseColumns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      center: true,
      width: "300px",
    },
    {
      name: "Image Front",
      selector: (row) => (
        <img
          src={row.imageFront}
          alt={row.id}
          onClick={() => grow(row.imageFront)}
        />
      ),
      center: true,
      width: "175px",
    },
    {
      name: "Image Back",
      selector: (row) => (
        <img
          src={row.imageBack}
          alt={row.id}
          onClick={() => grow(row.imageBack)}
        />
      ),
      center: true,
      width: "175px",
    },
    {
      name: "Expiration",
      selector: (row) => row.expiration,
      sortable: true,
      center: true,
    },
    // Add more columns as needed

    {
      name: "Status",
      selector: (row) => getStatusString(row.status),
      sortable: true,
      center: true,
      width: "120px",
      conditionalCellStyles: [
        {
          when: (row) => row.status === 0,
          style: { color: "#4199b6", fontSize: "16px", fontWeight: "700" },
        },
        {
          when: (row) => row.status === 1,
          style: { color: "green", fontSize: "16px", fontWeight: "700" },
        },
        {
          when: (row) => row.status === 2,
          style: { color: "red", fontSize: "16px", fontWeight: "700" },
        },
      ],
    },
    {
      name: "Actions",
      selector: (row) => (
        <div>
          <button
            className="accept-btn"
            onClick={() => updateLicenseStatus(row, 1)}
          >
            Accept
          </button>
          <button
            className="reject-btn"
            onClick={() => handleOpen(row, 2)}
          >
            Reject
          </button>
        </div>
      ),
      center: true,
      width: "200px",
    },
  ];
//   const updateLicenseStatus = async (row, Status) => {
//     try {
//       const licenseId = row.id;
//       const userDataId = row.userDataId;
//       console.log(
//         `License ID ${licenseId} status updated to ${getStatusString(Status)}`
//       );
//       const token = Cookies.get("token");

//       const requestBody = { status: Status };
//       if (Status === 2) {
//         setOpen(true);
//         let error = checkerror.toString();
//         requestBody.message = `License has been refused.`;
//         console.log(`the error is ${error}`);
//       } else {
//         alert(
//           `Successfully updated status to: ${getStatusString(
//             Status
//           )} for license ID : ${licenseId}`
//         );
//       }
//       const response = await fetch(
//         `https://vehicle-share-api.runasp.net/api/License/Admin/${licenseId}`,
//         {
//           method: "Put", // or 'PUT' based on your API design
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(requestBody), // Send the status in the request body
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to update status: ${response.statusText}`);
//       }
//       await fetchLicenseData(userDataId);
//     } catch (error) {
//       console.error("Error updating license status:", error);
//     }
//   };
//   const updateLicenseStatus = async (row, Status, callback) => {
//     try {
//       const licenseId = row.id;
//       const userDataId = row.userDataId;
//       console.log(`License ID ${licenseId} status updated to ${getStatusString(Status)}`);
//       const token = Cookies.get("token");

//       const requestBody = { status: Status };
//       if (Status === 2) {
//         let error = checkerror.toString(); // Use checkerror from the context
//         requestBody.message = `License has been refused. Reasons: ${error}`;
//         console.log(`The error is: ${error}`);
//       } else {
//         alert(`Successfully updated status to: ${getStatusString(Status)} for license ID : ${licenseId}`);
//       }
      
//       const response = await fetch(
//         `https://vehicle-share-api.runasp.net/api/License/Admin/${licenseId}`,
//         {
//           method: "PUT",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(requestBody), // Send the status in the request body
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to update status: ${response.statusText}`);
//       }
//       await fetchLicenseData(userDataId);
//       if (callback) callback(); // Execute the callback after updating the license status
//     } catch (error) {
//       console.error("Error updating license status:", error);
//     }
// };
const updateLicenseStatus = async (row , Status) => {
    try {
       // debugger;
        const licenseId = row.id;
        const userDataId = row.userDataId;
        console.log(`License ID ${licenseId} status updated to ${getStatusString(Status)}`);
        const token = Cookies.get("token");

        const requestBody = { status: Status };
        if (Status === 2) {
            let error = checkerror.toString(); // Use checkerror from the context
            requestBody.message = `License has been refused. Reasons: ${error}`;
            console.log(`The error is: ${error}`);
            
        } else {
            alert(`Successfully updated status to: ${getStatusString(Status)} for license ID : ${licenseId}`);
        }
        
        const response = await fetch(
            `https://vehicle-share-api.runasp.net/api/License/Admin/${licenseId}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody), // Send the status in the request body
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to update status: ${response.statusText}`);
        }
        await fetchLicenseData(userDataId);
    } catch (error) {
        console.error("Error updating license status:", error);
    }
};


  const customStyles = {
    headCells: {
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        backgroundColor: "#176B87",
        color: "#fff",
      },
    },
    cells: { style: { fontSize: "14px", backgroundColor: "#eee" } },
  };
  const grow = (item) => {
    setOpenImg(true);
    setSelectedImage(item);
  };
  const handleReject = (id) => {
    console.log(id);
    const newData = licenseData.filter((row) => row.id !== id);
    setLecienceTable(newData);
  };

  return (
    <div className="user-table">
      {/* <div className="text-end">
                <input type="text" onChange={handleFilter} />
            </div> */}
      <DataTable
        responsive={true}
        highlightOnHover={true}
        data={licenseData}
        columns={licenseColumns}
        customStyles={customStyles}
        striped={true}
        pointerOnHover={true}
        fixedHeader={true}
      />
      <RejectDialog 
                open={open} 
                handleClose={handleClose} 
                updateLicenseStatus={updateLicenseStatus} 
                row={selectedRow} 
                status={status} 
      />
      <Dialog open={openimg} onClose={handleCloseImg}>
        <DialogContent>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              style={{ width: "500px", height: "500px" }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LiciencesTable;
