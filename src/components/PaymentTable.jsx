import { useState } from "react";

function PaymentTable({ payments }) {
  const [viewPayment, setViewPayment] = useState(null);

  return (
    <>
      {/* TABLE */}
      <table
        border="1"
        width="100%"
        style={{
          borderCollapse: "collapse",
          marginTop: "20px"
        }}
      >
        <thead style={{ backgroundColor: "#0d0202", color: "#ffffff" }}>
          <tr>
            <th style={{ padding: "8px" }}>Supplier</th>
            <th style={{ padding: "8px" }}>Total</th>
            <th style={{ padding: "8px" }}>Paid</th>
            <th style={{ padding: "8px" }}>Type</th>
            <th style={{ padding: "8px" }}>Date</th>
          </tr>
        </thead>

        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan="5" align="center" style={{ padding: "15px" }}>
                No Records Found
              </td>
            </tr>
          ) : (
            payments.map((pay) => (
              <tr
                key={pay.id}
                onClick={() => setViewPayment(pay)}
                style={{
                  cursor: "pointer",
                  textAlign: "center"
                }}
              >
                <td style={{ padding: "8px" }}>{pay.supplierName}</td>
                <td style={{ padding: "8px" }}>₹{pay.total}</td>
                <td style={{ padding: "8px" }}>₹{pay.paid}</td>
                <td style={{ padding: "8px" }}>{pay.paymentType}</td>
                <td style={{ padding: "8px" }}>{pay.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* MODAL */}
      {viewPayment && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "25px",
              width: "450px",
              borderRadius: "10px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
            }}
          >
            <h3 style={{ marginBottom: "15px", color: "#000000" }}>
              Payment Details
            </h3>

            <p>
              <strong style={{ color: "#000000" }}>Supplier:</strong>{" "}
              {viewPayment.supplierName}
            </p>

            <p>
              <strong style={{ color: "#000000" }}>Total Amount:</strong>{" "}
              ₹{viewPayment.total}
            </p>

            <p>
              <strong style={{ color: "#000000" }}>Paid Amount:</strong>{" "}
              ₹{viewPayment.paid}
            </p>

            <p>
              <strong style={{ color: "#000000" }}>Payment Type:</strong>{" "}
              {viewPayment.paymentType}
            </p>

            <p>
              <strong style={{ color: "#000000" }}>Date:</strong>{" "}
              {viewPayment.date}
            </p>

            <h4 style={{ marginTop: "15px", color: "#000000" }}>
              Bills
            </h4>

            <div
              style={{
                backgroundColor: "#f5f5f5",
                padding: "10px",
                borderRadius: "6px",
                marginTop: "5px"
              }}
            >
              {viewPayment.bills && viewPayment.bills.length > 0 ? (
                viewPayment.bills.map((bill) => (
                  <div
                    key={bill.id}
                    style={{
                      padding: "6px 0",
                      borderBottom: "1px solid #ddd"
                    }}
                  >
                    {bill.billNo} — ₹{bill.amount}
                  </div>
                ))
              ) : (
                <p>No Bills Available</p>
              )}
            </div>

            <button
              onClick={() => setViewPayment(null)}
              style={{
                marginTop: "15px",
                padding: "8px 15px",
                backgroundColor: "#1e88e5",
                color: "#ffffff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PaymentTable;