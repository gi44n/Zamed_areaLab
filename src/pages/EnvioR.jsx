// EnvioR.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Send, Check, LogOut, ClipboardList } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function EnvioR() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor || null;

  const initialPacientes = [
    { id: 1, nome: "Cauan Cicone", doctorId: 1 },
    { id: 1, nome: "Cauan Cicone", doctorId: 4 },
    { id: 2, nome: "Marilene Castro", doctorId: 1 },
    { id: 2, nome: "Marilene Castro", doctorId: 2 },
    { id: 3, nome: "Jorge Lisboa", doctorId: 3 },
    { id: 3, nome: "Jorge Lisboa", doctorId: 1 },
    { id: 4, nome: "Patrícia Ramos", doctorId: 4 },
    { id: 4, nome: "Patrícia Ramos", doctorId: 1 },
    { id: 5, nome: "Divo Martins", doctorId: 5 },
    { id: 5, nome: "Divo Martins", doctorId: 1 },
    { id: 6, nome: "Fernanda Oliveira", doctorId: 6 },
    { id: 6, nome: "Fernanda Oliveira", doctorId: 1 },
    { id: 7, nome: "Bruno Ferreira", doctorId: 7 },
    { id: 7, nome: "Bruno Ferreira", doctorId: 1 },
    { id: 8, nome: "Lívia Santos", doctorId: 8 },
    { id: 8, nome: "Lívia Santos", doctorId: 1 },
    { id: 9, nome: "Roberta Lima", doctorId: 9 },
    { id: 9, nome: "Roberta Lima", doctorId: 1 },
    { id: 10, nome: "Henrique Barbosa", doctorId: 10 },
    { id: 10, nome: "Henrique Barbosa", doctorId: 1 },
    { id: 11, nome: "Beatriz Mendes", doctorId: 11 },
    { id: 12, nome: "Clara Nogueira", doctorId: 12 },
    { id: 13, nome: "Fábio Correia", doctorId: 13 },
    { id: 14, nome: "Priscila Duarte", doctorId: 14 },
    { id: 15, nome: "Thiago Rocha", doctorId: 15 },
  ];

  const [pacientes, setPacientes] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [enviadosIds, setEnviadosIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (doctor?.id) {
        setPacientes(initialPacientes.filter((p) => p.doctorId === doctor.id));
      } else {
        setPacientes(initialPacientes);
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar pacientes");
      setPacientes([]);
    } finally {
      setLoading(false);
    }
  }, [doctor]);

  const handleEnviar = (p) => {
    if (enviadosIds.includes(p.id)) return;
    setEnviadosIds((s) => [...s, p.id]);

    const toastId = Date.now();
    setToasts((t) => [
      ...t,
      { id: toastId, title: "Enviado", body: `${p.nome}` },
    ]);

    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== toastId));
    }, 3000);
  };

  const handleBack = () => {
    navigate("/exames-pendentes");
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
                Envio de Resultado de Exames
              </h1>
              <p className="text-sm text-gray-500">
                {doctor ? `Médico: ${doctor.MEDICO} (ID ${doctor.id})` : "Clique em Enviar para marcar pacientes como enviados"}
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
            <p className="text-sm text-gray-500">Total de Pacientes</p>
            <span className="text-3xl font-bold text-gray-800">{pacientes.length}</span>
          </div>

          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <p className="text-sm text-gray-500">Pacientes Enviados</p>
            <span className="text-3xl font-bold text-gray-800">{enviadosIds.length}</span>
          </div>

          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <p className="text-sm text-gray-500">Médico Selecionado</p>
            <span className="text-3xl font-bold text-gray-800">{doctor?.MEDICO || "Todos"}</span>
          </div>
        </div>

        {/* Lista */}
        <div className="bg-white rounded-2xl shadow p-6">
          {loading ? (
            <div className="flex justify-center py-10">
              <span className="loading loading-spinner text-success w-12 h-12"></span>
            </div>
          ) : error ? (
            <div className="alert alert-error">{error}</div>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Lista de Pacientes</h2>
              <table className="table-auto w-full border-collapse">
                <thead className="bg-[#0F5E45] text-white">
                  <tr>
                    <th className="px-4 py-2 text-left w-16">ID</th>
                    <th className="px-4 py-2 text-left">Paciente</th>
                    <th className="px-4 py-2 text-center w-40">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {pacientes.map((p) => (
                    <tr key={p.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-700">{p.id}</td>
                      <td className="px-4 py-3 text-gray-700">{p.nome}</td>
                      <td className="px-4 py-3 text-center">
                        {enviadosIds.includes(p.id) ? (
                          <span className="badge badge-success gap-2">
                            <Check className="h-4 w-4" /> Enviado
                          </span>
                        ) : (
                          <button
                            onClick={() => handleEnviar(p)}
                            className="btn btn-sm flex items-center gap-2 justify-center bg-[#0F5E45] text-white hover:bg-[#1a9971] transition px-3 py-1 rounded-lg shadow"
                          >
                            <Send className="h-4 w-4" />
                            Enviar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}

                  {pacientes.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-center py-6 text-gray-500">
                        Nenhum paciente encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}
        </div>
      </main>



      {/* Toasts */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-3 bg-white border border-green-200 shadow-xl rounded-xl px-5 py-4 w-80 animate-slide-in"
          >
            <div className="flex-shrink-0">
              <div className="bg-green-100 p-2 rounded-full">
                <Check className="h-5 w-5 text-green-600" />
              </div>
            </div>

            <div className="flex-1">
              <p className="font-semibold text-gray-800">{t.title}</p>
              <p className="text-sm text-gray-600">{t.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
