# Ideias de Design - Site de Briefing Arquitetura

## Abordagem Selecionada: Minimalismo Sofisticado com Foco em Dados

### Design Movement
**Bauhaus Contemporâneo** - Funcionalismo elegante com ênfase em clareza, hierarquia e propósito. Inspirado na filosofade "forma segue função", mas com refinamento moderno.

### Core Principles
1. **Clareza Progressiva**: Formulário dividido em seções lógicas que revelam informações gradualmente, evitando sobrecarga cognitiva
2. **Hierarquia Visual Forte**: Tipografia e espaçamento criam distinção clara entre títulos, campos e instruções
3. **Minimalismo Funcional**: Apenas elementos essenciais, sem decoração supérflua, mas com refinamento tátil
4. **Confiança Profissional**: Estética que comunica expertise e seriedade, apropriada para clientes de alto padrão

### Color Philosophy
- **Primária**: Azul-chumbo profundo (`#1e3a5f`) - transmite confiança, estabilidade e expertise arquitetônica
- **Secundária**: Cinza neutro quente (`#f5f3f0`) - fundo limpo e acessível
- **Acentos**: Verde-musgo suave (`#6b8e6f`) - elemento de vida, referência à sustentabilidade e natureza
- **Texto**: Cinza escuro (`#2d2d2d`) - legibilidade máxima com suavidade

### Layout Paradigm
- **Estrutura em Coluna Única**: Formulário linear e progressivo (não grid centralizado)
- **Card-based Sections**: Cada seção do briefing em card próprio com espaçamento generoso
- **Sidebar Contextual** (desktop): Indicador de progresso visual mostrando seções completadas
- **Mobile-first**: Stack vertical natural, sem necessidade de adaptação forçada

### Signature Elements
1. **Divisores Sutis**: Linhas horizontais delicadas que separam seções sem parecer barreiras
2. **Indicador de Progresso Vertical**: Barra lateral que marca visualmente o avanço no formulário
3. **Ícones Temáticos**: Ícones minimalistas (lucide-react) que reforçam cada seção (casa, terreno, família, etc.)

### Interaction Philosophy
- **Feedback Imediato**: Validação em tempo real com mensagens sutis
- **Transições Suaves**: Campos se revelam com fade-in suave conforme o usuário progride
- **Hover States Elegantes**: Buttons e inputs com transições de cor e sombra refinadas
- **Scroll Behavior**: Seções completadas ganham indicador visual discreto

### Animation
- **Entrada de Seções**: Fade-in de 300ms quando a seção entra em viewport
- **Hover em Inputs**: Sombra suave e mudança de cor de borda (não transformação)
- **Button States**: Transição de cor e sombra em 200ms, sem scale
- **Validação**: Ícone de checkmark com fade-in suave

### Typography System
- **Display/Títulos**: `Playfair Display` 700 - elegância clássica, tamanho 28-32px
- **Seção Titles**: `Inter` 600 - clareza moderna, tamanho 18-20px
- **Body/Labels**: `Inter` 400-500 - legibilidade, tamanho 14-16px
- **Instrução/Helper**: `Inter` 400 - tamanho 13px, cor muted
- **Hierarquia**: Peso e tamanho, não cor (mantém acessibilidade)

---

## Decisões Implementadas

✅ Tipografia: Playfair Display + Inter
✅ Paleta: Azul-chumbo + Cinza quente + Verde-musgo
✅ Layout: Coluna única com cards
✅ Componentes: Formulário progressivo com validação
✅ Animações: Fade-in sutis e transições suaves
