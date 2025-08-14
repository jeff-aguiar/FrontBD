import React, { useState, useEffect } from 'react';
import type { View } from '../App';
import Card from '../components/Card';
import Button from '../components/Button';

interface ProfessorDashboardProps {
  setView: (view: View) => void;
}

interface Aluno {
  id: string;
  nome: string;
  curso: string;
  frequencia: number;
  faltas: number;
  totalAulas: number;
  mediaFinal: number | null;
  situacao: 'Aprovado' | 'Reprovado' | 'Em Andamento';
}

const ProfessorDashboard: React.FC<ProfessorDashboardProps> = ({ setView }) => {
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState<any>(null);
  const [professorNome, setProfessorNome] = useState('');
  const [abaAtiva, setAbaAtiva] = useState<'alunos' | 'frequencia'>('alunos');
  const [alunoSelecionado, setAlunoSelecionado] = useState<string | null>(null);
  const [editandoMedia, setEditandoMedia] = useState<string | null>(null);
  const [novaFrequencia, setNovaFrequencia] = useState<string>('');

  const [alunosMatriculados, setAlunosMatriculados] = useState<Aluno[]>([
    {
      id: '202512345',
      nome: 'Jeff Silva',
      curso: 'Ciência da Computação',
      frequencia: 90.6, // 58 presenças de 64 aulas
      faltas: 6,
      totalAulas: 64,
      mediaFinal: 8.5,
      situacao: 'Aprovado'
    },
    {
      id: '202567890',
      nome: 'Ana Costa',
      curso: 'Ciência da Computação',
      frequencia: 95.3, // 61 presenças de 64 aulas
      faltas: 3,
      totalAulas: 64,
      mediaFinal: 9.17,
      situacao: 'Aprovado'
    },
    {
      id: '202511111',
      nome: 'Pedro Oliveira',
      curso: 'Ciência da Computação',
      frequencia: 85.9, // 55 presenças de 64 aulas
      faltas: 9,
      totalAulas: 64,
      mediaFinal: null,
      situacao: 'Em Andamento'
    },
    {
      id: '202598765',
      nome: 'Maria Santos',
      curso: 'Ciência da Computação',
      frequencia: 96.9, // 62 presenças de 64 aulas
      faltas: 2,
      totalAulas: 64,
      mediaFinal: 9.58,
      situacao: 'Aprovado'
    },
    {
      id: '202554321',
      nome: 'Carlos Lima',
      curso: 'Ciência da Computação',
      frequencia: 78.1, // 50 presenças de 64 aulas
      faltas: 14,
      totalAulas: 64,
      mediaFinal: null,
      situacao: 'Em Andamento'
    }
  ]);

  useEffect(() => {
    const disciplinaData = JSON.parse(localStorage.getItem('selectedDisciplina') || '{}');
    const professorData = JSON.parse(localStorage.getItem('professorData') || '{}');
    
    if (disciplinaData.nome) {
      setDisciplinaSelecionada(disciplinaData);
      document.title = `${disciplinaData.nome} - Dashboard Professor`;
    }
    
    if (professorData.nome) {
      setProfessorNome(professorData.nome);
    } else {
      setProfessorNome('Prof. Dr. João Silva'); // Nome padrão
    }
  }, []);

  const atualizarMediaFinal = (alunoId: string, media: number) => {
    setAlunosMatriculados(prev => prev.map(aluno => {
      if (aluno.id === alunoId) {
        const novaSituacao = media >= 7 && aluno.frequencia >= 75 ? 'Aprovado' : 
                            (media !== null && (media < 7 || aluno.frequencia < 75)) ? 'Reprovado' : 'Em Andamento';
        
        return {
          ...aluno,
          mediaFinal: media,
          situacao: novaSituacao
        };
      }
      return aluno;
    }));
    setEditandoMedia(null);
  };

  const atualizarFrequencia = (alunoId: string, novasFaltas: number) => {
    setAlunosMatriculados(prev => prev.map(aluno => {
      if (aluno.id === alunoId) {
        const faltasLimitadas = Math.max(0, Math.min(novasFaltas, 16));
        const novaFrequencia = Math.round(((aluno.totalAulas - faltasLimitadas) / aluno.totalAulas) * 1000) / 10;
        const novaSituacao = (aluno.mediaFinal !== null && aluno.mediaFinal >= 7) && novaFrequencia >= 75 ? 'Aprovado' : 
                            (aluno.mediaFinal !== null && ((aluno.mediaFinal < 7) || novaFrequencia < 75)) ? 'Reprovado' : 'Em Andamento';
        
        return {
          ...aluno,
          faltas: faltasLimitadas,
          frequencia: novaFrequencia,
          situacao: novaSituacao
        };
      }
      return aluno;
    }));
  };

  const adicionarFalta = (alunoId: string) => {
    setAlunosMatriculados(prev => prev.map(aluno => {
      if (aluno.id === alunoId && aluno.faltas < 16) {
        const novasFaltas = aluno.faltas + 1;
        const novaFrequencia = Math.round(((aluno.totalAulas - novasFaltas) / aluno.totalAulas) * 1000) / 10;
        const novaSituacao = (aluno.mediaFinal !== null && aluno.mediaFinal >= 7) && novaFrequencia >= 75 ? 'Aprovado' : 
                            (aluno.mediaFinal !== null && ((aluno.mediaFinal < 7) || novaFrequencia < 75)) ? 'Reprovado' : 'Em Andamento';
        
        return {
          ...aluno,
          faltas: novasFaltas,
          frequencia: novaFrequencia,
          situacao: novaSituacao
        };
      }
      return aluno;
    }));
  };

  const getSituacaoColor = (situacao: string) => {
    switch (situacao) {
      case 'Aprovado': return 'text-green-600 bg-green-100';
      case 'Reprovado': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const renderAlunosTab = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {alunosMatriculados.map((aluno) => (
          <Card key={aluno.id} className="border border-gray-200">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{aluno.nome}</h3>
                  <p className="text-sm text-gray-600">Matrícula: {aluno.id}</p>
                  <p className="text-sm text-gray-600">Faltas: {aluno.faltas}/16</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSituacaoColor(aluno.situacao)}`}>
                  {aluno.situacao}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Média Final:</span>
                  {editandoMedia === aluno.id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        className="w-16 px-2 py-1 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        defaultValue={aluno.mediaFinal || ''}
                        onBlur={(e) => {
                          const media = parseFloat(e.target.value);
                          if (!isNaN(media) && media >= 0 && media <= 10) {
                            atualizarMediaFinal(aluno.id, media);
                          } else {
                            setEditandoMedia(null);
                          }
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const media = parseFloat(e.currentTarget.value);
                            if (!isNaN(media) && media >= 0 && media <= 10) {
                              atualizarMediaFinal(aluno.id, media);
                            }
                          }
                          if (e.key === 'Escape') {
                            setEditandoMedia(null);
                          }
                        }}
                        autoFocus
                      />
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer hover:bg-blue-50 px-2 py-1 rounded-md transition-colors"
                      onClick={() => setEditandoMedia(aluno.id)}
                      title="Clique para editar"
                    >
                      <span className={`font-medium ${
                        aluno.mediaFinal !== null
                          ? (aluno.mediaFinal >= 7 ? 'text-green-600' : 'text-red-600')
                          : 'text-gray-400'
                      }`}>
                        {aluno.mediaFinal ? aluno.mediaFinal.toFixed(2) : '---'}
                      </span>
                      <span className="text-xs text-gray-400 ml-1">Editar</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Frequência:</span>
                  <span className="font-medium">{aluno.frequencia}%</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderFrequenciaTab = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Controle de Faltas e Frequência</h3>
        <p className="text-sm text-yellow-700 mb-2">
          Gerencie as faltas dos alunos. <strong>Limite máximo: 16 faltas (75% de frequência)</strong> | Total de aulas: <strong>64</strong>
        </p>
        <div className="text-sm text-yellow-600">
          <strong>Dica:</strong> Use "Adicionar Falta" para registrar ausências ou "Editar" para ajustes manuais.
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aluno
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Faltas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Frequência
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Situação
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {alunosMatriculados.map((aluno) => (
                <tr key={aluno.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{aluno.nome}</div>
                    <div className="text-sm text-gray-500">{aluno.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`text-lg font-bold mr-2 ${
                        aluno.faltas >= 16 ? 'text-red-600' : 
                        aluno.faltas >= 12 ? 'text-orange-600' : 'text-gray-800'
                      }`}>
                        {aluno.faltas}
                      </span>
                      <span className="text-sm text-gray-500">/ 16</span>
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          aluno.faltas >= 16 ? 'bg-red-500' : 
                          aluno.faltas >= 12 ? 'bg-orange-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${(aluno.faltas / 16) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-3 mr-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-300 ${
                            aluno.frequencia >= 75 ? 'bg-green-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(aluno.frequencia, 100)}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-bold ${
                        aluno.frequencia >= 75 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {aluno.frequencia}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {aluno.frequencia < 75 && (
                        <span className="text-red-500">
                          Abaixo do mínimo (75%)
                        </span>
                      )}
                      {aluno.frequencia >= 75 && (
                        <span className="text-green-600">
                          Frequência adequada
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      aluno.faltas >= 16 ? 'bg-red-100 text-red-800' :
                      aluno.frequencia >= 75 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {aluno.faltas >= 16 ? 'Reprovado por Faltas' :
                       aluno.frequencia >= 75 ? 'Adequada' : 'Atenção'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {alunoSelecionado === aluno.id ? (
                      <div className="flex items-center space-x-2">
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              min="0"
                              max="16"
                              step="1"
                              className="w-16 px-3 py-1 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={novaFrequencia}
                              onChange={(e) => setNovaFrequencia(e.target.value)}
                              placeholder="0-16"
                            />
                            <span className="text-xs text-gray-500">faltas</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                const faltas = parseInt(novaFrequencia);
                                if (!isNaN(faltas) && faltas >= 0 && faltas <= 16) {
                                  atualizarFrequencia(aluno.id, faltas);
                                  setAlunoSelecionado(null);
                                  setNovaFrequencia('');
                                }
                              }}
                              className="px-3 py-1 bg-green-500 text-white rounded-md text-xs hover:bg-green-600 transition-colors"
                              title="Salvar faltas"
                            >
                              Salvar
                            </button>
                            <button
                              onClick={() => {
                                setAlunoSelecionado(null);
                                setNovaFrequencia('');
                              }}
                              className="px-3 py-1 bg-gray-500 text-white rounded-md text-xs hover:bg-gray-600 transition-colors"
                              title="Cancelar"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setAlunoSelecionado(aluno.id);
                            setNovaFrequencia(aluno.faltas.toString());
                          }}
                          className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-md text-sm transition-colors border border-blue-200"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => adicionarFalta(aluno.id)}
                          disabled={aluno.faltas >= 16}
                          className={`px-3 py-1 rounded-md text-sm transition-colors border ${
                            aluno.faltas >= 16 
                              ? 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed'
                              : 'text-red-600 hover:bg-red-50 border-red-200'
                          }`}
                          title={aluno.faltas >= 16 ? 'Limite máximo atingido' : 'Adicionar uma falta'}
                        >
                          + Falta
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  if (!disciplinaSelecionada) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Carregando...</h2>
          <Button onClick={() => setView('disciplina-selecao')}>
            Voltar à Seleção de Disciplinas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {disciplinaSelecionada.nome}
              </h1>
              <p className="text-gray-600 mt-2">
                Professor: {professorNome} | Código: {disciplinaSelecionada.id}
              </p>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={() => setView('disciplina-selecao')}
                variant="secondary"
                size="sm"
              >
                ← Trocar Disciplina
              </Button>
              <Button
                onClick={() => setView('login')}
                variant="danger"
                size="sm"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Remove the discipline selection from ProfessorDashboard */}
        {/* This should only be in DepartmentSelection */}

        {/* Navegação por Abas */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { key: 'alunos', label: 'Alunos e Médias' },
                { key: 'frequencia', label: 'Frequência' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setAbaAtiva(tab.key as any)}
                  className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                    abaAtiva === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            {abaAtiva === 'alunos' && renderAlunosTab()}
            {abaAtiva === 'frequencia' && renderFrequenciaTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorDashboard;