import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 40,
    borderBottom: '2px solid #D4AF37',
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    color: '#1A1A1A',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#5A5A5A',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  heading: {
    fontSize: 18,
    color: '#1A1A1A',
    marginBottom: 15,
    borderBottom: '1px solid #E5E5E5',
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    width: 150,
    fontSize: 12,
    color: '#5A5A5A',
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
    fontSize: 12,
    color: '#1A1A1A',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#999999',
    fontSize: 10,
    borderTop: '1px solid #E5E5E5',
    paddingTop: 10,
  },
  priceBox: {
    backgroundColor: '#FDFBF7',
    border: '1px solid #F0E6D2',
    padding: 20,
    marginTop: 20,
    borderRadius: 4,
  },
  priceLabel: {
    fontSize: 14,
    color: '#5A5A5A',
    marginBottom: 5,
  },
  priceValue: {
    fontSize: 24,
    color: '#D4AF37',
    fontWeight: 'bold',
  }
});

export const ProposalPDF = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>ARQVERTICE</Text>
        <Text style={styles.subtitle}>Proposta de Serviços de Arquitetura & Engenharia</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Dados do Cliente</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>{data.nome || 'Cliente'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Projeto:</Text>
          <Text style={styles.value}>{data.tipoProjeto || 'Residencial'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Área Estimada:</Text>
          <Text style={styles.value}>{data.areaTerreno || 'Não informada'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Escopo do Projeto</Text>
        <Text style={{ fontSize: 12, color: '#5A5A5A', lineHeight: 1.5 }}>
          Com base no briefing realizado, propomos o desenvolvimento de um projeto arquitetônico completo, 
          contemplando estudo preliminar, anteprojeto, projeto legal e projeto executivo. O estilo 
          direcionador será o {data.estiloDesejado || 'Contemporâneo'}, focando em {data.prioriza || 'conforto e funcionalidade'}.
        </Text>
      </View>

      <View style={styles.priceBox}>
        <Text style={styles.priceLabel}>Investimento Estimado (Arquitetura)</Text>
        <Text style={styles.priceValue}>R$ {data.estimatedPrice || 'Sob Consulta'}</Text>
        <Text style={{ fontSize: 10, color: '#999999', marginTop: 10 }}>
          * Valores sujeitos a alteração após análise topográfica e definições finais de escopo.
        </Text>
      </View>

      <Text style={styles.footer}>
        Arqvertice Arquitetura & Engenharia | eduardo.marques.arq@gmail.com | Gerado automaticamente
      </Text>
    </Page>
  </Document>
);
