import { getState, signalStoreFeature, withHooks } from '@ngrx/signals';
import { effect } from '@angular/core';

export function withLogger(name: string) {
  return signalStoreFeature(
    withHooks({
      onInit(store) {
        effect(() => {
          const state = getState(store);
          console.log(
            `%c[${name}]`,
            '    background: green; color: white; font-weight: bold;',
            'state changed',
            state
          );
        });
      },
    })
  );
}
