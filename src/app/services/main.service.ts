import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IndexedDbService } from './indexed-db.service';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private bannersList: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

  constructor( private networkService: NetworkService,
    private indexedDBService: IndexedDbService) { }

  getDataFromServices(key: any, timeLimit: any, payload?: any): Observable<any> {
    return new Observable<any>((observer) => {
      // const url = new URL(key);
      if (!payload) {
        payload = {}
      }
      const path = key.split('/').filter(Boolean).pop();
      this.indexedDBService.getRecord(path + 'Time').subscribe(
        (data: any) => {
          if (data) {
            const date1 = new Date(data);
            const date2 = new Date();
            const diffInMilliseconds = date2.getTime() - date1.getTime();
            const minutes = Math.floor(diffInMilliseconds / (1000 * 60));
            if (minutes > timeLimit) {

              this.getRecordsFromNetwork(key, payload).subscribe((data: any) => {

                observer.next(data);
                observer.complete();

              }, (error) => {
                observer.error(error);
              })
            } else {
              this.getRecordsFromDB(key, payload).subscribe((data: any) => {
                observer.next(data);
                observer.complete();
              }, (error) => {
                observer.error(error);
              })
            }
          } else {
            this.getRecordsFromNetwork(key, payload).subscribe((data: any) => {
              observer.next(data);
              observer.complete();

            }, (error) => {
              observer.error(error);
            })
          }
        });
    });
  }
  private createtimestamp(key: any): Observable<Boolean> {
    return this.indexedDBService.createRecord(key, Date());
  }

  private getRecordsFromNetwork(key: any, payload?: any): Observable<any> {
    return new Observable<any>((observer) => {
      const path = key.split('/').filter(Boolean).pop();;
      this.networkService.getAllRecordsByPost(key, payload).subscribe((record: any) => {
        this.indexedDBService.createRecord(path, record).subscribe(() => {
          this.createtimestamp(path + 'Time').subscribe(() => {
            observer.next(record);
            observer.complete();
          }, (error) => {
            observer.error(error);
          });
        }, (error) => {
          observer.error(error);
        });
      }, (error) => {
        observer.error(error);
      })
    });
  }

  private getRecordsFromDB(key: any, payload?: any): Observable<any> {
    return new Observable<any>((observer) => {
      const path = key.split('/').filter(Boolean).pop();
      this.indexedDBService.getRecord(path).subscribe(
        (data: any) => {
          if (data) {
            observer.next(data);
            observer.complete();
          }
          else {
            this.getRecordsFromNetwork(key, payload).subscribe((data: any) => {
              observer.next(data);
              observer.complete();
            }, (error) => {
              observer.error(error);
            })
          }
        },
        (error: any) => {
          console.error('Error retrieving record: ', error);
          observer.error(error);
        }
      );
    });
  }

  getBannersList(): BehaviorSubject<any | null> {
    return this.bannersList;
  }
  setBannersList(value: any | null): void {
    this.bannersList.next(value);
  }
}
