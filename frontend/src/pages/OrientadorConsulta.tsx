import React, { useState, useEffect } from 'react';
import type { View } from '../App';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';

interface OrientadorConsultaProps {
  setView: (view: View) => void;
  userType?: 'admin' | 'funcionario';
}

const OrientadorConsulta: React.FC<OrientadorConsultaProps> = ({ setView, userType = 'admin' }) => {
  const [searchKey, setSearchKey] = useState('');
  const [selectedOrientador, setSelectedOrientador] = useState<any>(null);

  useEffect(() => {
    document.title = 'Consulta de Orientador - UniUFC';
  }, []);

  // Lista de orientadores mock
  const orientadoresMock = [
    {
      id: 'PROF001',
      nome: 'Prof. Dr. João Silva',
      departamento: 'Computação',
      email: 'joao.silva@ufc.br',
      telefone: '(85) 3366-7890',
      especialidade: 'Banco de Dados',
      orientandos: [
        {
          matricula: '202612345',
          nome: 'Carlos Eduardo Santos',
          curso: 'Ciência da Computação',
          tipo: 'graduacao',
          tema: 'Otimização de Consultas em Banco de Dados NoSQL',
          status: 'Em Andamento',
          inicio: '2024-03-01',
          previsaoDefesa: '2025-07-15'
        },
        {
          matricula: '202698765',
          nome: 'Marina Oliveira Costa',
          curso: 'Ciência da Computação', 
          tipo: 'graduacao',
          tema: 'Sistemas de Recomendação com Machine Learning',
          status: 'Em Andamento',
          inicio: '2024-08-15',
          previsaoDefesa: '2025-12-20'
        },
        {
          matricula: '202611111',
          nome: 'Rafael Almeida Pereira',
          curso: 'Engenharia de Software',
          tipo: 'pos-graduacao',
          tema: 'Arquiteturas de Microserviços para Sistemas Distribuídos',
          status: 'Qualificação',
          inicio: '2023-03-01',
          previsaoDefesa: '2025-03-15'
        }
      ],
      disciplinasMinistradas: [
        {
          codigo: 'BD001',
          nome: 'Banco de Dados I',
          creditos: 4,
          semestre: '2024.2',
          turma: 'A',
          alunosMatriculados: 35
        },
        {
          codigo: 'BD002', 
          nome: 'Banco de Dados II',
          creditos: 4,
          semestre: '2024.2',
          turma: 'B',
          alunosMatriculados: 28
        },
        {
          codigo: 'SGBD001',
          nome: 'Sistemas Gerenciadores de Banco de Dados',
          creditos: 6,
          semestre: '2024.1',
          turma: 'A',
          alunosMatriculados: 22
        }
      ]
    },
    {
      id: 'PROF002',
      nome: 'Prof. Dra. Maria Santos',
      departamento: 'Computação',
      email: 'maria.santos@ufc.br',
      telefone: '(85) 3366-7891',
      especialidade: 'Engenharia de Software',
      orientandos: [
        {
          matricula: '202622222',
          nome: 'Ana Beatriz Silva',
          curso: 'Engenharia de Software',
          tipo: 'graduacao',
          tema: 'Metodologias Ágeis em Projetos de Software',
          status: 'Em Andamento',
          inicio: '2024-02-15',
          previsaoDefesa: '2025-06-30'
        },
        {
          matricula: '202633333',
          nome: 'Pedro Henrique Lima',
          curso: 'Ciência da Computação',
          tipo: 'pos-graduacao',
          tema: 'DevOps e Integração Contínua em Projetos Ágeis',
          status: 'Defesa Marcada',
          inicio: '2022-08-01',
          previsaoDefesa: '2025-02-20'
        }
      ],
      disciplinasMinistradas: [
        {
          codigo: 'ES001',
          nome: 'Engenharia de Software I',
          creditos: 4,
          semestre: '2024.2',
          turma: 'A',
          alunosMatriculados: 42
        },
        {
          codigo: 'ES002',
          nome: 'Engenharia de Software II', 
          creditos: 4,
          semestre: '2024.1',
          turma: 'B',
          alunosMatriculados: 38
        },
        {
          codigo: 'PROJ001',
          nome: 'Gerência de Projetos de Software',
          creditos: 6,
          semestre: '2024.2',
          turma: 'A',
          alunosMatriculados: 25
        }
      ]
    },
    {
      id: 'PROF003',
      nome: 'Prof. Dr. Carlos Lima',
      departamento: 'Computação',
      email: 'carlos.lima@ufc.br',
      telefone: '(85) 3366-7892',
      especialidade: 'Inteligência Artificial',
      orientandos: [
        {
          matricula: '202644444',
          nome: 'Julia Rodrigues Melo',
          curso: 'Ciência da Computação',
          tipo: 'graduacao',
          tema: 'Redes Neurais Aplicadas ao Reconhecimento de Padrões',
          status: 'Em Andamento',
          inicio: '2024-01-10',
          previsaoDefesa: '2025-05-25'
        }
      ],
      disciplinasMinistradas: [
        {
          codigo: 'IA001',
          nome: 'Inteligência Artificial',
          creditos: 6,
          semestre: '2024.2',
          turma: 'A',
          alunosMatriculados: 30
        },
        {
          codigo: 'ML001',
          nome: 'Machine Learning',
          creditos: 4,
          semestre: '2024.1',
          turma: 'A',
          alunosMatriculados: 26
        }
      ]
    }
  ];

  const handleSearch = () => {
    if (!searchKey.trim()) return;
    
    const foundOrientador = orientadoresMock.find(orientador => 
      orientador.id === searchKey.trim() || 
      orientador.nome.toLowerCase().includes(searchKey.toLowerCase())
    );
    
    if (foundOrientador) {
      setSelectedOrientador(foundOrientador);
    } else {
      alert('Orientador não encontrado!');
      setSelectedOrientador(null);
    }
  };

  const handleDropdownChange = (value: string) => {
    setSearchKey(value);
    if (value.trim()) {
      const foundOrientador = orientadoresMock.find(orientador => orientador.id === value.trim());
      if (foundOrientador) {
        setSelectedOrientador(foundOrientador);
      }
    } else {
      setSelectedOrientador(null);
    }
  };

  const getTotalCreditos = (disciplinas: any[]) => {
    return disciplinas.reduce((total, disc) => total + disc.creditos, 0);
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
              <h1 className="text-3xl font-bold text-gray-900">Consulta de Orientador</h1>
              <p className="text-gray-600 mt-2">Consulta completa de orientadores, orientandos e disciplinas</p>
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
            Buscar Orientador
          </h2>
          
          {/* Pesquisa por ID ou Nome */}
          <div className="mb-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  label="Pesquisar por ID ou Nome"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  placeholder="Digite o ID (ex: PROF001) ou nome do orientador"
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
              <option value="">Escolha um orientador...</option>
              {orientadoresMock.map((orientador) => (
                <option key={orientador.id} value={orientador.id}>
                  {orientador.id} - {orientador.nome}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Orientador Dashboard */}
        {selectedOrientador && (
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Informações do Orientador - {selectedOrientador.nome}
            </h2>
            
            {/* Dados do Orientador - APENAS NOME E ID */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Dados do Orientador
              </h3>
              <div className="bg-white p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <strong className="text-gray-700 block mb-1">ID:</strong>
                  <p className="text-gray-600 text-lg">{selectedOrientador.id}</p>
                </div>
                <div>
                  <strong className="text-gray-700 block mb-1">Nome:</strong>
                  <p className="text-gray-600 text-lg">{selectedOrientador.nome}</p>
                </div>
              </div>
            </div>

            {/* Alunos Orientandos - INFORMAÇÕES BÁSICAS APENAS */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Alunos Orientandos ({selectedOrientador.orientandos.length})
              </h3>
              <div className="bg-white p-6 rounded-lg">
                {selectedOrientador.orientandos.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 font-semibold text-gray-700">Matrícula</th>
                          <th className="text-left py-3 font-semibold text-gray-700">Nome</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrientador.orientandos.map((orientando: any, idx: number) => (
                          <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 font-medium text-blue-600">{orientando.matricula}</td>
                            <td className="py-3">{orientando.nome}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Este orientador não possui orientandos</p>
                )}
              </div>
            </div>

            {/* Disciplinas Ministradas - INFORMAÇÕES BÁSICAS APENAS */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Disciplinas Ministradas - Total: {getTotalCreditos(selectedOrientador.disciplinasMinistradas)} créditos
              </h3>
              <div className="bg-white p-6 rounded-lg">
                {selectedOrientador.disciplinasMinistradas.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 font-semibold text-gray-700">Nome da Disciplina</th>
                          <th className="text-center py-3 font-semibold text-gray-700">Créditos</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrientador.disciplinasMinistradas.map((disciplina: any, idx: number) => (
                          <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3">{disciplina.nome}</td>
                            <td className="py-3 text-center">
                              <span className="font-medium text-blue-600">{disciplina.creditos}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Este orientador não ministra disciplinas</p>
                )}
              </div>
            </div>

          </div>
        )}

        {/* Instructions quando não há orientador selecionado */}
        {!selectedOrientador && (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-6xl mb-4">👨‍🏫</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Consulta de Orientadores
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Digite o ID ou nome do orientador para visualizar informações básicas:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">👥</div>
                <div className="text-sm font-medium text-blue-800">Alunos Orientados</div>
                <div className="text-xs text-blue-600">Nome e matrícula</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">📚</div>
                <div className="text-sm font-medium text-green-800">Disciplinas Ministradas</div>
                <div className="text-xs text-green-600">Nome e créditos</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrientadorConsulta;