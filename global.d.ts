/* eslint-disable */
/* global.d.ts */

import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      /**
       * Support for the <model-viewer> web component
       */
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          'auto-rotate'?: boolean;
          'camera-controls'?: boolean;
          'background-color'?: string;
          exposure?: string;
          'tone-mapping'?: string;
          'shadow-intensity'?: string;
          'shadow-softness'?: string;
          loading?: 'eager' | 'lazy';
        },
        HTMLElement
      >;
    }
  }

  // allow importing .glb 3D assets
  declare module '*.glb';
}
