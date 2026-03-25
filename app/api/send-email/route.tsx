import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import React from 'react';
import { renderToStream } from '@react-pdf/renderer';
import { ProposalPDF } from '@/components/ProposalPDF';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data: Record<string, any> = {};
    const attachments: any[] = [];

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        if (value.size === 0) continue;
        const buffer = Buffer.from(await value.arrayBuffer());
        attachments.push({
          filename: value.name,
          content: buffer,
          contentType: value.type,
        });
      } else {
        if (data[key]) {
          if (Array.isArray(data[key])) {
            data[key].push(value);
          } else {
            data[key] = [data[key], value];
          }
        } else {
          data[key] = value;
        }
      }
    }

    // Use provided credentials or fallback to environment variables
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER || 'eduardo.marques.arq@gmail.com';
    const smtpPass = process.env.SMTP_PASS || 'ynwhmaklllcmixiw';
    const smtpFrom = process.env.SMTP_FROM || 'eduardo.marques.arq@gmail.com';

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error('Missing SMTP credentials');
      return NextResponse.json(
        { error: 'Configuração de servidor de email ausente.' },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      requireTLS: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Helper to format values
    const formatValue = (val: any) => {
      if (val === undefined || val === null || val === '') return '<em>Não informado</em>';
      if (Array.isArray(val)) return `<strong>${val.join(', ')}</strong>`;
      return `<strong>${val}</strong>`;
    };

    // Generate a section block
    const generateSection = (title: string, icon: string, fields: { label: string; value: any; highlight?: boolean }[]) => {
      const rows = fields.map(f => {
        const valStr = formatValue(f.value);
        const valueStyle = f.highlight 
          ? 'color: #D4AF37; font-size: 16px; background-color: #fdfbf7; padding: 4px 8px; border-radius: 4px; border: 1px solid #f0e6d2; display: inline-block; margin-top: 4px;' 
          : 'color: #333333; font-size: 15px; margin-top: 4px; display: block;';
        
        return `
          <div style="margin-bottom: 16px;">
            <span style="font-size: 13px; color: #777777; text-transform: uppercase; letter-spacing: 0.5px; display: block;">${f.label}</span>
            <span style="${valueStyle}">${valStr}</span>
          </div>
        `;
      }).join('');

      return `
        <div style="background-color: #ffffff; border-radius: 8px; padding: 24px; margin-bottom: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); border: 1px solid #eaeaea;">
          <h3 style="margin-top: 0; margin-bottom: 20px; color: #1a1a1a; font-size: 18px; border-bottom: 2px solid #f0f0f0; padding-bottom: 12px; display: flex; align-items: center;">
            <span style="margin-right: 8px; font-size: 20px;">${icon}</span> ${title}
          </h3>
          <div style="display: grid; grid-template-columns: 1fr; gap: 0;">
            ${rows}
          </div>
        </div>
      `;
    };

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Novo Briefing - ${data.nome || 'Cliente'}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f9f9f9; font-family: 'Montserrat', Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f9f9f9; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: transparent;">
                
                <!-- Header -->
                <tr>
                  <td align="center" style="padding-bottom: 30px;">
                    <h1 style="color: #1a1a1a; margin: 0; font-size: 24px; font-weight: 600;">Relatório de Briefing</h1>
                    <p style="color: #666666; margin: 8px 0 0 0; font-size: 15px;">Um novo cliente preencheu o formulário.</p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td>
                    ${generateSection('DADOS DO CLIENTE', '👤', [
                      { label: 'Nome Completo', value: data.nome },
                      { label: 'E-mail', value: data.email },
                      { label: 'Telefone (WhatsApp)', value: data.telefone },
                      { label: 'Profissão', value: data.profissao },
                      { label: 'Estado Civil', value: data.estadoCivil },
                      { label: 'Cidade/Estado', value: data.cidadeEstado },
                      { label: 'Como conheceu', value: data.comoConheceu },
                    ])}

                    ${generateSection('QUALIFICAÇÃO', '🎯', [
                      { label: 'Tipo de Projeto', value: data.tipoProjeto, highlight: true },
                      { label: 'Finalidade', value: data.finalidade },
                      { label: 'Construir Imediatamente', value: data.construirImediatamente },
                      { label: 'Financiamento Aprovado', value: data.financiamentoAprovado },
                    ])}

                    ${generateSection('TERRENO', '🗺️', [
                      { label: 'Endereço do Terreno', value: data.enderecoTerreno },
                      { label: 'Área Total (m²)', value: data.areaTerreno },
                      { label: 'Dimensões', value: data.dimensoes },
                      { label: 'Topografia', value: data.topografia },
                      { label: 'Posição Solar', value: data.posicaoSolar },
                      { label: 'Condomínio', value: data.condominio },
                    ])}

                    ${generateSection('FAMÍLIA', '👨‍👩‍👧‍👦', [
                      { label: 'Número de Moradores', value: data.moradores },
                      { label: 'Idades', value: data.idades },
                      { label: 'Crianças', value: data.criancas },
                      { label: 'Idosos', value: data.idosos },
                      { label: 'Pets', value: data.pets },
                      { label: 'Pretende aumentar a família', value: data.aumentarFamilia },
                    ])}

                    ${generateSection('NECESSIDADES (PROGRAMA)', '🏠', [
                      { label: 'Suítes', value: data.suites },
                      { label: 'Suíte Master', value: data.suiteMaster },
                      { label: 'Garagem (vagas)', value: data.garagem },
                      { label: 'Salas', value: [data.salaEstar, data.salaJantar, data.salaIntima].filter(Boolean).join(' | ') },
                      { label: 'Cozinha', value: data.cozinha },
                      { label: 'Área Gourmet', value: data.areaGourmet },
                      { label: 'Lavabo', value: data.lavabo },
                      { label: 'Escritório', value: data.escritorio },
                      { label: 'Lavanderia', value: data.lavanderia },
                    ])}

                    ${generateSection('ORÇAMENTO E PRAZOS', '💰', [
                      { label: 'Orçamento Previsto', value: data.valorPrevisto, highlight: true },
                      { label: 'Nível Desejado', value: data.nivelDesejado },
                      { label: 'Flexibilidade', value: data.flexibilidade },
                      { label: 'Início do Projeto', value: data.inicioProjeto },
                      { label: 'Início da Obra', value: data.inicioObra },
                      { label: 'Conclusão Desejada', value: data.conclusao },
                    ])}

                    ${generateSection('ESTILO E TECNOLOGIA', '✨', [
                      { label: 'Estilo Desejado', value: data.estiloDesejado },
                      { label: 'Cores Preferidas', value: data.coresPreferidas },
                      { label: 'Cores que NÃO gosta', value: data.coresNaoGosta },
                      { label: 'Materiais Preferidos', value: data.materiaisPreferidos },
                      { label: 'Automação', value: data.automacao },
                      { label: 'Energia Solar', value: data.energiaSolar },
                      { label: 'Climatização', value: data.climatizacao },
                    ])}

                    ${generateSection('LINKS DE REFERÊNCIA', '🔗', [
                      { label: 'Link 1', value: data.referencia1 },
                      { label: 'Link 2', value: data.referencia2 },
                      { label: 'Link 3', value: data.referencia3 },
                      { label: 'Link 4', value: data.referencia4 },
                      { label: 'Link 5', value: data.referencia5 },
                    ])}

                    ${generateSection('INFORMAÇÕES ADICIONAIS', '📝', [
                      { label: 'O que NÃO pode faltar', value: data.naoPodeFaltar },
                      { label: 'Projeto Perfeito', value: data.projetoPerfeito },
                      { label: 'Necessidades Específicas', value: data.necessidadeEspecifica },
                      { label: 'Restrições', value: data.restricao },
                      { label: 'Observações Finais', value: data.observacoes },
                      { label: 'Por que escolheu o escritório?', value: data.porqueEscolheu },
                    ])}
                  </td>
                </tr>

                <!-- Footer / Signature -->
                <tr>
                  <td align="center" style="padding-top: 20px;">
                    <div style="border-top: 1px solid #dddddd; padding-top: 30px; margin-top: 10px;">
                      <p style="color: #888888; font-size: 13px; margin: 0 0 4px 0;">Projeto gerado automaticamente</p>
                      <p style="color: #1a1a1a; font-size: 14px; font-weight: 600; margin: 0 0 12px 0;">Sistema de Briefing Arquitetônico</p>
                      <p style="color: #888888; font-size: 13px; margin: 0;">Email: <a href="mailto:${smtpUser}" style="color: #D4AF37; text-decoration: none;">${smtpUser}</a></p>
                    </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const clientName = data.nome ? data.nome.trim() : 'Cliente não identificado';

    // Save to Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { error: dbError } = await supabase
          .from('briefings')
          .insert([
            {
              client_name: clientName,
              client_email: data.email,
              client_phone: data.telefone,
              project_type: data.tipoProjeto,
              data: data,
              status: 'Novo',
            }
          ]);
        
        if (dbError) {
          console.error('Error saving to Supabase:', dbError);
        }
      } catch (e) {
        console.error('Supabase exception:', e);
      }
    }

    // Generate PDF Proposal
    try {
      let estimatedPrice = 'Sob Consulta';
      if (data.areaTerreno) {
        const area = parseInt(data.areaTerreno.replace(/\D/g, ''));
        if (!isNaN(area)) {
          let pricePerM2 = 80; 
          if (data.nivelDesejado === 'Alto padrão') pricePerM2 = 120;
          if (data.nivelDesejado === 'Luxo') pricePerM2 = 180;
          const total = area * pricePerM2;
          estimatedPrice = total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
      }
      data.estimatedPrice = estimatedPrice;

      const stream = await renderToStream(<ProposalPDF data={data} />);
      const chunks: any[] = [];
      for await (const chunk of stream) {
        chunks.push(chunk);
      }
      const pdfBuffer = Buffer.concat(chunks);
      
      attachments.push({
        filename: `Proposta_Arqvertice_${clientName.replace(/\s+/g, '_')}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      });
    } catch (pdfError) {
      console.error('Error generating PDF for email:', pdfError);
      // Continue sending email even if PDF fails
    }

    // Send email
    const info = await transporter.sendMail({
      from: `"Briefing Arquitetura" <${smtpFrom}>`,
      to: smtpUser,
      subject: `Novo briefing recebido - ${clientName}`,
      text: `Novo briefing de ${clientName}. Email: ${data.email}. Telefone: ${data.telefone}`,
      html: htmlContent,
      attachments: attachments,
    });

    console.log('Message sent: %s', info.messageId);

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao enviar o email. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}
