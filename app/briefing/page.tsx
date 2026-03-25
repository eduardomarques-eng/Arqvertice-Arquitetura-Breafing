'use client';

import { BriefingForm } from '@/components/BriefingForm';
import { motion } from 'framer-motion';

export default function BriefingPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 mt-4"
        >
          <p className="text-sm font-semibold tracking-widest text-[var(--color-accent)] uppercase mb-3">
            Arqvertice Arquitetura
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-[var(--color-primary)] mb-4 tracking-tight">
            Briefing Inteligente
          </h1>
          <p className="text-base text-[var(--color-secondary)] max-w-2xl mx-auto font-light leading-relaxed">
            Preencha os dados abaixo. Nosso sistema adaptará as próximas perguntas com base no seu perfil.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden"
        >
          <BriefingForm />
        </motion.div>
        
        <footer className="mt-16 text-center pb-8">
          <p className="text-sm text-gray-400 font-light">
            © {new Date().getFullYear()} Arqvertice Arquitetura. Todos os direitos reservados.
          </p>
        </footer>
      </div>
    </main>
  );
}
