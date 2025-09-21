// src/utils/simulatedAi.ts
import { Document, ChatResponse } from '../types';
import { documents } from '../data/documents';

/**
 * Utility / simulated AI module for the frontend-only LexiAI demo.
 * - loadDocument(id) -> sync load from hardcoded documents
 * - getSummary(doc), getRisks(doc) -> simple accessors
 * - chat(doc, question) -> deterministic rule-based Q&A
 * - processPastedText(text) -> simulate AI processing for pasted text (returns a Document)
 *
 * No external calls, everything runs in-browser and deterministic.
 */

/* ---------- Loaders / Simple Accessors ---------- */

export function loadDocument(id: string): Document | null {
  return documents.find(d => d.id === id) || null;
}

export function getSummary(doc: Document): string[] {
  return doc.simplified;
}

export function getRisks(doc: Document) {
  return doc.risks;
}

/* ---------- Simulated Chat / Q&A ---------- */

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export function chat(doc: Document | null, question: string): ChatResponse {
  if (!doc) {
    return {
      answerText: "Please load a document first to ask questions about it.",
      confidence: 'Low'
    };
  }

  const q = normalize(question);

  // Quick keyword buckets
  const has = (words: string | string[]) => {
    if (typeof words === 'string') return q.includes(words);
    return words.some(w => q.includes(w));
  };

  // 1) Rent increase
  if (has(['rent increase', 'increase rent', 'increase'])) {
    if (doc.id.includes('rent')) {
      return {
        answerText:
          "Yes — clause 4 says that if the agreement is renewed after 11 months, rent will be increased by 20% on renewal. This applies at renewal, not during the current term.",
        sourceClauseId: 'rent-clause-4',
        confidence: 'High'
      };
    } else {
      return {
        answerText: "This document is not a rent agreement. Load the rent agreement to check rent increase clauses.",
        confidence: 'Low'
      };
    }
  }

  // 2) Termination / notice / cancel
  if (has(['terminate', 'termination', 'notice', 'cancel'])) {
    if (doc.id.includes('rent')) {
      return {
        answerText:
          "Either party can terminate the tenancy with one month's written notice (clause 5). The tenant may curtail tenancy with one month's notice and the landlord must serve one month notice for eviction.",
        sourceClauseId: 'rent-clause-5',
        confidence: 'High'
      };
    }
    if (doc.id.includes('loan')) {
      return {
        answerText:
          "This loan is a 'demand' loan — the lender may demand full repayment and the borrower must repay within 15 days of written demand (see Demand by Lender clause).",
        sourceClauseId: 'loan-clause-demand',
        confidence: 'High'
      };
    }
  }

  // 3) Early repayment / pay early / repay
  if (has(['repay early', 'repay', 'pay early', 'early repayment', 'pay off'])) {
    if (doc.id.includes('loan')) {
      return {
        answerText:
          "Because this is a demand loan, the lender can demand full repayment with 15 days' notice. That means the borrower may be required to repay earlier than expected — high cashflow risk.",
        sourceClauseId: 'loan-clause-demand',
        confidence: 'High'
      };
    }
    return {
      answerText: "This question does not apply to the currently loaded document.",
      confidence: 'Low'
    };
  }

  // 4) Default / bankruptcy
  if (has(['default', 'bankrupt', 'insolvent'])) {
    if (doc.id.includes('loan')) {
      return {
        answerText:
          "Default triggers include failing to pay principal or interest on the due date, seeking bankruptcy relief, or becoming insolvent. These can accelerate repayment or allow enforcement actions.",
        sourceClauseId: 'loan-clause-defaults',
        confidence: 'High'
      };
    }
  }

  // 5) Payment amount / frequency
  if (has(['how much', 'amount', 'monthly', 'monthly payment', 'pay $', '₹'])) {
    if (doc.id.includes('loan')) {
      return {
        answerText:
          "Monthly payment is $500. The first payment is due 30 days after signing and then monthly on the anniversary date.",
        sourceClauseId: 'loan-clause-payment',
        confidence: 'High'
      };
    }
    if (doc.id.includes('rent')) {
      return {
        answerText:
          "Monthly rent is ₹8,500 payable in advance on or before the 1st of every calendar month. Utilities or maintenance may be extra as specified.",
        sourceClauseId: 'rent-clause-payment',
        confidence: 'High'
      };
    }
  }

  // 6) Sublet
  if (has(['sublet', 'subletting', 'sub-let'])) {
    if (doc.id.includes('rent')) {
      return {
        answerText:
          "No — the tenant is not permitted to sublet any portion of the premises (clause 8). Written permission is required to sublet.",
        sourceClauseId: 'rent-clause-sublet',
        confidence: 'High'
      };
    }
  }

  // 7) Privacy / data sharing (for pasted ToS)
  if (has(['data', 'privacy', 'share', 'third party'])) {
    // If the doc is a Terms-of-Service type, warn about missing privacy text
    if (doc.id.startsWith('tos') || doc.title.toLowerCase().includes('terms')) {
      return {
        answerText:
          "I don't see a dedicated privacy or data-sharing clause in the pasted text. That is a potential high-risk area: the document should clearly say how user data is stored, used, and whether it's shared with third parties.",
        sourceClauseId: undefined,
        confidence: 'High'
      };
    }
    return {
      answerText: "This document does not explicitly address privacy or data-sharing in the visible text.",
      confidence: 'Medium'
    };
  }

  // 8) Generic clause keyword search: try to match any clause text tokens with question words
  if (doc.clauses && doc.clauses.length) {
    const qWords = q.split(/\s+/).filter(Boolean);
    for (const clause of doc.clauses) {
      const c = normalize(clause.text || '');
      for (const w of qWords) {
        if (w.length < 3) continue; // skip tiny words
        if (c.includes(w)) {
          // find a risk linked to this clause if present
          const linkedRisk = doc.risks?.find(r => r.clauseId === clause.id);
          if (linkedRisk) {
            return {
              answerText: linkedRisk.explanation,
              sourceClauseId: clause.id,
              confidence: linkedRisk.confidence ?? 'Medium'
            };
          }
          // fallback: return clause text as explanation
          return {
            answerText: clause.text,
            sourceClauseId: clause.id,
            confidence: 'Medium'
          };
        }
      }
    }
  }

  // final fallback
  return {
    answerText:
      "I cannot find a direct answer to that question in this document. Suggestion: ask the other party to clarify or consult a lawyer for specific legal advice.",
    confidence: 'Low'
  };
}

/* ---------- Example questions helper ---------- */

export function getExampleQuestions(doc: Document | null): string[] {
  if (!doc) return [];
  if (doc.id.includes('rent')) {
    return [
      "Can the landlord increase rent anytime?",
      "How much notice is needed to terminate?",
      "Can I sublet the property?",
      "Who pays for repairs?"
    ];
  }
  if (doc.id.includes('loan')) {
    return [
      "Can the lender demand early repayment?",
      "What happens if I miss a payment?",
      "How much do I pay monthly?",
      "What constitutes default?"
    ];
  }
  if (doc.id.startsWith('tos') || doc.title.toLowerCase().includes('terms')) {
    return [
      "Does this Terms of Service share my data with third parties?",
      "Who controls 'Affiliate' and what does that mean?",
      "Where can I find dispute resolution / jurisdiction clauses?"
    ];
  }
  return [];
}

/* ---------- Pasted text processing (simulated) ---------- */

/**
 * processPastedText(text) -> Promise<Document>
 * Simulates AI processing for pasted text. If it looks like a Terms of Service,
 * returns a specialized Document with simplified bullets and risk items.
 */
export async function processPastedText(text: string): Promise<Document> {
  // Simulated processing delay (feel realistic)
  await new Promise(r => setTimeout(r, 1400));

  const lower = normalize(text);

  // If this looks like ToS/Terms -> return tailored object
  if (lower.includes('terms of service') || lower.includes('terms (') || lower.includes('interpretation and definitions')) {
    const doc: Document = {
      id: 'tos-sample',
      title: 'Terms of Service — Sample (pasted)',
      originalText: text,
      simplified: [
        "These Terms explain how the Company and users interact and define key terms like 'Affiliate', 'Account', and 'Service'.",
        "Important definitions affect how rules apply — read the Definitions section carefully.",
        "There is no obvious privacy or dispute-resolution clause in the pasted snippet — that is a high-risk omission.",
        "If you rely on this service, ask the company to clarify data handling, liability, and dispute procedures."
      ],
      risks: [
        {
          id: 'tos-r1',
          clauseId: undefined,
          excerpt: "Broad definitions of Company/Affiliate may expand company rights.",
          risk: 'medium',
          explanation: "The Company has broad definitions and control which could be used to expand rights over content or accounts.",
          confidence: 'Medium'
        },
        {
          id: 'tos-r2',
          clauseId: undefined,
          excerpt: "No clear privacy/data-sharing or dispute resolution in the provided text.",
          risk: 'high',
          explanation: "Missing privacy or dispute terms means users may not know how data is used or where disputes are resolved.",
          confidence: 'High'
        },
        {
          id: 'tos-r3',
          clauseId: undefined,
          excerpt: "Standard definition clauses appear, but specifics are absent.",
          risk: 'low',
          explanation: "Definitions look typical, but you should verify specific operational clauses.",
          confidence: 'Low'
        }
      ],
      clauses: [
        { id: 'tos-c1', text: 'Definition of Affiliate: controls or under common control', paragraph: 1 },
        { id: 'tos-c2', text: 'Account and Company definitions', paragraph: 2 }
      ],
      uploadedAt: new Date().toISOString()
    };

    return doc;
  }

  // Generic fallback: return a simple parsed Document
  const fallback: Document = {
    id: 'pasted-generic',
    title: 'Pasted Document (demo)',
    originalText: text,
    simplified: [
      "This pasted document was processed by the LexiAI demo.",
      "Key points and potential risks have been highlighted for quick review."
    ],
    risks: [
      {
        id: 'pasted-r1',
        clauseId: undefined,
        excerpt: 'Potential missing sections (privacy, liability, termination)',
        risk: 'medium',
        explanation: 'Common gaps in pasted contracts — check for full clauses before relying on the document.',
        confidence: 'Medium'
      }
    ],
    clauses: [],
    uploadedAt: new Date().toISOString()
  };

  return fallback;
}
