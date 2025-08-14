import React, { useState, useEffect } from 'react';
import type { View } from '../App';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';

interface DepartamentoConsultaProps {
  setView: (view: View) => void;
}

const DepartamentoConsulta: React.FC<DepartamentoConsultaProps> = ({ setView }) => {
  const [searchKey, setSearchKey] = useState('');
  const [selectedDepartamento, setSelectedDepartamento] = useState<any>(null);

  useEffect(() => {
    document.title = 'Consulta de Departamento - UniUFC';
  }, []);

  // Dados mock dos departamentos
  const departamentosMock = [
    {
      id: 'COMP',
      nome: 'Departamento de Computação',
      coordenador: 'Prof. Dr. João Silva',
      telefone: '(85) 3366-9000',
      email: 'comp@ufc.br',
      localizacao: 'Bloco 910 - Campus do Pici',
      anoFundacao: 1995,
      cursos: ['CC001', 'ES002', 'SI003', 'RC004'],
      professores: ['PROF001', 'PROF002', 'PROF003'],
      disciplinas: ['BD001', 'IA001', 'ES001', 'PROG2', 'EST001'],
      areasPesquisa: [
        'Inteligência Artificial',
        'Banco de Dados',
        'Engenharia de Software',
        'Redes de Computadores',
        'Sistemas Distribuídos'
      ]
    },
    {
      id: 'MAT',
      nome: 'Departamento de Matemática',
      coordenador: 'Prof. Dr. Carlos Oliveira',
      telefone: '(85) 3366-9100',
      email: 'mat@ufc.br',
      localizacao: 'Bloco 914 - Campus do Pici',
      anoFundacao: 1955,
      cursos: ['MAT001', 'EST002'],
      professores: ['PROF004', 'PROF005'],
      disciplinas: ['MAT101', 'EST101', 'CAL001'],
      areasPesquisa: [
        'Análise Matemática',
        'Álgebra',
        'Estatística Aplicada',
        'Matemática Computacional'
      ]
    },
    {
      id: 'FIS',
      nome: 'Departamento de Física',
      coordenador: 'Prof. Dr. Ana Ferreira',
      telefone: '(85) 3366-9200',
      email: 'fis@ufc.br',
      localizacao: 'Bloco 922 - Campus do Pici',
      anoFundacao: 1960,
      cursos: ['FIS001'],
      professores: ['PROF006', 'PROF007'],
      disciplinas: ['FIS101', 'FIS201', 'LAB001'],
      areasPesquisa: [
        'Física Teórica',
        'Física Experimental',
        'Física da Matéria Condensada',
        'Astrofísica'
      ]
    }
  ];

  // Dados mock dos cursos
  const cursosMock = [
    { id: 'CC001', nome: 'Ciência da Computação', tipo: 'Bacharelado' },
    { id: 'ES002', nome: 'Engenharia de Software', tipo: 'Bacharelado' },
    { id: 'SI003', nome: 'Sistemas de Informação', tipo: 'Bacharelado' },
    { id: 'RC004', nome: 'Redes de Computadores', tipo: 'Tecnólogo' },
    { id: 'MAT001', nome: 'Matemática', tipo: 'Licenciatura' },
    { id: 'EST002', nome: 'Estatística', tipo: 'Bacharelado' },
    { id: 'FIS001', nome: 'Física', tipo: 'Licenciatura' }
  ];

  // Dados mock dos professores
  const professoresMock = [
    { id: 'PROF001', nome: 'Prof. Dr. João Silva' },
    { id: 'PROF002', nome: 'Prof. Dr. Carlos Lima' },
    { id: 'PROF003', nome: 'Profa. Dra. Maria Santos' },
    { id: 'PROF004', nome: 'Prof. Dr. Pedro Costa' },
    { id: 'PROF005', nome: 'Profa. Dra. Laura Alves' },
    { id: 'PROF006', nome: 'Prof. Dr. Roberto Nunes' },
    { id: 'PROF007', nome: 'Profa. Dra. Carla Mendes' }
  ];

  const handleSearch = () => {
    if (!searchKey.trim()) return;
    
    const foundDepartamento = departamentosMock.find(dept => dept.id === searchKey.trim());
    if (foundDepartamento) {
      setSelectedDepartamento(foundDepartamento);
    } else {
      alert('Departamento não encontrado!');
      setSelectedDepartamento(null);
    }
  };

  const handleDropdownChange = (value: string) => {
    setSearchKey(value);
    if (value.trim()) {
      const foundDepartamento = departamentosMock.find(dept => dept.id === value.trim());
      if (foundDepartamento) {
        setSelectedDepartamento(foundDepartamento);
      }
    } else {
      setSelectedDepartamento(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Consulta de Departamento</h1>
              <p className="text-gray-600 mt-2">Consulta completa de informações dos departamentos</p>
            </div>
            <Button
              onClick={() => setView('admin')}
              variant="secondary"
              size="sm"
              className="w-auto"
            >
              ← Voltar ao Admin
            </Button>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            🔍 Buscar Departamento
          </h2>
          
          {/* Pesquisa por Código */}
          <div className="mb-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  label="Pesquisar por Código"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  placeholder="Digite o código do departamento"
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
              <option value="">Escolha um departamento...</option>
              {departamentosMock.map((departamento) => (
                <option key={departamento.id} value={departamento.id}>
                  {departamento.id} - {departamento.nome}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Departamento Details */}
        {selectedDepartamento && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              🏢 Informações do Departamento - {selectedDepartamento.nome}
            </h2>
            
            {/* Dados Gerais */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                📋 Dados Gerais
              </h3>
              <div className="bg-white p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <strong className="text-gray-700 block mb-1">Código:</strong>
                  <p className="text-gray-600 text-lg">{selectedDepartamento.id}</p>
                </div>
                <div>
                  <strong className="text-gray-700 block mb-1">Nome:</strong>
                  <p className="text-gray-600 text-lg">{selectedDepartamento.nome}</p>
                </div>
                
              </div>
            </div>

            {/* Cursos Oferecidos */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                🎓 Cursos Oferecidos
              </h3>
              <div className="bg-white p-6 rounded-lg">
                {selectedDepartamento.cursos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedDepartamento.cursos.map((cursoId: string) => {
                      const curso = cursosMock.find(c => c.id === cursoId);
                      return curso ? (
                        <div key={cursoId} className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="text-purple-600 mr-2">🎓</span>
                              <div>
                                <p className="font-semibold text-purple-800">{curso.id}</p>
                                <p className="text-purple-600">{curso.nome}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Nenhum curso associado</p>
                )}
              </div>
            </div>

            {/* Professores */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                👨‍🏫 Corpo Docente
              </h3>
              <div className="bg-white p-6 rounded-lg">
                {selectedDepartamento.professores.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedDepartamento.professores.map((profId: string) => {
                      const professor = professoresMock.find(p => p.id === profId);
                      return professor ? (
                        <div key={profId} className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-center">
                            <span className="text-blue-600 mr-2">👨‍🏫</span>
                            <div>
                              <p className="text-sm font-medium text-blue-800">{professor.id}</p>
                              <p className="text-blue-600">{professor.nome}</p>
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Nenhum professor associado</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Instructions quando não há departamento selecionado */}
        {!selectedDepartamento && (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-6xl mb-4">🏢</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Consulta de Departamentos
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Digite o código do departamento ou selecione da lista para visualizar:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">📋</div>
                <div className="text-sm font-medium text-blue-800">Dados Gerais</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">🎓</div>
                <div className="text-sm font-medium text-green-800">Cursos Oferecidos</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">👨‍🏫</div>
                <div className="text-sm font-medium text-purple-800">Corpo Docente</div>
              </div>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartamentoConsulta;