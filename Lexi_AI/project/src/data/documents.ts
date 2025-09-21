import { Document } from '../types';

export const LOAN_DOCUMENT: Document = {
  id: 'loan-agreement',
  title: 'Loan Agreement',
  originalText: `LOAN AGREEMENT

This loan agreement is made on the day of 2011 by and among William & Henry, a Partnership organized under the laws of the State of Arizona (hereinafter known as "Borrower") and John Smith, LLC, and LLC organized under the laws of State of Alaska (hereinafter known as "Lender"). Borrower and Lender shall collectively be known herein as "the Parties". In determining the rights and duties of the Parties under the Loan Agreement, the entire document must be read as a whole.

LOAN TERMS

The Borrower and Lender, hereby further set forth their rights and obligations to one another under the Loan Agreement and agreed to be legal bound as follows:

Loan Payment Terms: Borrower to pay $500 to Lender every month for the life of the loan. First payment shall be due 30 days from the date of execution of this agreement and continue each month on the monthly anniversary thereafter until the Loan Balance, including principal and accrued interest, is paid in full or demand for payment in full is made by Lender. In cases where a payment due date is the 29th, 30th and 31 of a month and said month contains a shorter number of days, then the due date shall be the last date of the month.

Demand by Lender: This is a "demand" loan agreement under which borrower is required to pay back in full the entire outstanding Loan Balance within 15 days of receiving a written demand from Lender or full repayment of the Loan Balance. Delivery of the written notice by Lender to Borrower via U.S. Postal Service Certified Mail shall constitute prima facie evidence of delivery.

Method of Loan Payment: The Borrower shall make all payments called for under this loan agreement by sending check or other negotiable instrument made payable to the following individual or entity at the indicated address:

William Brown 123 Home Street Chicago, IL 11111

Default: The occurrence of any of the following events shall constitute a Default by the borrower of the terms of this loan agreement:

Borrower's failure to pay any amount due as principal or interest on the date required under the loan agreement

Borrower seeks an order of relief under the Federal Bankruptcy laws

Borrower becomes insolvent

Exclusive Jurisdiction for Suit in Case of Breach: The parties, by entering into this agreement, submit to Jurisdiction in Cook Country, IL for adjudication of any disputes and/or claims between the parties under this agreement. Furthermore the parties hereby agree that the courts of Cook Country, IL shall have exclusive jurisdiction over any disputes between the parties relatives to this agreement, whether said disputes sound in contract, tort or other areas of the law.

State Laws: this agreement shall be interpreted under, and governed by, the laws of the state of Illinois.`,
  simplified: [
    'Monthly payment: $500; first payment due 30 days after signing.',
    'This is a demand loan — lender can demand full repayment with 15 days\' notice.',
    'Payments by check to William Brown at the given address.',
    'Default occurs if borrower misses payment or becomes insolvent.',
    'Jurisdiction: Cook County, Illinois; governed by Illinois law.'
  ],
  risks: [
    {
      id: 'loan-risk-1',
      clauseId: 'loan-clause-2',
      excerpt: 'This is a "demand" loan agreement under which borrower is required to pay back in full the entire outstanding Loan Balance within 15 days',
      risk: 'high',
      explanation: 'Lender may demand full repayment with 15 days notice — high cashflow risk.',
      confidence: 'High'
    },
    {
      id: 'loan-risk-2',
      clauseId: 'loan-clause-4',
      excerpt: 'Default triggers include bankruptcy or insolvency',
      risk: 'medium',
      explanation: 'Default events include bankruptcy or insolvency; can accelerate repayment.',
      confidence: 'Medium'
    },
    {
      id: 'loan-risk-3',
      clauseId: 'loan-clause-5',
      excerpt: 'Exclusive jurisdiction over any disputes between the parties relatives to this agreement',
      risk: 'low',
      explanation: 'Laws and courts are restricted to Cook County, IL which may be inconvenient.',
      confidence: 'Low'
    }
  ],
  clauses: [
    { id: 'loan-clause-1', text: 'Borrower to pay $500 to Lender every month for the life of the loan', paragraph: 1 },
    { id: 'loan-clause-2', text: 'This is a "demand" loan agreement under which borrower is required to pay back in full the entire outstanding Loan Balance within 15 days', paragraph: 2 },
    { id: 'loan-clause-3', text: 'The Borrower shall make all payments called for under this loan agreement by sending check', paragraph: 3 },
    { id: 'loan-clause-4', text: 'Default events include failure to pay, bankruptcy, or insolvency', paragraph: 4 },
    { id: 'loan-clause-5', text: 'Exclusive jurisdiction in Cook County, IL for disputes', paragraph: 5 }
  ],
  uploadedAt: '2025-09-21T10:00:00Z'
};

export const RENT_DOCUMENT: Document = {
  id: 'rent-agreement',
  title: 'Rent Agreement',
  originalText: `RENT AGREEMENT

This agreement made and entered into the 02/11/2016 between LANDLORD NAME S/O Father Name Owner at Complete property address including pin code hereinafter referred to as "the Landined" (which expression shall unless the context otherwise require, include their heirs, executors, administrations, and assign) as the One Part,

AND

Tenent Name having Principal Place of business of the Proprietor Firm at Complete property address including pin code hereinafter called "the Tenant" (which expression shall the other part)

WHEREAS

L The Landlord is entitled to and in possession of the Room having size of approx. 900 square feet facing one wall of another premises having common bathroom at second floor, of premises bearing Complete property address including pin code (hereinafter referred to as "the said Premises)

II. The Tenant is desirous to taking on Rent and the LANDLORD has agreed to give the said Premises on Rent to the Tenant for the period of Eleven months and on the terms and conditions as hereinafter written

NOW IT IS HEREBY AGREED BY AND BETWEEN THE PARTIES HERETO AS FOLLOWS:

1) In conditions of the Rent herein reserved and observance of the terms and conditions on the part on the TENANT bereinafter contained, the LANDLORD do hereby grant permission to the TENANT for use and enjoyment of the said premises for a period 11 (Eleven) months commencing form 01.11.2016 to

2) The TENANT hereby agrees to pay to the LANDLORD monthly Rent at the rate of Rs. 8500/- (Rupees Eight Thousand Five Hundred only) per month exclusive of maintenance charges for the use and enjoyment of the said Premises,

3) That the premises in question is let out to the Second party for a period of 11(eleven) months only for the exclusive use of the Second party for commercial purposes only and is not transferable to any other person

4) That rent for the 11 months as per mutual settlement of the parties is fised Rs 8500/= (Rupees Fight Thousand Five Hundred only) per month and the same is payable in advance on or before 1 day of every English calendar month. If the agreement is renewed after 11 months, rent for next year will be increased by 20% (twenty percent).

5) The period of tenancy above stated can be curtailed by tenant with a clear notice of one month in writing to landlord and landlord shall also serve one month notice in case of eviction of the said property to the tenant

6) Tenant shall use the rented premises only for commercial purposes Le. rutming of office of Software Developer Company in the Name of Mr.XYZ

7) Tenant shall not use the rented premises to carry out business in items like arm & ammunition, dangerous material, fire hazard-material, health-hazard material, material prohibited by Govt law etc.

8) Tenant shall not sub-let any portion of the rented premises to anyone else. Tenant is also not permitted to part with any portion of the rented premises to anyone else by way of partnership etc.

9) The Tenant shall not change or make any alternation of any structural kind or nature in the said Premises or any portion thereof without the prior written consent of the LANDLORD.

10) Tenant shall keep the rented premises in good sanitary condition and the same shall be used after keeping in view the prevailing rules/regulation/bye-laws of the Delhi Municipal corporation /D.DA c

11) The Landlord at his own cost will carry out all major repairs to the rented portion. However, tenant at his own cost will be done all nunor repairs

12) No additions/alterations of any kind will be done in the rented portion by tenant without prior consent of landlord, in writing,

13) That the Second Party shall permit the First Party or his/her authorized representatives to enter upon the said premises as and when necessary with the prior intimation to the second party.

14) That the Second Party shall pay electricity and water charges as per meter reading to the concerned authorities. The above said rental exchides electricity charges.`,
  simplified: [
    'Monthly rent ₹8,500 payable in advance on 1st of month; 11-month term.',
    'Either party must give one month\'s written notice to end tenancy.',
    'If renewed, rent increases by 20%.',
    'Tenant must not sublet, alter structure without landlord permission.',
    'Landlord pays major repairs; tenant pays minor repairs and utilities.'
  ],
  risks: [
    {
      id: 'rent-risk-1',
      clauseId: 'rent-clause-4',
      excerpt: 'If the agreement is renewed after 11 months, rent for next year will be increased by 20%',
      risk: 'medium',
      explanation: '20% automatic increase can be steep.',
      confidence: 'Medium'
    },
    {
      id: 'rent-risk-2',
      clauseId: 'rent-clause-general',
      excerpt: 'No clear deposit/refund terms specified',
      risk: 'high',
      explanation: 'Deposit & refund process not specified — risk of losing deposit.',
      confidence: 'High'
    },
    {
      id: 'rent-risk-3',
      clauseId: 'rent-clause-5',
      excerpt: 'One month notice in case of eviction',
      risk: 'low',
      explanation: 'Short notice period may be acceptable but can be inconvenient.',
      confidence: 'Low'
    }
  ],
  clauses: [
    { id: 'rent-clause-1', text: '11 months tenancy period starting from 01.11.2016', paragraph: 1 },
    { id: 'rent-clause-2', text: 'Monthly rent Rs. 8500/- payable in advance', paragraph: 2 },
    { id: 'rent-clause-3', text: 'Commercial purposes only, not transferable', paragraph: 3 },
    { id: 'rent-clause-4', text: 'Rent increases by 20% on renewal after 11 months', paragraph: 4 },
    { id: 'rent-clause-5', text: 'One month notice required for tenancy termination', paragraph: 5 },
    { id: 'rent-clause-6', text: 'No subletting or partnership allowed', paragraph: 8 },
    { id: 'rent-clause-7', text: 'No structural alterations without written consent', paragraph: 9 }
  ],
  uploadedAt: '2025-09-21T09:30:00Z'
};

export const documents = [LOAN_DOCUMENT, RENT_DOCUMENT];