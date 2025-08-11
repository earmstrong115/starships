import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { StarshipService } from './services/starship.service';
import { Starship } from './models/starship.model';
import { EditStarshipComponent } from './edit-starship/edit-starship.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource<Starship>([]);
  displayedColumns: string[] = [
    'name', 'model', 'manufacturer', 'cost_in_credits', 'length',
    'max_atmosphering_speed', 'crew', 'passengers', 'cargo_capacity',
    'consumables', 'hyperdrive_rating', 'mglt', 'starship_class', 'actions'
  ];

  public isLoading = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private starshipService: StarshipService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadStarships();
  }

  loadStarships() {
    this.isLoading = true;
    this.starshipService.getStarships().subscribe(
      starships => {
        this.dataSource.data = starships;
        this.isLoading = false;
      },
      error => console.error('Error fetching starships:', error)
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  seedData() {
    if (!confirm('Are you sure you want to seed data? This will delete all existing data and load fresh data.'))
      return;

    this.starshipService.seedStarships().subscribe(
      () => this.loadStarships(),
      error => console.error('Error loading starships:', error)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCreateDialog() {
    let newStarship: Starship = {
      name: '',
      model: '',
      manufacturer: '',
      cost_in_credits: '',
      length: '',
      max_atmosphering_speed: '',
      crew: '',
      passengers: '',
      cargo_capacity: '',
      consumables: '',
      hyperdrive_rating: '',
      mglt: '',
      starship_class: '',
      id: 0
    };

    this.openEditDialog(newStarship);
  }

  openEditDialog(starship: Starship) {
    const dialogRef = this.dialog.open(EditStarshipComponent, {
      width: '500px',
      data: { ...starship }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the starship in the dataSource if needed, or call a service to persist changes
        //const index = this.dataSource.data.findIndex(s => s.id === result.id);
        //if (index > -1) {
        //  this.dataSource.data[index] = result;
        //  this.dataSource._updateChangeSubscription(); // Refresh the table
        //}
        this.loadStarships();
      }
    });
  }
}
