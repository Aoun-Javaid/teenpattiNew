import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftSidebarComponent } from "../common/left-sidebar/left-sidebar.component";
import { HeaderComponent } from "../common/header/header.component";
import { FooterComponent } from "../common/footer/footer.component";

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, LeftSidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
