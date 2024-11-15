import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InterventionService} from "../services/intervention.service";
import {Chart, ChartDataset, ChartOptions, ChartType, registerables} from "chart.js";
import {Interventiion} from "../models/model/intervention.model";
import {DatePipe} from "@angular/common";
import {colors} from "@angular/cli/src/utilities/color";
import {AeroportService} from "../services/aeroport.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-interventions-by-equipment-chart',
  templateUrl: './interventions-by-equipment-chart.component.html',
  styleUrl: './interventions-by-equipment-chart.component.css'
})
export class InterventionsByEquipmentChartComponent implements OnInit{
  @ViewChild('equipmentChartCanvas') equipmentChartCanvas!: ElementRef<HTMLCanvasElement>;
  aeroports!: any[];
  form: FormGroup;
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Distribution of interventions by equipment for the selected month'
      }
    }
  };
  public pieChartLabels: string[] = [];
  public pieChartType: ChartType = 'pie';  // Définir le type de graphique ici
  public pieChartLegend = true;

  public pieChartData: ChartDataset[] = [
    { data: [],
      label: 'Interventions' ,
      backgroundColor: []
    }
  ];

  selectedDate: Date | null = null;

  constructor(private interventionService: InterventionService,
              private datePipe: DatePipe,
              private aeroportService:AeroportService,
              private fb: FormBuilder
  ) {
    // Enregistrez les composants requis
    Chart.register(...registerables);
    this.form = this.fb.group({
      aeroport: ['',Validators.required],
      date: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.aeroportService.getAllAeroports().subscribe((data: any[]) => {
      this.aeroports = data;
    });
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  downloadChart(): void {
    const canvas = this.equipmentChartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    ctx!.save();
    ctx!.globalCompositeOperation = 'destination-over';
    ctx!.fillStyle = '#FFFFFF';
    ctx!.fillRect(0, 0, canvas.width, canvas.height);
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png', 1.0);
    link.download = 'equipment-chart.png';
    link.click();
    ctx!.restore();
  }

  onSubmit() {
    if(this.form.valid){
      this.selectedDate=this.form.get('date')?.value;
      const selectedAeroport=this.form.get('aeroport')?.value;
        this.interventionService.getInterventionsByAiroport(selectedAeroport).subscribe(data => {
          const equipmentMap = new Map<string, number>();
          const colors: string[] = [];
          data.forEach((intervention: Interventiion) => {
            const interventionDate = new Date(intervention.date);
            const month = interventionDate.getMonth();
            const year = interventionDate.getFullYear();

            if (this.selectedDate) {
              const selectedMonth = this.selectedDate.getMonth();
              const selectedYear = this.selectedDate.getFullYear();
              if (month !== selectedMonth || year !== selectedYear) {
                return;
              }
            }

            if (intervention.equipment && intervention.equipment.equipementName) {
              const equipmentName = intervention.equipment.equipementName;
              if (!equipmentMap.has(equipmentName)) {
                equipmentMap.set(equipmentName, 0);
                colors.push(this.getRandomColor());
              }
              equipmentMap.set(equipmentName, equipmentMap.get(equipmentName)! + 1);
            }
          });
          let moiis:number=1;
          if (this.selectedDate) {
            const mois = this.selectedDate.getMonth();
            moiis+=mois;
          }

          this.pieChartOptions.plugins!.title!.text = `Distribution of interventions by equipment for :
       ${moiis} / ${this.selectedDate?.getFullYear()}`;
          this.pieChartLabels = Array.from(equipmentMap.keys());
          this.pieChartData = [
            { data: Array.from(equipmentMap.values()),
              label: 'Interventions' ,
              backgroundColor: colors
            }
          ];
        });


    }
  }
}
