import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProject } from "../../../../common/interface/project.interface";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ProjectEditService {
  url: string = `${environment.apiUrl}/projects`;

  constructor(
    private _http: HttpClient,
  ) {}

  getProjectById(projectId: string | null) {
    return this._http.get<any>(`${this.url}/${projectId}`);
  }

  editProject(projectId: string, projectData: Partial<IProject>): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.patch<any>(`${this.url}/update/${projectId}`,  JSON.stringify(projectData), { headers });
  }
}