// ExamesPendentes.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ClipboardList, LogOut, Users } from "lucide-react";

export default function ExamesPendentes() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch("/api/prescriptions");
        if (!response.ok) throw new Error("Erro ao carregar prescrições");
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Formato inválido de dados recebidos");
        setPrescriptions(data);
      } catch (err) {
        console.error("Erro no fetch:", err);
        setError(err.message);
        setPrescriptions([]);
      } finally {
        setLoading(false);
      }

        setTimeout(() => {
    setLoading(false);
  }, 1500); // mostra spinner por 1.5s

    };
    fetchPrescriptions();
  }, []);

  const examesPendentes = [
    { id: 1, MEDICO: "Antonieta" },
    { id: 2, MEDICO: "Joerson" },
    { id: 3, MEDICO: "Zamed" },
    { id: 4, MEDICO: "Thaynan" },
    { id: 5, MEDICO: "Neymar" },
    { id: 6, MEDICO: "Ricardo" },
    { id: 7, MEDICO: "Claudio" },
    { id: 8, MEDICO: "Carlos" },
    { id: 9, MEDICO: "Pedro H" },
    { id: 10, MEDICO: "Daniel" },
    { id: 11, MEDICO: "Samuel" },
    { id: 12, MEDICO: "Vanessa" },
    { id: 13, MEDICO: "Marcela" },
    { id: 14, MEDICO: "Gustavo" },
    { id: 15, MEDICO: "Guilherme" },



  ];

  const handleVerPacientes = (medico) => {
    navigate("/EnvioR", { state: { doctor: medico } });
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo_zamed.png" alt="ZaMed" className="h-12" />
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <ClipboardList className="h-6 w-6 text-green-700" />
                Exames Pendentes
              </h1>
              <p className="text-sm text-gray-500">
                Clique em “Ver Pacientes” para abrir os exames de cada médico
              </p>
            </div>
          </div>
        <button
          onClick={handleBack}
          className="flex items-center font-bold justify-center gap-2 px-4 py-2 rounded-lg bg-[#0F5E45] text-white hover:bg-green-700 transition"
        >
          <LogOut className="h-5 w-5" />
          Voltar
        </button>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-600">{user?.name || "Laboratório"}</p>
            <p className="text-xs text-gray-400">Área Laboratorial</p>
          </div>


        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-8 w-full">
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <p className="text-sm text-gray-500">Exames Pendentes</p>
            <span className="text-3xl font-bold text-gray-800">{examesPendentes.length}</span>
          </div>

          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <p className="text-sm text-gray-500">Total de Médicos</p>
            <span className="text-3xl font-bold text-gray-800">
              {new Set(examesPendentes.map((e) => e.MEDICO)).size}
            </span>
          </div>
        </div>

        {/* Lista */}
        <div className="bg-white rounded-2xl shadow p-6">
          {loading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <span className=" loading loading-spinner loading-lg text-success"></span>
          <p className="text-gray-500 text-sm">Carregando exames...</p>
        </div>

          ) : error ? (
            <div className="alert alert-error">{error}</div>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Médicos com exames pendentes
              </h2>
              <table className="table-auto w-full border-collapse">
                <thead className="bg-[#0F5E45] text-white">
                  <tr>
                    <th className="px-4 py-2 text-left w-16">ID</th>
                    <th className="px-4 py-2 text-left">Médico</th>
                    <th className="px-4 py-2 text-center w-40">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {examesPendentes.map((m) => (
                    <tr
                      key={m.id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-700">{m.id}</td>
                      <td className="px-4 py-3 text-gray-700">{m.MEDICO}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleVerPacientes(m)}
                          className="btn btn-sm flex items-center gap-2 justify-center bg-[#0F5E45] text-white hover:bg-[#1a9971] transition px-3 py-1 rounded-lg shadow"
                        >
                          <Users className="h-4 w-4" />
                          Ver Pacientes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </main>


    </div>
  );
}