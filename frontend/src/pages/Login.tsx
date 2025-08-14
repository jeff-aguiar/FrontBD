import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

interface LoginProps {
  onLoginSuccess: (login: string, senha: string, tipoUsuario?: 'dba' | 'funcionario' | 'professor' | 'aluno') => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = 'Login - UniUFC';
  }, []);

  const usuarios = {
    'Admin': {
      senha: 'Root',
      tipo: 'dba' as const,
      nome: 'Administrador do Sistema'
    },
    'prof.joao': {
      senha: '123456',
      tipo: 'professor' as const,
      nome: 'Prof. Dr. João Silva'
    },
    'func.ana': {
      senha: '123456',
      tipo: 'funcionario' as const,
      nome: 'Ana Costa - Secretaria'
    },
    '202512345': {
      senha: '123456',
      tipo: 'aluno' as const,
      nome: 'Jeff Silva',
      curso: 'Ciência da Computação'
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const usuario = usuarios[login as keyof typeof usuarios];

    if (usuario && usuario.senha === senha) {
      const tipoUsuario = usuario.tipo;
      onLoginSuccess(login, senha, tipoUsuario);
    } else {
      alert('Login ou senha incorretos!');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <Card className="w-96 max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎓</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">UniUFC</h2>
          <p className="text-gray-600">Bem vindo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Usuário"
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Digite seu usuário"
            required
          />
          
          <Input
            label="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
          
          <Button
            type="submit"
            variant="gradient"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;