import React, { useEffect, useState } from 'react';
import type { View } from '../App';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import TextArea from '../components/TextArea';

interface AdminDashboardProps {
  setView: (view: View) => void;
}

type EntityType = 'departamento' | 'curso' | 'disciplina' | 'professor' | 'aluno' | 'orientador' | 'funcionario';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setView }) => {
  const [selectedEntity, setSelectedEntity] = useState<EntityType | null>(null);
  const [action, setAction] = useState<'add' | 'edit' | 'remove' | 'consult' | null>(null);
  const [telefones, setTelefones] = useState([{ numero: '', descricao: '' }]);
  const [emails, setEmails] = useState(['']);
  const [disciplinasSelecionadas, setDisciplinasSelecionadas] = useState<string[]>([]);
  const [cursosVinculados, setCursosVinculados] = useState<string[]>([]);
  const [preRequisitos, setPreRequisitos] = useState<string[]>([]);
  const [alunosOrientados, setAlunosOrientados] = useState<string[]>([]);
  const [searchKey, setSearchKey] = useState('');
  const [selectedEntityData, setSelectedEntityData] = useState<any>(null);

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

  // Primary keys para cada entidade
  const primaryKeys = {
    departamento: 'Código do Departamento',
    curso: 'Código do Curso', 
    disciplina: 'Código da Disciplina',
    professor: 'SIAPE',
    aluno: 'Matrícula',
    orientador: 'ID da Orientação',
    funcionario: 'ID do Funcionário'
  };

  // Dados mock para demonstração na remoção e edição
  const entidadesMock = {
    departamento: [
      { id: 'COMP', nome: 'Departamento de Computação', cursos: ['CC001', 'ES002', 'SI003'] },
      { id: 'ENG', nome: 'Departamento de Engenharia', cursos: ['EC001', 'EM002'] },
      { id: 'ADM', nome: 'Departamento de Administração', cursos: ['ADM001'] }
    ],
    curso: [
      { id: 'CC001', nome: 'Ciência da Computação', creditosMinimos: '200', departamento: 'COMP' },
      { id: 'ES002', nome: 'Engenharia de Software', creditosMinimos: '220', departamento: 'COMP' },
      { id: 'SI003', nome: 'Sistemas de Informação', creditosMinimos: '180', departamento: 'COMP' }
    ],
    disciplina: [
      { id: 'BD001', nome: 'Banco de Dados I', ementa: 'Introdução aos conceitos de banco de dados', creditos: '4', tipo: 'obrigatoria', preRequisitos: [], curso: 'CC001' },
      { id: 'ES001', nome: 'Engenharia de Software I', ementa: 'Princípios da engenharia de software', creditos: '4', tipo: 'obrigatoria', preRequisitos: [], curso: 'ES002' },
      { id: 'IA001', nome: 'Inteligência Artificial', ementa: 'Fundamentos de IA e machine learning', creditos: '4', tipo: 'optativa', preRequisitos: ['BD001'], curso: 'CC001' }
    ],
    professor: [
      { id: '12345', nome: 'Prof. Dr. João Silva', dataNascimento: '1975-03-15', dataIngresso: '2005-08-20', emails: ['joao@ufc.br'], telefones: [{ numero: '(85) 99999-9999', descricao: 'Celular' }], departamento: 'COMP', disciplinas: ['BD001'] },
      { id: '67890', nome: 'Profa. Dra. Maria Santos', dataNascimento: '1980-07-22', dataIngresso: '2010-03-10', emails: ['maria@ufc.br'], telefones: [{ numero: '(85) 88888-8888', descricao: 'Celular' }], departamento: 'COMP', disciplinas: ['ES001'] },
      { id: '11111', nome: 'Prof. Dr. Carlos Lima', dataNascimento: '1970-12-05', dataIngresso: '2000-01-15', emails: ['carlos@ufc.br'], telefones: [{ numero: '(85) 77777-7777', descricao: 'Celular' }], departamento: 'COMP', disciplinas: ['IA001'] }
    ],
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
        telefones: [{ numero: '(85) 99999-3333', descricao: 'Celular' }],
        disciplinasMatriculadas: [
          { codigo: 'BD002', nome: 'Banco de Dados II', creditos: 4, periodo: '2025.1' }
        ],
        disciplinasConcluidas: [
          { codigo: 'BD001', nome: 'Banco de Dados I', creditos: 4, nota: 9.5, periodo: '2024.2' },
          { codigo: 'IA001', nome: 'Inteligência Artificial', creditos: 4, nota: 8.8, periodo: '2024.2' }
        ]
      }
    ],
    orientador: [
      { id: 'OR001', professorOrientador: '12345', alunosOrientados: ['202511111'], areaPesquisa: 'Banco de Dados' },
      { id: 'OR002', professorOrientador: '67890', alunosOrientados: ['202567890'], areaPesquisa: 'Engenharia de Software' }
    ],
    funcionario: [
      { id: 'FUNC001', nome: 'João Funcionário', login: 'joao.func', senha: '****', departamento: 'COMP', cargo: 'Funcionário Administrativo' },
      { id: 'FUNC002', nome: 'Maria Funcionária', login: 'maria.func', senha: '****', departamento: 'ENG', cargo: 'Secretária' },
      { id: 'FUNC003', nome: 'Carlos Admin', login: 'carlos.admin', senha: '****', departamento: 'ADM', cargo: 'Assistente' }
    ]
  };

  useEffect(() => {
    document.title = 'Painel Administrativo - UniUFC';
  }, []);

  const entities = {
    departamento: {
      title: 'Departamentos',
      icon: '🏢',
      description: 'Gerenciar departamentos da universidade',
      fields: ['Código', 'Nome']
    },
    curso: {
      title: 'Cursos',
      icon: '📚',
      description: 'Gerenciar cursos por departamento',
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
      description: 'Gerenciar dados dos professores',
      fields: ['SIAPE', 'Nome completo', 'Senha', 'Data nascimento', 'Data ingresso', 'Departamento']
    },
    aluno: {
      title: 'Alunos',
      icon: '🎓',
      description: 'Gerenciar dados dos alunos',
      fields: ['Matrícula', 'Nome', 'Senha', 'Rua', 'Número', 'Bairro', 'CEP', 'Cidade', 'Estado', 'Curso', 'Tipo (Graduação/Pós)']
    },
    orientador: {
      title: 'Orientações',
      icon: '👥',
      description: 'Gerenciar orientações de pós-graduação',
      fields: ['Professor orientador', 'Alunos orientados']
    },
    funcionario: {
      title: 'Funcionários',
      icon: '👨‍💼',
      description: 'Gerenciar funcionários da universidade',
      fields: ['ID do Funcionário', 'Nome completo', 'Login', 'Senha', 'Departamento', 'Cargo']
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
        case 'departamento':
          setView('departamento-consulta');
          return;
        default:
          // Para entidades sem página específica, continuar com comportamento normal
          break;
      }
    }
    
    setAction(selectedAction);
    setSearchKey('');
    setSelectedEntityData(null);
    
    // Reset de todos os estados quando iniciar uma nova ação
    if (selectedAction === 'add' || selectedAction === 'edit') {
      setTelefones([{ numero: '', descricao: '' }]);
      setEmails(['']);
      setDisciplinasSelecionadas([]);
      setCursosVinculados([]);
      setPreRequisitos([]);
      setAlunosOrientados([]);
    }
  };

  const handleSearch = () => {
    if (!selectedEntity || !searchKey.trim()) return;
    
    const foundEntity = entidadesMock[selectedEntity]?.find(item => item.id === searchKey.trim());
    if (foundEntity) {
      setSelectedEntityData(foundEntity);
      
      // Carregar dados específicos da entidade para edição
      if (selectedEntity === 'aluno' && 'telefones' in foundEntity) {
        setTelefones(foundEntity.telefones || [{ numero: '', descricao: '' }]);
      }
      if (selectedEntity === 'professor') {
        if ('telefones' in foundEntity) {
          setTelefones(foundEntity.telefones || [{ numero: '', descricao: '' }]);
        }
        if ('emails' in foundEntity) {
          setEmails(foundEntity.emails || ['']);
        }
        if ('disciplinas' in foundEntity) {
          setDisciplinasSelecionadas(foundEntity.disciplinas || []);
        }
      }
      if (selectedEntity === 'departamento' && 'cursos' in foundEntity) {
        setCursosVinculados(foundEntity.cursos || []);
      }
      if (selectedEntity === 'disciplina' && 'preRequisitos' in foundEntity) {
        setPreRequisitos(foundEntity.preRequisitos || []);
      }
      if (selectedEntity === 'orientador' && 'alunosOrientados' in foundEntity) {
        setAlunosOrientados(foundEntity.alunosOrientados || []);
      }
    } else {
      alert('Entidade não encontrada!');
      setSelectedEntityData(null);
    }
  };

  const handleDropdownChange = (value: string) => {
    setSearchKey(value);
    if (value.trim()) {
      const foundEntity = entidadesMock[selectedEntity!]?.find(item => item.id === value.trim());
      if (foundEntity) {
        setSelectedEntityData(foundEntity);
        
        // Carregar dados específicos da entidade para edição
        if (selectedEntity === 'aluno' && 'telefones' in foundEntity) {
          setTelefones(foundEntity.telefones || [{ numero: '', descricao: '' }]);
        }
        if (selectedEntity === 'professor') {
          if ('telefones' in foundEntity) {
            setTelefones(foundEntity.telefones || [{ numero: '', descricao: '' }]);
          }
          if ('emails' in foundEntity) {
            setEmails(foundEntity.emails || ['']);
          }
          if ('disciplinas' in foundEntity) {
            setDisciplinasSelecionadas(foundEntity.disciplinas || []);
          }
        }
        if (selectedEntity === 'departamento' && 'cursos' in foundEntity) {
          setCursosVinculados(foundEntity.cursos || []);
        }
        if (selectedEntity === 'disciplina' && 'preRequisitos' in foundEntity) {
          setPreRequisitos(foundEntity.preRequisitos || []);
        }
        if (selectedEntity === 'orientador' && 'alunosOrientados' in foundEntity) {
          setAlunosOrientados(foundEntity.alunosOrientados || []);
        }
      }
    } else {
      setSelectedEntityData(null);
    }
  };

  const getEntityDisplayName = (item: any, entityType: EntityType) => {
    switch (entityType) {
      case 'orientador':
        return `${item.id} - Orientação: ${item.areaPesquisa}`;
      default:
        return `${item.id} - ${item.nome}`;
    }
  };

  const adicionarTelefone = () => {
    setTelefones([...telefones, { numero: '', descricao: '' }]);
  };

  const removerTelefone = (index: number) => {
    if (telefones.length > 1) {
      setTelefones(telefones.filter((_, i) => i !== index));
    }
  };

  const atualizarTelefone = (index: number, campo: 'numero' | 'descricao', valor: string) => {
    const novosTelefones = telefones.map((tel, i) => 
      i === index ? { ...tel, [campo]: valor } : tel
    );
    setTelefones(novosTelefones);
  };

  // Funções para gerenciar emails
  const adicionarEmail = () => {
    setEmails([...emails, '']);
  };

  const removerEmail = (index: number) => {
    if (emails.length > 1) {
      setEmails(emails.filter((_, i) => i !== index));
    }
  };

  const atualizarEmail = (index: number, valor: string) => {
    const novosEmails = emails.map((email, i) => 
      i === index ? valor : email
    );
    setEmails(novosEmails);
  };

  // Funções para gerenciar disciplinas
  const toggleDisciplina = (disciplinaId: string) => {
    if (disciplinasSelecionadas.includes(disciplinaId)) {
      setDisciplinasSelecionadas(disciplinasSelecionadas.filter(id => id !== disciplinaId));
    } else {
      setDisciplinasSelecionadas([...disciplinasSelecionadas, disciplinaId]);
    }
  };

  // Funções para gerenciar cursos vinculados
  const toggleCurso = (cursoId: string) => {
    if (cursosVinculados.includes(cursoId)) {
      setCursosVinculados(cursosVinculados.filter(id => id !== cursoId));
    } else {
      setCursosVinculados([...cursosVinculados, cursoId]);
    }
  };

  // Funções para gerenciar pré-requisitos
  const togglePreRequisito = (disciplinaId: string) => {
    if (preRequisitos.includes(disciplinaId)) {
      setPreRequisitos(preRequisitos.filter(id => id !== disciplinaId));
    } else {
      setPreRequisitos([...preRequisitos, disciplinaId]);
    }
  };

  // Funções para gerenciar alunos orientados
  const toggleAlunoOrientado = (alunoId: string) => {
    if (alunosOrientados.includes(alunoId)) {
      setAlunosOrientados(alunosOrientados.filter(id => id !== alunoId));
    } else {
      setAlunosOrientados([...alunosOrientados, alunoId]);
    }
  };

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
          </div>
        </Card>
      ))}
    </div>
  );

  const renderEntityDetail = () => {
    if (!selectedEntity) return null;
    
    const entity = entities[selectedEntity];
    
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{entity.icon}</span>
            <h2 className="text-2xl font-bold text-gray-800">{entity.title}</h2>
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

        {/* Action Form */}
        {action && renderActionForm()}
      </div>
    );
  };

  const renderActionForm = () => {
    if (!selectedEntity || !action) return null;

    const entity = entities[selectedEntity];
    const actionLabels = {
      add: 'Adicionar',
      edit: 'Editar',
      remove: 'Remover',
      consult: 'Consultar'
    };

    return (
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          {actionLabels[action]} {entity.title}
        </h3>
        
        {action === 'remove' ? (
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-red-800 mb-4">
              Selecionar {entity.title.slice(0, -1)} para Remover
            </h4>
            
            {/* Pesquisa por Primary Key */}
            <div className="mb-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label={`Pesquisar por ${primaryKeys[selectedEntity]}`}
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                    placeholder={`Digite o ${primaryKeys[selectedEntity].toLowerCase()}`}
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
                label={`Ou selecione pelo ${primaryKeys[selectedEntity]}`}
                value={searchKey}
                onChange={(e) => handleDropdownChange(e.target.value)}
              >
                <option value="">Escolha uma opção...</option>
                {entidadesMock[selectedEntity]?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {getEntityDisplayName(item, selectedEntity)}
                  </option>
                ))}
              </Select>
            </div>

            {/* Dados da entidade encontrada */}
            {selectedEntityData && (
              <div className="mb-4 p-3 bg-white rounded border">
                <h5 className="font-semibold text-gray-800 mb-2">Entidade encontrada:</h5>
                <p className="text-sm text-gray-600">
                  <strong>ID:</strong> {selectedEntityData.id} <br />
                  <strong>Nome:</strong> {selectedEntityData.nome || selectedEntityData.areaPesquisa}
                </p>
              </div>
            )}

            <p className="text-red-700 mb-4">Atenção: Esta ação não pode ser desfeita!</p>
            <div className="flex gap-3">
              <Button 
                variant="danger" 
                className="w-auto"
                disabled={!selectedEntityData}
              >
                Confirmar Remoção
              </Button>
              <Button 
                onClick={() => setAction(null)}
                variant="secondary"
                className="w-auto"
              >
                Cancelar
              </Button>
            </div>
          </div>
        ) : action === 'edit' ? (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-blue-800 mb-4">
              Selecionar {entity.title.slice(0, -1)} para Editar
            </h4>
            
            {/* Pesquisa por Primary Key */}
            <div className="mb-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label={`Pesquisar por ${primaryKeys[selectedEntity]}`}
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                    placeholder={`Digite o ${primaryKeys[selectedEntity].toLowerCase()}`}
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
                label={`Ou selecione pelo ${primaryKeys[selectedEntity]}`}
                value={searchKey}
                onChange={(e) => handleDropdownChange(e.target.value)}
              >
                <option value="">Escolha uma opção...</option>
                {entidadesMock[selectedEntity]?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {getEntityDisplayName(item, selectedEntity)}
                  </option>
                ))}
              </Select>
            </div>

            {/* Formulário de Edição */}
            {selectedEntityData && (
              <div className="border-t pt-4">
                <h5 className="font-semibold text-gray-800 mb-4">Editando: {selectedEntityData.nome || selectedEntityData.areaPesquisa}</h5>
                <form className="space-y-4">
                  {entity.fields.map((field, index) => (
                    <div key={index}>
                      {field.includes('Ementa') ? (
                        <TextArea
                          label={field}
                          value={selectedEntityData.ementa || ''}
                          placeholder={`Digite ${field.toLowerCase()}`}
                        />
                      ) : field.includes('Data') ? (
                        <Input
                          type="date"
                          label={field}
                          value={field.includes('Nascimento') ? selectedEntityData.dataNascimento : selectedEntityData.dataIngresso || ''}
                        />
                      ) : field === 'Curso' && selectedEntity === 'aluno' ? (
                        <Select label={field} value={selectedEntityData.curso || ''}>
                          <option value="">Selecione um curso...</option>
                          {cursosDisponiveis.map((curso) => (
                            <option key={curso.id} value={curso.id}>
                              {curso.nome} - {curso.departamento}
                            </option>
                          ))}
                        </Select>
                      ) : field.includes('Tipo') ? (
                        <Select label={field} value={selectedEntityData.tipo || ''}>
                          <option value="">Selecione...</option>
                          {selectedEntity === 'disciplina' && (
                            <>
                              <option value="obrigatoria">Obrigatória</option>
                              <option value="optativa">Optativa</option>
                            </>
                          )}
                          {selectedEntity === 'aluno' && (
                            <>
                              <option value="graduacao">Graduação</option>
                              <option value="pos-graduacao">Pós-graduação</option>
                            </>
                          )}
                        </Select>
                      ) : field === 'Estado' ? (
                        <Select label={field} value={selectedEntityData.estado || ''}>
                          <option value="">Selecione o estado...</option>
                          <option value="AC">Acre</option>
                          <option value="AL">Alagoas</option>
                          <option value="AP">Amapá</option>
                          <option value="AM">Amazonas</option>
                          <option value="BA">Bahia</option>
                          <option value="CE">Ceará</option>
                          <option value="DF">Distrito Federal</option>
                          <option value="ES">Espírito Santo</option>
                          <option value="GO">Goiás</option>
                          <option value="MA">Maranhão</option>
                          <option value="MT">Mato Grosso</option>
                          <option value="MS">Mato Grosso do Sul</option>
                          <option value="MG">Minas Gerais</option>
                          <option value="PA">Pará</option>
                          <option value="PB">Paraíba</option>
                          <option value="PR">Paraná</option>
                          <option value="PE">Pernambuco</option>
                          <option value="PI">Piauí</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="RN">Rio Grande do Norte</option>
                          <option value="RS">Rio Grande do Sul</option>
                          <option value="RO">Rondônia</option>
                          <option value="RR">Roraima</option>
                          <option value="SC">Santa Catarina</option>
                          <option value="SP">São Paulo</option>
                          <option value="SE">Sergipe</option>
                          <option value="TO">Tocantins</option>
                        </Select>
                      ) : field === 'CEP' ? (
                        <Input
                          type="text"
                          label={field}
                          value={selectedEntityData.cep || ''}
                          placeholder="00000-000"
                          maxLength={9}
                        />
                      ) : field === 'Senha' ? (
                        <Input
                          type="password"
                          label={field}
                          value=""
                          placeholder="Digite a nova senha (deixe em branco para manter a atual)"
                        />
                      ) : (
                        <Input
                          type="text"
                          label={field}
                          value={
                            field === 'Matrícula' || field === 'Código' || field === 'SIAPE' ? selectedEntityData.id :
                            field === 'Nome' || field === 'Nome completo' ? selectedEntityData.nome :
                            field === 'Rua' ? selectedEntityData.rua :
                            field === 'Número' ? selectedEntityData.numero :
                            field === 'Bairro' ? selectedEntityData.bairro :
                            field === 'Cidade' ? selectedEntityData.cidade :
                            field === 'Créditos mínimos' ? selectedEntityData.creditosMinimos :
                            field === 'Créditos' ? selectedEntityData.creditos :
                            field === 'Departamento' ? selectedEntityData.departamento :
                            field === 'Pré-requisitos' ? selectedEntityData.preRequisitos?.join(', ') :
                            field === 'Professor orientador' ? selectedEntityData.professorOrientador :
                            field === 'Alunos orientados' ? selectedEntityData.alunosOrientados?.join(', ') :
                            field === 'Área de pesquisa' ? selectedEntityData.areaPesquisa :
                            field === 'Cursos vinculados' ? selectedEntityData.cursos?.join(', ') :
                            ''
                          }
                          placeholder={`Digite ${field.toLowerCase()}`}
                        />
                      )}
                    </div>
                  ))}

                  {/* Seções especiais para cada tipo de entidade */}
                  
                  {/* Telefones para alunos e professores */}
                  {(selectedEntity === 'aluno' || selectedEntity === 'professor') && (
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-md font-semibold text-gray-700">Telefones</h4>
                        <Button
                          type="button"
                          size="sm"
                          variant="success"
                          onClick={adicionarTelefone}
                          className="w-auto"
                        >
                          Adicionar Telefone
                        </Button>
                      </div>
                      {telefones.map((telefone, index) => (
                        <div key={index} className="flex gap-3 items-end mb-3">
                          <div className="flex-1">
                            <Input
                              type="text"
                              label="Número"
                              value={telefone.numero}
                              onChange={(e) => atualizarTelefone(index, 'numero', e.target.value)}
                              placeholder="(85) 99999-9999"
                            />
                          </div>
                          <div className="flex-1">
                            <Input
                              type="text"
                              label="Descrição"
                              value={telefone.descricao}
                              onChange={(e) => atualizarTelefone(index, 'descricao', e.target.value)}
                              placeholder="Ex: Celular, Casa, Trabalho"
                            />
                          </div>
                          {telefones.length > 1 && (
                            <Button
                              type="button"
                              size="sm"
                              variant="danger"
                              onClick={() => removerTelefone(index)}
                              className="w-auto mb-2"
                            >
                              Remover
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* E-mails para professores */}
                  {selectedEntity === 'professor' && (
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-md font-semibold text-gray-700">E-mails</h4>
                        <Button
                          type="button"
                          size="sm"
                          variant="success"
                          onClick={adicionarEmail}
                          className="w-auto"
                        >
                          Adicionar E-mail
                        </Button>
                      </div>
                      {emails.map((email, index) => (
                        <div key={index} className="flex gap-3 items-end mb-3">
                          <div className="flex-1">
                            <Input
                              type="email"
                              label={`E-mail ${index + 1}`}
                              value={email}
                              onChange={(e) => atualizarEmail(index, e.target.value)}
                              placeholder="usuario@email.com"
                            />
                          </div>
                          {emails.length > 1 && (
                            <Button
                              type="button"
                              size="sm"
                              variant="danger"
                              onClick={() => removerEmail(index)}
                              className="w-auto mb-2"
                            >
                              Remover
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Disciplinas para professores */}
                  {selectedEntity === 'professor' && (
                    <div className="border-t pt-4">
                      <h4 className="text-md font-semibold text-gray-700 mb-3">Disciplinas que Ministra</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {entidadesMock.disciplina.map((disciplina) => (
                          <label key={disciplina.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={disciplinasSelecionadas.includes(disciplina.id)}
                              onChange={() => toggleDisciplina(disciplina.id)}
                              className="rounded border-gray-300"
                            />
                            <span className="text-sm">{disciplina.id} - {disciplina.nome}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cursos vinculados para departamentos */}
                  {selectedEntity === 'departamento' && (
                    <div className="border-t pt-4">
                      <h4 className="text-md font-semibold text-gray-700 mb-3">Cursos Vinculados</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {entidadesMock.curso.map((curso) => (
                          <label key={curso.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={cursosVinculados.includes(curso.id)}
                              onChange={() => toggleCurso(curso.id)}
                              className="rounded border-gray-300"
                            />
                            <span className="text-sm">{curso.id} - {curso.nome}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pré-requisitos para disciplinas */}
                  {selectedEntity === 'disciplina' && (
                    <div className="border-t pt-4">
                      <h4 className="text-md font-semibold text-gray-700 mb-3">Pré-requisitos</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {entidadesMock.disciplina.map((disciplina) => (
                          <label key={disciplina.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={preRequisitos.includes(disciplina.id)}
                              onChange={() => togglePreRequisito(disciplina.id)}
                              className="rounded border-gray-300"
                            />
                            <span className="text-sm">{disciplina.id} - {disciplina.nome}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Alunos orientados para orientadores */}
                  {selectedEntity === 'orientador' && (
                    <div className="border-t pt-4">
                      <h4 className="text-md font-semibold text-gray-700 mb-3">Alunos Orientados</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {entidadesMock.aluno.filter(aluno => aluno.tipo === 'pos-graduacao').map((aluno) => (
                          <label key={aluno.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={alunosOrientados.includes(aluno.id)}
                              onChange={() => toggleAlunoOrientado(aluno.id)}
                              className="rounded border-gray-300"
                            />
                            <span className="text-sm">{aluno.id} - {aluno.nome}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                    >
                      Salvar Alterações
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setAction(null)}
                      variant="secondary"
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ) : action === 'consult' ? (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Consulta de {entity.title}
            </h4>
            
            {/* Verificar se tem página especializada */}
            {(selectedEntity === 'aluno' || selectedEntity === 'disciplina' || selectedEntity === 'orientador' || selectedEntity === 'curso') ? (
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-blue-800 font-medium mb-2">
                  Esta entidade possui uma página de consulta especializada!
                </p>
                <p className="text-blue-700 text-sm">
                  Para consultas detalhadas de {entity.title.toLowerCase()}, utilize as páginas especializadas disponíveis na seção "Páginas de Consulta Especializadas" abaixo.
                </p>
              </div>
            ) : (
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <p className="text-green-800 font-medium mb-2">
                  Interface de Consulta Genérica
                </p>
                <p className="text-green-700 text-sm mb-4">
                  Use os campos abaixo para buscar e visualizar dados de {entity.title.toLowerCase()}.
                </p>
                
                {/* Formulário de consulta genérica */}
                <div className="bg-white p-4 rounded-lg">
                  <div className="mb-4">
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <Input
                          label={`Pesquisar por ${primaryKeys[selectedEntity]}`}
                          value={searchKey}
                          onChange={(e) => setSearchKey(e.target.value)}
                          placeholder={`Digite o ${primaryKeys[selectedEntity].toLowerCase()}`}
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
                      label={`Ou selecione pelo ${primaryKeys[selectedEntity]}`}
                      value={searchKey}
                      onChange={(e) => handleDropdownChange(e.target.value)}
                    >
                      <option value="">Escolha uma opção...</option>
                      {entidadesMock[selectedEntity]?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {getEntityDisplayName(item, selectedEntity)}
                        </option>
                      ))}
                    </Select>
                  </div>

                  {/* Dados da entidade encontrada */}
                  {selectedEntityData && (
                    <div className="mt-4 p-4 bg-gray-50 rounded border">
                      <h5 className="font-semibold text-gray-800 mb-3">Dados Encontrados:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <strong className="text-gray-700">ID:</strong>
                          <p className="text-gray-600">{selectedEntityData.id}</p>
                        </div>
                        <div>
                          <strong className="text-gray-700">Nome:</strong>
                          <p className="text-gray-600">{selectedEntityData.nome || selectedEntityData.areaPesquisa || 'N/A'}</p>
                        </div>
                        {selectedEntityData.departamento && (
                          <div>
                            <strong className="text-gray-700">Departamento:</strong>
                            <p className="text-gray-600">{selectedEntityData.departamento}</p>
                          </div>
                        )}
                        {selectedEntityData.creditosMinimos && (
                          <div>
                            <strong className="text-gray-700">Créditos Mínimos:</strong>
                            <p className="text-gray-600">{selectedEntityData.creditosMinimos}</p>
                          </div>
                        )}
                        {selectedEntityData.creditos && (
                          <div>
                            <strong className="text-gray-700">Créditos:</strong>
                            <p className="text-gray-600">{selectedEntityData.creditos}</p>
                          </div>
                        )}
                        {selectedEntityData.emails && (
                          <div>
                            <strong className="text-gray-700">E-mails:</strong>
                            <p className="text-gray-600">{selectedEntityData.emails.join(', ')}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <Button
              onClick={() => setAction(null)}
              variant="secondary"
              className="w-auto"
            >
              Voltar
            </Button>
          </div>
        ) : (
          <form className="space-y-4">
            {selectedEntity === 'orientador' ? (
              <>
                {/* Campos específicos para orientador */}
                <div>
                  <Select label="Professor orientador">
                    <option value="">Selecione um professor...</option>
                    {entidadesMock.professor.map((prof) => (
                      <option key={prof.id} value={prof.id}>
                        {prof.id} - {prof.nome}
                      </option>
                    ))}
                  </Select>
                </div>
                
                {/* Seção de alunos orientados */}
                <div className="border-t pt-4">
                  <h4 className="text-md font-semibold text-gray-700 mb-3">Alunos a serem Orientados</h4>
                  <p className="text-sm text-gray-600 mb-3">Selecione os alunos de pós-graduação que serão orientados:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {entidadesMock.aluno.filter(aluno => aluno.tipo === 'pos-graduacao').map((aluno) => (
                      <label key={aluno.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={alunosOrientados.includes(aluno.id)}
                          onChange={() => toggleAlunoOrientado(aluno.id)}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{aluno.id} - {aluno.nome}</span>
                      </label>
                    ))}
                  </div>
                  {entidadesMock.aluno.filter(aluno => aluno.tipo === 'pos-graduacao').length === 0 && (
                    <p className="text-sm text-gray-500 italic">Nenhum aluno de pós-graduação disponível</p>
                  )}
                </div>
              </>
            ) : selectedEntity === 'funcionario' ? (
              <>
                {/* Campos específicos para funcionário */}
                {entity.fields.map((field, index) => (
                  <div key={index}>
                    {field === 'Departamento' ? (
                      <Select label={field}>
                        <option value="">Selecione um departamento...</option>
                        {entidadesMock.departamento.map((dept) => (
                          <option key={dept.id} value={dept.id}>
                            {dept.id} - {dept.nome}
                          </option>
                        ))}
                      </Select>
                    ) : field === 'Cargo' ? (
                      <Select label={field}>
                        <option value="">Selecione um cargo...</option>
                        <option value="Funcionário Administrativo">Funcionário Administrativo</option>
                        <option value="Secretária">Secretária</option>
                        <option value="Assistente">Assistente</option>
                        <option value="Coordenador">Coordenador</option>
                        <option value="Gerente">Gerente</option>
                      </Select>
                    ) : field === 'Senha' ? (
                      <Input
                        type="password"
                        label={field}
                        placeholder="Digite a senha para o funcionário"
                        required
                      />
                    ) : (
                      <Input
                        type="text"
                        label={field}
                        placeholder={`Digite ${field.toLowerCase()}`}
                        required={field !== 'ID do Funcionário'}
                      />
                    )}
                  </div>
                ))}
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Informações Importantes:</h4>
                  <ul className="text-sm text-blue-700 list-disc list-inside">
                    <li>O funcionário poderá acessar apenas dados do departamento selecionado</li>
                    <li>Login deve ser único no sistema</li>
                    <li>Senha deve ter pelo menos 6 caracteres</li>
                    <li>O funcionário terá acesso ao Painel do Funcionário</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                {/* Campos padrão para outras entidades */}
                {entity.fields.map((field, index) => (
                  <div key={index}>
                    {field.includes('Ementa') ? (
                      <TextArea
                        label={field}
                        placeholder={`Digite ${field.toLowerCase()}`}
                      />
                    ) : field.includes('Data') ? (
                      <Input
                        type="date"
                        label={field}
                      />
                    ) : field.includes('Tipo') ? (
                      <Select label={field}>
                        <option value="">Selecione...</option>
                        {selectedEntity === 'disciplina' && (
                          <>
                            <option value="obrigatoria">Obrigatória</option>
                            <option value="optativa">Optativa</option>
                          </>
                        )}
                        {selectedEntity === 'aluno' && (
                          <>
                            <option value="graduacao">Graduação</option>
                            <option value="pos-graduacao">Pós-graduação</option>
                          </>
                        )}
                      </Select>
                    ) : field === 'Curso' && selectedEntity === 'aluno' ? (
                      <Select label={field}>
                        <option value="">Selecione um curso...</option>
                        {cursosDisponiveis.map((curso) => (
                          <option key={curso.id} value={curso.id}>
                            {curso.nome} - {curso.departamento}
                          </option>
                        ))}
                      </Select>
                    ) : field === 'Departamento' && selectedEntity === 'professor' ? (
                      <Select label={field}>
                        <option value="">Selecione um departamento...</option>
                        {entidadesMock.departamento.map((dept) => (
                          <option key={dept.id} value={dept.id}>
                            {dept.id} - {dept.nome}
                          </option>
                        ))}
                      </Select>
                    ) : field === 'Departamento' && selectedEntity === 'curso' ? (
                      <Select label={field}>
                        <option value="">Selecione um departamento...</option>
                        {entidadesMock.departamento.map((dept) => (
                          <option key={dept.id} value={dept.id}>
                            {dept.id} - {dept.nome}
                          </option>
                        ))}
                      </Select>
                    ) : field === 'Curso' && selectedEntity === 'disciplina' ? (
                      <Select label={field}>
                        <option value="">Selecione um curso...</option>
                        {entidadesMock.curso.map((curso) => (
                          <option key={curso.id} value={curso.id}>
                            {curso.id} - {curso.nome}
                          </option>
                        ))}
                      </Select>
                    ) : field === 'CEP' ? (
                      <Input
                        type="text"
                        label={field}
                        placeholder="00000-000"
                        maxLength={9}
                      />
                    ) : field === 'Estado' ? (
                      <Select label={field}>
                        <option value="">Selecione o estado...</option>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                      </Select>
                    ) : field === 'Senha' ? (
                      <Input
                        type="password"
                        label={field}
                        placeholder="Digite a senha"
                        required
                      />
                    ) : (
                      <Input
                        type="text"
                        label={field}
                        placeholder={`Digite ${field.toLowerCase()}`}
                      />
                    )}
                  </div>
                ))}

                {/* Seções especiais para cada tipo de entidade */}
                
                {/* Telefones para alunos e professores */}
                {(selectedEntity === 'aluno' || selectedEntity === 'professor') && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-md font-semibold text-gray-700">Telefones</h4>
                      <Button
                        type="button"
                        size="sm"
                        variant="success"
                        onClick={adicionarTelefone}
                        className="w-auto"
                      >
                        Adicionar Telefone
                      </Button>
                    </div>
                    {telefones.map((telefone, index) => (
                      <div key={index} className="flex gap-3 items-end mb-3">
                        <div className="flex-1">
                          <Input
                            type="text"
                            label="Número"
                            value={telefone.numero}
                            onChange={(e) => atualizarTelefone(index, 'numero', e.target.value)}
                            placeholder="(85) 99999-9999"
                          />
                        </div>
                        <div className="flex-1">
                          <Input
                            type="text"
                            label="Descrição"
                            value={telefone.descricao}
                            onChange={(e) => atualizarTelefone(index, 'descricao', e.target.value)}
                            placeholder="Ex: Celular, Casa, Trabalho"
                          />
                        </div>                      {telefones.length > 1 && (
                            <Button
                              type="button"
                              size="sm"
                              variant="danger"
                              onClick={() => removerTelefone(index)}
                              className="w-auto mb-2"
                            >
                              Remover
                            </Button>
                          )}
                      </div>
                    ))}
                  </div>
                )}

                {/* E-mails para professores */}
                {selectedEntity === 'professor' && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-md font-semibold text-gray-700">E-mails</h4>
                      <Button
                        type="button"
                        size="sm"
                        variant="success"
                        onClick={adicionarEmail}
                        className="w-auto"
                      >
                        Adicionar E-mail
                      </Button>
                    </div>
                    {emails.map((email, index) => (
                      <div key={index} className="flex gap-3 items-end mb-3">
                        <div className="flex-1">
                          <Input
                            type="email"
                            label={`E-mail ${index + 1}`}
                            value={email}
                            onChange={(e) => atualizarEmail(index, e.target.value)}
                            placeholder="usuario@email.com"
                          />
                        </div>
                        {emails.length > 1 && (
                          <Button
                            type="button"
                            size="sm"
                            variant="danger"
                            onClick={() => removerEmail(index)}
                            className="w-auto mb-2"
                          >
                            Remover
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Disciplinas para professores */}
                {selectedEntity === 'professor' && (
                  <div className="border-t pt-4">
                    <h4 className="text-md font-semibold text-gray-700 mb-3">Disciplinas que Ministra</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {entidadesMock.disciplina.map((disciplina) => (
                        <label key={disciplina.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={disciplinasSelecionadas.includes(disciplina.id)}
                            onChange={() => toggleDisciplina(disciplina.id)}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">{disciplina.id} - {disciplina.nome}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cursos vinculados para departamentos */}
                {selectedEntity === 'departamento' && (
                  <div className="border-t pt-4">
                    <h4 className="text-md font-semibold text-gray-700 mb-3">Cursos Vinculados</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {entidadesMock.curso.map((curso) => (
                        <label key={curso.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={cursosVinculados.includes(curso.id)}
                            onChange={() => toggleCurso(curso.id)}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">{curso.id} - {curso.nome}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pré-requisitos para disciplinas */}
                {selectedEntity === 'disciplina' && (
                  <div className="border-t pt-4">
                    <h4 className="text-md font-semibold text-gray-700 mb-3">Pré-requisitos</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {entidadesMock.disciplina.map((disciplina) => (
                        <label key={disciplina.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={preRequisitos.includes(disciplina.id)}
                            onChange={() => togglePreRequisito(disciplina.id)}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">{disciplina.id} - {disciplina.nome}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
            
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                variant="primary"
              >
                {actionLabels[action]}
              </Button>
              <Button
                type="button"
                onClick={() => setAction(null)}
                variant="secondary"
              >
                Cancelar
              </Button>
            </div>
          </form>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
              <p className="text-gray-600 mt-2">Gerenciamento completo das entidades da universidade</p>
            </div>
          </div>
        </div>

        {/* Content */}
        {selectedEntity ? renderEntityDetail() : renderEntityGrid()}

        {/* Quick Stats */}
        {!selectedEntity && (
          <>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-gray-600">Departamentos</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-2xl font-bold text-green-600">45</div>
                <div className="text-sm text-gray-600">Cursos</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-2xl font-bold text-purple-600">320</div>
                <div className="text-sm text-gray-600">Disciplinas</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-2xl font-bold text-orange-600">2,847</div>
                <div className="text-sm text-gray-600">Usuários</div>
              </div>
            </div>

            {/* Páginas de Consulta Disponíveis */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                🔍 Páginas de Consulta Especializadas
              </h2>
              <p className="text-gray-600 mb-6">
                Acesse consultas detalhadas e especializadas para cada tipo de entidade:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div 
                  onClick={() => setView('disciplina-consulta')}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-300 cursor-pointer transition-all duration-200 hover:shadow-md"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">📖</div>
                    <h3 className="font-semibold text-gray-800 mb-1">Consulta de Disciplinas</h3>
                    <p className="text-xs text-gray-600">Informações básicas e alunos matriculados</p>
                  </div>
                </div>

                <div 
                  onClick={() => setView('orientador-consulta')}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-teal-300 cursor-pointer transition-all duration-200 hover:shadow-md"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">👥</div>
                    <h3 className="font-semibold text-gray-800 mb-1">Consulta Orientador</h3>
                    <p className="text-xs text-gray-600">Orientadores e seus orientandos</p>
                  </div>
                </div>

                <div 
                  onClick={() => setView('aluno-consulta')}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-orange-300 cursor-pointer transition-all duration-200 hover:shadow-md"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">📊</div>
                    <h3 className="font-semibold text-gray-800 mb-1">Consulta de Aluno</h3>
                    <p className="text-xs text-gray-600">Histórico acadêmico completo</p>
                  </div>
                </div>

                <div 
                  onClick={() => setView('curso-consulta')}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-green-300 cursor-pointer transition-all duration-200 hover:shadow-md"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">📚</div>
                    <h3 className="font-semibold text-gray-800 mb-1">Consulta de Cursos</h3>
                    <p className="text-xs text-gray-600">Grade curricular e informações</p>
                  </div>
                </div>

                <div 
                  onClick={() => setView('professor-consulta')}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-300 cursor-pointer transition-all duration-200 hover:shadow-md"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">👨‍🏫</div>
                    <h3 className="font-semibold text-gray-800 mb-1">Consulta de Professores</h3>
                    <p className="text-xs text-gray-600">Dados e disciplinas ministradas</p>
                  </div>
                </div>

                <div 
                  onClick={() => setView('departamento-consulta')}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-pink-300 cursor-pointer transition-all duration-200 hover:shadow-md"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">🏢</div>
                    <h3 className="font-semibold text-gray-800 mb-1">Consulta de Departamentos</h3>
                    <p className="text-xs text-gray-600">Cursos e professores vinculados</p>
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

export default AdminDashboard;