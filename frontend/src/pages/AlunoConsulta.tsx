import React, { useState, useEffect } from 'react';
import type { View } from '../App';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';

interface AlunoConsultaProps {
  setView: (view: View) => void;
  userType?: 'admin' | 'funcionario';
}

const AlunoConsulta: React.FC<AlunoConsultaProps> = ({ setView, userType = 'admin' }) => {
  const [searchKey, setSearchKey] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [editingDisciplina, setEditingDisciplina] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    document.title = 'Consulta de Aluno - UniUFC';
  }, []);

  const handleVoltar = () => {
    if (userType === 'funcionario') {
      setView('funcionario');
    } else {
      setView('admin');
    }
  };

  // Lista de cursos disponíveis
  const cursosDisponiveis = [
    { id: '1', nome: 'Ciência da Computação', departamento: 'Computação' },
    { id: '2', nome: 'Engenharia de Software', departamento: 'Computação' },
    { id: '3', nome: 'Sistemas de Informação', departamento: 'Computação' },
    { id: '4', nome: 'Redes de Computadores', departamento: 'Computação' },
    { id: '5', nome: 'Engenharia Civil', departamento: 'Engenharia' },
    { id: '6', nome: 'Administração', departamento: 'Administração' },
    { id: '7', nome: 'Direito', departamento: 'Direito' },
    { id: '8', nome: 'Medicina', departamento: 'Medicina' }
  ];

  // Dados mock dos alunos
  const alunosMock = [
    { 
      id: '202512345', 
      nome: 'Jeff Silva', 
      rua: 'Rua das Flores', 
      numero: '123', 
      bairro: 'Centro', 
      cep: '60000-000', 
      cidade: 'Fortaleza', 
      estado: 'CE', 
      curso: '1', 
      tipo: 'graduacao', 
      telefones: [{ numero: '(85) 99999-1111', descricao: 'Celular' }],        disciplinasMatriculadas: [
          { 
            codigo: 'BD001', 
            nome: 'Banco de Dados I', 
            creditos: 4,
            notaFinal: 8.5,
            faltas: 6,
            totalAulas: 64,
            frequencia: 90.6
          },
          { 
            codigo: 'IA001', 
            nome: 'Inteligência Artificial', 
            creditos: 4,
            notaFinal: null,
            faltas: 10,
            totalAulas: 64,
            frequencia: 84.4
          }
        ],
        disciplinasConcluidas: [
          { codigo: 'PROG1', nome: 'Programação I', creditos: 4, nota: 8.5 },
          { codigo: 'PROG2', nome: 'Programação II', creditos: 4, nota: 9.0 },
          { codigo: 'EST001', nome: 'Estrutura de Dados', creditos: 4, nota: 7.8 }
        ]
    },
    { 
      id: '202567890', 
      nome: 'Ana Costa', 
      rua: 'Av. Beira Mar', 
      numero: '456', 
      bairro: 'Meireles', 
      cep: '60165-000', 
      cidade: 'Fortaleza', 
      estado: 'CE', 
      curso: '2', 
      tipo: 'graduacao', 
      telefones: [{ numero: '(85) 99999-2222', descricao: 'Celular' }],      disciplinasMatriculadas: [
        { 
          codigo: 'ES001', 
          nome: 'Engenharia de Software I', 
          creditos: 4,
          notaFinal: 7.2,
          faltas: 3,
          totalAulas: 64,
          frequencia: 95.3
        }
      ],
        disciplinasConcluidas: [
          { codigo: 'PROG1', nome: 'Programação I', creditos: 4, nota: 9.2 },
          { codigo: 'MAT001', nome: 'Matemática Discreta', creditos: 4, nota: 8.0 }
        ]
    },
    { 
      id: '202511111', 
      nome: 'Pedro Oliveira', 
      rua: 'Rua do Sol', 
      numero: '789', 
      bairro: 'Aldeota', 
      cep: '60150-000', 
      cidade: 'Fortaleza', 
      estado: 'CE', 
      curso: '1', 
      tipo: 'pos-graduacao', 
      telefones: [{ numero: '(85) 99999-3333', descricao: 'Celular' }],      disciplinasMatriculadas: [
        { 
          codigo: 'BD002', 
          nome: 'Banco de Dados II', 
          creditos: 4,
          notaFinal: null,
          faltas: 0,
          totalAulas: 64,
          frequencia: 100.0
        }
      ],
        disciplinasConcluidas: [
          { codigo: 'BD001', nome: 'Banco de Dados I', creditos: 4, nota: 9.5 },
          { codigo: 'IA001', nome: 'Inteligência Artificial', creditos: 4, nota: 8.8 }
        ]
    }
  ];

  const handleSearch = () => {
    if (!searchKey.trim()) return;
    
    const foundStudent = alunosMock.find(student => student.id === searchKey.trim());
    if (foundStudent) {
      setSelectedStudent(foundStudent);
    } else {
      alert('Aluno não encontrado!');
      setSelectedStudent(null);
    }
  };

  const handleDropdownChange = (value: string) => {
    setSearchKey(value);
    if (value.trim()) {
      const foundStudent = alunosMock.find(student => student.id === value.trim());
      if (foundStudent) {
        setSelectedStudent(foundStudent);
      }
    } else {
      setSelectedStudent(null);
    }
  };

  // Função para iniciar edição de uma disciplina
  const iniciarEdicao = (disciplinaCodigo: string, disciplina: any) => {
    setEditingDisciplina(disciplinaCodigo);
    setEditValues({
      notaFinal: disciplina.notaFinal || '',
      faltas: disciplina.faltas || 0,
      totalAulas: disciplina.totalAulas || 64
    });
    setIsEditing(true);
  };

  // Função para cancelar edição
  const cancelarEdicao = () => {
    setEditingDisciplina(null);
    setEditValues({});
    setIsEditing(false);
  };

  // Função para salvar alterações
  const salvarAlteracoes = () => {
    if (!selectedStudent || !editingDisciplina) return;

    // Validação básica
    const { notaFinal, faltas, totalAulas } = editValues;
    
    if (notaFinal !== '' && (notaFinal < 0 || notaFinal > 10)) {
      alert('A nota final deve estar entre 0 e 10');
      return;
    }

    if (faltas < 0 || faltas > totalAulas) {
      alert(`Faltas devem estar entre 0 e ${totalAulas} (total de aulas)`);
      return;
    }

    // Calcular frequência automaticamente
    const frequenciaCalculada = totalAulas > 0 ? ((totalAulas - faltas) / totalAulas) * 100 : 100;

    // Atualizar dados do aluno
    const updatedStudent = { ...selectedStudent };
    const disciplinaIndex = updatedStudent.disciplinasMatriculadas.findIndex(
      (disc: any) => disc.codigo === editingDisciplina
    );

    if (disciplinaIndex !== -1) {
      updatedStudent.disciplinasMatriculadas[disciplinaIndex] = {
        ...updatedStudent.disciplinasMatriculadas[disciplinaIndex],
        notaFinal: notaFinal === '' ? null : parseFloat(notaFinal),
        faltas: parseInt(faltas),
        frequencia: frequenciaCalculada
      };

      setSelectedStudent(updatedStudent);
      alert('Alterações salvas com sucesso! Frequência calculada automaticamente.');
      cancelarEdicao();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Consulta de Aluno</h1>
              <p className="text-gray-600 mt-2">Consulta completa de informações acadêmicas</p>
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

        {/* Search Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            Buscar Aluno
          </h2>
          
          {/* Pesquisa por Matrícula */}
          <div className="mb-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  label="Pesquisar por Matrícula"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  placeholder="Digite a matrícula do aluno"
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
              label="Ou selecione pela lista"
              value={searchKey}
              onChange={(e) => handleDropdownChange(e.target.value)}
            >
              <option value="">Escolha um aluno...</option>
              {alunosMock.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.id} - {student.nome}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Student Dashboard */}
        {selectedStudent && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              Informações Acadêmicas - {selectedStudent.nome}
            </h2>
            
            {/* Dados Pessoais */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                Dados Pessoais
              </h3>
              <div className="bg-white p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <strong className="text-gray-700 block mb-1">Matrícula:</strong>
                  <p className="text-gray-600 text-lg">{selectedStudent.id}</p>
                </div>
                <div>
                  <strong className="text-gray-700 block mb-1">Nome Completo:</strong>
                  <p className="text-gray-600 text-lg">{selectedStudent.nome}</p>
                </div>
                <div>
                  <strong className="text-gray-700 block mb-1">Tipo:</strong>
                  <p className="text-gray-600 text-lg capitalize">
                    {selectedStudent.tipo === 'graduacao' ? 'Graduação' : 'Pós-graduação'}
                  </p>
                </div>
                <div>
                  <strong className="text-gray-700 block mb-1">Curso:</strong>
                  <p className="text-gray-600 text-lg">
                    {cursosDisponiveis.find(c => c.id === selectedStudent.curso)?.nome || 'Não encontrado'}
                  </p>
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                Endereço
              </h3>
              <div className="bg-white p-6 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <strong className="text-gray-700 block mb-1">Logradouro:</strong>
                  <p className="text-gray-600">{selectedStudent.rua}, {selectedStudent.numero}</p>
                </div>
                <div>
                  <strong className="text-gray-700 block mb-1">Bairro:</strong>
                  <p className="text-gray-600">{selectedStudent.bairro}</p>
                </div>
                <div>
                  <strong className="text-gray-700 block mb-1">CEP:</strong>
                  <p className="text-gray-600">{selectedStudent.cep}</p>
                </div>
                <div>
                  <strong className="text-gray-700 block mb-1">Cidade:</strong>
                  <p className="text-gray-600">{selectedStudent.cidade}</p>
                </div>
                <div>
                  <strong className="text-gray-700 block mb-1">Estado:</strong>
                  <p className="text-gray-600">{selectedStudent.estado}</p>
                </div>
                <div>
                  <strong className="text-gray-700 block mb-1">Telefones:</strong>
                  <div className="text-gray-600">
                    {selectedStudent.telefones?.map((tel: any, idx: number) => (
                      <p key={idx} className="text-sm">{tel.numero} ({tel.descricao})</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Situação Acadêmica Atual */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                Disciplinas Matriculadas
              </h3>
              <div className="bg-white p-6 rounded-lg">
                {selectedStudent.disciplinasMatriculadas?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 font-semibold text-gray-700">Código</th>
                          <th className="text-left py-3 font-semibold text-gray-700">Disciplina</th>
                          <th className="text-center py-3 font-semibold text-gray-700">Créditos</th>
                          <th className="text-center py-3 font-semibold text-gray-700">Nota Final</th>
                          <th className="text-center py-3 font-semibold text-gray-700">Faltas</th>
                          <th className="text-center py-3 font-semibold text-gray-700">Frequência</th>
                          <th className="text-center py-3 font-semibold text-gray-700">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedStudent.disciplinasMatriculadas.map((disc: any, idx: number) => {
                          return (
                            <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-3 font-medium text-blue-600">{disc.codigo}</td>
                              <td className="py-3">{disc.nome}</td>
                              <td className="py-3 text-center">{disc.creditos}</td>
                              <td className="py-3 text-center">
                                {disc.notaFinal !== null ? (
                                  <span className={`font-medium ${disc.notaFinal >= 7 ? 'text-green-600' : 'text-red-600'}`}>
                                    {disc.notaFinal.toFixed(1)}
                                  </span>
                                ) : (
                                  <span className="text-gray-400">---</span>
                                )}
                              </td>
                              <td className="py-3 text-center">
                                <span className="font-medium text-gray-700">{disc.faltas}</span>
                              </td>
                              <td className="py-3 text-center">
                                <span className={`font-medium ${disc.frequencia >= 75 ? 'text-green-600' : 'text-red-600'}`}>
                                  {disc.frequencia.toFixed(1)}%
                                </span>
                              </td>
                              <td className="py-3 text-center">
                                <button
                                  onClick={() => iniciarEdicao(disc.codigo, disc)}
                                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                                  disabled={isEditing}
                                >
                                  Editar
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Nenhuma disciplina matriculada</p>
                )}
              </div>
            </div>

            {/* Modal de Edição */}
            {editingDisciplina && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-xl max-w-2xl w-full mx-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">
                    Editar Nota Final e Faltas: {editingDisciplina}
                  </h3>
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      A frequência será calculada automaticamente baseada no número de faltas e total de aulas.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Nota Final */}
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
                        placeholder="0.0 - 10.0 (deixe vazio se não houver nota)"
                      />
                    </div>
                    
                    {/* Faltas */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Faltas:
                      </label>
                      <input
                        type="number"
                        min="0"
                        max={editValues.totalAulas || 64}
                        value={editValues.faltas}
                        onChange={(e) => setEditValues({...editValues, faltas: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Número de faltas"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Máximo: {editValues.totalAulas || 64} aulas
                      </p>
                    </div>
                    
                    {/* Frequência Calculada */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Frequência (Calculada Automaticamente):
                      </label>
                      <div className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg">
                        <span className={`font-medium text-lg ${
                          ((editValues.totalAulas - (editValues.faltas || 0)) / editValues.totalAulas) * 100 >= 75 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {editValues.totalAulas > 0 
                            ? (((editValues.totalAulas - (editValues.faltas || 0)) / editValues.totalAulas) * 100).toFixed(1)
                            : '100.0'
                          }%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Baseado em {editValues.totalAulas || 64} aulas totais
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={cancelarEdicao}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={salvarAlteracoes}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Histórico Acadêmico */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                Disciplinas Concluídas
              </h3>
              <div className="bg-white p-6 rounded-lg">
                {selectedStudent.disciplinasConcluidas?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 font-semibold text-gray-700">Código</th>
                          <th className="text-left py-3 font-semibold text-gray-700">Disciplina</th>
                          <th className="text-center py-3 font-semibold text-gray-700">Créditos</th>
                          <th className="text-center py-3 font-semibold text-gray-700">Nota</th>
                          <th className="text-center py-3 font-semibold text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedStudent.disciplinasConcluidas.map((disc: any, idx: number) => (
                          <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 font-medium text-green-600">{disc.codigo}</td>
                            <td className="py-3">{disc.nome}</td>
                            <td className="py-3 text-center">{disc.creditos}</td>
                            <td className="py-3 text-center">
                              <span className={`font-medium text-lg ${disc.nota >= 7 ? 'text-green-600' : 'text-red-600'}`}>
                                {disc.nota.toFixed(1)}
                              </span>
                            </td>
                            <td className="py-3 text-center">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${disc.nota >= 7 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {disc.nota >= 7 ? 'Aprovado' : 'Reprovado'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Nenhuma disciplina concluída</p>
                )}
              </div>
            </div>

            {/* Resumo do Curso */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                Informações do Curso
              </h3>
              <div className="bg-white p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <strong className="text-gray-700 block mb-1">Curso:</strong>
                  <p className="text-gray-600 text-xl font-medium">
                    {cursosDisponiveis.find(c => c.id === selectedStudent.curso)?.nome || 'Não encontrado'}
                  </p>
                </div>
                <div>
                  <strong className="text-gray-700 block mb-1">Departamento:</strong>
                  <p className="text-gray-600 text-lg">
                    {cursosDisponiveis.find(c => c.id === selectedStudent.curso)?.departamento || 'Não encontrado'}
                  </p>
                </div>
                <div>
                  <strong className="text-gray-700 block mb-1">Créditos Mínimos para Conclusão:</strong>
                  <p className="text-gray-600 text-xl font-medium">200 créditos</p>
                </div>
                <div>
                  <strong className="text-gray-700 block mb-1">Progresso do Curso:</strong>
                  <div className="mt-2">
                    <div className="bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            (selectedStudent.disciplinasConcluidas.reduce((total: number, disc: any) => total + disc.creditos, 0) / 200) * 100,
                            100
                          )}%`
                        }}
                      ></div>
                    </div>
                    <p className="text-lg font-medium text-gray-700 mt-2">
                      {selectedStudent.disciplinasConcluidas.reduce((total: number, disc: any) => total + disc.creditos, 0)}/200 créditos 
                      ({Math.min(
                        Math.round((selectedStudent.disciplinasConcluidas.reduce((total: number, disc: any) => total + disc.creditos, 0) / 200) * 100),
                        100
                      )}% concluído)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions quando não há aluno selecionado */}
        {!selectedStudent && (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-6xl mb-4">Graduação</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Consulta Acadêmica de Alunos
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Digite a matrícula do aluno ou selecione da lista para visualizar:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">Disciplinas</div>
                <div className="text-sm font-medium text-blue-800">Disciplinas Matriculadas</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">Concluídas</div>
                <div className="text-sm font-medium text-green-800">Disciplinas Concluídas</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">Curso</div>
                <div className="text-sm font-medium text-purple-800">Informações do Curso</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">Dados</div>
                <div className="text-sm font-medium text-orange-800">Dados Pessoais</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlunoConsulta;