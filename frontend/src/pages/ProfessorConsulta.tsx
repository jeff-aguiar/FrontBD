import React, { useState, useEffect } from 'react';
import type { View } from '../App';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';

interface ProfessorConsultaProps {
  setView: (view: View) => void;
  userType?: 'admin' | 'funcionario';
}

const ProfessorConsulta: React.FC<ProfessorConsultaProps> = ({ setView, userType = 'admin' }) => {
  const [searchKey, setSearchKey] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState<any>(null);

  useEffect(() => {
    document.title = 'Consulta de Professor - UniUFC';
  }, []);

  // Dados mock dos professores
  const professoresMock = [
    {
      id: 'PROF001',
      nome: 'Prof. Dr. João Silva',
      dataNascimento: '1975-03-15',
      dataIngresso: '2005-08-20',
      departamento: 'COMP',
      emails: ['joao.silva@ufc.br', 'joao.pesquisa@gmail.com'],
      telefones: [
        { numero: '(85) 3366-1234', descricao: 'Gabinete' },
        { numero: '(85) 99999-1111', descricao: 'Celular' }
      ],
      disciplinas: ['BD001', 'PROG2'],
      titulacao: 'Doutorado em Ciência da Computação',
      areaEspecializacao: 'Banco de Dados e Sistemas Distribuídos'
    },
    {
      id: 'PROF002',
      nome: 'Prof. Dr. Carlos Lima',
      dataNascimento: '1978-11-22',
      dataIngresso: '2008-02-10',
      departamento: 'COMP',
      emails: ['carlos.lima@ufc.br'],
      telefones: [
        { numero: '(85) 3366-5678', descricao: 'Gabinete' }
      ],
      disciplinas: ['IA001', 'EST001'],
      titulacao: 'Doutorado em Inteligência Artificial',
      areaEspecializacao: 'Machine Learning e Processamento de Linguagem Natural'
    },
    {
      id: 'PROF003',
      nome: 'Profa. Dra. Maria Santos',
      dataNascimento: '1980-07-08',
      dataIngresso: '2010-03-15',
      departamento: 'COMP',
      emails: ['maria.santos@ufc.br', 'maria.engsoft@outlook.com'],
      telefones: [
        { numero: '(85) 3366-9012', descricao: 'Gabinete' },
        { numero: '(85) 98888-2222', descricao: 'Celular' }
      ],
      disciplinas: ['ES001'],
      titulacao: 'Doutorado em Engenharia de Software',
      areaEspecializacao: 'Arquitetura de Software e DevOps'
    }
  ];

  // Dados mock das disciplinas
  const disciplinasMock = [
    { id: 'BD001', nome: 'Banco de Dados I' },
    { id: 'PROG2', nome: 'Programação II' },
    { id: 'IA001', nome: 'Inteligência Artificial' },
    { id: 'EST001', nome: 'Estrutura de Dados' },
    { id: 'ES001', nome: 'Engenharia de Software I' }
  ];

  // Dados mock dos departamentos
  const departamentosMock = [
    { id: 'COMP', nome: 'Departamento de Computação' },
    { id: 'MAT', nome: 'Departamento de Matemática' },
    { id: 'FIS', nome: 'Departamento de Física' }
  ];

  const handleSearch = () => {
    if (!searchKey.trim()) return;
    
    const foundProfessor = professoresMock.find(prof => prof.id === searchKey.trim());
    if (foundProfessor) {
      setSelectedProfessor(foundProfessor);
    } else {
      alert('Professor não encontrado!');
      setSelectedProfessor(null);
    }
  };

  const handleDropdownChange = (value: string) => {
    setSearchKey(value);
    if (value.trim()) {
      const foundProfessor = professoresMock.find(prof => prof.id === value.trim());
      if (foundProfessor) {
        setSelectedProfessor(foundProfessor);
      }
    } else {
      setSelectedProfessor(null);
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
              <h1 className="text-3xl font-bold text-gray-900">Consulta de Professor</h1>
              <p className="text-gray-600 mt-2">Consulta completa de informações dos professores</p>
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
            🔍 Buscar Professor
          </h2>
          
          {/* Pesquisa por SIAPE */}
          <div className="mb-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  label="Pesquisar por SIAPE"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  placeholder="Digite o SIAPE do professor"
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
                  🔍 Buscar
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
              <option value="">Escolha um professor...</option>
              {professoresMock.map((professor) => (
                <option key={professor.id} value={professor.id}>
                  {professor.id} - {professor.nome}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Professor Details */}
        {selectedProfessor && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              👨‍🏫 Informações do Professor - {selectedProfessor.nome}
            </h2>
            
            {/* Dados Pessoais */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                👤 Dados Pessoais
              </h3>
              <div className="bg-white p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <strong className="text-gray-700 block mb-1">SIAPE:</strong>
                  <p className="text-gray-600 text-lg">{selectedProfessor.id}</p>
                </div>
                <div>
                  <strong className="text-gray-700 block mb-1">Nome Completo:</strong>
                  <p className="text-gray-600 text-lg">{selectedProfessor.nome}</p>
                </div>
                <div>
                  <strong className="text-gray-700 block mb-1">Data de Nascimento:</strong>
                  <p className="text-gray-600 text-lg">
                    {new Date(selectedProfessor.dataNascimento).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <strong className="text-gray-700 block mb-1">Data de Ingresso:</strong>
                  <p className="text-gray-600 text-lg">
                    {new Date(selectedProfessor.dataIngresso).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <strong className="text-gray-700 block mb-1">Departamento:</strong>
                  <p className="text-gray-600 text-lg">
                    {departamentosMock.find(d => d.id === selectedProfessor.departamento)?.nome || 'Não encontrado'}
                  </p>
                </div>
                <div>
                  <strong className="text-gray-700 block mb-1">Titulação:</strong>
                  <p className="text-gray-600 text-lg">{selectedProfessor.titulacao}</p>
                </div>
              </div>
            </div>

            {/* Área de Especialização */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                🎯 Área de Especialização
              </h3>
              <div className="bg-white p-6 rounded-lg">
                <p className="text-gray-600 text-lg">{selectedProfessor.areaEspecializacao}</p>
              </div>
            </div>

            {/* Contatos */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                📱 Informações de Contato
              </h3>
              <div className="bg-white p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* E-mails */}
                <div>
                  <strong className="text-gray-700 block mb-3">E-mails:</strong>
                  <div className="space-y-2">
                    {selectedProfessor.emails.map((email: string, idx: number) => (
                      <div key={idx} className="bg-blue-50 p-3 rounded-lg flex items-center">
                        <span className="text-blue-600 mr-2">📧</span>
                        <span className="text-gray-700">{email}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Telefones */}
                <div>
                  <strong className="text-gray-700 block mb-3">Telefones:</strong>
                  <div className="space-y-2">
                    {selectedProfessor.telefones.map((telefone: any, idx: number) => (
                      <div key={idx} className="bg-green-50 p-3 rounded-lg flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-green-600 mr-2">
                            {telefone.descricao === 'Celular' ? '📱' : '📞'}
                          </span>
                          <span className="text-gray-700">{telefone.numero}</span>
                        </div>
                        <span className="text-sm text-green-600">{telefone.descricao}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Disciplinas que Ministra */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                📚 Disciplinas que Ministra
              </h3>
              <div className="bg-white p-6 rounded-lg">
                {selectedProfessor.disciplinas.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProfessor.disciplinas.map((discId: string) => {
                      const disciplina = disciplinasMock.find(d => d.id === discId);
                      return disciplina ? (
                        <div key={discId} className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                          <div className="flex items-center">
                            <span className="text-purple-600 mr-2">📖</span>
                            <div>
                              <p className="font-semibold text-purple-800">{disciplina.id}</p>
                              <p className="text-purple-600">{disciplina.nome}</p>
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Nenhuma disciplina associada</p>
                )}
              </div>
            </div>

            {/* Estatísticas */}
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                📊 Estatísticas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedProfessor.disciplinas.length}</div>
                  <div className="text-sm text-blue-800">Disciplinas</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{selectedProfessor.emails.length}</div>
                  <div className="text-sm text-green-800">E-mails</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {new Date().getFullYear() - new Date(selectedProfessor.dataIngresso).getFullYear()}
                  </div>
                  <div className="text-sm text-purple-800">Anos na UFC</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions quando não há professor selecionado */}
        {!selectedProfessor && (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-6xl mb-4">👨‍🏫</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Consulta de Professores
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Digite o SIAPE do professor ou selecione da lista para visualizar:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">👤</div>
                <div className="text-sm font-medium text-blue-800">Dados Pessoais</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">📱</div>
                <div className="text-sm font-medium text-green-800">Informações de Contato</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">📚</div>
                <div className="text-sm font-medium text-purple-800">Disciplinas</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">📊</div>
                <div className="text-sm font-medium text-orange-800">Estatísticas</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessorConsulta;