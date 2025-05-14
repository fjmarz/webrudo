import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Users, Calendar, BarChart3 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Por favor ingresa un email válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const CoachLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex">
      {/* Left Panel - Feature Showcase */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#8A2BE2]/10 to-[#4169E1]/10 border-r border-white/10">
        <div className="w-full max-w-lg mx-auto flex flex-col justify-center p-12">
          <h2 className="text-2xl font-bold mb-8">Potencia tu negocio con RUDO</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-lg">
                <Users className="w-6 h-6 text-[#8A2BE2]" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Gestión de Atletas</h3>
                <p className="text-gray-400">
                  Administra tus grupos y personaliza la experiencia de cada atleta, sin importar la modalidad
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-lg">
                <Calendar className="w-6 h-6 text-[#4169E1]" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Programación Inteligente</h3>
                <p className="text-gray-400">
                  Crea y distribuye tu programación de manera eficiente para cualquier disciplina
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-lg">
                <BarChart3 className="w-6 h-6 text-[#8A2BE2]" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Análisis Avanzado</h3>
                <p className="text-gray-400">
                  Obtén insights detallados del progreso de tus atletas y el rendimiento de tu negocio
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col">
        <Link
          to="/"
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio
        </Link>

        <div className="flex items-center gap-3 mb-12">
          <div className="text-2xl font-black tracking-tighter bg-gradient-to-r from-[#8A2BE2] to-[#4169E1] bg-clip-text text-transparent">
            RUDO
          </div>
          <div className="px-2 py-0.5 text-[10px] font-medium bg-white/5 border border-[#8A2BE2]/20 rounded-full tracking-wider">
            COACH
          </div>
        </div>

        <div className="max-w-md w-full mx-auto flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2">Panel de Control</h1>
          <p className="text-gray-400 mb-8">
            Accede a todas las herramientas para gestionar tu negocio fitness
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register('email')}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8A2BE2] focus:border-transparent text-white placeholder-gray-400"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Contraseña"
                {...register('password')}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8A2BE2] focus:border-transparent text-white placeholder-gray-400"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#8A2BE2] to-[#4169E1] text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
            >
              Iniciar Sesión
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            ¿No tienes una cuenta?{' '}
            <a href="#" className="text-[#8A2BE2] hover:text-[#4169E1] transition-colors">
              Contáctanos
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoachLogin;