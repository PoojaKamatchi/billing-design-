import { useState, useEffect } from "react";
import DayBookHeader from "./components/DayBookHeader";
import Filters from "./components/Filters";
import PaymentTable from "./components/PaymentTable";
import AddPaymentModal from "./components/AddPaymentModal";
import billsData from "./data/bills.json";

function App() {
  const [showModal, setShowModal] = useState(false);

  const [payments, setPayments] = useState([]);
  const [bills, setBills] = useState(
    billsData.map(b => ({
      ...b,
      selected: false,
      paid: false,
      payAmount: b.amount,
      paymentType: "N/A"
    }))
  );

  // ✅ Load from localStorage
  useEffect(() => {
    const savedPayments = JSON.parse(localStorage.getItem("payments")) || [];
    setPayments(savedPayments);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <DayBookHeader setShowModal={setShowModal} />

      <Filters />

      <PaymentTable payments={payments} bills={bills} />

      {showModal && (
        <AddPaymentModal
          setShowModal={setShowModal}
          payments={payments}
          setPayments={setPayments}
          bills={bills}
          setBills={setBills}
        />
      )}
    </div>
  );
}

export default App;