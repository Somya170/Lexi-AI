export interface Document {
  id: string;
  title: string;
  originalText: string;
  simplified: string[];
  risks: RiskItem[];
  clauses: Clause[];
  uploadedAt?: string;
}

export interface RiskItem {
  id: string;
  clauseId?: string;
  excerpt: string;
  risk: 'low' | 'medium' | 'high';
  explanation: string;
  confidence: 'High' | 'Medium' | 'Low';
}

export interface Clause {
  id: string;
  text: string;
  paragraph?: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  sourceClauseId?: string;
  confidence?: 'High' | 'Medium' | 'Low';
}

export interface ChatResponse {
  answerText: string;
  sourceClauseId?: string;
  confidence: 'High' | 'Medium' | 'Low';
}

export type TabType = 'summary' | 'original' | 'comparison' | 'risks';