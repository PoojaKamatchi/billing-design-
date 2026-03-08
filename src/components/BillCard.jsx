export default function BillCard({ bill, toggleBill }) {

return (

<div className="bg-green-50 border border-green-300 rounded p-3 flex justify-between items-center">

<div className="text-sm">

<p>Site : {bill.site}</p>
<p>Sup Bill No : {bill.billNo}</p>
<p>Bill Amount : ₹{bill.amount}</p>
<p>Outstanding : ₹{bill.amount}</p>

</div>

<div className="flex flex-col items-end gap-2">

<select className="border rounded text-sm p-1">

<option>N/A</option>
<option>Fully Payment</option>
<option>Partial Payment</option>

</select>

<input
type="number"
placeholder="Amount"
className="border rounded p-1 w-[120px]"
/>

<input
type="checkbox"
checked={bill.selected}
onChange={()=>toggleBill(bill.id)}
/>

</div>

</div>

);

}