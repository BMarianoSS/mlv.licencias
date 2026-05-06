import { bootstrapApplication } from '@angular/platform-browser';
import { mergeApplicationConfig } from '@angular/core';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { coreConfig } from './app/core/core.config';

const mergedConfig = mergeApplicationConfig(appConfig, coreConfig);

bootstrapApplication(AppComponent, mergedConfig)
  .catch(err => console.error(err));
