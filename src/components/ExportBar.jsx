export default function ExportBar() {

return(

<div className="flex justify-between items-center p-3 bg-white border-b">

<div className="flex gap-2">

<button className="bg-gray-200 px-3 py-1 rounded text-sm">
Copy
</button>

<button className="bg-gray-200 px-3 py-1 rounded text-sm">
Excel
</button>

<button className="bg-gray-200 px-3 py-1 rounded text-sm">
PDF
</button>

<button className="bg-gray-200 px-3 py-1 rounded text-sm">
CSV
</button>

<button className="bg-gray-200 px-3 py-1 rounded text-sm">
Columns
</button>

</div>

<input
type="text"
placeholder="Search"
className="border p-1 rounded text-sm"
/>

</div>

);

}