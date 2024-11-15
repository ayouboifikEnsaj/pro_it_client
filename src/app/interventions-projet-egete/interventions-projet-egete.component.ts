import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Chart, ChartDataset, ChartOptions, registerables} from "chart.js";
import {Interventiion} from "../models/model/intervention.model";
import {InterventionService} from "../services/intervention.service";
import {DatePipe} from "@angular/common";
import {AeroportService} from "../services/aeroport.service";

@Component({
  selector: 'app-interventions-projet-egete',
  templateUrl: './interventions-projet-egete.component.html',
  styleUrl: './interventions-projet-egete.component.css'
})
export class InterventionsProjetEgeteComponent implements OnInit{
  @ViewChild('projetYearChartCanvas') projetYearChartCanvas!: ElementRef<HTMLCanvasElement>;
  aeroports!: any[];
  form: FormGroup;
  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '\n' +
          'the number of incidents by equipment for E-GATE in : '
      }
    }
  };
  public barChartLegend = true;
  public barChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChartData: ChartDataset[] = [
    { data: [], label: 'Interventions' }
  ];


  constructor(
    private interventionService: InterventionService,
    private datePipe: DatePipe,
    private aeroportService:AeroportService,
    private fb: FormBuilder
  ) {
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

  downloadChart(): void {
    const canvas = this.projetYearChartCanvas.nativeElement;
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
    if (!this.form.valid) {
      return;
    }

    const date = this.form.get('date')?.value;
    const selectedAeroport = this.form.get('aeroport')?.value;
    if (!date || !selectedAeroport) {
      return;
    }

    const selectedYear = date.getFullYear();
    const projetMap = new Map<string, number[]>();

    this.interventionService.getInterventionsByAiroportAndProjetEGate(selectedAeroport).subscribe({
      next: (interventions: Interventiion[]) => {
        interventions.forEach((intervention) => {
          const interventionDate = new Date(intervention.date);
          const month = interventionDate.getMonth();
          const year = interventionDate.getFullYear();

          if (year === selectedYear && intervention.projet?.projetName) {
            const projetName = intervention.projet.projetName;
            if (!projetMap.has(projetName)) {
              projetMap.set(projetName, Array(12).fill(0));
            }
            projetMap.get(projetName)![month]++;
          }
        });

        this.updateChart(date.getFullYear(), projetMap);
      },
      error: (err) => {
        // Handle error (e.g., show an error message)
        console.error('Failed to fetch interventions', err);
      }
    });
  }

  private updateChart(year: number, projetMap: Map<string, number[]>) {
    this.barChartData = Array.from(projetMap, ([label, data]) => ({ data, label }));
    this.barChartOptions.plugins!.title!.text = `The number of incidents by equipment for E-GATE in: ${year}`;
  }

}
