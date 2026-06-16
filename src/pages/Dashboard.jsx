import { useAuth } from '../contexts/AuthContext'
import Footer from '../components/Layout/Footer'
import { useNavigate, Link } from 'react-router-dom'
import {
  Home,
  ClipboardList,
  LogOut,
  UserCircle,
  FileText,
  CheckCircle2,
  Stethoscope,
  Users,
  Clock,
} from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // Estados simulando dados do backend
  const [examesPendentes, setExamesPendentes] = useState(0)
  const [prescricoesRecebidas, setPrescricoesRecebidas] = useState(0)
  const [examesHoje, setExamesHoje] = useState(0)
  const [pacientesUnicos, setPacientesUnicos] = useState(0)
  const [horaAtual, setHoraAtual] = useState(new Date())
  // Simular fetch de dados
  useEffect(() => {
    // Valores fictícios
    setExamesPendentes(15)
    setPrescricoesRecebidas(10)
    setExamesHoje(7)
    setPacientesUnicos(15)
    // Atualizar relógio em tempo real
    const interval = setInterval(() => setHoraAtual(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])
 
  // Array com os dias da semana
  const diasSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  // Pega o dia da semana atual
  const diaSemana = diasSemana[horaAtual.getDay()];


  // Saudação dinâmica
const hora = horaAtual.getHours();
let saudacao;

if (hora >= 6 && hora < 12) saudacao = 'Bom dia';
else if (hora >= 12 && hora < 18) saudacao = 'Boa tarde';
else saudacao = 'Boa noite';


  const handleLogout = () => {
    logout()
    navigate('/')
  }


  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar fixa */}
      <aside className="w-72 bg-[#0F5E45] text-white flex flex-col justify-between fixed h-screen shadow-lg">
        {/* Logo */}
        <div>
          <div className="flex flex-col items-center justify-center py-8 border-b border-white/20">
            <img
              src="/logo_zamed.png"
              alt="ZaMed Logo"
              className="w-auto h-30 object-contain"
            />
            <h2 className="mt-4 text-lg font-semibold tracking-wide">ZaMed</h2>
            <p className="text-sm text-white/80">Área Laboratorial</p>
          </div>

          {/* Menu */}
          <nav className="mt-8 px-4 space-y-3">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition"
            >
              <Home className="h-5 w-5" /> Home
            </Link>
            <Link
              to="/exames-pendentes"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition"
            >
              <ClipboardList className="h-5 w-5" /> Exames Pendentes
            </Link>
            <Link
              to="/medicos"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition"
            >
              <Stethoscope className="h-5 w-5" /> Médicos Registrados
            </Link>
          </nav>
        </div>

        {/* Botão de sair */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white text-[#0F5E45] font-medium hover:bg-gray-200 transition"
          >
            <LogOut className="h-5 w-5" /> Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="ml-72 flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow px-6 py-4 animate-fade-in">
          <div>
            <h1 className="text-2xl font-semibold text-gray-700">
              {saudacao}, {user?.name || 'Laboratório'}
            </h1>
            <p className="flex font-semibold  text-gray-400">
              {diaSemana}
            </p>
            <p className="flex font-semibold  text-gray-400">
              {horaAtual.toLocaleDateString('pt-BR')} |<Clock className="text-green-700 ml-1 h-auto w-3.5 mt-0.5 "/> 
             <p className='text-green-700'>{horaAtual.toLocaleTimeString('pt-BR')}</p>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <UserCircle className="h-9 w-9 text-gray-600" />
            <div className="text-right">
              <p className="text-gray-800 font-medium">{user?.name || 'Usuário'}</p>
              <p className="text-sm text-gray-500">CNPJ: {user?.cnpj || '00.000.000/0001-00'}</p>
            </div>
          </div>
        </header>

        {/* Cards e conteúdo */}
        <section className="flex-1 p-8 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow flex items-center gap-3">
              <ClipboardList className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-gray-500">Exames Pendentes</p>
                <h2 className="text-3xl font-bold text-gray-800">
                  {examesPendentes}
                </h2>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-gray-500">Prescrições Recebidas</p>
                <h2 className="text-3xl font-bold text-gray-800">
                  {prescricoesRecebidas}
                </h2>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-gray-500">Exames Realizados Hoje</p>
                <h2 className="text-3xl font-bold text-gray-800">
                  {examesHoje}
                </h2>
              </div>
            </div>
            

          
          
          </div>

          {/* Informação institucional */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow animate-slide-in-up">
              <CheckCircle2 className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-gray-500">Número de Pacientes </p>
                <h2 className="text-3xl font-bold text-gray-800">
                  {pacientesUnicos}
                </h2>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Conformidade com LGPD
              </h3>
              <p className="text-gray-600">
                Todos os dados processados no ZaMed seguem a Lei Geral de Proteção de Dados (Lei nº 13.709/2018),
                garantindo segurança e privacidade durante todo o fluxo laboratorial.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Eficiência
              </h3>
              <p className="text-gray-600">
                A integração digital permitiu ao ZaMed reduzir em até 30% o tempo de entrega
                dos resultados de exames nos laboratórios parceiros, como DMS Burnier e outros.
              </p>
            </div>

                        <div className="bg-white p-6 rounded-lg shadow animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Justificativa</h3>
              <p className="text-gray-600">
                O ZaMed surgiu para enfrentar problemas críticos do sistema de saúde
                brasileiro, como longas filas, extravio de documentos e falta de
                medicamentos. Inspirado pela vivência real de um familiar, o projeto
                elimina a dependência de papéis físicos e centraliza processos em
                ambiente digital seguro e acessível.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Público-alvo</h3>
              <p className="text-gray-600">
                O sistema atende pacientes, médicos, enfermeiros, farmacêuticos e
                laboratórios. Garante mais praticidade e segurança aos pacientes,
                reduz tarefas burocráticas para os médicos e aumenta a eficiência de
                clínicas e laboratórios que se integram ao ZaMed.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
}