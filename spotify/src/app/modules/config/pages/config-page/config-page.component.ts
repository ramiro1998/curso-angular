import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrackModel } from '@core/models/tracks.model';
import { ConfigService } from '@modules/config/services/config.service';
import { SearchService } from '@modules/history/services/search.service';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subject, debounceTime, map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-config-page',
  templateUrl: './config-page.component.html',
  styleUrls: ['./config-page.component.css']
})
export class ConfigPageComponent implements OnInit {

  tracks: TrackModel[] = []
  private searchSubject = new Subject<string>();
  public stringFilter: string = ''
  formTrack!: FormGroup
  formOpened: boolean = false
  trackId: string | number = ''
  @ViewChild('formView', { static: false }) formView!: ElementRef;

  constructor(private trackService: TrackService, private searchService: SearchService, private fb: FormBuilder, private configService: ConfigService) {
    this.searchSubject.pipe(
      debounceTime(500)
    ).subscribe((debouncedTerm: string) => {
      this.searchService.searchTracks$(debouncedTerm).subscribe((tracks: TrackModel[]) => {
        const uniqueTracks = tracks.filter((track, index, self) =>
          index === self.findIndex(t => t.uid === track.uid)
        );
        this.tracks = uniqueTracks;
      })
    });
  }

  ngOnInit(): void {

    this.formTrack = this.fb.group({
      name: ['', Validators.required],
      album: ['', Validators.required],
      cover: ['', Validators.required],
      artist: ['', Validators.required],
    });
    this.getAllTracks()
  }

  getAllTracks() {
    this.trackService.getAllTracks$().pipe(
      map((tracks: TrackModel[]) => this.tracks = tracks)
    ).subscribe()
  }

  searchTracks(term: any): void {
    this.searchSubject.next(term);
  }

  getErrorMessage(control: any): string {
    if (control.hasError('required') && this.formTrack.touched) {
      return 'Campo Obligatorio';
    }
    return '';
  }

  openForm() {
    this.formOpened = true
    this.trackId = ''
    this.formTrack.reset()
    setTimeout(() => {
      this.formView.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        offsetTop: 200
      });
    }, 300);
  }

  closeForm() {
    this.formOpened = false
  }

  editTrack(track: TrackModel) {
    this.formOpened = true
    this.formTrack.patchValue({
      name: track.name,
      album: track.album,
      cover: track.cover,
      artist: track.artist
    });
    this.trackId = track.uid
    setTimeout(() => {
      this.formView.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        offsetTop: 200
      });
    }, 300);
  }

  deleteTrack(track: TrackModel) {
    Swal.fire({
      title: `¿Está seguro que quiere eliminar la canción ${track.name}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Sí",
      denyButtonText: `No`,
      customClass: {
        popup: 'sweet-popup'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.configService.deleteTrack$(track.uid).subscribe(() => {
          Swal.fire({
            title: "Canción eliminada!",
            icon: "success",
            customClass: {
              popup: 'sweet-popup'
            }
          });
          this.getAllTracks()
        }, (error: any) => {
          Swal.fire({
            title: "Error al eliminar",
            icon: "error",
            customClass: {
              popup: 'sweet-popup'
            }
          });
        })
      }
    });
  }

  onSubmit() {
    if (this.formTrack.invalid) {
      Swal.fire({
        title: "Error al guardar",
        icon: "error",
        customClass: {
          popup: 'sweet-popup'
        }
      });
      return
    }

    const trackData = this.formTrack.value;

    if (this.trackId) {
      this.configService.editTrack$(trackData, this.trackId).subscribe((result: any) => {
        Swal.fire({
          title: "Canción editada!",
          icon: "success",
          customClass: {
            popup: 'sweet-popup'
          }
        });
        this.getAllTracks()
      }, (error: any) => {
        Swal.fire({
          title: "Error al guardar",
          icon: "error",
          customClass: {
            popup: 'sweet-popup'
          }
        });
      });
    } else {
      this.configService.createTrack$(trackData).subscribe((result: any) => {
        Swal.fire({
          title: "Canción creada!",
          icon: "success",
          customClass: {
            popup: 'sweet-popup'
          }
        });
        this.getAllTracks()
        this.formTrack.reset()
        this.closeForm()

      }, (error: any) => {
        Swal.fire({
          title: "Error al guardar",
          icon: "error",
          customClass: {
            popup: 'sweet-popup'
          }
        });
      });
    }
  }

}
