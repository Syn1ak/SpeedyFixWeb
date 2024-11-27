import {Observable} from "rxjs";
import {ResolveFn} from "@angular/router";

export abstract class ABaseUpsertStrategy<TInitialView, TUpdateView = TInitialView, TId = any> {
  abstract initialValue$: Observable<TInitialView>
  abstract id: TId //null  for create item
  abstract title: string;

  abstract updateMethod$(view: TUpdateView): Observable<TId>;
}


export interface UpsertStrategyResolvers<T extends ABaseUpsertStrategy<any>> {
  create: ResolveFn<T>,
  edit: ResolveFn<T>
}
