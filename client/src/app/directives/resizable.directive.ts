import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import interact from 'interactjs';

@Directive({
  selector: '[appResizable]',
  standalone: true
})
export class ResizableDirective implements OnInit, OnDestroy {
  @Input() resizableZone: any;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    interact(this.el.nativeElement).resizable({
      edges: { right: true, bottom: true },
      listeners: {
        move: event => {
          const target = event.target as HTMLElement;
          const width = event.rect.width;
          const height = event.rect.height;

          const parent = target.parentElement;
          const maxWidth = parent?.clientWidth || 800;
          const maxHeight = parent?.clientHeight || 600;

          const finalWidth = Math.min(width, maxWidth - this.resizableZone.x);
          const finalHeight = Math.min(height, maxHeight - this.resizableZone.y);

          target.style.width = `${finalWidth}px`;
          target.style.height = `${finalHeight}px`;

          if (this.resizableZone) {
            this.resizableZone.width = finalWidth;
            this.resizableZone.height = finalHeight;
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    interact(this.el.nativeElement).unset();
  }
}
