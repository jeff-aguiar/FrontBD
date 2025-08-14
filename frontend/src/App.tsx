import React, { useState } from 'react';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AlunoDashboard from './pages/AlunoDashboard';
import AlunoConsulta from './pages/AlunoConsulta';
import DisciplinaConsulta from './pages/DisciplinaConsulta';
import OrientadorConsulta from './pages/OrientadorConsulta';
import ProfessorDashboard from './pages/ProfessorDashboard';
import CursoConsulta from './pages/CursoConsulta';
import ProfessorConsulta from './pages/ProfessorConsulta';
import DepartamentoConsulta from './pages/DepartamentoConsulta';
import DisciplinaSelecao from './pages/DepartmentSelection';
import FuncionarioDashboard from './pages/FuncionarioDashboard';

export type View = 
  | 'login' 
  | 'admin' 
  | 'professor'
  | 'professor-dashboard'
  | 'aluno-dashboard'
  | 'disciplina-selecao'
  | 'disciplina-consulta'
  | 'aluno-consulta'
  | 'orientador-consulta'
  | 'curso-consulta'
  | 'professor-consulta'
  | 'departamento-consulta'
  | 'funcionario';

function App() {
  const [currentView, setCurrentView] = useState<View>('login');
  const [previousView, setPreviousView] = useState<View>('login');

  const handleLoginSuccess = (login: string, _senha: string, tipoUsuario?: 'dba' | 'funcionario' | 'professor' | 'aluno') => {
    console.log('Login bem-sucedido:', { login, tipoUsuario });
    
    switch(tipoUsuario) {
      case 'dba':
        setCurrentView('admin');
        break;
      case 'funcionario':
        setCurrentView('funcionario');
        break;
      case 'professor':
        setCurrentView('disciplina-selecao');
        break;
      case 'aluno':
        setCurrentView('aluno-dashboard');
        break;
      default:
        setCurrentView('login');
    }
  };

  const setView = (view: View) => {
    setPreviousView(currentView);
    setCurrentView(view);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return <Login onLoginSuccess={handleLoginSuccess} />;
      case 'admin':
        return <AdminDashboard setView={setView} />;
      case 'aluno-dashboard':
        return <AlunoDashboard setView={setView} />;
      case 'aluno-consulta':
        return <AlunoConsulta setView={setView} userType={previousView === 'funcionario' ? 'funcionario' : 'admin'} />;
      case 'disciplina-consulta':
        return <DisciplinaConsulta setView={setView} userType={previousView === 'funcionario' ? 'funcionario' : 'admin'} />;
      case 'professor-consulta':
        return <ProfessorConsulta setView={setView} userType={previousView === 'funcionario' ? 'funcionario' : 'admin'} />;
      case 'curso-consulta':
        return <CursoConsulta setView={setView} userType={previousView === 'funcionario' ? 'funcionario' : 'admin'} />;
      case 'orientador-consulta':
        return <OrientadorConsulta setView={setView} userType={previousView === 'funcionario' ? 'funcionario' : 'admin'} />;
      case 'disciplina-selecao':
        return <DisciplinaSelecao setView={setView} />;
      case 'departamento-consulta':
        return <DepartamentoConsulta setView={setView} />;
      case 'funcionario':
        return <FuncionarioDashboard setView={setView} />;
      case 'professor-dashboard':
        return <ProfessorDashboard setView={setView} />;
      default:
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }
  };

  return (
    <div className="App">
      {renderCurrentView()}
    </div>
  );
}

export default App;