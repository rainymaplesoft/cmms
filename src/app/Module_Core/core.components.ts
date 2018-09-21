import {
  ExceptionComponent,
  ValMsgComponent,
  SpinnerComponent,
  MobileMenuComponent,
  MenuItemComponent
} from './components';
import { SafeHtmlPipe, FilterOutPipe, FilterPipe } from './pipes';

export const ExportComponents = [
  ExceptionComponent,
  SafeHtmlPipe,
  FilterOutPipe,
  FilterPipe,
  SpinnerComponent,
  ValMsgComponent,
  MobileMenuComponent
];

const Declarations = [MenuItemComponent];

export const DeclarationComponents = [...ExportComponents, ...Declarations];
