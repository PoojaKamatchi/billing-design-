import { useState } from "react";

import suppliers from "../data/suppliers.json";
import accounts from "../data/accounts.json";
import projects from "../data/projects.json";
import sites from "../data/sites.json";
import costTypes from "../data/costTypes.json";

export default function AddPaymentModal({ setShowModal, payments, setPayments, bills, setBills }) {
  const [tab, setTab] = useState("unpaid");
  const [search, setSearch] = useState("");
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const [date, setDate] = useState("");
  const [reference, setReference] = useState("");
  const [voucherNo, setVoucherNo] = useState("");
  const [account, setAccount] = useState("");
  const [project, setProject] = useState("");
  const [site, setSite] = useState("");
  const [costType, setCostType] = useState("");
  const [supplier, setSupplier] = useState("");
  const [narration, setNarration] = useState("");

  const toggleBill = (id) => setBills(bills.map(b => b.id === id ? { ...b, selected: !b.selected } : b));
  const handlePaymentType = (bill, type) => setBills(bills.map(b => b.id === bill.id ? { ...b, paymentType: type, payAmount: type === "Fully Payment" ? b.amount : "" } : b));
  const handleAmountChange = (bill, value) => {
    if (value > bill.amount) return alert("Amount cannot exceed bill amount");
    setBills(bills.map(b => b.id === bill.id ? { ...b, payAmount: Number(value) } : b));
  };

  const handleSave = () => {
    const selectedBills = bills.filter(b => b.selected);
    if (!selectedBills.length) return alert("Select at least one bill");

    const totalAmount = selectedBills.reduce((sum, b) => sum + (b.payAmount ?? b.amount), 0);

    const payment = {
      admin: "Admin",
      id: reference || `PAY-${(payments.length + 1).toString().padStart(3, "0")}`,
      date,
      vendorNarration: selectedBills.map(b => `${b.supplier || supplier} / ${narration || ""}`).join(", "),
      receipts: "-",
      payments: totalAmount,
      osBalance: "-",
      source: account || "-",
      paymentMode: "N/A",
      type: "Payment",
      costType: costType || "-",
      voucherNo: voucherNo || "-",
      billNo: selectedBills.map(b => b.billNo).join(", "),
      bills: selectedBills,
      total: totalAmount
    };

    setPayments([...payments, payment]);
    setBills(bills.map(b => b.selected ? { ...b, paid: true, selected: false } : b));
    setShowRightPanel(true);
  };

  const filteredBills = bills.filter(b => b.billNo.toString().toLowerCase().includes(search.toLowerCase()));
  const handleShowRight = (newTab) => { setTab(newTab); setShowRightPanel(true); };

  const options = ["Against Bills", "Advances", "Petty Expenses"];

  return (
    <div 
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={() => setShowModal(false)} // click outside closes modal
    >
      <div
        className={`bg-white h-[650px] rounded shadow-xl flex transition-all duration-500
          ${showRightPanel ? "w-[1150px]" : "w-[600px]"}`}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* LEFT PANEL */}
        <div className={`transition-all duration-500 p-6 space-y-4 overflow-y-auto
            ${showRightPanel ? "w-1/2" : "w-full"}`}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Add Payment</h2>
            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-800 font-bold text-lg">Cancel</button>
          </div>

          {/* DATE & REFERENCE */}
          <div className="grid grid-cols-2 gap-3">
            <input type="date" className="border p-2 rounded shadow-sm focus:ring-2 focus:ring-green-400" onChange={(e) => setDate(e.target.value)} />
            <input type="text" placeholder="Reference" className="border p-2 rounded shadow-sm focus:ring-2 focus:ring-green-400" onChange={(e) => setReference(e.target.value)} />
          </div>

          {/* 3 OPTIONS BUTTONS */}
          <div className="flex gap-3">
            {options.map(option => (
              <button
                key={option}
                className={`px-4 py-2 rounded font-medium shadow-md transition-colors duration-300
                  ${selectedOption === option ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-green-400 hover:text-white"}`}
                onClick={() => setSelectedOption(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {/* DROPDOWNS */}
          <select className="border p-2 rounded w-full shadow-sm focus:ring-2 focus:ring-green-400" onChange={(e) => setAccount(e.target.value)}>
            <option>Select Account</option>
            {accounts.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
          </select>

          <select className="border p-2 rounded w-full shadow-sm focus:ring-2 focus:ring-green-400" onChange={(e) => setProject(e.target.value)}>
            <option>Select Project</option>
            {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
          </select>

          <select className="border p-2 rounded w-full shadow-sm focus:ring-2 focus:ring-green-400" onChange={(e) => setSite(e.target.value)}>
            <option>Select Site</option>
            {sites.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>

          <select className="border p-2 rounded w-full shadow-sm focus:ring-2 focus:ring-green-400" onChange={(e) => setCostType(e.target.value)}>
            <option>Select Cost Type</option>
            {costTypes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>

          <select className="border p-2 rounded w-full shadow-sm focus:ring-2 focus:ring-green-400" onChange={(e) => setSupplier(e.target.value)}>
            <option>Select Supplier</option>
            {suppliers.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>

          <input type="text" placeholder="Voucher No" className="border p-2 rounded w-full shadow-sm focus:ring-2 focus:ring-green-400" onChange={(e) => setVoucherNo(e.target.value)} />
          <textarea placeholder="Narration" className="border p-2 rounded w-full shadow-sm focus:ring-2 focus:ring-green-400" onChange={(e) => setNarration(e.target.value)} />

          {/* SAVE BUTTONS (CENTERED) */}
          {!showRightPanel && (
            <div className="mt-4 flex gap-3 justify-center">
              <button className="bg-green-600 text-white px-5 py-2 rounded shadow-md hover:bg-green-700 transition-all" onClick={() => handleShowRight(tab)}>Save</button>
              <button className="bg-green-700 text-white px-5 py-2 rounded shadow-md hover:bg-green-800 transition-all" onClick={() => handleShowRight(tab)}>Save & Print</button>
            </div>
          )}
        </div>

        {/* RIGHT PANEL (Slide-in) */}
        {showRightPanel && (
          <div className="w-1/2 p-6 overflow-y-auto border-l transform transition-transform duration-500 ease-in-out translate-x-0">
            <div className="flex gap-4 border-b pb-2">
              <button onClick={() => setTab("unpaid")} className={tab === "unpaid" ? "text-green-600 font-semibold" : "text-gray-700"}>Unpaid Bills</button>
              <button onClick={() => setTab("paid")} className={tab === "paid" ? "text-green-600 font-semibold" : "text-gray-700"}>Paid Bills</button>
            </div>

            <input type="text" placeholder="Search bills..." className="border p-2 rounded mt-3 shadow-sm focus:ring-2 focus:ring-green-400" onChange={(e) => setSearch(e.target.value)} />

            <div className="mt-3 space-y-3 overflow-y-auto max-h-[400px]">
              {tab === "unpaid" && bills.filter(b => !b.paid && b.billNo.toString().toLowerCase().includes(search.toLowerCase())).map(bill => (
                <div key={bill.id} className="bg-green-50 border border-green-300 rounded p-3 flex justify-between shadow-sm">
                  <div className="text-sm space-y-1">
                    <p>Site : {bill.site}</p>
                    <p>Sup Bill No : {bill.billNo}</p>
                    <p>Bill Amount : ₹{bill.amount}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <select className="border p-1 rounded text-sm" onChange={(e) => handlePaymentType(bill, e.target.value)}>
                      <option>N/A</option>
                      <option>Fully Payment</option>
                      <option>Partial Payment</option>
                    </select>
                    <input type="number" value={bill.payAmount ?? bill.amount} className="border p-1 rounded w-[120px]" readOnly={bill.paymentType !== "Partial Payment"} onChange={(e) => handleAmountChange(bill, e.target.value)} />
                    <input type="checkbox" checked={bill.selected || false} onChange={() => toggleBill(bill.id)} />
                  </div>
                </div>
              ))}

              {tab === "paid" && bills.filter(b => b.paid).map(bill => (
                <div key={bill.id} className="bg-blue-50 border rounded p-3 text-sm shadow-sm">
                  Bill {bill.billNo} Paid ₹{bill.payAmount ?? bill.amount}
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-3 justify-end">
              <button className="bg-green-600 text-white px-5 py-2 rounded shadow-md hover:bg-green-700 transition-all" onClick={handleSave}>Save</button>
              <button className="bg-green-700 text-white px-5 py-2 rounded shadow-md hover:bg-green-800 transition-all" onClick={handleSave}>Save & Print</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}