import { useState } from "react";
import suppliers from "../data/suppliers.json";
import bills from "../data/bills.json";

function AddPaymentModal({ setShowModal, payments, setPayments }) {
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedBills, setSelectedBills] = useState([]);
  const [paymentType, setPaymentType] = useState("full");
  const [paymentAmount, setPaymentAmount] = useState("");

  // Filter bills based on supplier
  const filteredBills = bills.filter(
    (bill) => bill.supplierId === Number(selectedSupplier)
  );

  // Handle checkbox toggle
  const handleBillToggle = (bill) => {
    const exists = selectedBills.find((b) => b.id === bill.id);

    if (exists) {
      setSelectedBills(selectedBills.filter((b) => b.id !== bill.id));
    } else {
      setSelectedBills([...selectedBills, bill]);
    }
  };

  // Calculate total
  const totalSelected = selectedBills.reduce(
    (sum, bill) => sum + bill.amount,
    0
  );

  // Submit handler
  const handleSubmit = () => {
    if (!selectedSupplier) {
      alert("Please select supplier");
      return;
    }

    if (selectedBills.length === 0) {
      alert("Please select at least one bill");
      return;
    }

    let finalAmount;

    if (paymentType === "full") {
      finalAmount = totalSelected;
    } else {
      if (!paymentAmount || Number(paymentAmount) <= 0) {
        alert("Enter valid partial amount");
        return;
      }
      finalAmount = Number(paymentAmount);
    }

    if (finalAmount > totalSelected) {
      alert("Payment cannot exceed total amount");
      return;
    }

    const supplierName = suppliers.find(
      (s) => s.id === Number(selectedSupplier)
    )?.name;

    const newPayment = {
      id: Date.now(),
      supplierName,
      bills: selectedBills,
      total: totalSelected,
      paid: finalAmount,
      paymentType,
      date: new Date().toLocaleDateString()
    };

    setPayments([...payments, newPayment]);
    setShowModal(false);
  };

  return (
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
          width: "600px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          padding: "25px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          color: "#000000" // force black text
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>Add Payment</h2>

        {/* SUPPLIER */}
        <label style={{ fontWeight: "bold" }}>Supplier *</label>
        <select
          value={selectedSupplier}
          onChange={(e) => {
            setSelectedSupplier(e.target.value);
            setSelectedBills([]);
            setPaymentAmount("");
          }}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "5px",
            marginBottom: "15px"
          }}
        >
          <option value="">Select Supplier</option>
          {suppliers.map((sup) => (
            <option key={sup.id} value={sup.id}>
              {sup.name}
            </option>
          ))}
        </select>

        {/* BILLS */}
        <h4>Unpaid Bills</h4>

        <div
          style={{
            maxHeight: "150px",
            overflowY: "auto",
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "10px"
          }}
        >
          {filteredBills.length === 0 ? (
            <p>No unpaid bills</p>
          ) : (
            filteredBills.map((bill) => (
              <div
                key={bill.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "6px"
                }}
              >
                <input
                  type="checkbox"
                  checked={
                    !!selectedBills.find((b) => b.id === bill.id)
                  }
                  onChange={() => handleBillToggle(bill)}
                  style={{ cursor: "pointer" }}
                />

                <span
                  style={{
                    marginLeft: "8px",
                    color: "#000000",
                    fontSize: "14px"
                  }}
                >
                  {bill.billNo} - ₹{bill.amount}
                </span>
              </div>
            ))
          )}
        </div>

        <p style={{ fontWeight: "bold" }}>
          Total Selected: ₹{totalSelected}
        </p>

        {/* PAYMENT TYPE */}
        <label style={{ fontWeight: "bold" }}>Payment Type</label>
        <select
          value={paymentType}
          onChange={(e) => {
            setPaymentType(e.target.value);
            setPaymentAmount("");
          }}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "5px",
            marginBottom: "10px"
          }}
        >
          <option value="full">Full Payment</option>
          <option value="partial">Partial Payment</option>
        </select>

        {/* PARTIAL INPUT */}
        {paymentType === "partial" && (
          <input
            type="number"
            placeholder="Enter Partial Amount"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px"
            }}
          />
        )}

        {/* BUTTONS */}
        <div style={{ marginTop: "15px" }}>
          <button
            onClick={handleSubmit}
            style={{
              padding: "8px 15px",
              backgroundColor: "#1e88e5",
              color: "#ffffff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Save
          </button>

          <button
            onClick={() => setShowModal(false)}
            style={{
              marginLeft: "10px",
              padding: "8px 15px",
              backgroundColor: "#cccccc",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPaymentModal;