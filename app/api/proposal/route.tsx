import { NextResponse } from 'next/server';
import React from 'react';
import { renderToStream } from '@react-pdf/renderer';
import { ProposalPDF } from '@/components/ProposalPDF';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Calculate estimated price based on area and standard
    let estimatedPrice = 'Sob Consulta';
    if (data.areaTerreno) {
      const area = parseInt(data.areaTerreno.replace(/\D/g, ''));
      if (!isNaN(area)) {
        // Base price per m2
        let pricePerM2 = 80; 
        if (data.nivelDesejado === 'Alto padrão') pricePerM2 = 120;
        if (data.nivelDesejado === 'Luxo') pricePerM2 = 180;
        
        const total = area * pricePerM2;
        estimatedPrice = total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }
    }
    
    data.estimatedPrice = estimatedPrice;

    const stream = await renderToStream(<ProposalPDF data={data} />);
    
    // Convert stream to buffer
    const chunks: any[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Proposta_Arqvertice_${data.nome || 'Cliente'}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Failed to generate PDF proposal' }, { status: 500 });
  }
}
