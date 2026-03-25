'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Filter, MoreVertical, CheckCircle2, Clock, XCircle, ChevronRight, FileOutput, Target } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

// Mock data for demonstration
const mockLeads = [
  { id: 1, name: 'Eduardo Marques', email: 'eduardo@example.com', project: 'Residencial unifamiliar', status: 'Novo', date: '25 Mar 2026', score: 95 },
  { id: 2, name: 'Ana Silva', email: 'ana@example.com', project: 'Interiores', status: 'Em Análise', date: '24 Mar 2026', score: 80 },
  { id: 3, name: 'Carlos Santos', email: 'carlos@example.com', project: 'Comercial', status: 'Proposta Enviada', date: '22 Mar 2026', score: 60 },
];

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState<number | null>(null);
  const [leads, setLeads] = useState(mockLeads);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase
            .from('briefings')
            .select('*')
            .order('created_at', { ascending: false });
          
          if (error) throw error;
          
          if (data && data.length > 0) {
            setLeads(data.map(item => ({
              id: item.id,
              name: item.client_name,
              email: item.client_email,
              project: item.project_type,
              status: item.status || 'Novo',
              date: new Date(item.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
              score: Math.floor(Math.random() * 40) + 60, // Mock score for now
            })));
          }
        } catch (error) {
          console.error('Error fetching leads:', error);
        }
      }
      setIsLoading(false);
    }
    
    fetchLeads();
  }, []);

  const handleGenerateProposal = async (lead: any) => {
    try {
      setIsGenerating(lead.id);
      const response = await fetch('/api/proposal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: lead.name,
          email: lead.email,
          tipoProjeto: lead.project,
          areaTerreno: '300m²',
          nivelDesejado: 'Alto padrão',
          estiloDesejado: 'Contemporâneo',
          prioriza: 'Conforto e integração',
        }),
      });

      if (!response.ok) throw new Error('Failed to generate proposal');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Proposta_Arqvertice_${lead.name.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error:', error);
      alert('Erro ao gerar proposta.');
    } finally {
      setIsGenerating(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-medium text-[var(--color-primary)] tracking-tight">Leads & Briefings</h1>
          <p className="text-[var(--color-secondary)] mt-1">Gerencie os briefings recebidos e gere propostas.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar cliente..." 
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total de Leads', value: '124', icon: <FileText className="w-5 h-5 text-blue-500" />, trend: '+12%' },
          { label: 'Novos (Hoje)', value: '3', icon: <Clock className="w-5 h-5 text-amber-500" />, trend: '+2' },
          { label: 'Propostas Enviadas', value: '45', icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />, trend: '+5%' },
          { label: 'Taxa de Conversão', value: '36%', icon: <Target className="w-5 h-5 text-purple-500" />, trend: '+2.4%' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                {stat.icon}
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{stat.trend}</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-3xl font-serif font-medium text-[var(--color-primary)] mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Projeto</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Lead Score</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-xs font-medium">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--color-primary)]">{lead.name}</p>
                        <p className="text-xs text-gray-500">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{lead.project}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{lead.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      lead.status === 'Novo' ? 'bg-amber-50 text-amber-700 border border-amber-200/50' :
                      lead.status === 'Em Análise' ? 'bg-blue-50 text-blue-700 border border-blue-200/50' :
                      'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${lead.score >= 80 ? 'bg-emerald-500' : lead.score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${lead.score}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600">{lead.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-400 hover:text-[var(--color-primary)] hover:bg-gray-100 rounded-md transition-colors" title="Ver Briefing">
                        <FileText className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleGenerateProposal(lead)}
                        disabled={isGenerating === lead.id}
                        className="p-1.5 text-gray-400 hover:text-[var(--color-accent)] hover:bg-amber-50 rounded-md transition-colors disabled:opacity-50" 
                        title="Gerar Proposta"
                      >
                        {isGenerating === lead.id ? <Clock className="w-4 h-4 animate-spin" /> : <FileOutput className="w-4 h-4" />}
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
