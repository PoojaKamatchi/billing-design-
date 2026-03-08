import { useState } from "react";

export default function PaymentTable({ payments, bills }) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  // Calculate Opening Balance (all unpaid bills)
  const openingBalance = bills
    ? bills.filter(b => !b.paid).reduce((sum, b) => sum + b.amount, 0)
    : 0;

  // Calculate Total Payment
  const totalPayment = payments
    ? payments.reduce((sum, p) => sum + (p.total || 0), 0)
    : 0;

  // Pagination
  const paginatedPayments = payments.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="bg-white shadow mt-4 rounded-lg overflow-x-auto p-4">
      {/* Table Tools */}
      <div className="flex gap-2 mb-2">
        {["Copy", "Excel", "PDF", "CSV", "Columns"].map(tool => (
          <button
            key={tool}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
          >
            {tool}
          </button>
        ))}
      </div>

      <table className="w-full text-sm min-w-[1200px] border-collapse">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-2 border">S.No ▼</th>
            <th className="p-2 border">Admin ▼</th>
            <th className="p-2 border">Payment ID ▼</th>
            <th className="p-2 border">Date ▼</th>
            <th className="p-2 border">Vendor/Narration ▼</th>
            <th className="p-2 border">Receipts ▼</th>
            <th className="p-2 border">Payments ▼</th>
            <th className="p-2 border">O/S Balance ▼</th>
            <th className="p-2 border">Source ▼</th>
            <th className="p-2 border">Payment Mode ▼</th>
            <th className="p-2 border">Cheque Details ▼</th>
            <th className="p-2 border">Type ▼</th>
            <th className="p-2 border">Cost Type ▼</th>
            <th className="p-2 border">Voucher No ▼</th>
            <th className="p-2 border">Bill No ▼</th>
          </tr>

          {/* Opening Balance Row */}
          <tr>
            <td colSpan={15} className="bg-pink-200 p-2 font-semibold text-center">
              Opening Balance: ₹{openingBalance}
            </td>
          </tr>
        </thead>

        <tbody>
          {paginatedPayments.length === 0 ? (
            <tr>
              <td colSpan="15" className="text-center py-6 text-gray-400">
                No Records Found
              </td>
            </tr>
          ) : (
            paginatedPayments.map((p, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-2 border">{(page - 1) * rowsPerPage + i + 1}</td>
                <td className="p-2 border">{p.admin || "-"}</td>
                <td className="p-2 border">{p.id || `PAY-${(i + 1).toString().padStart(3, "0")}`}</td>
                <td className="p-2 border">{p.date || "-"}</td>
                <td className="p-2 border">{p.vendorNarration || "-"}</td>
                <td className="p-2 border text-green-600 font-semibold">{p.receipts || "-"}</td>
                <td className="p-2 border text-red-600 font-semibold">{p.total ? "₹" + p.total : "-"}</td>
                <td className="p-2 border">{p.osBalance || "-"}</td>
                <td className="p-2 border">{p.source || "-"}</td>
                <td className="p-2 border">{p.paymentMode || "-"}</td>
                <td className="p-2 border">{p.chequeDetails || "-"}</td>
                <td className="p-2 border">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{p.type || "Payment"}</span>
                </td>
                <td className="p-2 border">{p.costType || "-"}</td>
                <td className="p-2 border">{p.voucherNo || "-"}</td>
                <td className="p-2 border">{p.bills.map(b => b.billNo).join(", ")}</td>
              </tr>
            ))
          )}

          {/* Total Payment Row */}
          <tr>
            <td colSpan={15} className="bg-blue-200 p-2 font-semibold text-center">
              Total Payment: ₹{totalPayment}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Pagination Controls */}
      {payments.length > rowsPerPage && (
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            className="px-3 py-1 border rounded hover:bg-gray-200"
          >
            Prev
          </button>
          <span className="px-2 py-1">Page {page}</span>
          <button
            onClick={() => setPage(Math.min(Math.ceil(payments.length / rowsPerPage), page + 1))}
            className="px-3 py-1 border rounded hover:bg-gray-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}