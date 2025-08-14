import React, { useState } from 'react';
import type { View } from '../App';
import Card from '../components/Card';
import Button from '../components/Button';

interface AlunoDashboardProps {
  setView: (view: View) => void;
}

const AlunoDashboard: React.FC<AlunoDashboardProps> = ({ setView }) => {
  const [abaAtiva, setAbaAtiva] = useState<'cursando' | 'terminadas'>('cursando');

  // Dados mock do aluno logado
  const alunoLogado = {
    id: '202512345',
    nome: 'Jeff Silva',
    curso: 'Ciência da Computação',
    departamento: 'Computação',
    tipo: 'graduacao',
    rua: 'Rua das Flores',
    numero: '123',
    bairro: 'Centro',
    cep: '60000-000',
    cidade: 'Fortaleza',
    estado: 'CE',
    telefones: [
      { numero: '(85) 99999-1111', descricao: 'Celular' },
      { numero: '(85) 3234-5678', descricao: 'Residencial' }
    ]
  };

  // Disciplinas sendo cursadas
  const disciplinasSendoCursadas = [
    {
      id: 'BD001',
      nome: 'Banco de Dados I',
      professor: 'Prof. Dr. João Silva',
      frequencia: 90.6, // 58 presenças de 64 aulas (6 faltas)
      status: 'Em Andamento'
    },
    {
      id: 'ES001',
      nome: 'Engenharia de Software I',
      professor: 'Prof. Dra. Maria Santos',
      frequencia: 95.3, // 61 presenças de 64 aulas (3 faltas)
      status: 'Em Andamento'
    },
    {
      id: 'IA001',
      nome: 'Inteligência Artificial',
      professor: 'Prof. Dr. Carlos Lima',
      frequencia: 84.4, // 54 presenças de 64 aulas (10 faltas)
      status: 'Em Andamento'
    }
  ];

  // Disciplinas terminadas
  const disciplinasTerminadas = [
    {
      id: 'ALG001',
      nome: 'Algoritmos e Estruturas de Dados',
      professor: 'Prof. Dr. Ana Costa',
      media: 8.8,
      frequencia: 93.8, // 60 presenças de 64 aulas (4 faltas)
      status: 'Aprovado'
    },
    {
      id: 'POO001',
      nome: 'Programação Orientada a Objetos',
      professor: 'Prof. Dr. Pedro Oliveira',
      media: 7.5,
      frequencia: 89.1, // 57 presenças de 64 aulas (7 faltas)
      status: 'Aprovado'
    },
    {
      id: 'CAL001',
      nome: 'Cálculo Diferencial e Integral',
      professor: 'Prof. Dra. Laura Silva',
      media: 6.8,
      frequencia: 81.3, // 52 presenças de 64 aulas (12 faltas)
      status: 'Aprovado'
    },
    {
      id: 'FIS001',
      nome: 'Física Geral',
      professor: 'Prof. Dr. Roberto Santos',
      media: 5.9,
      frequencia: 71.9, // 46 presenças de 64 aulas (18 faltas)
      status: 'Reprovado'
    }
  ];

  const getFrequenciaColor = (frequencia: number) => {
    if (frequencia >= 90) return 'text-green-600';
    if (frequencia >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getNotaColor = (nota: number | null) => {
    if (nota === null) return 'text-gray-500';
    if (nota >= 8.5) return 'text-green-600';
    if (nota >= 7.0) return 'text-blue-600';
    if (nota >= 5.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSituacaoColor = (status: string) => {
    switch (status) {
      case 'Aprovado': return 'bg-green-100 text-green-800';
      case 'Em Andamento': return 'bg-blue-100 text-blue-800';
      case 'Reprovado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderDisciplinaCard = (disciplina: any, isCursando: boolean = false) => (
    <div key={disciplina.id} className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{disciplina.nome}</h3>
          <p className="text-gray-600">{disciplina.id} • {disciplina.professor}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSituacaoColor(disciplina.status)}`}>
          {disciplina.status}
        </span>
      </div>

      <div className="space-y-6">
        {/* Para disciplinas concluídas: Média Final + Frequência */}
        {!isCursando && (
          <>
            {/* Média Final */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Média Final</h4>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <span className={`text-3xl font-bold ${getNotaColor(disciplina.media)}`}>
                  {disciplina.media.toFixed(2)}
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  {disciplina.media >= 7.0 ? 'Aprovado' : 'Reprovado'}
                </p>
              </div>
            </div>

            {/* Frequência */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Frequência</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Frequência:</span>
                  <span className={`font-bold ${getFrequenciaColor(disciplina.frequencia)}`}>
                    {disciplina.frequencia}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      disciplina.frequencia >= 75 ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${disciplina.frequencia}%` }}
                  ></div>
                </div>
                <div className="text-center">
                  <span className={`text-sm ${
                    disciplina.frequencia >= 75 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {disciplina.frequencia >= 75 ? 'Adequada' : 'Abaixo do Mínimo'}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Para disciplinas em andamento: Apenas Frequência */}
        {isCursando && (
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Frequência Atual</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Frequência:</span>
                <span className={`font-bold ${getFrequenciaColor(disciplina.frequencia)}`}>
                  {disciplina.frequencia}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-300 ${
                    disciplina.frequencia >= 75 ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${disciplina.frequencia}%` }}
                ></div>
              </div>
              <div className="text-center">
                <span className={`text-sm ${
                  disciplina.frequencia >= 75 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {disciplina.frequencia >= 75 ? 'Adequada' : 'Atenção: Abaixo de 75%'}
                </span>
              </div>
              <div className="text-xs text-gray-500 text-center">
                {(() => {
                  const faltasAtuais = Math.round((100 - disciplina.frequencia) * 64 / 100);
                  const faltasRestantes = 16 - faltasAtuais;
                  return disciplina.frequencia >= 75 
                    ? `${faltasRestantes > 0 ? faltasRestantes : 0} faltas restantes até o limite (16)`
                    : `⚠️ ${faltasAtuais - 16} faltas acima do limite mínimo`;
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard do Aluno</h1>
              <p className="text-gray-600 mt-2">Bem-vindo, {alunoLogado.nome}!</p>
            </div>
            <Button
              onClick={() => setView('login')}
              variant="danger"
              size="sm"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Informações do Aluno */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Informações do Aluno
          </h2>
          
          {/* Dados Acadêmicos */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-4">
              Dados Acadêmicos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="block text-sm font-medium text-gray-700">Nome Completo:</span>
                <p className="text-gray-900 font-medium">{alunoLogado.nome}</p>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700">Matrícula:</span>
                <p className="text-gray-900 font-medium">{alunoLogado.id}</p>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700">Curso:</span>
                <p className="text-gray-900">{alunoLogado.curso}</p>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700">Departamento:</span>
                <p className="text-gray-900">{alunoLogado.departamento}</p>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700">Tipo:</span>
                <p className="text-gray-900 capitalize">
                  {alunoLogado.tipo === 'graduacao' ? 'Graduação' : 'Pós-graduação'}
                </p>
              </div>
            </div>
          </div>

          {/* Informações Pessoais */}
          <div className="pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Endereço */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-4">
                  Endereço
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="block text-sm font-medium text-gray-700">Logradouro:</span>
                    <p className="text-gray-900">{alunoLogado.rua}, {alunoLogado.numero}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-sm font-medium text-gray-700">Bairro:</span>
                      <p className="text-gray-900">{alunoLogado.bairro}</p>
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-gray-700">CEP:</span>
                      <p className="text-gray-900">{alunoLogado.cep}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-sm font-medium text-gray-700">Cidade:</span>
                      <p className="text-gray-900">{alunoLogado.cidade}</p>
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-gray-700">Estado:</span>
                      <p className="text-gray-900">{alunoLogado.estado}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contatos */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-4">
                  Contatos
                </h3>
                <div className="space-y-3">
                  {alunoLogado.telefones.map((telefone, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{telefone.numero}</p>
                        <p className="text-sm text-gray-600">{telefone.descricao}</p>
                      </div>
                      <div className="text-gray-400">
                        {telefone.descricao === 'Celular' ? 'Cel.' : 'Res.'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <div className="text-3xl font-bold text-blue-600">{disciplinasSendoCursadas.length}</div>
            <div className="text-sm text-gray-600">Disciplinas Cursando</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {disciplinasTerminadas.filter(d => d.status === 'Aprovado').length}
            </div>
            <div className="text-sm text-gray-600">Disciplinas Aprovadas</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-red-600">
              {disciplinasTerminadas.filter(d => d.status === 'Reprovado').length}
            </div>
            <div className="text-sm text-gray-600">Disciplinas Reprovadas</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {(() => {
                const disciplinasComMedia = disciplinasTerminadas.filter(d => d.status === 'Aprovado');
                return disciplinasComMedia.length > 0 
                  ? (disciplinasComMedia.reduce((acc, disc) => acc + disc.media, 0) / disciplinasComMedia.length).toFixed(2)
                  : '---';
              })()}
            </div>
            <div className="text-sm text-gray-600">Média Histórica</div>
          </Card>
        </div>

        {/* Navegação por Abas */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setAbaAtiva('cursando')}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                  abaAtiva === 'cursando'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Disciplinas Cursando ({disciplinasSendoCursadas.length})
              </button>
              <button
                onClick={() => setAbaAtiva('terminadas')}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                  abaAtiva === 'terminadas'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Disciplinas Terminadas ({disciplinasTerminadas.length})
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {abaAtiva === 'cursando' && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Disciplinas em Andamento</h3>
                  <p className="text-sm text-blue-700">
                    Acompanhe seu progresso nas disciplinas que está cursando atualmente.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {disciplinasSendoCursadas.map(disciplina => renderDisciplinaCard(disciplina, true))}
                </div>
              </div>
            )}

            {abaAtiva === 'terminadas' && (
              <div className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Histórico Acadêmico</h3>
                  <p className="text-sm text-green-700">
                    Consulte as disciplinas que você já concluiu e suas respectivas notas finais.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {disciplinasTerminadas.map(disciplina => renderDisciplinaCard(disciplina, false))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlunoDashboard;