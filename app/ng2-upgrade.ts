import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import { NgModule } from '@angular/core';
import { UpgradeAdapter } from '@angular/upgrade';

export const upgradeAdapter = new UpgradeAdapter();
