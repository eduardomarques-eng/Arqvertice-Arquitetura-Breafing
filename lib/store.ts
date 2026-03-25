import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BriefingData = {
  // 1. Dados Pessoais
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  
  // 2. Terreno
  possuiTerreno: string;
  areaTerreno: string;
  topografia: string;
  
  // 3. Projeto
  tipoProjeto: string;
  finalidade: string;
  
  // 4. Necessidades
  suites: string;
  garagem: string;
  areaGourmet: string;
  piscina: string;
  lavabo: string;
  homeOffice: string;
  
  // 5. Estilo e Acabamento
  estilo: string;
  padraoAcabamento: string;
  
  // 6. Orçamento
  orcamento: string;
  
  // 7. Referências
  referencias: string;
  
  // 8. Finalização
  observacoes: string;
};

const initialData: BriefingData = {
  nome: '',
  email: '',
  telefone: '',
  cidade: '',
  possuiTerreno: 'Sim',
  areaTerreno: '',
  topografia: 'Plano',
  tipoProjeto: 'Residencial',
  finalidade: 'Moradia',
  suites: '1',
  garagem: '1',
  areaGourmet: 'Não',
  piscina: 'Não',
  lavabo: 'Não',
  homeOffice: 'Não',
  estilo: 'Contemporâneo',
  padraoAcabamento: 'Médio',
  orcamento: '',
  referencias: '',
  observacoes: '',
};

type BriefingStore = {
  data: BriefingData;
  updateData: (newData: Partial<BriefingData>) => void;
  applyPredictions: (field: keyof BriefingData, value: string) => void;
  reset: () => void;
};

export const useBriefingStore = create<BriefingStore>()(
  persist(
    (set, get) => ({
      data: initialData,
      updateData: (newData) => {
        set((state) => ({ data: { ...state.data, ...newData } }));
      },
      applyPredictions: (field, value) => {
        const currentData = get().data;
        let updates: Partial<BriefingData> = {};

        // Prediction Logic
        if (field === 'padraoAcabamento' && value === 'Alto Padrão') {
          updates = {
            suites: parseInt(currentData.suites) < 3 ? '3' : currentData.suites,
            areaGourmet: 'Sim',
            piscina: 'Sim',
            lavabo: 'Sim',
          };
        }

        if (field === 'areaTerreno') {
          const area = parseInt(value.replace(/\D/g, ''));
          if (area > 250) {
            updates = {
              lavabo: 'Sim',
              homeOffice: 'Sim',
            };
          }
        }

        if (field === 'orcamento') {
          const orcamento = parseInt(value.replace(/\D/g, ''));
          if (orcamento > 1000000) {
            updates = {
              padraoAcabamento: 'Alto Padrão',
              estilo: 'Contemporâneo',
            };
          }
        }

        if (Object.keys(updates).length > 0) {
          set((state) => ({ data: { ...state.data, ...updates } }));
        }
      },
      reset: () => set({ data: initialData }),
    }),
    {
      name: 'arqvertice-briefing-storage',
    }
  )
);
