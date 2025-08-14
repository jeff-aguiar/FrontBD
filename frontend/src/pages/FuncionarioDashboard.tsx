import React, { useEffect, useState } from 'react';
import type { View } from '../App';
import Card from '../components/Card';
import Button from '../components/Button';

interface FuncionarioDashboardProps {
  setView: (view: View) => void;
}

type EntityType = 'departamento' | 'curso' | 'disciplina' | 'professor' | 'aluno' | 'orientador';

const FuncionarioDashboard: React.FC<FuncionarioDashboardProps> = ({ setView }) => {
  const [selectedEntity, setSelectedEntity] = useState<EntityType | null>(null);
  const [action, setAction] = useState<'add' | 'edit' | 'remove' | 'consult' | null>(null);

  // Departamento do funcionário logado (simulado)
  const funcionarioDepartamento = 'COMP'; // Em produção, viria do contexto/autenticação

  useEffect(() => {
    document.title = 'Painel do Funcionário - UniUFC';
  }, []);

  // Lista de cursos disponíveis (filtrados por departamento)
  const cursosDisponiveis = [
    { id: '1', nome: 'Ciência da Computação', departamento: 'COMP' },
    { id: '2', nome: 'Engenharia de Software', departamento: 'COMP' },
    { id: '3', nome: 'Sistemas de Informação', departamento: 'COMP' },
    { id: '4', nome: 'Redes de Computadores', departamento: 'COMP' },
  ].filter(curso => curso.departamento === funcionarioDepartamento);

  // Dados mock filtrados por departamento
  const entidadesMock: any = {
    departamento: [
      { id: 'COMP', nome: 'Departamento de Computação', cursos: ['CC001', 'ES002', 'SI003'] }
    ].filter(dept => dept.id === funcionarioDepartamento),
    curso: [
      { id: 'CC001', nome: 'Ciência da Computação', creditosMinimos: '200', departamento: 'COMP' },
      { id: 'ES002', nome: 'Engenharia de Software', creditosMinimos: '220', departamento: 'COMP' },
      { id: 'SI003', nome: 'Sistemas de Informação', creditosMinimos: '180', departamento: 'COMP' }
    ].filter(curso => curso.departamento === funcionarioDepartamento),
    disciplina: [
      { id: 'BD001', nome: 'Banco de Dados I', ementa: 'Introdução aos conceitos de banco de dados', creditos: '4', tipo: 'obrigatoria', preRequisitos: [], curso: 'CC001' },
      { id: 'ES001', nome: 'Engenharia de Software I', ementa: 'Princípios da engenharia de software', creditos: '4', tipo: 'obrigatoria', preRequisitos: [], curso: 'ES002' },
      { id: 'IA001', nome: 'Inteligência Artificial', ementa: 'Fundamentos de IA e machine learning', creditos: '4', tipo: 'optativa', preRequisitos: ['BD001'], curso: 'CC001' }
    ].filter(disc => cursosDisponiveis.some(curso => curso.id === disc.curso)),
    professor: [
      { id: '12345', nome: 'Prof. Dr. João Silva', dataNascimento: '1975-03-15', dataIngresso: '2005-08-20', emails: ['joao@ufc.br'], telefones: [{ numero: '(85) 99999-9999', descricao: 'Celular' }], departamento: 'COMP', disciplinas: ['BD001'] },
      { id: '67890', nome: 'Profa. Dra. Maria Santos', dataNascimento: '1980-07-22', dataIngresso: '2010-03-10', emails: ['maria@ufc.br'], telefones: [{ numero: '(85) 88888-8888', descricao: 'Celular' }], departamento: 'COMP', disciplinas: ['ES001'] },
      { id: '11111', nome: 'Prof. Dr. Carlos Lima', dataNascimento: '1970-12-05', dataIngresso: '2000-01-15', emails: ['carlos@ufc.br'], telefones: [{ numero: '(85) 77777-7777', descricao: 'Celular' }], departamento: 'COMP', disciplinas: ['IA001'] }
    ].filter(prof => prof.departamento === funcionarioDepartamento),
    aluno: [
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
        telefones: [{ numero: '(85) 99999-1111', descricao: 'Celular' }],
        disciplinasMatriculadas: [
          { codigo: 'BD001', nome: 'Banco de Dados I', creditos: 4, periodo: '2025.1' },
          { codigo: 'IA001', nome: 'Inteligência Artificial', creditos: 4, periodo: '2025.1' }
        ],
        disciplinasConcluidas: [
          { codigo: 'PROG1', nome: 'Programação I', creditos: 4, nota: 8.5, periodo: '2024.1' },
          { codigo: 'PROG2', nome: 'Programação II', creditos: 4, nota: 9.0, periodo: '2024.2' },
          { codigo: 'EST001', nome: 'Estrutura de Dados', creditos: 4, nota: 7.8, periodo: '2024.2' }
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
        telefones: [{ numero: '(85) 99999-2222', descricao: 'Celular' }],
        disciplinasMatriculadas: [
          { codigo: 'ES001', nome: 'Engenharia de Software I', creditos: 4, periodo: '2025.1' }
        ],
        disciplinasConcluidas: [
          { codigo: 'PROG1', nome: 'Programação I', creditos: 4, nota: 9.2, periodo: '2024.1' },
          { codigo: 'MAT001', nome: 'Matemática Discreta', creditos: 4, nota: 8.0, periodo: '2024.2' }
        ]
      }
    ].filter(aluno => cursosDisponiveis.some(curso => curso.id === aluno.curso)),
    orientador: [
      { id: 'OR001', professorOrientador: '12345', alunosOrientados: ['202511111'], areaPesquisa: 'Banco de Dados' },
      { id: 'OR002', professorOrientador: '67890', alunosOrientados: ['202567890'], areaPesquisa: 'Engenharia de Software' }
    ].filter((orient: any) => {
      // Filtrar orientadores que tenham professores do departamento
      const professoresDepartamento = ['12345', '67890', '11111']; // IDs dos professores de COMP
      return professoresDepartamento.includes(orient.professorOrientador);
    })
  };

  const entities = {
    departamento: {
      title: 'Departamento',
      icon: '🏢',
      description: 'Gerenciar seu departamento',
      fields: ['Código', 'Nome']
    },
    curso: {
      title: 'Cursos',
      icon: '📚',
      description: 'Gerenciar cursos do departamento',
      fields: ['Código', 'Nome', 'Créditos mínimos', 'Departamento']
    },
    disciplina: {
      title: 'Disciplinas',
      icon: '📖',
      description: 'Gerenciar disciplinas dos cursos',
      fields: ['Código', 'Nome', 'Ementa', 'Créditos', 'Tipo (Obrigatória/Optativa)', 'Curso']
    },
    professor: {
      title: 'Professores',
      icon: '👨‍🏫',
      description: 'Gerenciar professores do departamento',
      fields: ['SIAPE', 'Nome completo', 'Senha', 'Data nascimento', 'Data ingresso', 'Departamento']
    },
    aluno: {
      title: 'Alunos',
      icon: '🎓',
      description: 'Gerenciar alunos dos cursos',
      fields: ['Matrícula', 'Nome', 'Senha', 'Rua', 'Número', 'Bairro', 'CEP', 'Cidade', 'Estado', 'Curso', 'Tipo (Graduação/Pós)']
    },
    orientador: {
      title: 'Orientações',
      icon: '👥',
      description: 'Gerenciar orientações do departamento',
      fields: ['Professor orientador', 'Alunos orientados']
    }
  };

  const handleEntitySelect = (entity: EntityType) => {
    setSelectedEntity(entity);
    setAction(null);
  };

  const handleActionSelect = (selectedAction: 'add' | 'edit' | 'remove' | 'consult') => {
    // Redirecionamentos para páginas de consulta específicas
    if (selectedAction === 'consult') {
      switch (selectedEntity) {
        case 'aluno':
          setView('aluno-consulta');
          return;
        case 'disciplina':
          setView('disciplina-consulta');
          return;
        case 'orientador':
          setView('orientador-consulta');
          return;
        case 'curso':
          setView('curso-consulta');
          return;
        case 'professor':
          setView('professor-consulta');
          return;
        default:
          break;
      }
    }
    
    setAction(selectedAction);
  };

  // ...existing functions from AdminDashboard (handleSearch, handleDropdownChange, etc.)...

  const renderEntityGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(entities).map(([key, entity]) => (
        <Card
          key={key}
          onClick={() => handleEntitySelect(key as EntityType)}
          className="border border-gray-200 hover:border-blue-300"
        >
          <div className="text-center">
            <div className="text-4xl mb-3">{entity.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{entity.title}</h3>
            <p className="text-gray-600 text-sm">{entity.description}</p>
            {key === 'departamento' && (
              <div className="mt-2">
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  Departamento: {funcionarioDepartamento}
                </span>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Painel do Funcionário</h1>
              <p className="text-gray-600 mt-2">
                Gerenciamento do Departamento de {funcionarioDepartamento === 'COMP' ? 'Computação' : funcionarioDepartamento}
              </p>
            </div>
            <Button
              onClick={() => setView('login')}
              variant="secondary"
              size="sm"
              className="w-auto"
            >
              ← Voltar ao Login
            </Button>
          </div>
        </div>

        {/* Content */}
        {selectedEntity ? (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <span className="text-3xl mr-3">{entities[selectedEntity].icon}</span>
                <h2 className="text-2xl font-bold text-gray-800">{entities[selectedEntity].title}</h2>
              </div>
              <button
                onClick={() => setSelectedEntity(null)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                X
              </button>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Button
                onClick={() => handleActionSelect('add')}
                variant="success"
              >
                Adicionar
              </Button>
              <Button
                onClick={() => handleActionSelect('edit')}
                variant="primary"
              >
                Editar
              </Button>
              <Button
                onClick={() => handleActionSelect('remove')}
                variant="danger"
              >
                Remover
              </Button>
              <Button
                onClick={() => handleActionSelect('consult')}
                variant="secondary"
              >
                Consultar
              </Button>
            </div>

            {/* Mensagem de restrição para departamento */}
            {selectedEntity === 'departamento' && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
                <p className="text-yellow-800">
                  <strong>Acesso Restrito:</strong> Você pode gerenciar apenas o Departamento de Computação.
                </p>
              </div>
            )}

            {/* Placeholder para formulários - reutilizar do AdminDashboard */}
            {action && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  {action === 'add' ? 'Adicionar' : action === 'edit' ? 'Editar' : action === 'remove' ? 'Remover' : 'Consultar'} {entities[selectedEntity].title}
                </h3>
                <p className="text-gray-600">
                  Funcionalidade em desenvolvimento para funcionários do departamento.
                </p>
              </div>
            )}
          </div>
        ) : (
          renderEntityGrid()
        )}

        {/* Quick Stats do Departamento */}
        {!selectedEntity && (
          <>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-2xl font-bold text-blue-600">{entidadesMock.curso.length}</div>
                <div className="text-sm text-gray-600">Cursos</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-2xl font-bold text-green-600">{entidadesMock.disciplina.length}</div>
                <div className="text-sm text-gray-600">Disciplinas</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-2xl font-bold text-purple-600">{entidadesMock.professor.length}</div>
                <div className="text-sm text-gray-600">Professores</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-2xl font-bold text-orange-600">{entidadesMock.aluno.length}</div>
                <div className="text-sm text-gray-600">Alunos</div>
              </div>
            </div>

            {/* Páginas de Consulta Disponíveis */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                🔍 Consultas Especializadas - Departamento de Computação
              </h2>
              <p className="text-gray-600 mb-6">
                Acesse consultas detalhadas das entidades do seu departamento:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div 
                  onClick={() => setView('disciplina-consulta')}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-300 cursor-pointer transition-all duration-200 hover:shadow-md"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">📖</div>
                    <h3 className="font-semibold text-gray-800 mb-1">Disciplinas</h3>
                    <p className="text-xs text-gray-600">Do departamento</p>
                  </div>
                </div>

                <div 
                  onClick={() => setView('professor-consulta')}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-300 cursor-pointer transition-all duration-200 hover:shadow-md"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">👨‍🏫</div>
                    <h3 className="font-semibold text-gray-800 mb-1">Professores</h3>
                    <p className="text-xs text-gray-600">Do departamento</p>
                  </div>
                </div>

                <div 
                  onClick={() => setView('aluno-consulta')}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-orange-300 cursor-pointer transition-all duration-200 hover:shadow-md"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">📊</div>
                    <h3 className="font-semibold text-gray-800 mb-1">Alunos</h3>
                    <p className="text-xs text-gray-600">Dos cursos</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Logout Button */}
        <div className="mt-12 text-center">
          <Button
            size='sm'
            onClick={() => setView('login')}
            variant="danger"
            className="w-auto inline-flex items-center"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FuncionarioDashboard;