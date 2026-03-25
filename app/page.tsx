'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Building2, Sparkles, Target } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-accent)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--color-secondary)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
            <Building2 className="w-8 h-8 text-[var(--color-primary)]" />
          </div>
          <h1 className="text-5xl sm:text-7xl font-serif text-[var(--color-primary)] mb-6 leading-tight">
            ARQVERTICE <br />
            <span className="text-[var(--color-secondary)] font-light italic text-4xl sm:text-5xl">Arquitetura & Engenharia</span>
          </h1>
          <p className="text-lg sm:text-xl text-[var(--color-secondary)] max-w-2xl mx-auto font-light leading-relaxed">
            Transformamos sua visão em realidade através de um processo inteligente, fluido e exclusivo.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <div className="premium-card bg-white p-8 rounded-2xl border border-gray-100 text-center">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-6 h-6 text-[var(--color-accent)]" />
            </div>
            <h3 className="text-lg font-medium text-[var(--color-primary)] mb-3">Briefing Inteligente</h3>
            <p className="text-sm text-[var(--color-secondary)] leading-relaxed">
              Nosso sistema se adapta às suas respostas, sugerindo as melhores soluções para o seu perfil.
            </p>
          </div>

          <div className="premium-card bg-white p-8 rounded-2xl border border-gray-100 text-center">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-6 h-6 text-[var(--color-accent)]" />
            </div>
            <h3 className="text-lg font-medium text-[var(--color-primary)] mb-3">Precisão Absoluta</h3>
            <p className="text-sm text-[var(--color-secondary)] leading-relaxed">
              Coletamos os dados exatos para criar um projeto que atenda perfeitamente às suas expectativas.
            </p>
          </div>

          <div className="premium-card bg-white p-8 rounded-2xl border border-gray-100 text-center">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-6 h-6 text-[var(--color-accent)]" />
            </div>
            <h3 className="text-lg font-medium text-[var(--color-primary)] mb-3">Proposta Imediata</h3>
            <p className="text-sm text-[var(--color-secondary)] leading-relaxed">
              Receba uma estimativa e direcionamento arquitetônico logo após a conclusão do briefing.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="text-center"
        >
          <Link 
            href="/briefing"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-[var(--color-primary)] rounded-full hover:bg-black hover:shadow-xl hover:shadow-black/10 transition-all duration-300 group"
          >
            Iniciar Meu Projeto
            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="mt-6 text-sm text-[var(--color-secondary)] font-light">
            Leva apenas 3 minutos. Suas respostas são salvas automaticamente.
          </p>
        </motion.div>

      </div>
    </main>
  );
}
