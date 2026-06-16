// MedicosRegistrados.jsx
import { useEffect, useState } from "react";
import { Stethoscope, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Medicos() {
  const [medicos, setMedicos] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
  setMedicos([
    { id: 1, nome: "Antonieta", crm: "CRM/SP 10001" },
    { id: 2, nome: "Joerson", crm: "CRM/SP 10002" },
    { id: 3, nome: "Zamed", crm: "CRM/SP 10003" },
    { id: 4, nome: "Thaynan", crm: "CRM/SP 10004" },
    { id: 5, nome: "Neymar", crm: "CRM/SP 10005" },
    { id: 6, nome: "Ricardo", crm: "CRM/SP 10006" },
    { id: 7, nome: "Claudio", crm: "CRM/SP 10007" },
    { id: 8, nome: "Carlos", crm: "CRM/SP 10008" },
    { id: 9, nome: "Pedro H", crm: "CRM/SP 10009" },
    { id: 10, nome: "Daniel", crm: "CRM/SP 10010" },
    { id: 11, nome: "Samuel", crm: "CRM/SP 10011" },
    { id: 12, nome: "Vanessa", crm: "CRM/SP 10012" },
    { id: 13, nome: "Marcela", crm: "CRM/SP 10013" },
    { id: 14, nome: "Gustavo", crm: "CRM/SP 10014" },
    { id: 15, nome: "Guilherme", crm: "CRM/SP 10015" },
  ]);
  }, []);

  const filtered = medicos.filter((m) =>
    `${m.nome} ${m.crm}`.toLowerCase().includes(query.toLowerCase())
  );

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center gap-4">
          <img src="/logo_zamed.png" alt="ZaMed" className="h-12" />
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <Stethoscope className="h-6 w-6 text-green-700" />
              Médicos Registrados
            </h1>
            <p className="text-sm text-gray-500">
              Lista oficial dos profissionais cadastrados
            </p>
          </div>

        <button
          onClick={handleBack}
          className="flex items-center font-bold justify-center gap-2 px-4 py-2 rounded-lg bg-[#0F5E45] text-white hover:bg-green-700 transition"
        >
          <LogOut className="h-5 w-5" /> Voltar
        </button>
        </div>

 
      </header>

      {/* Conteúdo */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-8 w-full">

  

        {/* Cards */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <p className="text-sm text-gray-500">Total de Médicos</p>
            <span className="text-3xl font-bold text-gray-800">
              {medicos.length}
            </span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <p className="text-sm text-gray-500">CRMs Únicos</p>
            <span className="text-3xl font-bold text-gray-800">
              {new Set(medicos.map((m) => m.crm)).size}
            </span>
          </div>
        </div>


        {/* Tabela */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Médicos</h2>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome ou CRM..."
              className="input input-sm input-bordered w-72"
            />
          </div>

          <table className="table-auto w-full border-collapse">
            <thead className="bg-[#0F5E45] text-white">
              <tr>
                <th className="px-4 py-3 text-left w-16">ID</th>
                <th className="px-4 py-3 text-left">Nome</th>
                <th className="px-4 py-3 text-left">CRM</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr
                  key={m.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-gray-700">{m.id}</td>
                  <td className="px-4 py-3 text-gray-700">{m.nome}</td>
                  <td className="px-4 py-3 text-gray-700">{m.crm}</td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center py-6 text-gray-500 italic"
                  >
                    Nenhum médico encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>


    </div>
  );
}
