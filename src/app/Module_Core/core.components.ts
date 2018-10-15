import {
  ExceptionComponent,
  ValMsgComponent,
  SpinnerComponent
} from './components';
import { SafeHtmlPipe, FilterOutPipe, FilterPipe } from './pipes';

export const ExportComponents = [
  ExceptionComponent,
  SafeHtmlPipe,
  FilterOutPipe,
  FilterPipe,
  SpinnerComponent,
  ValMsgComponent
];

const Declarations = [];

export const DeclarationComponents = [...ExportComponents, ...Declarations];
