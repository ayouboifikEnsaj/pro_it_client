import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InterventionService } from '../services/intervention.service';
import { Chart, registerables } from 'chart.js';
import { ComptoireService } from '../services/comptoire.service';

@Component({
  selector: 'app-intervention-by-comptoire',
  templateUrl: './intervention-by-comptoire.component.html',
  styleUrls: ['./intervention-by-comptoire.component.css']
})
export class InterventionByComptoireComponent implements OnInit {

  form: FormGroup;
  chart: any;
  comptoires: any[] = [];
  months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];
  currentYear: number = new Date().getFullYear();
  selectedComptoireName: string = '';

  constructor(private fb: FormBuilder, private interventionService: InterventionService, private comptoireService: ComptoireService) {
    this.form = this.fb.group({
      comptoire: [null],
      month: [null]
    });
  }

  ngOnInit(): void {
    Chart.register(...registerables);
    this.createChart(); // Create chart with placeholder title
    this.loadComptoires(); // Load comptoires here
  }

  createChart() {
    this.chart = new Chart('chart', {
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: []
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                let label = context.label || '';
                if (context.parsed !== null) {
                  label += ': ' + context.parsed + '%';
                }
                return label;
              }
            }
          },
          title: {
            display: true,
            text: `Please select a counter and month to generate the chart`,
            font: {
              size: 18
            }
          }
        }
      }
    });
  }

  onSubmit() {
    const { comptoire, month } = this.form.value;
    const comptoireData = this.comptoires.find(c => c.id === comptoire);
    this.selectedComptoireName = comptoireData ? comptoireData.comptoireName : 'Unknown Comptoire';

    this.interventionService.getInterventionPercentages(comptoire, month, this.currentYear).subscribe(data => {
      this.updateChart(data);
    });
  }

  updateChart(data: any) {
    const labels = Object.keys(data);
    const values = Object.values(data);
    const backgroundColors = labels.map(() => '#' + Math.floor(Math.random() * 16777215).toString(16)); // Random colors

    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = values;
    this.chart.data.datasets[0].backgroundColor = backgroundColors;

    // Update the chart title based on the selected comptoire
    this.chart.options.plugins.title.text = `Percentage Of Interventions for Each Equipment in ${this.selectedComptoireName}`;

    this.chart.update();
  }

  loadComptoires() {
    this.comptoireService.getAllComptoires().subscribe(data => this.comptoires = data);
  }
}
