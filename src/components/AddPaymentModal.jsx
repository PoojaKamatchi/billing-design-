import { useState } from "react";

import suppliers from "../data/suppliers.json";
import accounts from "../data/accounts.json";
import projects from "../data/projects.json";
import sites from "../data/sites.json";
import costTypes from "../data/costTypes.json";

export default function AddPaymentModal({
  setShowModal,
  payments,
  setPayments,
  bills,
  setBills
}) {

  const [tab,setTab] = useState("unpaid");
  const [search,setSearch] = useState("");

  const [date,setDate] = useState("");
  const [reference,setReference] = useState("");
  const [voucherNo,setVoucherNo] = useState(""); // Added Voucher No

  const [account,setAccount] = useState("");
  const [project,setProject] = useState("");
  const [site,setSite] = useState("");
  const [costType,setCostType] = useState("");
  const [supplier,setSupplier] = useState("");
  const [narration,setNarration] = useState("");

  // Toggle bill selection
  const toggleBill = (id)=>{
    setBills(
      bills.map(b => b.id===id ? {...b,selected:!b.selected} : b)
    );
  };

  // Set payment type (Fully/Partial/N/A)
  const handlePaymentType = (bill,type)=>{
    setBills(
      bills.map(b =>
        b.id===bill.id
          ? {...b, paymentType:type, payAmount:type==="Fully Payment" ? b.amount : ""}
          : b
      )
    );
  };

  // Update amount for Partial Payment
  const handleAmountChange = (bill,value)=>{
    if(value > bill.amount){
      alert("Amount cannot exceed bill amount");
      return;
    }
    setBills(
      bills.map(b => b.id===bill.id ? {...b,payAmount:Number(value)} : b)
    );
  };

  // Save payment
  const handleSave = ()=>{
    const selectedBills = bills.filter(b=>b.selected);
    if(selectedBills.length===0){
      alert("Select at least one bill");
      return;
    }

    const totalAmount = selectedBills.reduce((sum,b)=>sum+(b.payAmount ?? b.amount), 0);

    const payment = {
      admin: "Admin",
      id: reference || `PAY-${(payments.length + 1).toString().padStart(3,"0")}`,
      date,
      vendorNarration: selectedBills.map(b => `${b.supplier || supplier} / ${narration || ""}`).join(", "),
      receipts: "-",
      payments: totalAmount,
      osBalance: "-",
      source: account || "-",
      paymentMode: "N/A",
      chequeDetails: "-",
      type: "Payment",
      costType: costType || "-",
      voucherNo: voucherNo || "-", // Added Voucher No
      billNo: selectedBills.map(b => b.billNo).join(", "),
      bills: selectedBills,
      total: totalAmount
    };

    setPayments([...payments,payment]);

    setBills(
      bills.map(b => b.selected ? {...b,paid:true,selected:false} : b)
    );

    setShowModal(false);
  };

  // Filter bills for search
  const filteredBills = bills.filter(b => b.billNo.toString().toLowerCase().includes(search.toLowerCase()));
  const selectedBills = bills.filter(b=>b.selected);
  const totalAmount = selectedBills.reduce((sum,b)=>sum+(b.payAmount ?? b.amount), 0);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[1150px] h-[650px] rounded shadow-lg flex flex-col">
        
        {/* HEADER */}
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-semibold">Add Payment</h2>
          <button onClick={()=>setShowModal(false)}>✕</button>
        </div>

        <div className="flex flex-1">
          {/* LEFT PANEL */}
          <div className="w-[38%] border-r p-4 space-y-3 overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              <input type="date" className="border p-2 rounded" onChange={(e)=>setDate(e.target.value)} />
              <input type="text" placeholder="Reference" className="border p-2 rounded" onChange={(e)=>setReference(e.target.value)} />
            </div>

      {/* TYPE SELECTOR */}
<div className="flex gap-2">
  {["Against Bills", "Advances", "Petty Expenses"].map(option => (
    <button
      key={option}
      className={`px-3 py-1 rounded text-sm ${
        tab === option ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700"
      }`}
      onClick={() => setTab(option)}
    >
      {option}
    </button>
  ))}
</div>
            <select className="border p-2 rounded w-full" onChange={(e)=>setAccount(e.target.value)}>
              <option>Select Account</option>
              {accounts.map(a=>(<option key={a.id} value={a.name}>{a.name}</option>))}
            </select>

            <select className="border p-2 rounded w-full" onChange={(e)=>setProject(e.target.value)}>
              <option>Select Project</option>
              {projects.map(p=>(<option key={p.id} value={p.name}>{p.name}</option>))}
            </select>

            <select className="border p-2 rounded w-full" onChange={(e)=>setSite(e.target.value)}>
              <option>Select Site</option>
              {sites.map(s=>(<option key={s.id} value={s.name}>{s.name}</option>))}
            </select>

            <select className="border p-2 rounded w-full" onChange={(e)=>setCostType(e.target.value)}>
              <option>Select Cost Type</option>
              {costTypes.map(c=>(<option key={c.id} value={c.name}>{c.name}</option>))}
            </select>

            <select className="border p-2 rounded w-full" onChange={(e)=>setSupplier(e.target.value)}>
              <option>Select Supplier</option>
              {suppliers.map(s=>(<option key={s.id} value={s.name}>{s.name}</option>))}
            </select>

            <input type="text" placeholder="Voucher No" className="border p-2 rounded w-full" onChange={(e)=>setVoucherNo(e.target.value)} />

            <textarea placeholder="Narration" className="border p-2 rounded w-full" onChange={(e)=>setNarration(e.target.value)} />
          </div>

          {/* RIGHT PANEL */}
          <div className="flex-1 flex flex-col p-4">
            <div className="flex gap-4 border-b pb-2">
              <button onClick={()=>setTab("unpaid")} className={tab==="unpaid" ? "text-teal-600 font-semibold" : ""}>Unpaid Bills</button>
              <button onClick={()=>setTab("paid")} className={tab==="paid" ? "text-teal-600 font-semibold" : ""}>Paid Bills</button>
            </div>

            <input type="text" placeholder="Search bills..." className="border p-2 rounded mt-3" onChange={(e)=>setSearch(e.target.value)} />

            <div className="flex-1 overflow-y-auto mt-3 space-y-3">
              {tab==="unpaid" && filteredBills.filter(b=>!b.paid).map(bill=>(
                <div key={bill.id} className="bg-green-50 border border-green-300 rounded p-3 flex justify-between">
                  <div className="text-sm space-y-1">
                    <p>Site : {bill.site}</p>
                    <p>Sup Bill No : {bill.billNo}</p>
                    <p>Bill Amount : ₹{bill.amount}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <select className="border p-1 rounded text-sm" onChange={(e)=>handlePaymentType(bill,e.target.value)}>
                      <option>N/A</option>
                      <option>Fully Payment</option>
                      <option>Partial Payment</option>
                    </select>
                    <input type="number" value={bill.payAmount ?? bill.amount} className="border p-1 rounded w-[120px]" readOnly={bill.paymentType!=="Partial Payment"} onChange={(e)=>handleAmountChange(bill,e.target.value)} />
                    <input type="checkbox" checked={bill.selected || false} onChange={()=>toggleBill(bill.id)} />
                  </div>
                </div>
              ))}

              {tab==="paid" && bills.filter(b=>b.paid).map(bill=>(
                <div key={bill.id} className="bg-blue-50 border rounded p-3 text-sm">
                  Bill {bill.billNo} Paid ₹{bill.payAmount ?? bill.amount}
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="border-t pt-3 mt-3 flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Selected Bills</p>
                <p className="font-semibold">{selectedBills.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Payment</p>
                <p className="font-semibold text-green-600">₹{totalAmount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t p-4 flex justify-end gap-3">
          <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={()=>setShowModal(false)}>Cancel</button>
          <button className="bg-teal-600 text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
          <button className="bg-teal-700 text-white px-4 py-2 rounded" onClick={handleSave}>Save & Print</button>
        </div>

      </div>
    </div>
  );
}