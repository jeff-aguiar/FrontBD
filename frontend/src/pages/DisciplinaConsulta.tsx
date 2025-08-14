import React, { useState, useEffect } from 'react';
import type { View } from '../App';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';

interface DisciplinaConsultaProps {
  setView: (view: View) => void;
  userType?: 'admin' | 'funcionario';
}

const DisciplinaConsulta: React.FC<DisciplinaConsultaProps> = ({ setView, userType = 'admin' }) => {
  const [searchKey, setSearchKey] = useState('');
  const [selectedDisciplina, setSelectedDisciplina] = useState<any>(null);
  const [editValues, setEditValues] = useState<any>({});
  const [editingNota, setEditingNota] = useState<string | null>(null);
  const [editingFaltas, setEditingFaltas] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Consulta de Disciplina - UniUFC';
  }, []);

  // Dados mock das disciplinas
  const disciplinasMock = [
    {
      id: 'BD001',
      nome: 'Banco de Dados I',
      creditos: 4,
      tipo: 'obrigatoria',
      curso: 'CC001',
      docentes: [
        { nome: 'Prof. Dr. João Silva' },
        { nome: 'Prof. Ms. Ana Costa' }
      ],
      preRequisitos: ['PROG2', 'EST001'],
      disciplinasDependentes: ['BD002', 'SGBD1'],
      alunosMatriculados: [
        {
          matricula: '202512345',
          nome: 'Jeff Silva',
          curso: 'Ciência da Computação',
          notaFinal: 8.5,
          faltas: 6,
          totalAulas: 64,
          frequencia: 90.6
        },
        {
          matricula: '202567890',
          nome: 'Ana Costa',
          curso: 'Ciência da Computação',
          notaFinal: 7.2,
          faltas: 3,
          totalAulas: 64,
          frequencia: 95.3
        },
        {
          matricula: '202511111',
          nome: 'Pedro Oliveira',
          curso: 'Ciência da Computação',
          notaFinal: 9.1,
          faltas: 10,
          totalAulas: 64,
          frequencia: 84.4
        },
        {
          matricula: '202554321',
          nome: 'Maria Santos',
          curso: 'Engenharia de Software',
          notaFinal: null,
          faltas: 12,
          totalAulas: 64,
          frequencia: 81.3
        }
      ]
    },
    {
      id: 'IA001',
      nome: 'Inteligência Artificial',
      creditos: 4,
      tipo: 'obrigatoria',
      curso: 'CC001',
      docentes: [
        { nome: 'Prof. Dr. Carlos Lima' }
      ],
      preRequisitos: ['EST001', 'PROG2', 'MAT101'],
      disciplinasDependentes: ['ML001', 'RNA001'],
      alunosMatriculados: [
        {
          matricula: '202598765',
          nome: 'Lucas Ferreira',
          curso: 'Ciência da Computação',
          notaFinal: 8.8,
          faltas: 5,
          totalAulas: 64,
          frequencia: 92.2
        },
        {
          matricula: '202533333',
          nome: 'Carla Souza',
          curso: 'Ciência da Computação',
          notaFinal: null,
          faltas: 16,
          totalAulas: 64,
          frequencia: 75.0
        }
      ]
    },
    {
      id: 'ES001',
      nome: 'Engenharia de Software I',
      creditos: 4,
      tipo: 'obrigatoria',
      curso: 'ES002',
      docentes: [
        { nome: 'Profa. Dra. Maria Santos' },
        { nome: 'Prof. Dr. Roberto Lima' }
      ],
      preRequisitos: ['PROG2'],
      disciplinasDependentes: ['ES002', 'TES001', 'GPS001'],
      alunosMatriculados: [
        {
          matricula: '202544444',
          nome: 'José Silva',
          curso: 'Engenharia de Software',
          notaFinal: 7.5,
          faltas: 6,
          totalAulas: 64,
          frequencia: 90.6
        },
        {
          matricula: '202555555',
          nome: 'Patricia Oliveira',
          curso: 'Engenharia de Software',
          notaFinal: 5.8,
          faltas: 18,
          totalAulas: 64,
          frequencia: 71.9
        },
        {
          matricula: '202566666',
          nome: 'Ricardo Santos',
          curso: 'Sistemas de Informação',
          notaFinal: 8.2,
          faltas: 4,
          totalAulas: 64,
          frequencia: 93.8
        }
      ]
    }
  ];

  // Dados mock dos cursos
  const cursosMock = [
    { id: 'CC001', nome: 'Ciência da Computação' },
    { id: 'ES002', nome: 'Engenharia de Software' },
    { id: 'SI003', nome: 'Sistemas de Informação' }
  ];

  const handleSearch = () => {
    if (!searchKey.trim()) return;
    
    const foundDisciplina = disciplinasMock.find(disc => disc.id === searchKey.trim());
    if (foundDisciplina) {
      setSelectedDisciplina(foundDisciplina);
    } else {
      alert('Disciplina não encontrada!');
      setSelectedDisciplina(null);
    }
  };

  const getTipoColor = (tipo: string) => {
    return tipo === 'obrigatoria' 
      ? 'bg-red-100 text-red-800' 
      : 'bg-blue-100 text-blue-800';
  };

  // Função para iniciar edição de nota final
  const iniciarEdicaoNota = (matricula: string, aluno: any) => {
    setEditingNota(matricula);
    setEditValues({
      notaFinal: aluno.notaFinal || ''
    });
  };

  // Função para iniciar edição de faltas
  const iniciarEdicaoFaltas = (matricula: string, aluno: any) => {
    setEditingFaltas(matricula);
    setEditValues({
      faltas: aluno.faltas || ''
    });
  };

  // Função para cancelar edição
  const cancelarEdicao = () => {
    setEditingNota(null);
    setEditingFaltas(null);
    setEditValues({});
  };

  // Função para salvar nota final
  const salvarNotaFinal = () => {
    if (!selectedDisciplina || !editingNota) return;

    const { notaFinal } = editValues;
    
    if (notaFinal && (notaFinal < 0 || notaFinal > 10)) {
      alert('Nota final deve estar entre 0 e 10');
      return;
    }

    // Atualizar dados da disciplina
    const updatedDisciplina = { ...selectedDisciplina };
    const alunoIndex = updatedDisciplina.alunosMatriculados.findIndex(
      (aluno: any) => aluno.matricula === editingNota
    );

    if (alunoIndex !== -1) {
      updatedDisciplina.alunosMatriculados[alunoIndex] = {
        ...updatedDisciplina.alunosMatriculados[alunoIndex],
        notaFinal: notaFinal === '' ? null : parseFloat(notaFinal)
      };

      setSelectedDisciplina(updatedDisciplina);
      alert('Nota final salva com sucesso!');
      setEditingNota(null);
      setEditValues({});
    }
  };

  // Função para salvar faltas e recalcular frequência
  const salvarFaltas = () => {
    if (!selectedDisciplina || !editingFaltas) return;

    const { faltas } = editValues;
    
    if (faltas && (faltas < 0 || faltas > 64)) {
      alert('Faltas devem estar entre 0 e 64');
      return;
    }

    // Atualizar dados da disciplina
    const updatedDisciplina = { ...selectedDisciplina };
    const alunoIndex = updatedDisciplina.alunosMatriculados.findIndex(
      (aluno: any) => aluno.matricula === editingFaltas
    );

    if (alunoIndex !== -1) {
      const novasFaltas = parseInt(faltas) || 0;
      const novaFrequencia = Math.round(((64 - novasFaltas) / 64) * 1000) / 10;

      updatedDisciplina.alunosMatriculados[alunoIndex] = {
        ...updatedDisciplina.alunosMatriculados[alunoIndex],
        faltas: novasFaltas,
        frequencia: novaFrequencia
      };

      setSelectedDisciplina(updatedDisciplina);
      alert('Faltas atualizadas com sucesso!');
      setEditingFaltas(null);
      setEditValues({});
    }
  };

  const handleVoltar = () => {
    if (userType === 'funcionario') {
      setView('funcionario');
    } else {
      setView('admin');
    }
  };

  // Check if there's an issue with the select onChange handler
  const handleDisciplinaSelect = (disciplinaId: string) => {
    console.log('Selected disciplina ID:', disciplinaId); // Debug log
    if (!disciplinaId || disciplinaId === '' || disciplinaId === 'all') {
      setSelectedDisciplina(null);
      return;
    }
    const disciplina = disciplinasMock.find(d => d.id === disciplinaId);
    console.log('Found disciplina:', disciplina); // Debug log
    setSelectedDisciplina(disciplina || null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Consulta de Disciplina</h1>
              <p className="text-gray-600 mt-2">Consulta completa de informações das disciplinas</p>
            </div>
            <Button
              onClick={handleVoltar}
              variant="secondary"
              size="sm"
              className="w-auto"
            >
              ← Voltar ao {userType === 'funcionario' ? 'Painel do Funcionário' : 'Admin'}
            </Button>
          </div>
        </div>

        {/* Header de busca */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Buscar Disciplina</h2>
          <p className="text-sm text-blue-700">
            Digite o código da disciplina para consultar informações básicas e gerenciar notas dos alunos.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Buscar Disciplina
          </h2>
          
          {/* Pesquisa por Código */}
          <div className="mb-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  label="Pesquisar por Código"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  placeholder="Digite o código da disciplina"
                />
              </div>
              <div className="mt-6">
                <Button
                  type="button"
                  onClick={handleSearch}
                  variant="primary"
                  size="sm"
                  className="w-auto"
                >
                  Buscar
                </Button>
              </div>
            </div>
          </div>

          {/* Seleção por Dropdown */}
          <div className="mb-4">
            <Select
              value={selectedDisciplina?.id || ''}
              onChange={(e) => handleDisciplinaSelect(e.target.value)}
              className="min-w-[200px]"
            >
              <option value="">Selecione uma disciplina</option>
              {disciplinasMock.map((disciplina) => (
                <option key={disciplina.id} value={disciplina.id}>
                  {disciplina.id} - {disciplina.nome}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Disciplina Details */}
        {selectedDisciplina && (
          <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedDisciplina.nome}
                </h2>
                <p className="text-gray-600 mt-1">{selectedDisciplina.id}</p>
              </div>
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTipoColor(selectedDisciplina.tipo)}`}>
                  {selectedDisciplina.tipo === 'obrigatoria' ? 'Obrigatória' : 'Optativa'}
                </span>
              </div>
            </div>

            {/* Informações Básicas */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Informações Básicas
              </h3>
              <div className="bg-white p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedDisciplina.creditos}</div>
                  <div className="text-sm text-blue-800">Créditos</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-lg font-bold text-orange-600">
                    {cursosMock.find(c => c.id === selectedDisciplina.curso)?.nome?.split(' ')[0] || 'N/A'}
                  </div>
                  <div className="text-sm text-orange-800">Curso</div>
                </div>
              </div>
            </div>

            {/* Pré-requisitos */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Pré-requisitos da Disciplina
              </h3>
              <div className="bg-white p-6 rounded-lg">
                {selectedDisciplina.preRequisitos.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {selectedDisciplina.preRequisitos.map((preReq: string, idx: number) => (
                      <div key={idx} className="bg-yellow-50 border border-yellow-200 px-4 py-3 rounded-lg">
                        <span className="font-medium text-yellow-800">{preReq}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">Esta disciplina não possui pré-requisitos</p>
                )}
              </div>
            </div>

            {/* Disciplinas Dependentes */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Disciplinas que Dependem desta (Pré-requisito para)
              </h3>
              <div className="bg-white p-6 rounded-lg">
                {selectedDisciplina.disciplinasDependentes.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {selectedDisciplina.disciplinasDependentes.map((dep: string, idx: number) => (
                      <div key={idx} className="bg-green-50 border border-green-200 px-4 py-3 rounded-lg">
                        <span className="font-medium text-green-800">{dep}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">Esta disciplina não é pré-requisito para outras</p>
                )}
              </div>
            </div>

            {/* Alunos Matriculados */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Alunos Matriculados na Disciplina
              </h3>
              <div className="bg-white p-6 rounded-lg">
                {selectedDisciplina.alunosMatriculados.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 font-semibold text-gray-700">Matrícula</th>
                          <th className="text-left py-3 font-semibold text-gray-700">Nome</th>
                          <th className="text-left py-3 font-semibold text-gray-700">Curso</th>
                          <th className="text-center py-3 font-semibold text-gray-700">Nota Final</th>
                          <th className="text-center py-3 font-semibold text-gray-700">Faltas</th>
                          <th className="text-center py-3 font-semibold text-gray-700">Frequência</th>
                          <th className="text-center py-3 font-semibold text-gray-700">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedDisciplina.alunosMatriculados.map((aluno: any, idx: number) => (
                          <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 font-medium text-blue-600">{aluno.matricula}</td>
                            <td className="py-3">{aluno.nome}</td>
                            <td className="py-3 text-gray-600">{aluno.curso}</td>
                            <td className="py-3 text-center">
                              {editingNota === aluno.matricula ? (
                                <div className="flex items-center justify-center space-x-2">
                                  <input
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    className="w-20 px-2 py-1 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    value={editValues.notaFinal}
                                    onChange={(e) => setEditValues({...editValues, notaFinal: e.target.value})}
                                    onKeyPress={(e) => {
                                      if (e.key === 'Enter') salvarNotaFinal();
                                      if (e.key === 'Escape') cancelarEdicao();
                                    }}
                                    autoFocus
                                  />
                                </div>
                              ) : (
                                <div
                                  className="cursor-pointer hover:bg-blue-50 px-2 py-1 rounded-md transition-colors inline-block"
                                  onClick={() => iniciarEdicaoNota(aluno.matricula, aluno)}
                                  title="Clique para editar nota final"
                                >
                                  <span className={`font-medium text-lg ${aluno.notaFinal !== null && aluno.notaFinal >= 7 ? 'text-green-600' : aluno.notaFinal !== null ? 'text-red-600' : 'text-gray-400'}`}>
                                    {aluno.notaFinal !== null ? aluno.notaFinal.toFixed(1) : '---'}
                                  </span>
                                  <span className="text-xs text-gray-400 ml-1">(editar)</span>
                                </div>
                              )}
                            </td>
                            <td className="py-3 text-center">
                              {editingFaltas === aluno.matricula ? (
                                <div className="flex items-center justify-center space-x-2">
                                  <input
                                    type="number"
                                    min="0"
                                    max="64"
                                    step="1"
                                    className="w-16 px-2 py-1 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    value={editValues.faltas}
                                    onChange={(e) => setEditValues({...editValues, faltas: e.target.value})}
                                    onKeyPress={(e) => {
                                      if (e.key === 'Enter') salvarFaltas();
                                      if (e.key === 'Escape') cancelarEdicao();
                                    }}
                                    autoFocus
                                  />
                                </div>
                              ) : (
                                <div
                                  className="cursor-pointer hover:bg-yellow-50 px-2 py-1 rounded-md transition-colors inline-block"
                                  onClick={() => iniciarEdicaoFaltas(aluno.matricula, aluno)}
                                  title="Clique para editar faltas"
                                >
                                  <span className={`font-medium ${aluno.faltas >= 16 ? 'text-red-600' : aluno.faltas >= 12 ? 'text-orange-600' : 'text-gray-800'}`}>
                                    {aluno.faltas}/64
                                  </span>
                                  <span className="text-xs text-gray-400 ml-1">Editar</span>
                                </div>
                              )}
                            </td>
                            <td className="py-3 text-center">
                              <span className={`font-medium ${aluno.frequencia >= 75 ? 'text-green-600' : 'text-red-600'}`}>
                                {aluno.frequencia.toFixed(1)}%
                              </span>
                            </td>
                            <td className="py-3 text-center">
                              {/* Botões de ação limpos */}
                              <div className="flex justify-center space-x-2">
                                <button
                                  onClick={() => iniciarEdicaoNota(aluno.matricula, aluno)}
                                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                                  disabled={editingNota !== null || editingFaltas !== null}
                                >
                                  Nota
                                </button>
                                <button
                                  onClick={() => iniciarEdicaoFaltas(aluno.matricula, aluno)}
                                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                                  disabled={editingNota !== null || editingFaltas !== null}
                                >
                                  Faltas
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}

                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Nenhum aluno matriculado nesta disciplina</p>
                )}
              </div>
            </div>

            {/* Modal de Edição */}
            {(editingNota || editingFaltas) && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full mx-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">
                    {editingNota ? 'Editar Nota Final' : 'Editar Faltas'}
                  </h3>
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      Editando dados do aluno: {selectedDisciplina.alunosMatriculados.find((a: any) => a.matricula === (editingNota || editingFaltas))?.nome}
                    </p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    {editingNota && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nota Final:
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          step="0.1"
                          value={editValues.notaFinal}
                          onChange={(e) => setEditValues({...editValues, notaFinal: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0.0 - 10.0"
                        />
                      </div>
                    )}
                    
                    {editingFaltas && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Número de Faltas:
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="64"
                          step="1"
                          value={editValues.faltas}
                          onChange={(e) => setEditValues({...editValues, faltas: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0 - 64"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Frequência será recalculada automaticamente (16 faltas = 75%)
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={cancelarEdicao}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={editingNota ? salvarNotaFinal : salvarFaltas}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Salvar {editingNota ? 'Nota' : 'Faltas'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Instructions quando não há disciplina selecionada */}
        {!selectedDisciplina && (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Consulta de Disciplinas
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Digite o código da disciplina ou selecione da lista para visualizar informações básicas:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-blue-800">Informações Básicas</div>
                <div className="text-xs text-blue-600">Créditos e tipo</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-green-800">Pré-requisitos</div>
                <div className="text-xs text-green-600">Disciplinas necessárias</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-purple-800">Disciplinas Dependentes</div>
                <div className="text-xs text-purple-600">É pré-requisito para</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-orange-800">Alunos Matriculados</div>
                <div className="text-xs text-orange-600">Com edição de notas</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisciplinaConsulta;