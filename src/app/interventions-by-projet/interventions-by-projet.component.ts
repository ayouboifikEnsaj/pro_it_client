import {Component, ElementRef, ViewChild} from '@angular/core';
import {Chart, ChartDataset, ChartOptions, ChartType, registerables} from "chart.js";
import {InterventionService} from "../services/intervention.service";
import {DatePipe} from "@angular/common";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AeroportService} from "../services/aeroport.service";

@Component({
  selector: 'app-interventions-by-projet',
  templateUrl: './interventions-by-projet.component.html',
  styleUrl: './interventions-by-projet.component.css'
})
export class InterventionsByProjetComponent {
  @ViewChild('projetChartCanvas') projetChartCanvas!: ElementRef<HTMLCanvasElement>;
  aeroports!: any[];
  form: FormGroup;
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Distribution of interventions by project for the selected month'
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem: any) {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw as number; // Assertion de type
            return `${label}: ${value.toFixed(2)}%`;
          }
        }
      },
      datalabels: {
        anchor: function(context: any) {
          // Logic to determine the anchor position
          return context.dataIndex % 2 === 0 ? 'end' : 'center';
        },
        align: function(context: any) {
          // Logic to align the label
          return context.dataIndex % 2 === 0 ? 'start' : 'center';
        },
        formatter: (value: number) => {
          return `${value.toFixed(2)}%`;
        },
        color: '#000',
        font: {
          weight: 'bold',
          size: 12
        },
        offset: 10

      }
    }
  };
  public pieChartLabels: string[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  public pieChartData: ChartDataset<'pie'>[] = [
    { data: [], label: 'Interventions', backgroundColor: [] }
  ];

  selectedDate: Date | null = null;

  constructor(private interventionService: InterventionService,
              private datePipe: DatePipe,
              private aeroportService:AeroportService,
              private fb: FormBuilder
  ) {
    Chart.register(...registerables);
    Chart.register(ChartDataLabels); // Enregistrez le plugin ChartDataLabels
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
    const canvas = this.projetChartCanvas.nativeElement;
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
    if (this.form.valid){
      this.selectedDate=this.form.get('date')?.value;
      const selectedAeroport=this.form.get('aeroport')?.value;
      this.interventionService.getInterventionsByAiroport(selectedAeroport).subscribe(data => {
        const projetMap = new Map<string, number>();
        const colors: string[] = [];
        let totalInterventions = 0;

        data.forEach((intervention: any) => {
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

          if (intervention.projet && intervention.projet?.projetName) {
            const projetName = intervention.projet.projetName;
            if (!projetMap.has(projetName)) {
              projetMap.set(projetName, 0);
              colors.push(this.getRandomColor());
            }
            projetMap.set(projetName, projetMap.get(projetName)! + 1);
            totalInterventions++;
          }
        });
        let moiis:number=1;
        if (this.selectedDate) {
          const mois = this.selectedDate.getMonth();
          moiis+=mois;
        }

        if (totalInterventions > 0) {
          this.pieChartOptions.plugins!.title!.text = `Distribution of interventions by project for :
       ${moiis} / ${this.selectedDate?.getFullYear()}`;
          this.pieChartLabels = Array.from(projetMap.keys());
          this.pieChartData = [
            {
              data: Array.from(projetMap.values()).map(count => (count / totalInterventions) * 100),
              label: 'Interventions',
              backgroundColor: colors
            }
          ];



        } else {
          this.pieChartLabels = [];
          this.pieChartData = [
            {
              data: [],
              label: 'Interventions',
              backgroundColor: []
            }
          ];
        }
      });
    }
  }
}
