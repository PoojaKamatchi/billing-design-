import { useState } from "react";
import accounts from "../data/accounts.json";
import costTypes from "../data/costTypes.json";
import projects from "../data/projects.json";
import sites from "../data/sites.json";

export default function Filters() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [source, setSource] = useState("");
  const [costType, setCostType] = useState("");
  const [group, setGroup] = useState("");
  const [project, setProject] = useState("");
  const [site, setSite] = useState("");

  return (
    <div className="bg-white p-4 shadow my-2 flex flex-wrap gap-3">
      
      {/* Date Range */}
      <div>
        <label className="block text-xs font-semibold">From</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      
      <div>
        <label className="block text-xs font-semibold">To</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* Source */}
      <div>
        <label className="block text-xs font-semibold">Source</label>
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Sources</option>
          {accounts.map(a => (
            <option key={a.id} value={a.name}>{a.name}</option>
          ))}
        </select>
      </div>

      {/* Cost Type */}
      <div>
        <label className="block text-xs font-semibold">Cost Type</label>
        <select
          value={costType}
          onChange={(e) => setCostType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Cost Types</option>
          {costTypes.map(c => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Group */}
      <div>
        <label className="block text-xs font-semibold">Group</label>
        <select
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Groups</option>
          <option value="Group A">Group A</option>
          <option value="Group B">Group B</option>
        </select>
      </div>

      {/* Project */}
      <div>
        <label className="block text-xs font-semibold">Project</label>
        <select
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Projects</option>
          {projects.map(p => (
            <option key={p.id} value={p.name}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* Site */}
      <div>
        <label className="block text-xs font-semibold">Site</label>
        <select
          value={site}
          onChange={(e) => setSite(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Sites</option>
          {sites.map(s => (
            <option key={s.id} value={s.name}>{s.name}</option>
          ))}
        </select>
      </div>

    </div>
  );
}