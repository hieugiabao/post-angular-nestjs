/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { LayoutMessageService } from '@nx-post/web/data-access-shell';
import {
  ApiExceptionDto,
  RegisterParamsDto,
  SecurityControllerService,
} from '@nx-post/web/shared-data-access-api-sdk';
import { concatMap, tap } from 'rxjs';

@Injectable()
export class RegisterStore extends ComponentStore<Record<string, never>> {
  constructor(
    private securityControllerService: SecurityControllerService,
    private layoutMessageService: LayoutMessageService,
    private router: Router
  ) {
    super({});
  }

  readonly register = this.effect<RegisterParamsDto>(
    concatMap((dto) =>
      this.securityControllerService.register(dto).pipe(
        tap({
          next: () => {
            this.layoutMessageService.addSuccessMessage({
              summary: 'Registration Success',
            });
            void this.router.navigate(['/login']);
          },
          error: (err: ApiExceptionDto) => {
            this.layoutMessageService.addErrorMessage({
              summary: 'Registration Error',
              detail: err.message,
            });
          },
        })
      )
    )
  );
}
