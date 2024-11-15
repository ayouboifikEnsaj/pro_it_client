import {Time} from "@angular/common";

export interface Role {
  id: number;
  roleName: string;
}

export interface Aeroport {
  id: number;
  aeroportName: string;
}

export interface AppUser {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  roles: Role[];
  aeroport1: Aeroport;
}

export interface Compagnie {
  id: number;
  compagnieName: string;
}

export interface Zone {
  id: number;
  zoneName: string;
  aeroport: Aeroport;
}

export interface Equipment {
  id: number;
  equipementName: string;
}

export interface Comptoire {
  id: number;
  comptoireName: string;
  zone: Zone;
  equipments: Equipment[];
}

export interface Solution {
  id: number;
  libelle: string;
}

export interface Probleme {
  id: number;
  libelle: string;
}
export interface Projet{
  id:number;
  projetName:string;
  equipments:Equipment[];
}

export interface Interventiion {
  id: number;
  status: string;
  date: Date;
  heureDebut: Date;
  heureFin: Date;
  compagnie: Compagnie;
  appUser: AppUser;
  comptoire: Comptoire;
  equipment: Equipment;
  solution: Solution;
  probleme: Probleme;
  aeroport: Aeroport;
  projet: Projet;
  duration:any;
}
