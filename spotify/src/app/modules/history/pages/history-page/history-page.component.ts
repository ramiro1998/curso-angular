import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {
  listResults$: TrackModel[] = []
  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  receiveData(event: string): void {
    //TODO: agarras el termino y sabes que solo se ejecuta cunado tiene 3 caracters
    this.searchService.searchTracks$(event).subscribe((tracks: TrackModel[]) => {
      const uniqueTracks = tracks.filter((track, index, self) =>
        index === self.findIndex(t => t.uid === track.uid)
      );
      this.listResults$ = uniqueTracks;
    })

    /* tuve que hacerlo así porque el endpoint search trae repetidos */
  }
}