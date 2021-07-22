import { RegistroList } from './class/registroLista.class';
import { registro } from './class/registro.class';
import { crearRegistroHtml } from './js/componentes';

import './styles.css';

export const registroList = new RegistroList ();

registroList.persona.forEach(crearRegistroHtml);




