export type UnitType = "bedrijfsunit" | "kantoor";

export type UnitStatus = "beschikbaar" | "optie" | "verkocht";

export interface Unit {
  id: string;
  type: UnitType;
  nummer: string;
  verdieping: number;
  oppervlakte_m2: number;
  prijs_vanaf: number | null;
  status: UnitStatus;
  beschrijving: string | null;
  plattegrond_url: string | null;
  /** Relatieve positie (0-100%) op de interactieve plattegrond */
  pos_x: number | null;
  pos_y: number | null;
  pos_w: number | null;
  pos_h: number | null;
  sort_order: number;
  created_at: string;
}

export type InteresseType = "bedrijfsunit" | "kantoor" | "beide";
export type KoopHuur = "koop" | "huur" | "onbekend";

export interface Lead {
  id: string;
  naam: string;
  email: string;
  telefoon: string | null;
  bedrijfsnaam: string | null;
  interesse_type: InteresseType | null;
  gewenste_m2: string | null;
  koop_huur: KoopHuur | null;
  bericht: string | null;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  created_at: string;
}

export interface SiteContent {
  key: string;
  value: string;
  updated_at: string;
}
