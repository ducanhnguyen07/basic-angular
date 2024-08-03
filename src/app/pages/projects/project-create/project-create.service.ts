import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IProject } from "../../../../common/interface/project.interface";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ProjectCreateService {
  url: string = `${environment.apiUrl}/projects/create`;
  newProject: IProject = {
    name: "",
    description: "",
    budget: 0,
    status: "0",
  };

  constructor(
    private _http: HttpClient,
  ) {}

  createNewProject(newProject: IProject): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<any>(this.url, JSON.stringify(newProject), { headers });
  }
}