import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ConditionhandlerService } from '../../service/conditionhandler.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-left-sidebar',
  imports: [RouterLink,RouterModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss'
})
export class LeftSidebarComponent {
  constructor(private conditionalService:ConditionhandlerService,private auth:AuthService,private router: Router,){}
  toggleSection(): void {
    this.conditionalService.setSection(false);
  }
  logout() {
    this.auth.logout().subscribe((resp) => {
      if (resp.meta.statusCode === 200) localStorage.clear();
      this.router.navigate(["/login"]);
    });
  }
}
