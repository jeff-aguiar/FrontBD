import React, { useState, useEffect } from 'react';
import type { View } from '../App';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';

interface CursoConsultaProps {
  setView: (view: View) => void;
  userType?: 'admin' | 'funcionario';
}

const CursoConsulta: React.FC<CursoConsultaProps> = ({ setView, userType = 'admin' }) => {
  const [searchKey, setSearchKey] = useState('');
  const [selectedCurso, setSelectedCurso] = useState<any>(null);
  const [abaAtiva, setAbaAtiva] = useState<'informacoes' | 'alunos'>('informacoes');

  useEffect(() => {
    document.title = 'Consulta de Curso - UniUFC';
  }, []);

  // Dados mock dos cursos
  const cursosMock = [
    {
      id: 'CC001',
      nome: 'Ciência da Computação',
      tipo: 'Bacharelado',
      departamento: 'COMP',
      coordenador: 'Prof. Dr. João Silva',
      creditosMinimos: 160,
      duracaoMinima: 8, // semestres
      duracaoMaxima: 12,
      turno: 'Integral',
      modalidade: 'Presencial',
      anoFundacao: 1995,
      reconhecimento: 'Portaria MEC nº 123/2000',
      conceito: 'A',
      disciplinasObrigatorias: ['BD001', 'PROG2', 'EST001', 'IA001'],
      disciplinasOptativas: ['ES001', 'RC001', 'ML001'],
      alunosAtivos: 450,
      alunosFormados: 1250,
      vagasAnuais: 60,
      notaCorte: 750.5,
      mercadoTrabalho: [
        'Desenvolvedor de Software',
        'Analista de Sistemas',
        'Cientista de Dados',
        'Arquiteto de Software',
        'Pesquisador'
      ],
      competencias: [
        'Programação em múltiplas linguagens',
        'Análise e projeto de sistemas',
        'Banco de dados',
        'Inteligência artificial',
        'Desenvolvimento web e mobile'
      ]
    },
    {
      id: 'ES002',
      nome: 'Engenharia de Software',
      tipo: 'Bacharelado',
      departamento: 'COMP',
      coordenador: 'Profa. Dra. Maria Santos',
      creditosMinimos: 150,
      duracaoMinima: 8,
      duracaoMaxima: 12,
      turno: 'Noturno',
      modalidade: 'Presencial',
      anoFundacao: 2010,
      reconhecimento: 'Portaria MEC nº 456/2015',
      conceito: 'B+',
      disciplinasObrigatorias: ['ES001', 'PROG2', 'BD001', 'TES001'],
      disciplinasOptativas: ['IA001', 'RC001', 'UX001'],
      alunosAtivos: 280,
      alunosFormados: 350,
      vagasAnuais: 40,
      notaCorte: 720.0,
      mercadoTrabalho: [
        'Engenheiro de Software',
        'Tech Lead',
        'DevOps Engineer',
        'Product Manager',
        'Consultor em TI'
      ],
      competencias: [
        'Engenharia de requisitos',
        'Arquitetura de software',
        'Metodologias ágeis',
        'Testes de software',
        'Gestão de projetos'
      ]
    },
    {
      id: 'SI003',
      nome: 'Sistemas de Informação',
      tipo: 'Bacharelado',
      departamento: 'COMP',
      coordenador: 'Prof. Dr. Carlos Lima',
      creditosMinimos: 140,
      duracaoMinima: 8,
      duracaoMaxima: 12,
      turno: 'Noturno',
      modalidade: 'Presencial',
      anoFundacao: 2005,
      reconhecimento: 'Portaria MEC nº 789/2010',
      conceito: 'B',
      disciplinasObrigatorias: ['SI001', 'BD001', 'PROG2', 'ADM001'],
      disciplinasOptativas: ['IA001', 'ES001', 'BI001'],
      alunosAtivos: 320,
      alunosFormados: 800,
      vagasAnuais: 50,
      notaCorte: 680.5,
      mercadoTrabalho: [
        'Analista de Sistemas',
        'Administrador de Banco de Dados',
        'Business Analyst',
        'Consultor em TI',
        'Gerente de TI'
      ],
      competencias: [
        'Análise de negócios',
        'Sistemas de informação',
        'Business Intelligence',
        'Processos organizacionais',
        'Gestão de TI'
      ]
    }
  ];

  // Dados mock dos departamentos
  const departamentosMock = [
    { id: 'COMP', nome: 'Departamento de Computação' },
    { id: 'MAT', nome: 'Departamento de Matemática' },
    { id: 'FIS', nome: 'Departamento de Física' }
  ];

  // Dados mock das disciplinas
  const disciplinasMock = [
    { id: 'BD001', nome: 'Banco de Dados I', creditos: 4 },
    { id: 'PROG2', nome: 'Programação II', creditos: 4 },
    { id: 'EST001', nome: 'Estrutura de Dados', creditos: 4 },
    { id: 'IA001', nome: 'Inteligência Artificial', creditos: 4 },
    { id: 'ES001', nome: 'Engenharia de Software I', creditos: 4 },
    { id: 'RC001', nome: 'Redes de Computadores', creditos: 4 },
    { id: 'ML001', nome: 'Machine Learning', creditos: 4 },
    { id: 'TES001', nome: 'Testes de Software', creditos: 4 },
    { id: 'UX001', nome: 'User Experience', creditos: 4 },
    { id: 'SI001', nome: 'Sistemas de Informação I', creditos: 4 },
    { id: 'ADM001', nome: 'Administração', creditos: 4 },
    { id: 'BI001', nome: 'Business Intelligence', creditos: 4 }
  ];

  // Dados mock dos alunos do curso
  const alunosDosCursos: { [key: string]: any } = {
    'CC001': {
      prontosParaFormatura: [
        {
          matricula: '202512345',
          nome: 'Jeff Silva',
          obrigatoriasConcluidas: 4,
          totalObrigatorias: 4,
          optativasConcluidas: 2,
          progresso: 100
        },
        {
          matricula: '202567890',
          nome: 'Ana Costa',
          obrigatoriasConcluidas: 4,
          totalObrigatorias: 4,
          optativasConcluidas: 1,
          progresso: 100
        }
      ],
      emAndamento: [
        {
          matricula: '202511111',
          nome: 'Pedro Oliveira',
          obrigatoriasConcluidas: 3,
          totalObrigatorias: 4,
          optativasConcluidas: 1,
          progresso: 75
        },
        {
          matricula: '202554321',
          nome: 'Maria Santos',
          obrigatoriasConcluidas: 2,
          totalObrigatorias: 4,
          optativasConcluidas: 0,
          progresso: 50
        },
        {
          matricula: '202598765',
          nome: 'Carlos Lima',
          obrigatoriasConcluidas: 3,
          totalObrigatorias: 4,
          optativasConcluidas: 2,
          progresso: 75
        }
      ],
      semOptativas: [
        {
          matricula: '202533333',
          nome: 'João Pereira',
          obrigatoriasConcluidas: 4,
          totalObrigatorias: 4,
          optativasConcluidas: 0,
          progresso: 100
        },
        {
          matricula: '202544444',
          nome: 'Lucia Santos',
          obrigatoriasConcluidas: 2,
          totalObrigatorias: 4,
          optativasConcluidas: 0,
          progresso: 50
        }
      ]
    }
  };

  const handleSearch = () => {
    if (!searchKey.trim()) return;
    
    const foundCurso = cursosMock.find(curso => curso.id === searchKey.trim());
    if (foundCurso) {
      setSelectedCurso(foundCurso);
    } else {
      alert('Curso não encontrado!');
      setSelectedCurso(null);
    }
  };

  const handleDropdownChange = (value: string) => {
    setSearchKey(value);
    if (value.trim()) {
      const foundCurso = cursosMock.find(curso => curso.id === value.trim());
      if (foundCurso) {
        setSelectedCurso(foundCurso);
      }
    } else {
      setSelectedCurso(null);
    }
  };

  const handleVoltar = () => {
    if (userType === 'funcionario') {
      setView('funcionario');
    } else {
      setView('admin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Consulta de Curso</h1>
              <p className="text-gray-600 mt-2">Consulta completa de informações dos cursos</p>
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
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Buscar Curso
          </h2>
          
          {/* Pesquisa por Código */}
          <div className="mb-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  label="Pesquisar por Código"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  placeholder="Digite o código do curso"
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
              <option value="">Escolha um curso...</option>
              {cursosMock.map((curso) => (
                <option key={curso.id} value={curso.id}>
                  {curso.id} - {curso.nome} ({curso.tipo})
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Curso Details */}
        {selectedCurso && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedCurso.nome}
              </h2>
            </div>
            
            {/* Informações Básicas */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Informações Básicas
              </h3>
              <div className="bg-white p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <strong className="text-gray-700 block mb-1">Código:</strong>
                  <p className="text-gray-600 text-lg">{selectedCurso.id}</p>
                </div>
                <div>
                  <strong className="text-gray-700 block mb-1">Nome:</strong>
                  <p className="text-gray-600 text-lg">{selectedCurso.nome}</p>
                </div>
                <div>
                  <strong className="text-gray-700 block mb-1">Departamento:</strong>
                  <p className="text-gray-600 text-lg">
                    {departamentosMock.find(d => d.id === selectedCurso.departamento)?.nome}
                  </p>
                </div>
                <div>
                  <strong className="text-gray-700 block mb-1">Créditos Mínimos:</strong>
                  <p className="text-gray-600 text-lg">{selectedCurso.creditosMinimos}</p>
                </div>
              </div>
            </div>

            {/* Navegação por Abas */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setAbaAtiva('informacoes')}
                    className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                      abaAtiva === 'informacoes'
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}                    >
                    Informações e Grade
                  </button>
                  <button
                    onClick={() => setAbaAtiva('alunos')}
                    className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                      abaAtiva === 'alunos'
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Alunos do Curso ({selectedCurso.alunosAtivos})
                  </button>
                </nav>
              </div>
              
              <div className="p-6">
                {abaAtiva === 'informacoes' && (
                  <div className="space-y-8">
                    {/* Disciplinas */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        Grade Curricular
                      </h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Disciplinas Obrigatórias */}
                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">
                            Disciplinas Obrigatórias ({selectedCurso.disciplinasObrigatorias.length})
                          </h4>
                          <div className="space-y-2">
                            {selectedCurso.disciplinasObrigatorias.map((discId: string) => {
                              const disciplina = disciplinasMock.find(d => d.id === discId);
                              return disciplina ? (
                                <div key={discId} className="bg-green-50 p-3 rounded-lg flex justify-between items-center">
                                  <div>
                                    <p className="font-medium text-green-800">{disciplina.id}</p>
                                    <p className="text-sm text-green-600">{disciplina.nome}</p>
                                  </div>
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                    {disciplina.creditos} créditos
                                  </span>
                                </div>
                              ) : null;
                            })}
                          </div>
                        </div>

                        {/* Disciplinas Optativas */}
                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">
                            Disciplinas Optativas ({selectedCurso.disciplinasOptativas.length})
                          </h4>
                          <div className="space-y-2">
                            {selectedCurso.disciplinasOptativas.map((discId: string) => {
                              const disciplina = disciplinasMock.find(d => d.id === discId);
                              return disciplina ? (
                                <div key={discId} className="bg-blue-50 p-3 rounded-lg flex justify-between items-center">
                                  <div>
                                    <p className="font-medium text-blue-800">{disciplina.id}</p>
                                    <p className="text-sm text-blue-600">{disciplina.nome}</p>
                                  </div>
                                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                    {disciplina.creditos} créditos
                                  </span>
                                </div>
                              ) : null;
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {abaAtiva === 'alunos' && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">Alunos do Curso</h3>
                      <p className="text-sm text-blue-700">
                        Visualize diferentes categorias de alunos matriculados no curso.
                      </p>
                    </div>

                    {/* Estatísticas dos Alunos */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-green-600">
                          {alunosDosCursos[selectedCurso.id]?.prontosParaFormatura?.length || 0}
                        </p>
                        <p className="text-sm text-green-800">Prontos para Formatura</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-blue-600">
                          {alunosDosCursos[selectedCurso.id]?.emAndamento?.length || 0}
                        </p>
                        <p className="text-sm text-blue-800">Em Andamento</p>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-yellow-600">
                          {alunosDosCursos[selectedCurso.id]?.semOptativas?.length || 0}
                        </p>
                        <p className="text-sm text-yellow-800">Sem Optativas</p>
                      </div>
                    </div>

                    {/* Alunos Prontos para Formatura */}
                    <div>
                      <h4 className="text-lg font-semibold text-green-700 mb-4">
                        Alunos Prontos para Formatura
                      </h4>
                      <div className="space-y-3">
                        {alunosDosCursos[selectedCurso.id]?.prontosParaFormatura?.map((aluno: any) => (
                          <div key={aluno.matricula} className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-medium text-green-800">{aluno.nome}</h5>
                                <p className="text-sm text-green-600">Matrícula: {aluno.matricula}</p>
                                <p className="text-sm text-green-600">
                                  Disciplinas Obrigatórias: {aluno.obrigatoriasConcluidas}/{aluno.totalObrigatorias}
                                </p>
                                <p className="text-sm text-green-600">
                                  Disciplinas Optativas: {aluno.optativasConcluidas}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                                  Pronto
                                </span>
                                <div className="mt-2">
                                  <div className="w-24 bg-green-200 rounded-full h-2">
                                    <div className="bg-green-600 h-2 rounded-full w-full"></div>
                                  </div>
                                  <p className="text-xs text-green-700 mt-1">{aluno.progresso}%</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )) || (
                          <p className="text-gray-500 text-center py-8">Nenhum aluno pronto para formatura</p>
                        )}
                      </div>
                    </div>

                    {/* Alunos em Andamento */}
                    <div>
                      <h4 className="text-lg font-semibold text-blue-700 mb-4">
                        Alunos em Andamento
                      </h4>
                      <div className="space-y-3">
                        {alunosDosCursos[selectedCurso.id]?.emAndamento?.map((aluno: any) => (
                          <div key={aluno.matricula} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-medium text-blue-800">{aluno.nome}</h5>
                                <p className="text-sm text-blue-600">Matrícula: {aluno.matricula}</p>
                                <p className="text-sm text-blue-600">
                                  Disciplinas Obrigatórias: {aluno.obrigatoriasConcluidas}/{aluno.totalObrigatorias}
                                </p>
                                <p className="text-sm text-blue-600">
                                  Disciplinas Optativas: {aluno.optativasConcluidas}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                                  Em Andamento
                                </span>
                                <div className="mt-2">
                                  <div className="w-24 bg-blue-200 rounded-full h-2">
                                    <div 
                                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                      style={{ width: `${aluno.progresso}%` }}
                                    ></div>
                                  </div>
                                  <p className="text-xs text-blue-700 mt-1">{aluno.progresso}%</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )) || (
                          <p className="text-gray-500 text-center py-8">Nenhum aluno em andamento</p>
                        )}
                      </div>
                    </div>

                    {/* Alunos sem Optativas */}
                    <div>
                      <h4 className="text-lg font-semibold text-yellow-700 mb-4">
                        Alunos que Não Fizeram Disciplinas Optativas
                      </h4>
                      <div className="space-y-3">
                        {alunosDosCursos[selectedCurso.id]?.semOptativas?.map((aluno: any) => (
                          <div key={aluno.matricula} className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-medium text-yellow-800">{aluno.nome}</h5>
                                <p className="text-sm text-yellow-600">Matrícula: {aluno.matricula}</p>
                                <p className="text-sm text-yellow-600">
                                  Disciplinas Obrigatórias: {aluno.obrigatoriasConcluidas}/{aluno.totalObrigatorias}
                                </p>
                                <p className="text-sm text-yellow-600">
                                  Disciplinas Optativas: {aluno.optativasConcluidas}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
                                  Sem Optativas
                                </span>
                                <div className="mt-2">
                                  <div className="w-24 bg-yellow-200 rounded-full h-2">
                                    <div 
                                      className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
                                      style={{ width: `${aluno.progresso}%` }}
                                    ></div>
                                  </div>
                                  <p className="text-xs text-yellow-700 mt-1">{aluno.progresso}%</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )) || (
                          <p className="text-gray-500 text-center py-8">Todos os alunos cursaram optativas</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Instructions quando não há curso selecionado */}
        {!selectedCurso && (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-6xl mb-4">🎓</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Consulta de Cursos
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Digite o código do curso ou selecione da lista para visualizar informações completas:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">📋</div>
                <div className="text-sm font-medium text-blue-800">Informações Básicas</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">📚</div>
                <div className="text-sm font-medium text-green-800">Grade Curricular</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">�</div>
                <div className="text-sm font-medium text-purple-800">Alunos do Curso</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">�</div>
                <div className="text-sm font-medium text-orange-800">Consulta Detalhada</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CursoConsulta;