// filepath: c:\Users\Jeff\Desktop\projeto BD\TrabalhoBD-2025_1-552198\frontend\src\pages\DisciplinaSelecao.tsx
import React, { useState, useEffect } from 'react';
import type { View } from '../App';
import Button from '../components/Button';
import Select from '../components/Select';

interface DisciplinaSelecaoProps {
  setView: (view: View) => void;
}

const DisciplinaSelecao: React.FC<DisciplinaSelecaoProps> = ({ setView }) => {
  const [professorNome, setProfessorNome] = useState('');
  const [disciplinasDisponiveis] = useState([
    { id: 'BD001', nome: 'Banco de Dados I', periodo: '2025.1' },
    { id: 'ES001', nome: 'Engenharia de Software I', periodo: '2025.1' },
    { id: 'IA001', nome: 'Inteligência Artificial', periodo: '2025.1' },
    { id: 'BD002', nome: 'Banco de Dados II', periodo: '2025.1' },
    { id: 'ES002', nome: 'Engenharia de Software II', periodo: '2025.1' }
  ]);

  useEffect(() => {
    document.title = 'Seleção de Disciplina - UniUFC';
    const professorData = JSON.parse(localStorage.getItem('professorData') || '{}');
    if (professorData.nome) {
      setProfessorNome(professorData.nome);
    }
  }, []);

  const handleSelectDisciplina = (disciplinaId: string) => {
    const disciplina = disciplinasDisponiveis.find((d) => d.id === disciplinaId);
    if (disciplina) {
      // Store selected discipline data in localStorage for ProfessorDashboard to use
      localStorage.setItem('selectedDisciplina', JSON.stringify(disciplina));
      // Navigate to professor dashboard - check App.tsx for correct view name
      setView('professor-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo, {professorNome}!</h2>
          <p className="text-gray-600">Selecione a disciplina que deseja gerenciar neste período:</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {disciplinasDisponiveis.map((disciplina) => (
            <div 
              key={disciplina.id}
              onClick={() => handleSelectDisciplina(disciplina.id)}
              className="p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-300 cursor-pointer transition-all duration-200 hover:shadow-lg hover:bg-indigo-50"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-lg text-gray-800">{disciplina.nome}</h3>
                <span className="text-sm bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                  {disciplina.id}
                </span>
              </div>
              
              <div className="mt-3 text-indigo-600 text-sm font-medium">
                Clique para acessar o dashboard
              </div>
            </div>
          ))}
        </div>

        {/* Select component for discipline selection */}
        <div className="mt-8">
          <Select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const disciplinaId = e.target.value;
              handleSelectDisciplina(disciplinaId);
            }}
            className="min-w-[200px]"
          >
            <option value="">Selecione uma disciplina</option>
            {disciplinasDisponiveis.map((disciplina: any) => (
              <option key={disciplina.id} value={disciplina.id}>
                {disciplina.id} - {disciplina.nome}
              </option>
            ))}
          </Select>
        </div>

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

export default DisciplinaSelecao;