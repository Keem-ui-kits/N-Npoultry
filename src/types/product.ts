export interface Product {
  id: string;
  title: string;
  titleAccent: string;
  description: string;
  fullDescription?: string;
  features?: string[];
  details: string[];
  image: string;
  color: string;
  colorRgb: [number, number, number];
  gradient: string;
}
