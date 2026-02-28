import { useState } from "react";
import AddPaymentModal from "./components/AddPaymentModal";
import PaymentTable from "./components/PaymentTable";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [payments, setPayments] = useState([]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Supplier Payment Management</h2>

      <button
        onClick={() => setShowModal(true)}
        style={{ marginBottom: "20px" }}
      >
        Add Payment
      </button>

      <PaymentTable payments={payments} />

      {showModal && (
        <AddPaymentModal
          setShowModal={setShowModal}
          payments={payments}
          setPayments={setPayments}
        />
      )}
    </div>
  );
}

export default App;