// timer.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private totalSeconds = 600;
  private timer$ = new BehaviorSubject<string>('10:00');
  private intervalSub?: Subscription;

  get time$() {
    return this.timer$.asObservable();
  }

  start(onFinish: () => void) {
    this.updateDisplay();
    this.intervalSub = interval(1000).subscribe(() => {
      this.totalSeconds--;
      this.updateDisplay();
      if (this.totalSeconds <= 0) {
        this.stop();
        onFinish();
      }
    });
  }

  stop() {
    this.intervalSub?.unsubscribe();
  }

  private updateDisplay() {
    const m = Math.floor(this.totalSeconds / 60);
    const s = this.totalSeconds % 60;
    this.timer$.next(`${this.pad(m)}:${this.pad(s)}`);
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
